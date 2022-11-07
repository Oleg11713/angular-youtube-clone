import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from './search/search.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppApiService } from './app-api.service';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        MatIconModule,
        SearchModule,
        SharedModule,
        FormsModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatAutocompleteModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppApiService, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
