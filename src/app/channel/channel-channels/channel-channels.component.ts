import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from '../channel-services/channel.service';

import { IChannel } from '../../models/IChannel';

@Component({
  selector: 'channel-channels',
  templateUrl: './channel-channels.component.html',
  styleUrls: ['./channel-channels.component.scss']
})

export class ChannelChannelsComponent implements OnInit {
    public channelMultipleChannels: IChannel[] = [];

    ngOnInit(): void {
        this._channelService.getChannelMultipleChannels(this._route.snapshot.paramMap.get('id'))
            .subscribe(items => this.channelMultipleChannels = items);
    }

    constructor(
        private _route: ActivatedRoute,
        private _channelService: ChannelService
    ) { }
}
