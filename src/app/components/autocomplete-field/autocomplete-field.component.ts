import {
    Component,
    OnInit,
    Input,
    forwardRef,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    HostListener,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';
import {
    Validators,
    AbstractControl,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    ControlValueAccessor,
    Validator,
    FormControl,
    ValidatorFn
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAutocompleteItem } from '../../interfaces/autocomplete-item.interface';

@Component({
    selector: 'app-autocomplete-field',
    templateUrl: './autocomplete-field.component.html',
    styleUrls: ['./autocomplete-field.component.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutocompleteFieldComponent),
        multi: true
      },
      {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => AutocompleteFieldComponent),
        multi: true
      }
    ],
    encapsulation: ViewEncapsulation.None
})
export class AutocompleteFieldComponent
    implements OnInit, ControlValueAccessor, Validator, OnDestroy, OnChanges {
    @Input() public options: any[];
    @Input() public optionRowComponent: any;
    @Input() public canBeArbitrary: boolean;
    @Input() public isOptionsFiltering: boolean;
    @Output() public focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() public blur: EventEmitter<void> = new EventEmitter<void>();
    @Output() public optionSelected: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('autocompleteFieldContainer', {read: ViewContainerRef}) public autocompleteFieldContainer: ViewContainerRef;
    @ViewChild('optionsContainer', {read: ViewContainerRef}) public optionsContainer: ViewContainerRef;

    public isFocused: boolean;
    public filteredOptions: any[];
    public currentValue: FormControl;
    public isOptionsVisible: boolean;
    private _subscriptions: Subscription[] = [];
    private _propagateChange = (_: any) => { };
    private _propagateTouch = (_: any) => { };

    @HostListener('document:click', ['$event'])
    public clickHandler(event: any) {
        this._onTouch(this.autocompleteFieldContainer.element.nativeElement.contains(event.target));
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.optionRowComponent && this.isOptionsFiltering) {
            throw new Error('Option filtering can not be performed while using custom row element');
        }
        this._initializeForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.options && changes.options.currentValue.length > 0) {
            this._setAvailableOptions();
        }
    }

    public validate(c: AbstractControl): { [key: string]: any } {
        return this.currentValue.valid
            ? null
            : this.currentValue.errors;
    }

    public writeValue(value: string): void {
        this.currentValue.setValue(value);
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._propagateTouch = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled
            ? this.currentValue.disable()
            : this.currentValue.enable();
    }

    public selectOption(selectedOption): void {
        if (selectedOption !== '<No matches>') {
            this.currentValue.setValue(selectedOption);
            this.optionSelected.emit(selectedOption);
        }
    }

    private _onTouch(focusedState: boolean) {
        const changed = this.isFocused !== focusedState;
        this.isFocused = focusedState;
        this.isFocused
            ? this.focus.emit()
            : this.blur.emit();

        if (changed) {
            this.isOptionsVisible = this.isFocused;
            this._forceDetectChanges();
            this._setAvailableOptions();
        }

        this._propagateTouch(this.currentValue.touched);
    }

    private _initializeForm(): void {
        const validators = [ Validators.required ];

        if (!this.canBeArbitrary) {
            validators.push(this._presentedInOptionsValidator());
        }
        this.currentValue = new FormControl('', validators);
        this._subscribeToValueChanges();
    }

    private _subscribeToValueChanges(): void {
        const sub = this.currentValue.valueChanges.subscribe((value: string) => {
            this._propagateChange(value);
            this._forceDetectChanges();
            this._setAvailableOptions();
        });

        this._subscriptions.push(sub);
    }

    private _setAvailableOptions(): void {
        this.isOptionsVisible
            ? this.optionRowComponent && this.optionsContainer
                ? this._fillOptionsContainerWithCustomComponents()
                : this._fillOptionsContainerWithStrings()
            : this._clearOptionsContainer();
    }

    private _fillOptionsContainerWithCustomComponents(): void {
        this.optionsContainer.clear();
        this.options.forEach(option => {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.optionRowComponent);
            const componentRef = this.optionsContainer.createComponent(componentFactory);

            (<IAutocompleteItem> componentRef.instance).item = option;
            (<IAutocompleteItem> componentRef.instance).callback = (res) => {
                this.optionSelected.emit(res);
                this.isOptionsVisible = false;
            };
        });
    }

    private _fillOptionsContainerWithStrings(): void {
        this.filteredOptions = this.isOptionsFiltering
            ? this.options.filter(option => option.toLowerCase().includes(this.currentValue ? this.currentValue.value.toLowerCase() : ''))
            : this.options;
    }

    private _clearOptionsContainer(): void {
        this.optionRowComponent && this.optionsContainer
            ? this.optionsContainer.clear()
            : this.filteredOptions = [];
    }

    private _presentedInOptionsValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const match = this.options.find(str => str === control.value);
            return !match ? { 'presentedInOptions': true } : null;
        };
    }

    private _forceDetectChanges(): void {
        if (!this.changeDetectorRef['destroyed']) {
            this.changeDetectorRef.detectChanges();
        }
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
