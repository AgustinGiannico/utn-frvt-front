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
  newFloor: Floor = {
    id_floor: 0,
    name: '',
    num_tag: '',
    id_available: 1
  };
  editMode: boolean = false;

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.getAllFloors();
  }

  getAllFloors(): void {
    this.floorService.getAll().subscribe({
      next: (data) => this.floors = data,
      error: (error) => console.error('Error fetching floors:', error)
    });
  }

  getFloorById(id: number): void {
    this.floorService.getById(id).subscribe({
      next: (data) => this.selectedFloor = data,
      error: (error) => console.error(`Error fetching floor with ID ${id}:`, error)
    });
  }

  createFloor(): void {
    this.floorService.create(this.newFloor).subscribe({
      next: (data) => {
        this.floors.push(data);
        this.newFloor = { id_floor: 0, name: '', num_tag: '', id_available: 1 };
      },
      error: (error) => console.error('Error creating floor:', error)
    });
  }

  updateFloor(): void {
    if (this.selectedFloor) {
      this.floorService.update(this.selectedFloor.id_floor, this.selectedFloor).subscribe({
        next: (data) => {
          this.floors = this.floors.map(f => f.id_floor === data.id_floor ? data : f);
          this.editMode = false;
          this.selectedFloor = null;
        },
        error: (error) => console.error('Error updating floor:', error)
      });
    }
  }

  deleteFloor(id: number): void {
    this.floorService.delete(id).subscribe({
      next: () => this.floors = this.floors.filter(f => f.id_floor !== id),
      error: (error) => console.error(`Error deleting floor with ID ${id}:`, error)
    });
  }

  selectFloorForEdit(floor: Floor): void {
    this.selectedFloor = { ...floor };
    this.editMode = true;
  }

  cancelEdit(): void {
    this.selectedFloor = null;
    this.editMode = false;
  }
}
