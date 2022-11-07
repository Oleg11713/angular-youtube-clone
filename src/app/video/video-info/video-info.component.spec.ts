import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoComponent } from './video-info.component';

describe('VideoInfoComponent', () => {
    let component: VideoInfoComponent;
    let fixture: ComponentFixture<VideoInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VideoInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(VideoInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('addVideoLike() should add "like"', () => {
        component.videoLike = {};
        const id = 'asd';

        component.addVideoLike(id);

        expect(component.videoLike[id]).toBe(true);
    });

    it('addVideoDislike() should add "dislike"', () => {
        component.videoDislike = {};
        const id = 'asd';

        component.addVideoDislike(id);

        expect(component.videoDislike[id]).toBe(true);
    });

    it('checkVideoDislike() should check does video contains "dislike"', () => {
        component.videoDislike = {};
        const id = 'asd';

        component.addVideoDislike(id);

        expect(component.checkVideoDislike(id)).toBe(true);
    });

    it('checkVideoLike() should check does video contains "like"', () => {
        component.videoLike = {};
        const id = 'asd';

        component.addVideoLike(id);

        expect(component.checkVideoLike(id)).toBe(true);
    });

    it('toggleDescription() should change value "isShownDescription"', () => {
        component.isShownDescription = false;

        component.toggleDescription();

        expect(component.isShownDescription).toBe(true);
    });

    it('toggleSubscribe() should change value "isSubscribe"', () => {
        component.isSubscribe = false;

        component.toggleSubscribe();

        expect(component.isSubscribe).toBe(true);
    });
});
