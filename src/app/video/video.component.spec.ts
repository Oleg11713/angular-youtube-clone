import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VideoComponent } from './video.component';
import { VideoService } from './service/video.service';
import { of } from 'rxjs';

describe('VideoComponent', () => {
    let component: VideoComponent;
    let videoService: VideoService;
    let fixture: ComponentFixture<VideoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [VideoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VideoComponent);
        component = fixture.componentInstance;
        videoService = TestBed.inject(VideoService);
        fixture.detectChanges();

        let store: any = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(
            mockLocalStorage.removeItem
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set video in watch history', () => {
        localStorage.removeItem('watchedVideos');
        const id = 'TmaAOV4SJNQ';
        component.addVideoToTheHistory(id);

        expect(Object.keys(component.watchedVideos)).toEqual(['TmaAOV4SJNQ']);
    });

    it('should call getComments and set comments', fakeAsync(() => {
        const id = 'TmaAOV4SJNQ';
        const mockComments = {
            id: 'asd',
            snippet: {
                authorDisplayName: 'asd',
                authorProfileImageUrl: 'asd',
                textOriginal: 'asd',
                likeCount: 1,
                publishedAt: 'asd',
            },
        };
        spyOn(videoService, 'getComments').and.returnValue(of([mockComments]));
        expect(component.comments).toEqual([]);
        component.getComments(id);
        tick();

        expect(component.comments).toEqual([mockComments]);
    }));

    it('should call getRelatedVideos and set related videos', fakeAsync(() => {
        const id = 'TmaAOV4SJNQ';
        const mockRelatedVideos = [
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
                }
            },
        ];
        spyOn(videoService, 'getRelatedVideos').and.returnValue(
            of(mockRelatedVideos)
        );
        expect(component.relatedVideos).toEqual([]);
        component.getRelatedVideos(id);
        tick();

        expect(component.relatedVideos).toEqual(mockRelatedVideos);
    }));

    it('should call getCurrentVideo and set current video', fakeAsync(() => {
        const id = 'TmaAOV4SJNQ';
        const mockCurrentVideo = [
            {
                id: 'TmaAOV4SJNQ',
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
                }
            },
        ];
        spyOn(videoService, 'getCurrentVideo').and.returnValue(
            of(mockCurrentVideo)
        );
        expect(component.currentVideo).toBe(undefined);
        component.getCurrentVideo(id);
        tick();

        expect(component.currentVideo).toEqual(mockCurrentVideo[0]);
    }));
});
