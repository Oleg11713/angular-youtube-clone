import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelAboutComponent } from './channel-about.component';

import { ChannelService } from '../channel-services/channel.service';

describe('ChannelAboutComponent', () => {
    let component: ChannelAboutComponent;
    let fixture: ComponentFixture<ChannelAboutComponent>;
    let mockChannelService;
    let CHANNEL;

    beforeEach( () => {
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
                ChannelAboutComponent
            ],
            providers: [
                {
                    provide: ChannelService,
                    useValue: mockChannelService
                }
            ],
            imports: [
                RouterTestingModule,
                MatIconModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(ChannelAboutComponent);
        component = fixture.componentInstance;

        mockChannelService.getChannel.and.returnValue(of(CHANNEL));
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get channel with correct data', () => {
        fixture.detectChanges();

        expect(component?.channel?.id).toBe('UC_x5XG1OV2P6uZZ5FSM9Ttw');
    });
});
