import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelVideoSearchComponent } from './channel-video-search.component';
import { VideoListItemComponent } from '../../shared/video-list-item/video-list-item.component';

describe('ChannelVideoSearchComponent', () => {
    let component: ChannelVideoSearchComponent;
    let fixture: ComponentFixture<ChannelVideoSearchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChannelVideoSearchComponent,
                VideoListItemComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ChannelVideoSearchComponent);
        component = fixture.componentInstance;

        component.foundVideos = [
            {
                id: '1',
                snippet: {
                    title: 'vide title 1',
                    description: 'video descr 1',
                    channelTitle: 'channel1',
                    publishedAt: '2022-12-12',
                    channelId: '1',
                    thumbnails: {
                        high: {
                            url: 'https://...'
                        }
                    }
                },
                statistics: {
                    viewCount: 1000,
                    likeCount: 100,
                    commentCount: 10
                }
            },
            {
                id: '2',
                snippet: {
                    title: 'vide title 2',
                    description: 'video descr 2',
                    channelTitle: 'channel2',
                    publishedAt: '2022-11-11',
                    channelId: '2',
                    thumbnails: {
                        high: {
                            url: 'https://...'
                        }
                    }
                },
                statistics: {
                    viewCount: 222,
                    likeCount: 22,
                    commentCount: 2
                }
            }
        ]
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get a correct videos count', () => {
        fixture.detectChanges();

        expect(fixture.componentInstance.foundVideos.length).toBe(2);
    });

    it('should render each video as VideoListItemComponent', () => {
        fixture.detectChanges();

        const videoListComponentDEs = fixture.debugElement.queryAll(By.directive(VideoListItemComponent));
        expect(videoListComponentDEs.length).toBe(2);
    })
});
