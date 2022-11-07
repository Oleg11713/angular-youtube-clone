import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-input-comment',
    templateUrl: './input-comment.component.html',
    styleUrls: ['./input-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCommentComponent implements OnInit {
    @Input() myText: string = '';
    @Input() operation: string = '';
    public isAddCommentButtonsActive: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public showAddCommentButtons(): void {
        this.isAddCommentButtonsActive = true;
    }

    public hideAddCommentButtons(): void {
        if (this.operation === 'comment') {
            this.isAddCommentButtonsActive = false;
            this.myText = '';
        }
    }
}
