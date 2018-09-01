import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { AutocompleteFieldComponent } from './autocomplete-field/autocomplete-field.component';
import { ToastWrapperComponent } from './toast-wrapper/toast-wrapper.component';
import { ToastSampleComponent } from './toast-sample/toast-sample.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        SearchResultItemComponent,
        AutocompleteFieldComponent,
        ToastWrapperComponent,
        ToastSampleComponent
    ],
    exports: [
        SearchResultItemComponent,
        AutocompleteFieldComponent,
        ToastWrapperComponent,
        ToastSampleComponent
    ],
    entryComponents: [
        SearchResultItemComponent,
        ToastSampleComponent
    ]
})
export class ComponentsModule { }
