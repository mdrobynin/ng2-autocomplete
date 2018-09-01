import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToastData } from '../interfaces/dynamic-component-data.interface';
import { ToastSampleComponent } from '../components/toast-sample/toast-sample.component';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private _toasts: BehaviorSubject<IToastData> = new BehaviorSubject<IToastData>(null);

    public get toasts(): Observable<IToastData> {
        return this._toasts.asObservable();
    }

    showSampleToast(delay: number = 3000) {
        this._toasts.next({
            delay,
            component: ToastSampleComponent,
            data: {
                item: { delay },
                callback: (event) => { console.log(event); }
            }
        });
    }

    showSuccessToast(delay: number = 5000) {

    }

    showWarningToast(delay: number = 5000) {

    }

    showErrorToast(delay: number = 5000) {

    }

    showSuccessFeedbackSnackbar( delay: number = 5000): void {

    }

    showErrorFeedbackSnackbar(delay: number = 5000): void {

    }
}
