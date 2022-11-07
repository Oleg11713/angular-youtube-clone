import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ChannelDataComponent } from './channel-data.component';

describe('ChannelDataComponent', () => {
    let component: ChannelDataComponent;
    let fixture: ComponentFixture<ChannelDataComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ChannelDataComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(ChannelDataComponent);
        component = fixture.componentInstance;

        component.subscribersCount = 10;
        component.title = 'title';
        component.thumbnail = 'https://someURL'
    });

    it('should create component', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should correct receive data', () => {
        fixture.detectChanges();

        expect(component.subscribersCount).toBe(10);
        expect(component.title).toBe('title');
        expect(component.thumbnail).toBe('https://someURL');
    });
});
