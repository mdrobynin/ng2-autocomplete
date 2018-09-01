import { Component } from '@angular/core';
import { ISuggestedResult } from '../../interfaces/suggest-result.interface';
import { IDynamicComponentData } from '../../interfaces/dynamic-component-data.interface';

@Component({
    selector: 'app-search-result-item',
    templateUrl: './search-result-item.component.html',
    styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements IDynamicComponentData {
    item: ISuggestedResult;
    callback: (any: any) => any = (_: any) => {};

    constructor() {}

    public clickHandler(): void {
        this.callback(this.item);
    }
}
