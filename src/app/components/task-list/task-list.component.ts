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
  paginatedTaskLists: TaskList[] = [];
  taskListForm: FormGroup;
  message: string | null = null;
  showForm: boolean = false;
  selectedTaskList: TaskList | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  steps = [
    { label: 'Paso 1', field: 'step_1' as keyof TaskList },
    { label: 'Paso 2', field: 'step_2' as keyof TaskList },
    { label: 'Paso 3', field: 'step_3' as keyof TaskList },
    { label: 'Paso 4', field: 'step_4' as keyof TaskList },
    { label: 'Paso 5', field: 'step_5' as keyof TaskList },
    { label: 'Paso 6', field: 'step_6' as keyof TaskList },
    { label: 'Paso 7', field: 'step_7' as keyof TaskList },
    { label: 'Paso 8', field: 'step_8' as keyof TaskList },
    { label: 'Paso 9', field: 'step_9' as keyof TaskList },
    { label: 'Paso 10', field: 'step_10' as keyof TaskList }
  ];

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
      next: (taskLists) => {
        console.log("Task Lists received:", taskLists);  // Verificar aquí
        this.taskLists = taskLists;
        this.updatePagination();
      },
      error: (err) => console.error('Error fetching task lists:', err)
    });
}

  openCreateForm(): void {
    this.selectedTaskList = null;
    this.taskListForm.reset();
    this.showForm = true;
  }

  clearForm(): void {
    this.taskListForm.reset();
    this.selectedTaskList = null;
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.taskListForm.valid) {
      this.selectedTaskList ? this.updateTaskList() : this.createTaskList();
    }
  }

  createTaskList(): void {
    this.taskListService.create(this.taskListForm.value).subscribe({
      next: (newTaskList) => {
        this.taskLists.push(newTaskList);
        this.updatePagination();
        this.clearForm();
        this.message = 'Lista de tareas creada exitosamente';
      },
      error: (err) => this.message = 'Error al crear la lista de tareas'
    });
  }

  updateTaskList(): void {
    this.taskListService.update(this.taskListForm.value.id_task_list, this.taskListForm.value).subscribe({
      next: (updatedTaskList) => {
        const index = this.taskLists.findIndex(taskList => taskList.id_task_list === updatedTaskList.id_task_list);
        if (index !== -1) this.taskLists[index] = updatedTaskList;
        this.updatePagination();
        this.clearForm();
        this.message = 'Lista de tareas actualizada exitosamente';
      },
      error: (err) => this.message = 'Error al actualizar la lista de tareas'
    });
  }

  deleteTaskList(id: number): void {
    this.taskListService.delete(id).subscribe({
      next: () => {
        this.taskLists = this.taskLists.filter(taskList => taskList.id_task_list !== id);
        this.updatePagination();
        this.message = 'Lista de tareas eliminada exitosamente';
      },
      error: (err) => this.message = 'Error al eliminar la lista de tareas'
    });
  }

  editTaskList(taskList: TaskList): void {
    this.selectedTaskList = taskList;
    this.taskListForm.patchValue(taskList);
    this.showForm = true;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.taskLists.length / this.itemsPerPage);
    this.updatePaginatedTaskLists();
  }

  updatePaginatedTaskLists(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTaskLists = this.taskLists.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTaskLists();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTaskLists();
    }
  }
}
