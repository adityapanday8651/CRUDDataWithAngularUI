import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  formsEmployeeDepartments: FormGroup | any;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {

    this.reactiveFormsEmployeeDepartments();
  }
  public reactiveFormsEmployeeDepartments() {
    this.formsEmployeeDepartments = this.formBuilder.group({
      company: this.formBuilder.group({
        name: ['Tech Innovators Inc.', Validators.required],
        location: ['New Works', Validators.required],
        departments: this.formBuilder.group({
          departmentId: [101, Validators.required],
          departmentName: ['Engineering', Validators.required],
          manager: this.formBuilder.group({
            managerId: [1001, Validators.required],
            managerName: ['Alice Johnson', Validators.required],
            email: ['alice.johnson@techinnovators.com', Validators.email],
            phone: ['+1-555-1234', Validators.required]
          }),
          employees: this.formBuilder.group({
            employeeId: [201, Validators.required],
            name: ['John Smith', Validators.required],
            position: ['Software Engineer', Validators.required],
            salary: [85000, Validators.required],
            hireDate: ['2020-03-15', Validators.required],
            address: this.formBuilder.group({
              street: ['123 Maple Street', Validators.required],
              city: ['Brooklyn', Validators.required],
              state: ['NY', Validators.required],
              zip: ['11201', Validators.required]
            })
          }),
          projects: this.formBuilder.group({
            projectId: [301, Validators.required],
            projectName: ['AI Assistant Development', Validators.required],
            status: ['In Progress', Validators.required],
            tasks: this.formBuilder.group({
              taskId: [401, Validators.required],
              taskName: ['Model Training', Validators.required],
              deadline: ['2024-10-01', Validators.required],
              completed: [false]
            })
          })
        })
      })
    })
  }

  onSubmit() {
    if (this.formsEmployeeDepartments.valid) {
      console.log("formsEmployeeDepartments Data : ",this.formsEmployeeDepartments.value);
    }
  }
}
