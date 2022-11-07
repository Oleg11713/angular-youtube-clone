import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { PlaylistItemComponent } from './playlist-item.component';

describe('PlaylistItemComponent', () => {
    let component: PlaylistItemComponent;
    let fixture: ComponentFixture<PlaylistItemComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PlaylistItemComponent
            ],
            imports: [
                MatIconModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlaylistItemComponent);
        component = fixture.componentInstance;

        component.channelMultiplePlaylistItem = {
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
                itemCount: 5
            }
        };
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should get multiple playlist correct', () => {
        fixture.detectChanges();

        expect(component.channelMultiplePlaylistItem?.id).toBe('1');
    });
});
