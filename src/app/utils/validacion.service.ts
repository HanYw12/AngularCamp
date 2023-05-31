import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

    //alertas
    public Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      color:'white',
      customClass: {
        container: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
}
