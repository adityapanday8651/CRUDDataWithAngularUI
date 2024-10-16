import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public lstAllTasks: any[] = [];
  public tasksForm: FormGroup | any;

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    await this.getValidateForm();
    await this.getAllTasksAsync();
  }
  public async getAllTasksAsync() {
    this.spinner.show();
    await this.commonService.getAllTasksAsync().subscribe(response => {
      this.lstAllTasks = response.data;
      this.spinner.hide();
    },
      error => {
        console.error('Error fetching categories:', error);
      }
    )
  }

  open() {
    this.tasksForm.reset();
  }
  public async getValidateForm() {
    this.tasksForm = this.fb.group({
      taskId: [],
      taskName: ['', [Validators.required, Validators.minLength(3)]],
      deadline: ['', Validators.required],
      completed: [false],
      isActive: [true]
    });
  }

  get taskName() {
    return this.tasksForm.get('taskName');
  }

  get deadline() {
    return this.tasksForm.get('deadline');
  }

  isTaskNameInvalid(): boolean {
    const control = this.tasksForm.get('taskName');
    return control && control.invalid && (control.dirty || control.touched);
  }

  isDeadlineInvalid(): boolean {
    const control = this.tasksForm.get('deadline');
    return control && control.invalid && (control.dirty || control.touched);
  }

  public async editOpen(taskId: any) {
    await this.commonService.getTasksByIdAsync(taskId).subscribe(async response => {
      await this.patchValueForUpdateModelAsync(response);
    },
      error => {
        console.error('Error opening task modal:', error);
      }
    );
  }

  public async patchValueForUpdateModelAsync(response: any) {
    this.tasksForm.patchValue({
      taskId: response.data.taskId,
      taskName: response.data.taskName,
      deadline: response.data.deadline,
      completed: response.data.completed,
      isActive: response.data.isActive
    });
  }

  public async addTasksAsync() {
    if (this.tasksForm.valid) {
      await this.commonService.addTasksAsync(this.tasksForm.value).subscribe(response => {
        this.tasksForm.reset();
        this.getAllTasksAsync();
      },
        error => {
          console.error('Error save categories:', error);
        }
      );
    }
  }

  public async updateTasksAsync() {
    if (this.tasksForm.valid) {
      const taskId = this.tasksForm.value.taskId;
      const tasksDto = this.tasksForm.value;
      await this.commonService.updateTasksAsync(taskId, tasksDto).subscribe((response => {
        this.tasksForm.reset();
        this.getAllTasksAsync();
      }))
    }
  }


}
