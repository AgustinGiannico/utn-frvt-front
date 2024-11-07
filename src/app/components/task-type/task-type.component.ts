import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskTypeService } from '../../services/task-type.service';
import { TaskType } from '../../interfaces/task-type';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css']
})
export class TaskTypeComponent implements OnInit {
  taskTypes: TaskType[] = [];
  taskTypeForm: FormGroup;

  constructor(private taskTypeService: TaskTypeService, private fb: FormBuilder) {
    this.taskTypeForm = this.fb.group({
      id_task_type: [null],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTaskTypes();
  }

  getAllTaskTypes(): void {
    this.taskTypeService.getAll().subscribe({
      next: (taskTypes) => this.taskTypes = taskTypes,
      error: (err) => console.error('Error fetching task types:', err)
    });
  }

  getTaskTypeById(id: number): void {
    this.taskTypeService.getById(id).subscribe({
      next: (taskType) => this.taskTypeForm.patchValue(taskType),
      error: (err) => console.error('Error fetching task type:', err)
    });
  }

  createTaskType(): void {
    if (this.taskTypeForm.valid) {
      this.taskTypeService.create(this.taskTypeForm.value).subscribe({
        next: (newTaskType) => {
          this.taskTypes.push(newTaskType);
          this.taskTypeForm.reset();
        },
        error: (err) => console.error('Error creating task type:', err)
      });
    }
  }

  updateTaskType(): void {
    if (this.taskTypeForm.valid && this.taskTypeForm.value.id_task_type) {
      this.taskTypeService.update(this.taskTypeForm.value.id_task_type, this.taskTypeForm.value).subscribe({
        next: (updatedTaskType) => {
          const index = this.taskTypes.findIndex(taskType => taskType.id_task_type === updatedTaskType.id_task_type);
          if (index !== -1) {
            this.taskTypes[index] = updatedTaskType;
          }
          this.taskTypeForm.reset();
        },
        error: (err) => console.error('Error updating task type:', err)
      });
    }
  }

  deleteTaskType(id: number): void {
    this.taskTypeService.delete(id).subscribe({
      next: () => this.taskTypes = this.taskTypes.filter(taskType => taskType.id_task_type !== id),
      error: (err) => console.error('Error deleting task type:', err)
    });
  }

  clearForm(): void {
    this.taskTypeForm.reset();
  }

  editTaskType(taskType: TaskType): void {
    this.taskTypeForm.patchValue(taskType);
  }
}
