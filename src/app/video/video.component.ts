import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IVideo } from '../models/IVideo.interface';
import { VideoService } from './service/video.service';
import { IComment } from '../models/IComment.interface';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
    public currentVideo?: IVideo;
    public relatedVideos: IVideo[] = [];
    public comments: IComment[] = [];
    public watchedVideos: { [id: string]: string } = {};
    private _paramsId!: string | null;

    constructor(
        private _videoService: VideoService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this._paramsId = this._route.snapshot.paramMap.get('id');
        this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.getCurrentVideo(this._paramsId!);
        this.getComments(this._paramsId!);
        this.getRelatedVideos(this._paramsId!);
    }

    public getRelatedVideos(id: string): void {
        this._videoService.getRelatedVideos(id).subscribe((data) => {
            this.relatedVideos = data;
        });
    }

    public getCurrentVideo(id: string): void {
        this._videoService.getCurrentVideo(id).subscribe((data) => {
            this.currentVideo = data[0];
            this.addVideoToTheHistory(this.currentVideo.id);
        });
    }

    public getComments(id: string): void {
        this._videoService.getComments(id).subscribe((data) => {
            this.comments = data;
        });
    }

    public addVideoToTheHistory(id: string): void {
        if (localStorage.getItem('watchedVideos') !== null) {
            this.watchedVideos = JSON.parse(
                localStorage.getItem('watchedVideos')!
            );
        }

        let hours =
            new Date().getHours() < 10
                ? '0' + new Date().getHours()
                : new Date().getHours();
        let minutes =
            new Date().getMinutes() < 10
                ? '0' + new Date().getMinutes()
                : new Date().getMinutes();

        if (!Object.keys(this.watchedVideos).includes(id)) {
            this.watchedVideos[id] = hours + ':' + minutes;
        }

        localStorage.setItem(
            'watchedVideos',
            JSON.stringify(this.watchedVideos)
        );
    }
}
