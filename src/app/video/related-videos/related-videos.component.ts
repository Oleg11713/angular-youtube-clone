import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IVideo } from '../../models/IVideo.interface';

@Component({
    selector: 'app-related-videos',
    templateUrl: './related-videos.component.html',
    styleUrls: ['./related-videos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedVideosComponent {
    @Input() relatedVideos: IVideo[] = [];

    constructor() {}
}
