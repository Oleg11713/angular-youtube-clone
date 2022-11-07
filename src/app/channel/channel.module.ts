import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { ChannelComponent } from './channel.component';
import { ChannelDataComponent } from './channel-data/channel-data.component';
import { ChannelTabsComponent } from './channel-tabs/channel-tabs.component';
import { ChannelPlaylistsComponent } from './channel-playlists/channel-playlists.component';
import { ChannelChannelsComponent } from './channel-channels/channel-channels.component';


import { SharedModule } from '../shared/shared.module';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelVideoSearchComponent } from './channel-video-search/channel-video-search.component';

@NgModule({
    declarations: [
        ChannelComponent,
        ChannelDataComponent,
        ChannelTabsComponent,
        ChannelPlaylistsComponent,
        ChannelChannelsComponent,
        ChannelAboutComponent,
        ChannelVideoSearchComponent
    ],
    imports: [
        ChannelRoutingModule,
        SharedModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule
    ]
})

export class ChannelModule { }
