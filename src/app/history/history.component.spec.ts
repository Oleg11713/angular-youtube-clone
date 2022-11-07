import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HistoryComponent } from './history.component';
import { HistoryService } from './service/history.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HistoryComponent', () => {
    let component: HistoryComponent;
    let historyService: HistoryService;
    let fixture: ComponentFixture<HistoryComponent>;
    let mockRouter = {
        navigate: jasmine.createSpy('navigate'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HistoryComponent],
            providers: [{ provide: Router, useValue: mockRouter }],
        }).compileComponents();

        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        historyService = TestBed.inject(HistoryService);
        fixture.detectChanges();

        let store: any = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear local storage with watch history', () => {
        component.clearSearchHistory();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-page']);
        expect(localStorage.getItem('watchedVideos')).toBe(null);
    });

    it('should clear local storage with search history', () => {
        component.clearWatchHistory();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-page']);
        expect(localStorage.getItem('searchHistory')).toBe(null);
    });

    it('should get watch history', () => {
        const mockVideo = JSON.stringify({
            TmaAOV4SJNQ: '11:58',
        });
        localStorage.setItem('watchedVideos', mockVideo);
        component.ngOnInit();
        expect(component.localStorageWatchedVideos).toEqual(JSON.parse(mockVideo));
    });

    it('should set watchedVideos', fakeAsync(() => {
        const mockVideo = JSON.stringify({
            TmaAOV4SJNQ: '11:58',
        });
        localStorage.setItem('watchedVideos', mockVideo);
        const mockWatchedVideos = [
            {
                id: '1',
                snippet: {
                    title: 'title',
                    description: 'description',
                    channelTitle: 'channelTitle',
                    channelId: 'channelId',
                    publishedAt: 'publishedAt',
                    thumbnails: {
                        high: {
                            url: 'url',
                        },
                    },
                },
                statistics: {
                    viewCount: 78,
                    likeCount: 4,
                    commentCount: 5,
                },
            },
        ];
        spyOn(historyService, 'getVideo').and.returnValue(
            of(mockWatchedVideos)
        );
        expect(component.watchedVideos).toEqual([]);
        component.ngOnInit();
        tick();

        expect(component.watchedVideos).toEqual(mockWatchedVideos);
    }));
});
