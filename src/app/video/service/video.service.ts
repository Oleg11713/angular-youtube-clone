import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IVideo } from '../../models/IVideo.interface';
import { IComment } from '../../models/IComment.interface';

@Injectable({
    providedIn: 'root',
})
export class VideoService {
    private _videoUrl = `${
        environment.endpoints.videos.getVideo
    }`;
    private _relatedVideosUrl = `${
        environment.endpoints.search.getRelatedVideos
    }`;
    private _commentsUrl = `${
        environment.endpoints.commentThreads.getComments
    }`;

    constructor(private _http: HttpClient) {}

    public getCurrentVideo(id: string | null): Observable<IVideo[]> {
        return this._http.get<IVideo[]>(`${this._videoUrl}&id=${id}`).pipe(
            map((data: any) => {
                return data.items.map((item: any) => {
                    return {
                        ...item,
                        id: item.id,
                        snippet: {
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnails: {
                                high: {
                                    url: item.snippet.thumbnails.high.url,
                                },
                            },
                            channelTitle: item.snippet.channelTitle,
                            channelId: item.snippet.channelId,
                            publishedAt: item.snippet.publishedAt,
                        },
                        statistics: {
                            viewCount: item.statistics.viewCount,
                            likeCount: item.statistics.likeCount,
                            commentCount: item.statistics.commentCount,
                        },
                    } as IVideo;
                });
            })
        );
    }

    public getRelatedVideos(videoId: string): Observable<IVideo[]> {
        return this._http
            .get<{ items: [{ id: { videoId: string } }] }>(
                `${this._relatedVideosUrl}&relatedToVideoId=${videoId}`
            )
            .pipe(
                mergeMap((id) =>
                    this._http.get<{ items: IVideo[] }>(
                        `${this._videoUrl}&id=${id.items
                            .map((item) => item.id.videoId)
                            .join(',')}`
                    )
                ),
                map((videos) =>
                    videos.items.map((item: IVideo) => {
                        return {
                            ...item,
                            id: item.id,
                            snippet: {
                                title: item.snippet.title,
                                description: item.snippet.description,
                                thumbnails: {
                                    high: {
                                        url: item.snippet.thumbnails.high.url,
                                    },
                                },
                                channelTitle: item.snippet.channelTitle,
                                channelId: item.snippet.channelId,
                                publishedAt: item.snippet.publishedAt,
                            },
                            statistics: {
                                viewCount: item.statistics.viewCount,
                                likeCount: item.statistics.likeCount,
                                commentCount: item.statistics.commentCount,
                            },
                        } as IVideo;
                    })
                )
            );
    }

    public getComments(id: string | null): Observable<IComment[]> {
        return this._http
            .get<{ items: IComment[] }>(`${this._commentsUrl}&videoId=${id}`)
            .pipe(
                map((data: { items: IComment[] }) => {
                    return data.items.map((item: any) => {
                        return {
                            id: item.snippet.topLevelComment.id,
                            snippet: {
                                authorDisplayName:
                                    item.snippet.topLevelComment.snippet
                                        .authorDisplayName,
                                authorProfileImageUrl:
                                    item.snippet.topLevelComment.snippet
                                        .authorProfileImageUrl,
                                textOriginal:
                                    item.snippet.topLevelComment.snippet
                                        .textOriginal,
                                likeCount:
                                    item.snippet.topLevelComment.snippet
                                        .likeCount,
                                publishedAt:
                                    item.snippet.topLevelComment.snippet
                                        .publishedAt,
                            },
                        } as IComment;
                    });
                })
            );
    }
}
