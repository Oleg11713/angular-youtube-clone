import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from '../channel-services/channel.service';

import { IChannel } from '../../models/IChannel';

@Component({
    selector: 'channel-about',
    templateUrl: './channel-about.component.html',
    styleUrls: ['./channel-about.component.scss']
})

export class ChannelAboutComponent implements OnInit {
    public channel: IChannel | undefined;

    ngOnInit(): void {
        this._channelService.getChannel(this._route.snapshot.paramMap.get('id'))
            .subscribe(item => this.channel = item)
    }

    constructor(
        private _route: ActivatedRoute,
        private _channelService: ChannelService
    ) { }

}
