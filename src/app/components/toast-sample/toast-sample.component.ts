import { Component, OnInit } from '@angular/core';
import { IDynamicComponentData } from '../../interfaces/dynamic-component-data.interface';

@Component({
    selector: 'app-toast-sample',
    templateUrl: './toast-sample.component.html',
    styleUrls: ['./toast-sample.component.scss']
})
export class ToastSampleComponent implements OnInit, IDynamicComponentData {
    public isVisible = false;
    public isBeforeDestroy = false;
    private _item: any;
    set item(item: any) {
        this._item = item;
        setTimeout(() => {
            this.isBeforeDestroy = true;
        }, item.delay - 100);
    }
    callback: (any: any) => any = (_: any) => {};

    ngOnInit(): void {
        setTimeout(() => {
            this.isVisible = true;
        });
    }

    public clickHandler(): void {
        this.callback(this._item);
    }
}
