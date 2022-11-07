import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SanitizeUrlPipe } from './pipes/sanitize-url/sanitize-url.pipe';
import { VideoListItemComponent } from './video-list-item/video-list-item.component';
import { PlaylistItemComponent } from './playlist-item/playlist-item.component';


@NgModule({
    declarations: [
        VideoListItemComponent,
        SanitizeUrlPipe,
        PlaylistItemComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule,
        MatProgressBarModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        VideoListItemComponent,
        SanitizeUrlPipe,
        PlaylistItemComponent,
    ],
})
export class SharedModule {}
