import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IVideo } from '../../models/IVideo.interface';
import { ICache } from '../../models/ICache';

@Component({
    selector: 'app-video-info',
    templateUrl: './video-info.component.html',
    styleUrls: ['./video-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoInfoComponent {
    @Input() currentVideo?: IVideo;

    public isShownDescription: boolean = true;
    public isSubscribe: boolean = false;
    public videoLike: ICache = {};
    public videoDislike: ICache = {};

    constructor() {}

    public addVideoLike(id: string): void {
        if (!Object.keys(this.videoLike).includes(id)) {
            this.videoLike[id] = true;
            delete this.videoDislike[id];
        }
    }

    public checkVideoLike(id: string): boolean {
        return Object.keys(this.videoLike).includes(id);
    }

    public addVideoDislike(id: string): void {
        if (!Object.keys(this.videoDislike).includes(id)) {
            this.videoDislike[id] = true;
            delete this.videoLike[id];
        }
    }

    public checkVideoDislike(id: string): boolean {
        return Object.keys(this.videoDislike).includes(id);
    }

    public toggleDescription(): void {
        this.isShownDescription = !this.isShownDescription;
    }

    public toggleSubscribe(): void {
        this.isSubscribe = !this.isSubscribe;
    }
}
