import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from '../channel-services/channel.service';

import { IPlaylist } from '../../models/IPlaylist';
import { IPlaylistItem } from '../../models/IPlaylistItem';

@Component({
    selector: 'channel-playlists',
    templateUrl: './channel-playlists.component.html',
    styleUrls: ['./channel-playlists.component.scss']
})

export class ChannelPlaylistsComponent implements OnInit {
    public channelMultiplePlaylists: { items: IPlaylist[], title: string }[] = [];
    public playlistItemsWithPlaylist: { playlist: IPlaylist, playlistItems: IPlaylistItem[] }[] = [];

    ngOnInit(): void {
        this._channelService.getChannelMultiplePlaylists(this._route.snapshot.paramMap.get('id'))
            .subscribe(playlists => this.channelMultiplePlaylists.push(playlists));

        this._channelService.getPlaylistItemsWithPlaylist(this._route.snapshot.paramMap.get('id'))
            .subscribe(items => this.playlistItemsWithPlaylist = items)
    }

    constructor(
        private _route: ActivatedRoute,
        private _channelService: ChannelService
    ) { }
}
