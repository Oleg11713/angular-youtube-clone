import { Component, Input, OnInit } from '@angular/core';

import { IVideo } from '../../models/IVideo.interface';

@Component({
    selector: 'video-list-item',
    templateUrl: './video-list-item.component.html',
    styleUrls: ['./video-list-item.component.scss'],
})
export class VideoListItemComponent implements OnInit {
    @Input() public isGrid: boolean = false;
    @Input() public item: IVideo | undefined;
    @Input() public isWatched: boolean = false;

    public watchedVideos: { [id: string]: Date } = {};

    ngOnInit() {
        if (localStorage.getItem('watchedVideos') !== null) {
            this.watchedVideos = JSON.parse(
                localStorage.getItem('watchedVideos')!
            );
        }

        if (
            this.item &&
            Object.keys(this.watchedVideos).includes(this.item.id)
        ) {
            this.isWatched = true;
        }
    }
}
