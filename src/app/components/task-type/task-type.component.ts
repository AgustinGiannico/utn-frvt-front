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
  paginatedTaskTypes: TaskType[] = [];
  taskTypeForm: FormGroup;
  selectedTaskType: TaskType | null = null;
  message: string | null = null;
  showForm: boolean = false;

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

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
      next: (taskTypes) => {
        this.taskTypes = taskTypes;
        this.updatePagination();
      },
      error: () => {
        this.message = 'Error al cargar los tipos de tareas';
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.taskTypes.length / this.itemsPerPage);
    this.updatePaginatedTaskTypes();
  }

  updatePaginatedTaskTypes(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTaskTypes = this.taskTypes.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTaskTypes();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTaskTypes();
    }
  }

  openCreateForm(): void {
    this.selectedTaskType = null;
    this.taskTypeForm.reset();
    this.showForm = true;
    this.message = null;
  }

  clearForm(): void {
    this.taskTypeForm.reset();
    this.selectedTaskType = null;
    this.showForm = false;
    this.message = null;
  }

  onSubmit(): void {
    if (this.taskTypeForm.valid) {
      this.selectedTaskType ? this.updateTaskType() : this.createTaskType();
    }
  }

  createTaskType(): void {
    this.taskTypeService.create(this.taskTypeForm.value).subscribe({
      next: (newTaskType) => {
        this.taskTypes.push(newTaskType);
        this.message = 'Tipo de tarea creado exitosamente';
        this.updatePagination();
        this.clearForm();
      },
      error: () => this.message = 'Error al crear el tipo de tarea'
    });
  }

  updateTaskType(): void {
    if (this.selectedTaskType) {
      this.taskTypeService.update(this.selectedTaskType.id_task_type, this.taskTypeForm.value).subscribe({
        next: (updatedTaskType) => {
          const index = this.taskTypes.findIndex(taskType => taskType.id_task_type === updatedTaskType.id_task_type);
          if (index !== -1) {
            this.taskTypes[index] = updatedTaskType;
          }
          this.message = 'Tipo de tarea actualizado exitosamente';
          this.updatePagination();
          this.clearForm();
        },
        error: () => this.message = 'Error al actualizar el tipo de tarea'
      });
    }
  }

  deleteTaskType(id: number): void {
    this.taskTypeService.delete(id).subscribe({
      next: () => {
        this.taskTypes = this.taskTypes.filter(taskType => taskType.id_task_type !== id);
        this.message = 'Tipo de tarea eliminado exitosamente';
        this.updatePagination();
      },
      error: () => this.message = 'Error al eliminar el tipo de tarea'
    });
  }

  editTaskType(taskType: TaskType): void {
    this.selectedTaskType = taskType;
    this.taskTypeForm.patchValue(taskType);
    this.showForm = true;
  }
}
