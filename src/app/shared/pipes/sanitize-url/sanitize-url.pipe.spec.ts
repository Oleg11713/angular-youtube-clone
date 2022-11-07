import { DomSanitizer } from '@angular/platform-browser';
import { getTestBed, TestBed } from '@angular/core/testing';

import { SanitizeUrlPipe } from './sanitize-url.pipe';

describe('SanitizeUrlPipe', () => {
    let injector;
    let pipe: SanitizeUrlPipe;
    let sanitizer: DomSanitizer;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [SanitizeUrlPipe],
        });
        await TestBed.compileComponents();

        injector = getTestBed();
        sanitizer = injector.get(DomSanitizer);
        pipe = injector.get(SanitizeUrlPipe);
    });

    it('create an instance', () => {
        pipe = new SanitizeUrlPipe(sanitizer);
        expect(pipe).toBeTruthy();
    });

    it('sanitize url sanitize-url should return Safe resource url', () => {
        const id = 'qjoz-CAO3xQ';
        const trustedResourceUrl = 'https://www.youtube.com/embed/qjoz-CAO3xQ';

        spyOn(sanitizer, 'bypassSecurityTrustResourceUrl');
        pipe.transform(id);
        expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
            trustedResourceUrl
        );
    });
});
