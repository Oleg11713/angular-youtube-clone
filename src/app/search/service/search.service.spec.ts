import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IVideo } from 'src/app/models/IVideo.interface';
import { SearchService } from './search.service';

describe('SearchService', () => {
    let service: SearchService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let VIDEOS: IVideo[] = [
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

    let CATEGORIES: ICategory[] = [
        {
            id: '1',
            snippet: {
                title: 'category',
                assignable: true,
            },
        },
    ];

    let API_CATEGORIES: any = {
        items: CATEGORIES,
    };

    let API_VIDEOS: any = {
        items: VIDEOS,
    };

    let mockHttpErrorResponse: any = {
        status: 404,
        message: 'some message about error',
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new SearchService(httpClientSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get popular videos', () => {
        httpClientSpy.get.and.returnValue(of(API_VIDEOS));
        service.getVideos({ searchType: 'videos' }).subscribe({
            next: (videos) => {
                expect(videos).toEqual(VIDEOS);
            },
            error: (err: any) => {
                expect(err).toBeInstanceOf(String);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should get videos by some condition', () => {
        httpClientSpy.get.and.returnValue(of(API_VIDEOS));
        service.getVideos({ searchType: 'search' }).subscribe({
            next: (videos) => {
                expect(videos).toEqual(VIDEOS);
            },
            error: (err: any) => {
                expect(err).toBeInstanceOf(String);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(2);
    });

    it('should get categories', () => {
        httpClientSpy.get.and.returnValue(of(API_CATEGORIES));
        service.getVideoCategories().subscribe({
            next: (categories) => {
                expect(categories).toEqual(CATEGORIES);
            },
            error: (err: any) => {
                expect(err).toBeInstanceOf(String);
            },
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should get string url when _formUrl', () => {
        expect((service as any)._formUrl({ searchType: 'videos' })).toBeInstanceOf(String);
    });

    it('should return error with message when _handleError', () => {
        (service as any)._handleError(mockHttpErrorResponse).subscribe({
            next: () => {},
            error: (error: any) => {
                expect(error).toBeTruthy();
                expect(error).toEqual(`Error with ${mockHttpErrorResponse.status} code: ${mockHttpErrorResponse.message}`);
            },
        });
    });
});
