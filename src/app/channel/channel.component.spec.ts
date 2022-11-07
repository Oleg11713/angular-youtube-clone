import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelComponent } from './channel.component';

import { ChannelService } from './channel-services/channel.service';

describe('ChannelComponent', () => {
    let component: ChannelComponent;
    let fixture: ComponentFixture<ChannelComponent>;
    let mockChannelService;
    let CHANNEL;

    beforeEach(() => {
        mockChannelService = jasmine.createSpyObj(['getChannel']);
        CHANNEL = {
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
                subscriberCount: '20000',
                viewCount: '20000000'
            },
            brandingSettings: {
                image: {
                    bannerExternalUrl: 'https://...'
                }
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                ChannelComponent
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
        })

        fixture = TestBed.createComponent(ChannelComponent);
        component = fixture.componentInstance;

        mockChannelService.getChannel.and.returnValue(of(CHANNEL));
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
})
