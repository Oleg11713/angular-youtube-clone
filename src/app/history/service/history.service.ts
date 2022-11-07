import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IVideo } from '../../models/IVideo.interface';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    private _videoUrl = `${
        environment.endpoints.videos.getVideo
    }`;

    constructor(private _http: HttpClient) {}

    public getVideo(id: string | null): Observable<IVideo[]> {
        return this._http.get<IVideo[]>(`${this._videoUrl}&id=${id}`).pipe(
            map((data: any) => {
                return data.items.map((item: any) => {
                    return {
                        id: item.id,
                        snippet: {
                            title: item.snippet.title,
                            description: item.snippet.description,
                            thumbnails: {
                                high: { url: item.snippet.thumbnails.high.url },
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
}
