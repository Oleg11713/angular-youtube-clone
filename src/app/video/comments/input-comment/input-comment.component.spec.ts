import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCommentComponent } from './input-comment.component';

describe('InputCommentComponent', () => {
    let component: InputCommentComponent;
    let fixture: ComponentFixture<InputCommentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputCommentComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InputCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('showAddCommentButtons() should change value "isAddCommentButtonsActive" to true', () => {
        component.isAddCommentButtonsActive = false;

        component.showAddCommentButtons();

        expect(component.isAddCommentButtonsActive).toBe(true);
    });

    it('hideAddCommentButtons() should change value "isAddCommentButtonsActive" to false and clear input text', () => {
        component.isAddCommentButtonsActive = true;
        component.myText = 'Random text';
        component.operation = 'comment';

        component.hideAddCommentButtons();

        expect(component.isAddCommentButtonsActive).toBe(false);
        expect(component.myText).toBe('');
    });

    it('should have the correct operation', () => {
        component.operation = 'comment';

        expect(component.operation).toEqual('comment');
    });
});
