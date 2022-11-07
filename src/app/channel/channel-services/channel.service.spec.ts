import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelService } from './channel.service';

import { IChannel } from '../../models/IChannel';
import { IChannelSection } from '../../models/IChannelSection';
import { IPlaylist } from '../../models/IPlaylist';
import { IPlaylistItem } from '../../models/IPlaylistItem';
import { IVideo } from '../../models/IVideo.interface';

describe('ChannelService', () => {
    let channelService: ChannelService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let API_CHANNEL: { items: IChannel[] };
    let API_CHANNEL_SECTIONS: { items: IChannelSection[] };
    let API_PLAYLIST: { items: IPlaylist[] };
    let API_PLAYLIST_ITEM: { items:  IPlaylistItem[] };
    let API_CHANNEL_MULTIPLE_PLAYLISTS: { items: IPlaylist[], title: string };
    let API_VIDEOS_BY_KEYWORD: { items: IVideo[] };

    beforeEach(() => {
        API_CHANNEL = {
            items: [
                {
                    snippet: {
                        title: 'Some channel',
                        publishedAt: '2022-12-12',
                        description: 'Some descr',
                        country: 'Belarus',
                        thumbnails: {
                            default: {
                                url: 'https://...'
                            }
                        }
                    },
                    id: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
                    statistics: {
                        subscriberCount: 20000,
                        viewCount: 20000000
                    },
                    brandingSettings: {
                        image: {
                            bannerExternalUrl: 'https://...'
                        }
                    }
                }
            ]
        };
        API_CHANNEL_SECTIONS = {
            items: [
                {
                    snippet: {
                        type: 'singleplaylist',
                        title: ''
                    },
                    contentDetails: {
                        playlists: ['asdfgh'],
                        channels: ['CH_123']
                    }
                },
                {
                    snippet: {
                        type: 'multipleplaylists',
                        title: 'Some multiple playlist'
                    },
                    contentDetails: {
                        playlists: ['aaaaaa', 'bbbbbb'],
                        channels: ['CH_222', 'CH_111']
                    }
                }
            ]
        };
        API_PLAYLIST = {
            items: [
                {
                    id: '1',
                    snippet: {
                        title: 'some title',
                        description: 'some descr',
                        channelTitle: 'channel title',
                        thumbnails: {
                            default: {
                                url: 'https://someURL'
                            }
                        }
                    },
                    contentDetails: {
                        itemCount: 123
                    }
                }
            ]
        };
        API_PLAYLIST_ITEM = {
            items: [
                {
                    snippet: {
                        publishedAt: '2022-12-12',
                        title: 'some title',
                        channelTitle: 'channel title',
                        playlistId: '1',
                        resourceId: {
                            videoId: '1'
                        },
                        thumbnails: {
                            high: {
                                url: 'https://someURL'
                            }
                        }
                    }
                }
            ]
        };
        API_CHANNEL_MULTIPLE_PLAYLISTS = {
            items: [
                {
                    id: '1',
                    snippet: {
                        title: 'some title',
                        description: 'some descr',
                        channelTitle: 'channel title',
                        thumbnails: {
                            default: {
                                url: 'https://someURL'
                            }
                        }
                    },
                    contentDetails: {
                        itemCount: 123
                    }
                }
            ],
            title: 'multiple playlists title'
        };
        API_VIDEOS_BY_KEYWORD = {
            items: [
                {
                    id: '1',
                    snippet: {
                        title: 'more tech',
                        description: 'some descr',
                        channelTitle: 'channel title',
                        publishedAt: '2022-12-12',
                        channelId: '2',
                        thumbnails: {
                            high: {
                                url: 'https://someURL'
                            }
                        }
                    },
                    statistics: {
                        viewCount: 10000,
                        likeCount: 1000,
                        commentCount: 100
                    }
                }
            ]
        };

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA]
        })

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        channelService = new ChannelService(httpClientSpy);
    });

    it('should create service', () => {
        expect(channelService).toBeTruthy();
    });

    describe('getChannel', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            httpClientSpy.get.and.returnValue(of(API_CHANNEL));

            channelService.getChannel(channelId)
                .subscribe(item => expect(item.id).toBe(channelId));

            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('getChannelSections', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            httpClientSpy.get.and.returnValue(of(API_CHANNEL_SECTIONS));

            (channelService as any)._getChannelSections(channelId)
                .subscribe((items: {type: string, items: string[], title: string}[]) => {
                    expect(items.filter(item => item.type === 'multipleplaylists').length).toBe(1);
                    expect(items.filter(item => item.type === 'singleplaylist').length).toBe(1);
                });

            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('getChannelSinglePlaylists', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            httpClientSpy.get.and.returnValue(of(API_PLAYLIST));

            (channelService as any)._getChannelSinglePlaylists(channelId)
                .subscribe((item: IPlaylist[]) => {
                    expect(item[0].id).toBe('1');
                });

            expect(httpClientSpy.get).toHaveBeenCalledTimes(2);
        });
    });

    describe('getChannelPlaylistItems', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            httpClientSpy.get.and.returnValue(of(API_PLAYLIST_ITEM));

            (channelService as any)._getChannelPlaylistItems(channelId)
                .subscribe((item: IPlaylistItem[]) => {
                    expect(item[0].snippet.resourceId.videoId).toBe('1');
                });

            expect(httpClientSpy.get).toHaveBeenCalledTimes(3);
        });
    });

    describe('getChannelMultiplePlaylists', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            httpClientSpy.get.and.returnValue(of(API_CHANNEL_MULTIPLE_PLAYLISTS));

            channelService.getChannelMultiplePlaylists(channelId)
                .subscribe(item => expect(item.title).toBe('multiple playlists title'));

            expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        });
    });

    describe('getChannelVideosByKeyword', () => {
        it('should be called and return correct data', () => {
            const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
            const keyword = 'more';
            httpClientSpy.get.and.returnValue(of(API_VIDEOS_BY_KEYWORD));

            channelService.getChannelVideosByKeyword(keyword, channelId)
                .subscribe(item => expect(item[0].id).toBe('1'));

            expect(httpClientSpy.get).toHaveBeenCalledTimes(2);
        });
    });
});
