import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
  private modalSubject = new Subject<any>();
  modalState = this.modalSubject.asObservable();

  open() {
    this.modalSubject.next({ action: 'open' });
  }

  close() {
    this.modalSubject.next({ action: 'close' });
  }
}
