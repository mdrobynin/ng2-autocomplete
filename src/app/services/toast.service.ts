import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
    showDelayToast(text: string, delay: number) {
        this.toast(text, delay);
    }

    getToastHTML(text: string, title: string): string {
        return `<div class="content">
            <div class="title">${title}</div>
            <div class="text">${text}</div>
        </div>`;
    }

    getErrorSnackbarHTML(): string {
        return `<div class="error-snackbar">
            <div class="error-snackbar__icon">
                <i class="material-icons">
                    feedback
                </i>
            </div>
            <div class="error-snackbar__text">
                We couldn't send a feedback request. Something went wrong
            </div>
            <div class="error-snackbar__retry">
                Retry
            </div>
        </div>`;
    }

    getSuccessSnackbarHTML(fullName: string, avatar: string): string {
        return `<div class="success-snackbar">
            <div class="success-snackbar__icon">
                <i class="material-icons">
                    done
                </i>
            </div>
            <div class="success-snackbar__text">
                The feedback from
                <img src="${avatar}" class="success-snackbar__avatar">
                <div class="success-snackbar__full-name">${fullName}</div>
                has been requested successfully
            </div>
        </div>`;
    }

    showSuccessToast(text: string, title: string = 'Success!', delay: number = 5000) {
        this.toast(this.getToastHTML(text, title), delay, 'toast-designed toast-success');
    }

    showWarningToast(text: string, title: string = 'Warning!', delay: number = 5000) {
        this.toast(this.getToastHTML(text, title), delay, 'toast-designed toast-warning');
    }

    showErrorToast(text: string, title: string = 'Error', delay: number = 5000) {
        this.toast(this.getToastHTML(text, title), delay, 'toast-designed toast-error');
    }

    showSuccessFeedbackSnackbar(fullName: string, avatar: string, delay: number = 5000): void {
        this.toast(this.getSuccessSnackbarHTML(fullName, avatar), delay);
    }

    showErrorFeedbackSnackbar(delay: number = 5000): void {
        this.toast(this.getErrorSnackbarHTML(), delay);
    }

    private toast(...args: any[]) {
    }
}
