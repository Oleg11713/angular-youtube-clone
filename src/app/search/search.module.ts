import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SearchComponent } from './component/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [SearchComponent],
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        SharedModule,
        RouterModule
    ],
    exports: [SearchComponent],
})
export class SearchModule {}
