import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { IDynamicComponentData, IToastData } from '../../interfaces/dynamic-component-data.interface';
import { ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-toast-wrapper',
    templateUrl: './toast-wrapper.component.html',
    styleUrls: ['./toast-wrapper.component.scss']
})
export class ToastWrapperComponent implements OnInit, OnDestroy {
    private _subs: Subscription[] = [];
    @ViewChild('toastWrapper', {read: ViewContainerRef}) public toastsContainer: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private toastService: ToastService) { }

    ngOnInit() {
        this._subscribeToToasts();
    }

    private _subscribeToToasts(): void {
        this.toastService.toasts.subscribe((toast: IToastData) => {
            if (toast) {
                this._createComponent(toast);
            }
        });
    }

    private _createComponent(toast: IToastData): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(toast.component);
        const componentRef = this.toastsContainer.createComponent(componentFactory);
        (<IDynamicComponentData> componentRef.instance).item = toast.data.item;
        (<IDynamicComponentData> componentRef.instance).callback = toast.data.callback;

        setTimeout(() => {
            componentRef.destroy();
        }, toast.delay);
    }

    ngOnDestroy(): void {
        this._subs.forEach(sub => sub.unsubscribe());
    }
}
