import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  auditReportForm: FormGroup | any;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder

  ) { }
  async ngOnInit() {
    this.reactiveFormAuditReportForm();
  }

  public reactiveFormAuditReportForm() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10);
    this.auditReportForm = this.fb.group({
      reportId: [12345, [Validators.required, Validators.min(1)]],
      reportName: ['Audit Log Report', [Validators.required, Validators.minLength(5)]],
      generatedDate: [formattedDate, Validators.required],
      filters: this.fb.group({
        dateRange: this.fb.group({
          startDate: ['2024-01-01', Validators.required],
          endDate: [formattedDate, Validators.required]
        }),
        entityType: ['Request', [Validators.required, Validators.minLength(3)]],
        auditType: ['Pause', Validators.required]
      })
    });
  }

  createFilter(): FormGroup {
    return this.fb.group({
      dateRange: this.fb.group({
        startDate: ['2024-01-01', Validators.required],
        endDate: ['2024-09-19', Validators.required]
      }),
      entityType: ['Request', Validators.required],
      auditType: ['Pause', Validators.required]
    });
  }

  get filters(): FormArray {
    debugger;
    return this.auditReportForm.get('filters') as FormArray;
  }

  addFilter() {
    this.filters.push(this.createFilter());
  }

  removeFilter(index: number) {
    this.filters.removeAt(index);
  }

  onSubmit() {
    if (this.auditReportForm.valid) {
      console.log(this.auditReportForm.value);
    } else {
      this.auditReportForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  get reportId() { return this.auditReportForm.get('reportId'); }
  get reportName() { return this.auditReportForm.get('reportName'); }
  get generatedDate() { return this.auditReportForm.get('generatedDate'); }
  get startDate() { return this.auditReportForm.get('filters.dateRange.startDate'); }
  get endDate() { return this.auditReportForm.get('filters.dateRange.endDate'); }
  get entityType() { return this.auditReportForm.get('filters.entityType'); }
  get auditType() { return this.auditReportForm.get('filters.auditType'); }

  public async spinnerStart() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
