import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IVideo } from 'src/app/models/IVideo.interface';
import { SearchService } from '../service/search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    public videoListView = true;
    public showFilter = true;
    public videos$!: Observable<IVideo[]>;
    public categories$!: Observable<ICategory[]>;
    public query: string | null = null;
    public sortConditions = [
        { value: 'relevance', title: 'By relevance' },
        { value: 'date', title: 'By upload date' },
        { value: 'rating', title: 'By rating' },
        { value: 'title', title: 'By title' },
        { value: 'videoCount', title: 'By video count on chanel' },
        { value: 'viewCount', title: 'By number of views' },
    ];

    constructor(
        private _searchService: SearchService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.videos$ = this._searchService.getVideos({
            searchType: 'videos',
        });
        this.categories$ = this._searchService.getVideoCategories();
        this._showVideosByQuery();
    }

    public changeView(): void {
        this.videoListView = !this.videoListView;
    }

    public showVideosByFilter(categoryId: string) {
        if (!categoryId) {
            this.videos$ = this._searchService.getVideos({
                searchType: 'videos',
            });
        } else {
            this.videos$ = this._searchService.getVideos({
                searchType: 'search',
                videoCategoryId: `${categoryId}`,
            });
        }
    }

    public showVideosBySortCondition(sortCondition: string) {
        if (this.query) {
            this.videos$ = this._searchService.getVideos({
                searchType: 'search',
                order: `${sortCondition}`,
                q: `${this.query}`,
            });
        }
    }

    private _showVideosByQuery(): void {
        this._router.events.subscribe(() => {
            this.query =
                this._activatedRoute.snapshot.queryParamMap.get('search_query');
            if (this.query) {
                this.videos$ = this._searchService.getVideos({
                    searchType: 'search',
                    q: `${this.query}`,
                });
                this.showFilter = false;
            } else {
                this.videos$ = this._searchService.getVideos({
                    searchType: 'videos',
                });
                this.showFilter = true;
            }
        });
    }
}
