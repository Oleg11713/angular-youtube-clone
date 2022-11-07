import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ChannelChannelsComponent } from './channel-channels.component';

import { ChannelService } from '../channel-services/channel.service';

describe('ChannelChannelsComponent', () => {
    let component: ChannelChannelsComponent;
    let fixture: ComponentFixture<ChannelChannelsComponent>;
    let mockChannelService;
    let CHANNELS;

    beforeEach(() => {
        mockChannelService = jasmine.createSpyObj(['getChannelMultipleChannels']);
        CHANNELS = [
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
                id: '1',
                statistics: {
                    subscriberCount: '20000',
                    viewCount: '20000000'
                },
                brandingSettings: {
                    image: {
                        bannerExternalUrl: 'https://...'
                    }
                }
            },
            {
                snippet: {
                    title: 'Some channel 2',
                    publishedAt: '2022-11-11',
                    description: 'Some descr 2',
                    country: 'Poland',
                    thumbnails: {
                        default: {
                            url: 'https://...'
                        }
                    }
                },
                id: '2',
                statistics: {
                    subscriberCount: '10000',
                    viewCount: '10000000'
                },
                brandingSettings: {
                    image: {
                        bannerExternalUrl: 'https://...'
                    }
                }
            }
        ]

        TestBed.configureTestingModule({
            declarations: [
                ChannelChannelsComponent
            ],
            providers: [
                {
                    provide: ChannelService,
                    useValue: mockChannelService
                }
            ],
            imports: [
                RouterTestingModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ChannelChannelsComponent);
        component = fixture.componentInstance;

        mockChannelService.getChannelMultipleChannels.and.returnValue(of(CHANNELS));
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get correct count of channels', () => {
        fixture.detectChanges();

        expect(component.channelMultipleChannels.length).toBe(2);
    });
});
