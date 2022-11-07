import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
    @Input() id: string = '';

    constructor() {}
}
