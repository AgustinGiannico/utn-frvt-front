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
  paginatedTasks: Task[] = [];
  taskForm: FormGroup;
  selectedTask: Task | null = null;
  message: string | null = null;
  showForm: boolean = false;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

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
      next: (tasks) => {
        this.tasks = tasks;
        this.updatePagination();
      },
      error: () => {
        this.message = 'Error al cargar las tareas';
      }
    });
  }

  // Paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.tasks.length / this.itemsPerPage);
    this.updatePaginatedTasks();
  }

  updatePaginatedTasks(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTasks();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
    }
  }

  openCreateForm(): void {
    this.selectedTask = null;
    this.taskForm.reset();
    this.showForm = true;
    this.message = null;
  }

  clearForm(): void {
    this.taskForm.reset();
    this.selectedTask = null;
    this.showForm = false;
    this.message = null;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.selectedTask ? this.updateTask() : this.createTask();
    }
  }

  createTask(): void {
    this.taskService.create(this.taskForm.value).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        this.message = 'Tarea creada exitosamente';
        this.updatePagination();
        this.clearForm();
      },
      error: () => this.message = 'Error al crear la tarea'
    });
  }

  updateTask(): void {
    if (this.selectedTask) {
      this.taskService.update(this.selectedTask.id_task, this.taskForm.value).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(task => task.id_task === updatedTask.id_task);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.message = 'Tarea actualizada exitosamente';
          this.updatePagination();
          this.clearForm();
        },
        error: () => this.message = 'Error al actualizar la tarea'
      });
    }
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id_task !== id);
        this.message = 'Tarea eliminada exitosamente';
        this.updatePagination();
      },
      error: () => this.message = 'Error al eliminar la tarea'
    });
  }

  editTask(task: Task): void {
    this.selectedTask = task;
    this.taskForm.patchValue(task);
    this.showForm = true;
  }
}
