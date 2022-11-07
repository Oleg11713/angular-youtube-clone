import { Component, Input } from '@angular/core';

@Component({
    selector: 'channel-data',
    templateUrl: './channel-data.component.html',
    styleUrls: ['./channel-data.component.scss']
})

export class ChannelDataComponent {
    @Input() public title: string = '';
    @Input() public thumbnail: string = '';
    @Input() public subscribersCount: number = 0;
}
