import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { NavigationEnd } from '@angular/router';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let mockActivatedRoute: any;
    let routerMock: any;
    let mockService: any;
    let searchQuery: string | null;

    beforeEach(() => {
        searchQuery = 'query';
        mockService = jasmine.createSpyObj('SearchService', {
            getVideos: of(),
            getVideoCategories: of(),
        });

        routerMock = {
            events: of(
                new NavigationEnd(
                    0,
                    `search-page?search_query=${searchQuery}`,
                    `search-page?search_query=${searchQuery}`
                )
            ),
        };

        mockActivatedRoute = {
            snapshot: {
                queryParamMap: {
                    get: function (data: string): string | null {
                        if (searchQuery) {
                            return searchQuery;
                        }
                        return null;
                    },
                },
            },
        };

        component = new SearchComponent(
            mockService,
            mockActivatedRoute,
            routerMock
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change videoListView from true to false', () => {
        component.videoListView = true;
        component.changeView();
        expect(component.videoListView).toEqual(false);
    });

    it('should change videoListView from false to true', () => {
        component.videoListView = false;
        component.changeView();
        expect(component.videoListView).toEqual(true);
    });

    it('should call getVideos with filtering videos when showVideosByFilter', () => {
        let categoryId = '1';
        component.showVideosByFilter(categoryId);
        expect(mockService.getVideos).toHaveBeenCalledWith({
            searchType: 'search',
            videoCategoryId: `${categoryId}`,
        });
    });

    it('should call getVideos with popular videos when showVideosByFilter', () => {
        let categoryId = '';
        component.showVideosByFilter(categoryId);
        expect(mockService.getVideos).toHaveBeenCalledWith({
            searchType: 'videos',
        });
    });

    it('should call getVideos when showVideosBySortCondition', () => {
        component.query = 'cats';
        let sortCondition = 'data';
        component.showVideosBySortCondition(sortCondition);
        expect(mockService.getVideos).toHaveBeenCalledWith({
            searchType: 'search',
            order: `${sortCondition}`,
            q: `${component.query}`,
        });
    });

    it('should call getVideos and getVideoCategories when ngOnInit', () => {
        component.ngOnInit();
        expect(mockService.getVideos).toHaveBeenCalledWith({
            searchType: 'videos',
        });
        expect(mockService.getVideoCategories).toHaveBeenCalled();
    });

    it('should assign videos by query to videos$ when _showVideosByQuery if there is query', () => {
        component.query = 'cats';
        (component as any)._showVideosByQuery();
        expect(component.query).toEqual('query');
        expect(component.videos$).toEqual(
            mockService.getVideos({
                searchType: 'search',
                q: `${component.query}`,
            })
        );
        expect(component.showFilter).toEqual(false);
    });

    it('should assign popular videos to videos$ when _showVideosByQuery if there is no query', () => {
        searchQuery = null;

        routerMock = {
            events: of(
                new NavigationEnd(
                    0,
                    `search-page?search_query=${searchQuery}`,
                    `search-page?search_query=${searchQuery}`
                )
            ),
        };

        mockActivatedRoute = {
            snapshot: {
                queryParamMap: {
                    get: function (data: string): string | null {
                        if (searchQuery) {
                            return searchQuery;
                        }
                        return null;
                    },
                },
            },
        };

        component = new SearchComponent(
            mockService,
            mockActivatedRoute,
            routerMock
        );

        (component as any)._showVideosByQuery();
        expect(component.query).toEqual(null);
        expect(component.videos$).toEqual(
            mockService.getVideos({
                searchType: 'videos',
            })
        );
        expect(component.showFilter).toEqual(true);
    });
});
