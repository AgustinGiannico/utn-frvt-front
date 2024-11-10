import { Component, OnInit } from '@angular/core';
import { OtService } from '../../services/ot.service';
import { TagService } from '../../services/tag.service';
import { UserService } from '../../services/user.service';
import { AssetTypeService } from 'src/app/services/asset-type.service';
import { EdificeService } from 'src/app/services/edifice.service';
import { FloorService } from 'src/app/services/floor.service';
import { SectorService } from 'src/app/services/sector.service';
import { SiteService } from 'src/app/services/site.service';
import { PriorityService } from 'src/app/services/priority.service';
import { TaskListOtService } from 'src/app/services/task-list-ot.service';
import { TaskTypeService } from 'src/app/services/task-type.service';
import { Ot } from '../../interfaces/ot';
import { User } from '../../interfaces/user';
import { AssetType } from '../../interfaces/asset-type';
import { Tag } from '../../interfaces/tag';
import { Priority } from '../../interfaces/priority';
import { Edifice } from '../../interfaces/edifice';
import { Floor } from '../../interfaces/floor';
import { Sector } from '../../interfaces/sector';
import { Site } from '../../interfaces/site';
import { TaskListOt } from '../../interfaces/task-list-ot';
import { TaskType } from '../../interfaces/task-type';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './crear-orden.component.html',
  styleUrls: ['./crear-orden.component.css']
})
export class CrearOrdenComponent implements OnInit {
  ordenes: Ot[] = [];
  users: User[] = [];
  assetTypes: AssetType[] = [];
  priorities: Priority[] = [];
  edifices: Edifice[] = [];
  sectors: Sector[] = [];
  sites: Site[] = [];
  floors: Floor[] = [];
  taskListsOt: TaskListOt[] = [];
  taskTypes: TaskType[] = [];
  allTags: Tag[] = [];
  tasks: Task[] = [];
  selectedOt: Ot | null = {
    id_ot: 0,
    order_number: '',
    request_date: new Date(),
    initial_date: new Date(),
    completion_date: new Date(),
    observations: '',
    id_user: 0,
    id_task_list: 0,
    id_priority: 0,
    id_ot_state: 0,
    id_tag: 0,
    id_task_type: 0
  };
  selectedTag?: string;
  selectedAssetTypeName?: string;
  selectedEdificeName?: string;
  selectedFloorName?: string;
  selectedSector?: string;
  selectedSite?: string;
  selectedTaskListSteps: string[] = []; // Lista de descripciones de tareas
  selectedPriority?: number;
  isEditing: boolean = false;

  constructor(
    private otService: OtService,
    private tagService: TagService,
    private userService: UserService,
    private assetTypeService: AssetTypeService,
    private priorityService: PriorityService,
    private edificeService: EdificeService,
    private floorService: FloorService,
    private sectorService: SectorService,
    private siteService: SiteService,
    private taskListOtService: TaskListOtService,
    private taskTypeService: TaskTypeService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getOrdenes();
    this.loadUsers();
    this.loadAssetTypes();
    this.loadPriorities();
    this.loadAllTags();
    this.loadEdifices();  // Carga de edifices
    this.loadFloors();
    this.loadSectors();
    this.loadSites();
    this.loadTaskLists();
    this.loadTasks();
    this.loadTaskTypes();
  }

  getOrdenes(): void {
    this.otService.getAll().subscribe(data => this.ordenes = data);
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  loadAssetTypes(): void {
    this.assetTypeService.getAll().subscribe(data => this.assetTypes = data);
  }

  loadPriorities(): void {
    this.priorityService.getAll().subscribe(data => this.priorities = data);
  }

  loadAllTags(): void {
    this.tagService.getAll().subscribe(tags => {
      this.allTags = tags;
    });
  }

  loadEdifices(): void {
    this.edificeService.getAll().subscribe({
      next: (data) => {
        this.edifices = data;
        console.log("Edifices Loaded:", this.edifices);
      },
      error: (err) => {
        console.error("Error al cargar los edificios:", err); // Manejo de error detallado
      }
    });
  }

  loadFloors(): void {
    this.floorService.getAll().subscribe(data => this.floors = data);
  }

  loadSectors(): void {
    this.sectorService.getAll().subscribe(data => this.sectors = data);
  }

  loadSites(): void {
    this.siteService.getAll().subscribe(data => this.sites = data);
  }

  loadTaskLists(): void {
    this.taskListOtService.getAll().subscribe({
      next: (data) => {
        this.taskListsOt = data;
        console.log("Task Lists Loaded:", this.taskListsOt); // Verificar toda la estructura
      },
      error: (err) => {
        console.error("Error al cargar las listas de tareas:", err);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe(data => {
      this.tasks = data;
      console.log("Tasks Loaded:", this.tasks);
    });
  }

  loadTaskTypes(): void {
    this.taskTypeService.getAll().subscribe(data => this.taskTypes = data);
  }

  getTaskDescription(taskId: number | null): string {
    const task = this.tasks.find(t => t.id_task === taskId);
    return task ? task.description : '';
  }

  onTagChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedTag = this.allTags.find(tag => tag.final_tag === target.value);
  
    if (selectedTag) {
      this.selectedOt!.id_tag = selectedTag.id_tag;
      this.selectedAssetTypeName = selectedTag.asset_type;
      this.selectedEdificeName = selectedTag.edifice;
      this.selectedFloorName = selectedTag.floor;
      this.selectedSector = selectedTag.sector;
      this.selectedSite = selectedTag.site;
  
      const assetType = this.assetTypes.find(type => type.name === this.selectedAssetTypeName);
      if (assetType) {
        this.selectedOt!.id_task_type = assetType.id_asset_type;
        console.log("Asset Type ID assigned:", assetType.id_asset_type);
      } else {
        console.warn("Asset Type ID not found for asset type:", this.selectedAssetTypeName);
      }
  
      // Llama a updateTaskList después de asignar el id_task_type
      this.updateTaskList();
    }
  }

  onTaskTypeChange(event: Event): void {
    this.updateTaskList();
  }

  updateTaskList(): void {
    if (this.selectedOt && this.selectedOt.id_tag && this.selectedOt.id_task_type) {
      const selectedTag = this.allTags.find(tag => tag.id_tag === this.selectedOt!.id_tag);
      if (selectedTag) {
        const assetTypeName = selectedTag.asset_type; // Nombre del tipo de activo
        const taskTypeId = String(this.selectedOt.id_task_type); // Convertir a string para la comparación
  
        console.log("Asset Type Name:", assetTypeName);
        console.log("Selected Task Type ID (as string):", taskTypeId);
  
        // Recorre los items de taskListsOt y muestra los valores para verificar coincidencias
        this.taskListsOt.forEach((list, index) => {
          console.log(`Item ${index} - asset_type_name: ${list.asset_type_name}, task_type_name: ${list.task_type_name}`);
        });
  
        // Encuentra el task list correspondiente basado en assetTypeName y taskTypeId
        const matchingTaskList = this.taskListsOt.find(
          list => list.asset_type_name === assetTypeName && String(list.task_type_name) === taskTypeId
        );
  
        console.log("Contenido de taskListsOt:", this.taskListsOt);
        console.log("Matching Task List:", matchingTaskList);
  
        if (matchingTaskList) {
          this.selectedOt!.id_task_list = matchingTaskList.id_task_list;
  
          // Asigna la lista de pasos de la tarea correspondiente
          this.selectedTaskListSteps = [
            this.getTaskDescription(matchingTaskList.step_1),
            this.getTaskDescription(matchingTaskList.step_2),
            this.getTaskDescription(matchingTaskList.step_3),
            this.getTaskDescription(matchingTaskList.step_4),
            this.getTaskDescription(matchingTaskList.step_5),
            this.getTaskDescription(matchingTaskList.step_6),
            this.getTaskDescription(matchingTaskList.step_7),
            this.getTaskDescription(matchingTaskList.step_8),
            this.getTaskDescription(matchingTaskList.step_9),
            this.getTaskDescription(matchingTaskList.step_10),
          ].filter((step): step is string => step !== '');
  
          console.log("Selected Task List Steps:", this.selectedTaskListSteps);
        } else {
          this.selectedTaskListSteps = [];
          console.log("No matching task list found for selected asset and task type.");
        }
      }
    }
  }
  
  
  createOrUpdateOt(): void {
    // Lógica para crear o actualizar la orden de trabajo
  }

  resetForm(): void {
    this.selectedOt = {
      id_ot: 0,
      order_number: '',
      request_date: new Date(),
      initial_date: new Date(),
      completion_date: new Date(),
      observations: '',
      id_user: 0,
      id_task_list: 0,
      id_priority: 0,
      id_ot_state: 0,
      id_tag: 0,
      id_task_type: 0,
    };
    this.isEditing = false;
    this.selectedAssetTypeName = '';
    this.selectedEdificeName = '';
    this.selectedFloorName = '';
    this.selectedSector = '';
    this.selectedSite = '';
    this.selectedTaskListSteps = [];
  }
}
