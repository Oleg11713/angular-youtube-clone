import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListItemComponent } from './video-list-item.component';

describe('VideoListItemComponent', () => {
    let component: VideoListItemComponent;
    let fixture: ComponentFixture<VideoListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VideoListItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VideoListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should change value isWatched if video was watched previously', () => {
        component.isWatched = false;
        component.item = {
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
            },
        };

        const watchedVideo = JSON.stringify({
            TmaAOV4SJNQ: '11:58',
        });
        localStorage.setItem('watchedVideos', watchedVideo);

        component.ngOnInit();

        expect(component.isWatched).toBe(true);
    });
});
