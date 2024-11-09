import { Component, OnInit } from '@angular/core';
import { EdificeService } from '../../services/edifice.service';
import { Edifice } from '../../interfaces/edifice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edifice',
  templateUrl: './edifice.component.html',
  styleUrls: ['./edifice.component.css']
})
export class EdificeComponent implements OnInit {
  edifices: Edifice[] = [];
  message: string | null = null;
  selectedEdifice: Edifice | null = null;
  showForm: boolean = false;
  edificeForm: FormGroup;

  constructor(
    private edificeService: EdificeService,
    private fb: FormBuilder
  ) {
    this.edificeForm = this.fb.group({
      name: ['', Validators.required],
      num_tag: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      id_location: ['', Validators.required],
      id_province: ['', Validators.required],
      id_available: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllEdifices();
  }

  // Cargar todos los edificios
  getAllEdifices(): void {
    this.edificeService.getAll().subscribe({
      next: (data) => {
        this.edifices = data;
        console.log('Edifices Loaded:', this.edifices); // Verificar que los edificios se cargan correctamente
      },
      error: (error) => {
        this.message = `Error fetching data: ${error}`;
      }
    });
  }

  // Obtener un edificio específico y cargar sus datos en el formulario
  getEdificeById(id: number): void {
    this.edificeService.getById(id).subscribe({
      next: (edifice: Edifice) => {
        this.selectedEdifice = edifice;
        this.edificeForm.patchValue({
          name: edifice.name,
          num_tag: edifice.num_tag,
          street: edifice.street,
          number: edifice.number,
          id_location: edifice.id_location,
          id_province: edifice.id_province,
          id_available: edifice.id_available
        });
        this.showForm = true;
      },
      error: (err) => {
        console.error('Error fetching edifice by id:', err);
        this.message = 'Error loading edifice.';
      }
    });
  }

  openCreateForm(): void {
    this.selectedEdifice = null;  // Reset selected edifice for creating a new one
    this.edificeForm.reset();     // Reset form fields
    this.showForm = true;         // Show the form for creating a new Edifice
  }

  clearForm(): void {
    this.edificeForm.reset();
    this.selectedEdifice = null;
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.edificeForm.valid) {
      if (this.selectedEdifice) {
        // Update logic
        this.edificeService.update(this.selectedEdifice.id_edifice, this.edificeForm.value).subscribe({
          next: () => {
            this.message = 'Edifice updated successfully';
            this.getAllEdifices();  // Reload the edifices
            this.clearForm();
          },
          error: (err) => {
            this.message = 'Error updating edifice';
          }
        });
      } else {
        // Create logic
        this.edificeService.create(this.edificeForm.value).subscribe({
          next: () => {
            this.message = 'Edifice created successfully';
            this.getAllEdifices();  // Reload the edifices
            this.clearForm();
          },
          error: (err) => {
            this.message = 'Error creating edifice';
          }
        });
      }
    }
  }

  deleteEdifice(id: number): void {
    this.edificeService.delete(id).subscribe({
      next: () => {
        this.message = 'Edifice deleted successfully';
        this.getAllEdifices();  // Reload the list after deletion
      },
      error: (err) => {
        this.message = 'Error deleting edifice';
      }
    });
  }
}
