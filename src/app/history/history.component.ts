import { Component, OnInit } from '@angular/core';
import { IVideo } from '../models/IVideo.interface';
import { HistoryService } from './service/history.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    public watchedVideos: IVideo[] = [];
    public localStorageWatchedVideos: { [id: string]: Date } = {};

    constructor(
        private _historyService: HistoryService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem('watchedVideos') !== null) {
            this.localStorageWatchedVideos = JSON.parse(
                localStorage.getItem('watchedVideos')!
            );
        }

        Object.keys(this.localStorageWatchedVideos).forEach((videoId) =>
            this._historyService.getVideo(videoId).subscribe((data) => {
                this.watchedVideos.push(data[0]);
            })
        );
    }

    public clearWatchHistory(): void {
        localStorage.removeItem('watchedVideos');
        this._router.navigate(['/search-page']);
    }

    public clearSearchHistory(): void {
        localStorage.removeItem('searchHistory');
        this._router.navigate(['/search-page']);
    }
}
