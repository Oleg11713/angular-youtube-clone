import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let mockRouter = {
        navigate: jasmine.createSpy('navigate'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [FormsModule, MatSnackBarModule, BrowserAnimationsModule, MatAutocompleteModule],
            providers: [{ provide: Router, useValue: mockRouter }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should pass the request to queryParams', () => {
        const testForm = <NgForm>{
            value: {
                search: 'cats',
            },
            valid: true,
        };
        component.submit(testForm);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/search-page'], {
            queryParams: { search_query: testForm.value.search },
        });
    });

    it('should called snackBar if request contains forbidden word', () => {
        const SnackBar = TestBed.inject(MatSnackBar);
        const mySpy = spyOn(SnackBar, 'open');
        const forbiddenWord = 'black';
        const testForm = <NgForm>{
            value: {
                search: forbiddenWord,
            },
            valid: true,
        };
        component.submit(testForm);
        expect(mySpy).toHaveBeenCalled();
        expect(mySpy).toHaveBeenCalledWith('FORBIDDEN WORD!!!', 'Close', {
            duration: 3000,
        });
    });
});
