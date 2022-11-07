import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
    let historyService: HistoryService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    const mockVideos = [
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

    let apiVideos: any = {
        items: mockVideos,
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        historyService = new HistoryService(httpClientSpy);
    });

    it('should be created', () => {
        expect(historyService).toBeTruthy();
    });

    it('should retrieves videos by videoId', () => {
        httpClientSpy.get.and.returnValue(of(apiVideos));
        const id = 'qjoz-CAO3xQ';
        historyService.getVideo(id).subscribe({
            next: (videos) => {
                expect(videos).toEqual(mockVideos);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
});
