import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppApiService implements HttpInterceptor {
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const key = `AIzaSyAOzEIMSEK7IhhpE9TdpisjUnSMz4LTAxc`;
        return next.handle(httpRequest.clone({ setParams: { key } }));
    }
}
