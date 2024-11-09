import { Component, OnInit } from '@angular/core'; 
import { FloorService } from '../../services/floor.service';
import { Floor } from '../../interfaces/floor';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  floors: Floor[] = [];
  selectedFloor: Floor | null = null;
  floorForm: Floor = { id_floor: 0, name: '', num_tag: '', id_available: 1, available: '' };
  editMode: boolean = false;
  creatingFloor: boolean = false;
  message: string | null = null;

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.getAllFloors();
  }

  getAllFloors(): void {
    this.floorService.getAll().subscribe({
      next: (data) => this.floors = data,
      error: () => this.message = 'Error al cargar los pisos.'
    });
  }

  getFloorById(id: number): void {
    this.floorService.getById(id).subscribe({
      next: (data) => {
        this.selectedFloor = data;
        this.editMode = false;
      },
      error: () => this.message = `Error al obtener el piso con ID ${id}.`
    });
  }

  createFloor(): void {
    this.floorService.create(this.floorForm).subscribe({
      next: (data) => {
        this.floors.push(data);
        this.clearForm();
        this.message = 'Piso creado exitosamente.';
      },
      error: () => this.message = 'Error al crear el piso.'
    });
  }

  updateFloor(): void {
    if (this.selectedFloor) {
      this.floorService.update(this.selectedFloor.id_floor, this.floorForm).subscribe({
        next: (data) => {
          this.floors = this.floors.map(f => f.id_floor === data.id_floor ? data : f);
          this.clearForm();
          this.message = 'Piso actualizado exitosamente.';
        },
        error: () => this.message = 'Error al actualizar el piso.'
      });
    }
  }

  deleteFloor(id: number): void {
    this.floorService.delete(id).subscribe({
      next: () => {
        this.floors = this.floors.filter(f => f.id_floor !== id);
        this.message = 'Piso eliminado exitosamente.';
      },
      error: () => this.message = `Error al eliminar el piso con ID ${id}.`
    });
  }

  selectFloorForEdit(floor: Floor): void {
    this.selectedFloor = { ...floor };
    this.floorForm = { ...floor };
    this.editMode = true;
  }

  clearForm(): void {
    this.selectedFloor = null;
    this.floorForm = { id_floor: 0, name: '', num_tag: '', id_available: 1, available: '' };
    this.editMode = false;
    this.creatingFloor = false;
  }

  openCreateForm(): void {
    this.clearForm();
    this.creatingFloor = true;
  }
  
}
