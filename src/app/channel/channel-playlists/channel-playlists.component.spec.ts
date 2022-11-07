import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ChannelPlaylistsComponent } from './channel-playlists.component';
import { PlaylistItemComponent } from '../../shared/playlist-item/playlist-item.component';

import { ChannelService } from '../channel-services/channel.service';

describe('ChannelPlaylistsComponent', () => {
    let component: ChannelPlaylistsComponent;
    let fixture: ComponentFixture<ChannelPlaylistsComponent>;
    let mockChannelService;
    let PLAYLIST_ITEMS_WITH_PLAYLIST;
    let MULTIPLE_PLAYLIST_ITEMS;

    beforeEach(() => {
        PLAYLIST_ITEMS_WITH_PLAYLIST = [
            {
                playlist: {
                    id: '1',
                    snippet: {
                        title: 'Some playlist',
                        description: 'Some descr',
                        channelTitle: 'Channel title',
                        thumbnails: {
                            default: {
                                url: 'https://i.ytimg.com/vi/XJ476O86hbU/default.jpg'
                            }
                        }
                    }
                },
                playlistItems: [
                    {
                        snippet: {
                            publishedAt: '2022-12-12',
                            title: 'Item title',
                            channelTitle: 'Channel title',
                            playlistId: '1',
                            resourceId: {
                                videoId: 'video-id-1'
                            },
                            thumbnails: {
                                high: {
                                    url: 'https://i.ytimg.com/vi/XJ476O86hbU/default.jpg'
                                }
                            }
                        }
                    }
                ]
            }
        ];
        MULTIPLE_PLAYLIST_ITEMS = [
            {
                items: [
                    {
                        playlist: {
                            id: '1',
                            snippet: {
                                title: 'Some playlist',
                                description: 'Some descr',
                                channelTitle: 'Channel title',
                                thumbnails: {
                                    default: {
                                        url: 'https://i.ytimg.com/vi/XJ476O86hbU/default.jpg'
                                    }
                                }
                            }
                        },
                    }
                ],
                title: 'first multiple playlist'
            }
        ]
        mockChannelService = jasmine.createSpyObj(['getChannelMultiplePlaylists', 'getPlaylistItemsWithPlaylist']);

        TestBed.configureTestingModule({
            declarations: [
                ChannelPlaylistsComponent,
                PlaylistItemComponent
            ],
            imports: [
                MatIconModule,
                MatTabsModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ChannelService,
                    useValue: mockChannelService
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(ChannelPlaylistsComponent);
        component = fixture.componentInstance;

        mockChannelService.getChannelMultiplePlaylists.and.returnValue(of(MULTIPLE_PLAYLIST_ITEMS));
        mockChannelService.getPlaylistItemsWithPlaylist.and.returnValue(of(PLAYLIST_ITEMS_WITH_PLAYLIST));
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get correct count of playlists and multiple playlists', () => {
        fixture.detectChanges();

        expect(component.channelMultiplePlaylists.length).toEqual(1);
        expect(component.playlistItemsWithPlaylist.length).toEqual(1);
    });

    // it('should render each multiple playlist item as a PlaylistItemComponent', () => {
    //     fixture.detectChanges();
    //
    //     const channelMultiplePlaylistsDEs = fixture.debugElement.queryAll(By.directive(PlaylistItemComponent));
    //     expect(channelMultiplePlaylistsDEs.length).toEqual(1);
    // });
});
