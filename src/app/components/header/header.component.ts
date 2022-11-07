import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderService } from './service/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public searchHistory: string[] = [];

    constructor(
        private _router: Router,
        private _headerService: HeaderService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.getSearchHistory();
    }

    public submit(form: NgForm): void {
        if (
            this._headerService.checkSearchQueryForBadWords(form.value.search)
        ) {
            this._snackBar.open('FORBIDDEN WORD!!!', 'Close', {
                duration: 3000,
            });
        } else if (form.valid) {
            if (!this.searchHistory.includes(form.value.search)) {
                this.searchHistory.push(form.value.search);
            }
            localStorage.setItem(
                'searchHistory',
                JSON.stringify(this.searchHistory)
            );
            this._router.navigate(['/search-page'], {
                queryParams: { search_query: form.value.search },
            });
        }
    }

    public getSearchHistory(): void {
        if (localStorage.getItem('searchHistory') !== null) {
            this.searchHistory = JSON.parse(
                localStorage.getItem('searchHistory')!
            );
        }
    }
}
