import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeUrl',
})
export class SanitizeUrlPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}

    transform(value: string): SafeResourceUrl {
        const untrustedUrl = 'https://www.youtube.com/embed/' + value;
        return this._sanitizer.bypassSecurityTrustResourceUrl(untrustedUrl);
    }
}
