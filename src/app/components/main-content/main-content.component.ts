import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<MainContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.minLength(3)]]
    });
  }


  isNameInvalid(): any {
    const nameControl = this.categoryForm.get('name');
    return nameControl?.invalid && (nameControl?.dirty || nameControl?.touched);
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value.name);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
