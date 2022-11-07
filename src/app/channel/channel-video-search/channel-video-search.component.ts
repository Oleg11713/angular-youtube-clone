import { Component, Input } from '@angular/core';

import { IVideo } from '../../models/IVideo.interface';

@Component({
    selector: 'channel-video-search',
    templateUrl: './channel-video-search.component.html',
    styleUrls: ['./channel-video-search.component.scss']
})

export class ChannelVideoSearchComponent {
    @Input() foundVideos: IVideo[] = [];
}
