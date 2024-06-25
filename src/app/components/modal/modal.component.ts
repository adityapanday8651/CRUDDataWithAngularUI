import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isVisible = false;

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
