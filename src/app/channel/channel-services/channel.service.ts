import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, mergeMap, Observable, scan } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IChannel } from '../../models/IChannel';
import { IPlaylist } from '../../models/IPlaylist';
import { IPlaylistItem } from '../../models/IPlaylistItem';
import { IChannelSection } from '../../models/IChannelSection';
import { IVideo } from '../../models/IVideo.interface';

@Injectable({
    providedIn: 'root'
})

// UC_x5XG1OV2P6uZZ5FSM9Ttw

export class ChannelService {
    private _API_KEY = '&key=AIzaSyA2JLgY0v-AxXur_bjEHoQoHFRVARux8wM';

    private _channelUrl = `${environment.endpoints.channel.getChannel}`;
    private _playlistsUrl = `${environment.endpoints.playlists.getPlaylists}`;
    private _channelSectionsUrl = `${environment.endpoints.channelSections.getChannelSections}`;
    private _playlistItemsUrl = `${environment.endpoints.playlists.getPlaylistItems}`;
    private _searchingByKeyWordUrl = `${environment.endpoints.search.getVideoBySearchingByKeyword}`;
    private _videosUrl = `${environment.endpoints.videos.getVideo}`;

    private _SINGLE_PLAYLIST_TYPE = 'singleplaylist';
    private _MULTIPLE_PLAYLISTS_TYPE = 'multipleplaylists';
    private _MULTIPLE_CHANNELS_TYPE = 'multiplechannels';

    constructor(
        private _http: HttpClient
    ) { }

    public getChannel(id: string | null): Observable<IChannel> {
        return this._http.get<{ items: IChannel[] }>(`${this._channelUrl}&id=${id}`)
            .pipe(
                map((item) => item.items[0])
            );
    }

    public getChannelMultiplePlaylists(channelId: string | null): Observable<{ items: IPlaylist[], title: string }> {
        return this._getChannelMultiplePlaylistsIds(channelId)
            .pipe(
                mergeMap(multiplePlaylists => this._getMappedMultiplePlaylists(multiplePlaylists))
            )
    }

    public getChannelMultipleChannels(channelId: string | null): Observable<IChannel[]> {
        return this._getChannelSections(channelId)
            .pipe(
                map(value => value.filter(item => item.type === this._MULTIPLE_CHANNELS_TYPE)),
                map(sortedItems => sortedItems.map(item => item.items.join(','))),
                mergeMap(ids =>
                    this._http.get<{ items: IChannel[] }>(`${this._channelUrl}&id=${ids + this._API_KEY}`)
                ),
                map(channels => channels.items)
            )
    }

    public getPlaylistItemsWithPlaylist (channelId: string | null): Observable<{ playlist: IPlaylist, playlistItems: IPlaylistItem[] }[]> {
        return combineLatest<[IPlaylist[], IPlaylistItem[]]>([
            this._getChannelSinglePlaylists(channelId),
            this._getChannelPlaylistItems(channelId)
        ])
            .pipe(
                map(([channelSinglePlaylists, channelPlaylistItems]) =>
                    channelSinglePlaylists.map(playlist => ({
                        playlist: playlist,
                        playlistItems: channelPlaylistItems.filter(item => item.snippet.playlistId === playlist.id)
                    }))
                )
            )
    }

    public getChannelVideosByKeyword(keyword: string, channelId: string | null): Observable<IVideo[]> {
        return this._http.get<{ items: [{ id: { videoId: string } }] }>(`${this._searchingByKeyWordUrl}&q=${keyword}&channelId=${channelId}`)
            .pipe(
                mergeMap(id =>
                    this._http.get<{ items: IVideo[] }>(`${this._videosUrl}&id=${id.items.map(item => item.id.videoId).join(',')}`)
                ),
                map(videos => videos.items)
            )
    }

    private _getChannelSections(channelId: string | null): Observable<{ type: string, items: string[], title: string }[]> {
        return this._http.get<{ items: IChannelSection[] }>(`${this._channelSectionsUrl}&channelId=${channelId}`)
            .pipe(
                map(section => section.items.map(item => {
                    switch (item.snippet.type) {
                        case this._SINGLE_PLAYLIST_TYPE:
                            return {
                                type: this._SINGLE_PLAYLIST_TYPE,
                                items: item.contentDetails.playlists,
                                title: ''
                            }
                        case this._MULTIPLE_PLAYLISTS_TYPE:
                            return {
                                type: this._MULTIPLE_PLAYLISTS_TYPE,
                                items: item.contentDetails.playlists,
                                title: item.snippet.title
                            }
                        case this._MULTIPLE_CHANNELS_TYPE:
                            return {
                                type: this._MULTIPLE_CHANNELS_TYPE,
                                items: item.contentDetails.channels,
                                title: item.snippet.title
                            }
                        default:
                            return {
                                type: 'unknown',
                                items: [],
                                title: ''
                            };
                    }
                }))
            )
    }

    private _getDividedSinglePlaylists(channelId: string | null): Observable<IPlaylist> {
        return this._getChannelSinglePlaylists(channelId)
            .pipe(
                mergeMap(playlist => playlist)
            )
    }

    private _getChannelMultiplePlaylistsIds(channelId: string | null): Observable<{ type: string, items: string[], title: string }> {
        return this._getChannelSections(channelId)
            .pipe(
                map(value => value.filter(item => item.type === this._MULTIPLE_PLAYLISTS_TYPE)),
                mergeMap(ids => ids)
            )
    }

    private _getMappedMultiplePlaylists (multiplePlaylists: { type: string, items: string[], title: string }): Observable<{ items: IPlaylist[], title: string }> {
        return this._http.get<{ items: IPlaylist[] }>(`${this._playlistsUrl}&id=${multiplePlaylists.items.join(',')}`)
            .pipe(
                map(playlists => ({
                    items: [...playlists.items],
                    title: multiplePlaylists.title
                }))
            )
    }

    private _getChannelPlaylistItems(channelId: string | null): Observable<IPlaylistItem[]> {
        return this._getDividedSinglePlaylists(channelId)
            .pipe(
                mergeMap(playlist =>
                    this._http.get<{ items: IPlaylistItem[] }>(`${this._playlistItemsUrl}&playlistId=${playlist.id}`)
                ),
                map(playlistItem => playlistItem.items),
                scan((acc, value) => [...acc, ...value], [] as IPlaylistItem[]),
            )
    }

    private _getChannelSinglePlaylists(channelId: string | null): Observable<IPlaylist[]> {
        return this._getChannelSections(channelId)
            .pipe(
                map(value => value.filter(item => item.type === this._SINGLE_PLAYLIST_TYPE)),
                map(sortedItems => sortedItems.map(item => item.items.join(''))),
                mergeMap(ids => this._http.get<{ items: IPlaylist[] }>(`${this._playlistsUrl}&id=${ids.join(',')}`)),
                map(playlist => playlist.items),
            )
    }
}
