import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, catchError, throwError, mergeMap } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory.interface';
import { IVideo } from 'src/app/models/IVideo.interface';
import { environment, baseApiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private _API_URL        = `${baseApiUrl}`;
    private _VIDEOS_URL     = `${environment.endpoints.videos.getVideo}`;
    private _CATEGORIES_URL = `${environment.endpoints.categories.getCategories}`;

    constructor(private _http: HttpClient) {}

    public getVideos(arg: any): Observable<IVideo[]> {
        let videosUrl = this._formUrl(arg);

        if (arg.searchType === 'search') {
            return this._http.get<IVideo[]>(videosUrl).pipe(
                mergeMap((data: any) =>
                    this._http.get<IVideo[]>(
                        `${this._VIDEOS_URL}&id=${data.items
                            .map((item: any) => item.id.videoId)
                            .join('&id=')}`
                    )
                ),
                map((data: any) => data.items),
                tap((data: any) => console.log(JSON.stringify(data))),
                catchError(this._handleError)
            );
        } else {
            return this._http.get<IVideo[]>(videosUrl).pipe(
                tap((data: any) => console.log(JSON.stringify(data))),
                map((data: any) => data.items),
                catchError(this._handleError)
            );
        }
    }

    public getVideoCategories(): Observable<ICategory[]> {
        return this._http.get<ICategory[]>(this._CATEGORIES_URL).pipe(
            map((data: any) =>
                data.items.filter((item: any) => item.snippet.assignable)
            ),
            tap((data: any) =>
                console.log('After filter', JSON.stringify(data))
            ),
            map((data: any) => data),
            catchError(this._handleError)
        );
    }

    private _handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage: string;
        errorMessage = `Error with ${err.status} code: ${err.message}`;
        return throwError(() => errorMessage);
    }

    private _formUrl(arg: any): string { 
        let part = 'snippet', chart;
        if (arg.searchType === 'videos') {
            part = 'snippet,statistics';
            chart = 'mostPopular';
        }
        let params = [
            { 'part=': part },
            { 'chart=': chart },
            { 'maxResults=': '48' },
            { 'type=': 'video' },
            { 'videoCategoryId=': arg.videoCategoryId },
            { 'regionCode=': 'BY' },
            { 'q=': arg.q },
            { 'order=': arg.order },
        ].filter((param) => Object.values(param)[0])// избавляемся от объектов, значения которых не пришли из search.component
         .map((param) => `${Object.keys(param)[0]}${Object.values(param)[0]}`); // объединяем ключ и значение в одну строку
    
        return `${this._API_URL}${arg.searchType}?${params.join('&')}`;
    }
}
