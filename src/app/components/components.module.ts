import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { AutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        SearchResultItemComponent,
        AutocompleteFieldComponent
    ],
    exports: [
        SearchResultItemComponent,
        AutocompleteFieldComponent
    ],
    entryComponents: [
        SearchResultItemComponent
    ]
})
export class ComponentsModule { }
