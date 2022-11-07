import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from './channel-services/channel.service';

import { IChannel } from '../models/IChannel';

@Component({
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.scss']
})

export class ChannelComponent implements OnInit {

    public channel: IChannel | undefined;
    public EXTENSION_FOR_CHANNEL_BANNER: string = '\=w2120-fcrop64\=1\,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj\ ';

    ngOnInit() {
        this._channelService.getChannel(this._route.snapshot.paramMap.get('id'))
            .subscribe(item => this.channel = item);
    }

    constructor(
        private _route: ActivatedRoute,
        private _channelService: ChannelService
    ) { }
}
