import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
    let component: CommentsComponent;
    let fixture: ComponentFixture<CommentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [CommentsComponent],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('addCommentLike() should add "like"', () => {
        component.commentLike = {};
        const id = 'asd';

        component.addCommentLike(id);

        expect(component.commentLike[id]).toBe(true);
    });

    it('addCommentDislike() should add "dislike"', () => {
        component.commentDislike = {};
        const id = 'asd';

        component.addCommentDislike(id);

        expect(component.commentDislike[id]).toBe(true);
    });

    it('checkCommentDislike() should check does comment contains "dislike"', () => {
        component.commentDislike = {};
        const id = 'asd';

        component.addCommentDislike(id);

        expect(component.checkCommentDislike(id)).toBe(true);
    });

    it('checkCommentLike() should check does comment contains "like"', () => {
        component.commentLike = {};
        const id = 'asd';

        component.addCommentLike(id);

        expect(component.checkCommentLike(id)).toBe(true);
    });

    it('showReplyInput() should change value "isReplyActive" to true', () => {
        component.isReplyActive = false;

        component.showReplyInput();

        expect(component.isReplyActive).toBe(true);
    });
});
