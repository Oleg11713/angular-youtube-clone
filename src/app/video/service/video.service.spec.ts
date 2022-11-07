import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { VideoService } from './video.service';

describe('VideoService', () => {
    let videoService: VideoService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    let mockComments = [
        {
            id: 'asd',
            snippet: {
                authorDisplayName: 'authorDisplayName',
                authorProfileImageUrl: 'authorProfileImageUrl',
                textOriginal: 'textOriginal',
                likeCount: 1,
                publishedAt: 'publishedAt',
            },
        },
    ];

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
            },
        },
    ];

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
            },
        },
    ];

    let apiComments: any = {
        items: mockComments,
    };

    let apiCurrentVideo: any = {
        items: mockCurrentVideo,
    };

    let apiRelatedVideos: any = {
        items: mockRelatedVideos,
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        videoService = new VideoService(httpClientSpy);
    });

    it('should be created', () => {
        expect(videoService).toBeTruthy();
    });

    it('should retrieves comments by videoId', () => {
        httpClientSpy.get.and.returnValue(of(apiComments));
        const id = 'qjoz-CAO3xQ';
        videoService.getComments(id).subscribe({
            next: (comments) => {
                expect(comments).toEqual(mockComments);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should retrieves currentVideo by videoId', () => {
        httpClientSpy.get.and.returnValue(of(apiCurrentVideo));
        const id = 'qjoz-CAO3xQ';
        videoService.getCurrentVideo(id).subscribe({
            next: (video) => {
                expect(video).toEqual(mockCurrentVideo);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should retrieves relatedVideos', () => {
        httpClientSpy.get.and.returnValue(of(apiRelatedVideos));
        const id = 'qjoz-CAO3xQ';
        videoService.getRelatedVideos(id).subscribe({
            next: (videos) => {
                expect(videos).toEqual(mockRelatedVideos);
            },
        });
    });
});
