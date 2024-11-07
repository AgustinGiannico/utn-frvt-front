import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskListService } from '../../services/task-list.service';
import { TaskList } from '../../interfaces/task-list';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskLists: TaskList[] = [];
  taskListForm: FormGroup;

  constructor(private taskListService: TaskListService, private fb: FormBuilder) {
    this.taskListForm = this.fb.group({
      id_task_list: [null],
      id_asset_type: [null, Validators.required],
      id_task_type: [null, Validators.required],
      step_1: [0],
      step_2: [0],
      step_3: [0],
      step_4: [0],
      step_5: [0],
      step_6: [0],
      step_7: [0],
      step_8: [0],
      step_9: [0],
      step_10: [0]
    });
  }

  ngOnInit(): void {
    this.getAllTaskLists();
  }

  getAllTaskLists(): void {
    this.taskListService.getAll().subscribe({
      next: (taskLists) => this.taskLists = taskLists,
      error: (err) => console.error('Error fetching task lists:', err)
    });
  }

  getTaskListById(id: number): void {
    this.taskListService.getById(id).subscribe({
      next: (taskList) => this.taskListForm.patchValue(taskList),
      error: (err) => console.error('Error fetching task list:', err)
    });
  }

  createTaskList(): void {
    if (this.taskListForm.valid) {
      this.taskListService.create(this.taskListForm.value).subscribe({
        next: (newTaskList) => {
          this.taskLists.push(newTaskList);
          this.taskListForm.reset();
        },
        error: (err) => console.error('Error creating task list:', err)
      });
    }
  }

  updateTaskList(): void {
    if (this.taskListForm.valid && this.taskListForm.value.id_task_list) {
      this.taskListService.update(this.taskListForm.value.id_task_list, this.taskListForm.value).subscribe({
        next: (updatedTaskList) => {
          const index = this.taskLists.findIndex(taskList => taskList.id_task_list === updatedTaskList.id_task_list);
          if (index !== -1) {
            this.taskLists[index] = updatedTaskList;
          }
          this.taskListForm.reset();
        },
        error: (err) => console.error('Error updating task list:', err)
      });
    }
  }

  deleteTaskList(id: number): void {
    this.taskListService.delete(id).subscribe({
      next: () => this.taskLists = this.taskLists.filter(taskList => taskList.id_task_list !== id),
      error: (err) => console.error('Error deleting task list:', err)
    });
  }

  clearForm(): void {
    this.taskListForm.reset();
  }

  editTaskList(taskList: TaskList): void {
    this.taskListForm.patchValue(taskList);
  }
}
