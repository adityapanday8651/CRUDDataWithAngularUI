import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  showSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  showError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 1500,
      timerProgressBar: true,
    });
  }

  showInfo(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
