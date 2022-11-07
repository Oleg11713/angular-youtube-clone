import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { ChannelService } from '../channel-services/channel.service';

import { IVideo } from '../../models/IVideo.interface';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'channel-tabs',
    templateUrl: './channel-tabs.component.html',
    styleUrls: ['./channel-tabs.component.scss'],
})

export class ChannelTabsComponent {
    public isSearching: boolean = false;
    public selectedTab = new FormControl(0);

    public videosByKeyword$!: Observable<IVideo[]>;

    constructor(
        private _route: ActivatedRoute,
        private _channelService: ChannelService
    ) { }

    private _searchVideo: string = '';

    public get searchVideo(): string {
        return this._searchVideo;
    }

    public set searchVideo(value: string) {
        this._searchVideo = value;
    }

    public onSearch(): void {
        this.isSearching = !this.isSearching;

        if (!this.isSearching) {
            this.searchVideo = '';
            this.selectedTab.setValue(0);
        }
    }

    public findVideosByKeyword(): void {
        if (this.searchVideo) {
            if (this.selectedTab.value != 6) {
                this.selectedTab.setValue(6);
            }

            this.videosByKeyword$ = this._channelService
                .getChannelVideosByKeyword(this.searchVideo, this._route.snapshot.paramMap.get('id'));
        }
    }
}
