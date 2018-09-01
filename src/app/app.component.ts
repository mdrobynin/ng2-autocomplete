import { Component } from '@angular/core';
import { ISuggestedResult } from './interfaces/suggest-result.interface';
import { SearchResultItemComponent } from './components/search-result-item/search-result-item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public options: ISuggestedResult[] = [
        {
            id: 'id1',
            name: 'name1'
        },
        {
            id: 'id2',
            name: 'name2'
        },
        {
            id: 'id3',
            name: 'name3'
        },
        {
            id: 'id4',
            name: 'name4'
        },
        {
            id: 'id5',
            name: 'name5'
        },
    ];

    public get optionRowComponent(): any {
        return SearchResultItemComponent;
    }

    public handler(event: any): void {
        console.log(event);
    }
}
