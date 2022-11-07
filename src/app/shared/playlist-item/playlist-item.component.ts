import { Component, Input } from '@angular/core';
import { IPlaylist } from '../../models/IPlaylist';

@Component({
  selector: 'playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})

export class PlaylistItemComponent {
    @Input() public channelMultiplePlaylistItem: IPlaylist | undefined;
}
