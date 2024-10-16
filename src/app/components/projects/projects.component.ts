import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public getAllProjects: any[] = [];
  public getAllTasks: any[] = [];
  public projectsForm: FormGroup | any;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    this.initializeForm();
    await this.getAllTasksAsync();
    await this.getAllProjectsAsync();
  }


  // Initialize the form with validation
  initializeForm(): void {
    this.projectsForm = this.fb.group({
      projectId: [0], // hidden field for editing
      projectName: ['', Validators.required],
      status: ['', Validators.required],
      tasksId: [null],
      isActive: [true]
    });
  }
  public async patchValueForUpdateModelAsync(response: any) {
    this.projectsForm.patchValue({
      projectId: response.data.projectId,
      projectName: response.data.projectName,
      status: response.data.status,
      tasksId: response.data.tasksId,
      isActive: response.data.isActive
    });
  }

  // Validation checks
  isProjectNameInvalid(): boolean {
    const control = this.projectsForm.get('projectName');
    return control && control.invalid && (control.dirty || control.touched);
  }

  isStatusInvalid(): boolean {
    const control = this.projectsForm.get('status');
    return control && control.invalid && (control.dirty || control.touched);
  }

  
  get projectName() {
    return this.projectsForm.get('projectName');
  }

  get status() {
    return this.projectsForm.get('status');
  }

  get tasksId() {
    return this.projectsForm.get('tasksId');
  }

  public async getAllTasksAsync() {
    this.spinner.show();
    await this.commonService.getAllTasksAsync().subscribe(response => {
      this.getAllTasks = response.data;
      console.log("getAllTasksAsync Response  : ", this.getAllProjects);
      this.spinner.hide();
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }


  public async getAllProjectsAsync() {
    this.spinner.show();
    await this.commonService.getAllProjectsAsync().subscribe(response => {
      this.getAllProjects = response.data;
      console.log("getAllProjectsAsync Response  : ", this.getAllProjects);
      this.spinner.hide();
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }
  public async editOpen(projectId: any) {
    await this.commonService.getProjectsByIdAsync(projectId).subscribe(async response => {
      await this.patchValueForUpdateModelAsync(response);
    },
      error => {
        console.error('Error opening task modal:', error);
      }
    );
  }

  public async addProjectsAsync() {
    if (this.projectsForm.valid) {
      console.log("projectsForm : ", this.projectsForm.value);
      await this.commonService.addProjectsAsync(this.projectsForm.value).subscribe(response => {
        this.projectsForm.reset();
        this.getAllProjectsAsync();
      },
        error => {
          console.error('Error save categories:', error);
        }
      );
    }
  }

  public async updateProjectsAsync() {
    if (this.projectsForm.valid) {
      const projectId = this.projectsForm.value.projectId;
      const projectsDto = this.projectsForm.value;
      await this.commonService.updateProjectsAsync(projectId, projectsDto).subscribe((response => {
        this.projectsForm.reset();
        this.getAllProjectsAsync();
      }))
    }
  }

  open() {
    this.projectsForm.reset();
  }

}
