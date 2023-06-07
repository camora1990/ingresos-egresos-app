import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
 

  SwalNotification(
    text: string,
    title: string = 'Ooops',
    icon: 'error' | 'info' | 'success' = 'error'
  ) {
    return Swal.fire({
      position: 'bottom-right',
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  loading() {
    Swal.fire({
      title: 'Espere por favor..',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  close() {
    Swal.close();
  }
}
