import { NgModule } from '@angular/core';

import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HistoryComponent],
    imports: [SharedModule, HistoryRoutingModule],
})
export class HistoryModule {}
