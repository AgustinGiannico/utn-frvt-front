import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id_task: [null],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAll().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  getTaskById(id: number): void {
    this.taskService.getById(id).subscribe({
      next: (task) => this.taskForm.patchValue(task),
      error: (err) => console.error('Error fetching task:', err)
    });
  }

  createTask(): void {
    if (this.taskForm.valid) {
      this.taskService.create(this.taskForm.value).subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
          this.taskForm.reset();
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }

  updateTask(): void {
    if (this.taskForm.valid && this.taskForm.value.id_task) {
      this.taskService.update(this.taskForm.value.id_task, this.taskForm.value).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(task => task.id_task === updatedTask.id_task);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.taskForm.reset();
        },
        error: (err) => console.error('Error updating task:', err)
      });
    }
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => this.tasks = this.tasks.filter(task => task.id_task !== id),
      error: (err) => console.error('Error deleting task:', err)
    });
  }

  clearForm(): void {
    this.taskForm.reset();
  }

  editTask(task: Task): void {
    this.taskForm.patchValue(task);
  }
}
