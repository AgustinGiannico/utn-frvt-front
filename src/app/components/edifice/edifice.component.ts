import { Component, OnInit } from '@angular/core';
import { EdificeService } from '../../services/edifice.service';
import { AddressService } from '../../services/address.service';
import { Edifice } from '../../interfaces/edifice';
import { Address } from '../../interfaces/address';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  addressCache: { [key: number]: string } = {};  // Cache para direcciones
  edificeForm: FormGroup;

  constructor(
    private edificeService: EdificeService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.edificeForm = this.fb.group({
      name: ['', Validators.required],
      num_tag: ['', Validators.required],
      id_address: ['', Validators.required],
      id_available: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllEdifices();
  }

  getAllEdifices(): void {
    this.edificeService.getAll().subscribe({
      next: (data) => {
        this.edifices = data;
        data.forEach(edifice => {
          if (edifice.id_address !== undefined && !this.addressCache[edifice.id_address]) {
            this.loadAddress(edifice.id_address);
          }
        });
      },
      error: (error) => {
        this.message = `Error fetching data: ${error}`;
      }
    });
  }

  loadAddress(id: number): void {
    this.addressService.getById(id).subscribe({
      next: (address: Address) => {
        this.addressCache[id] = `${address.street}, ${address.number}`;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading address:', err);
        this.addressCache[id] = 'Unknown Address';
        this.cdr.detectChanges();
      }
    });
  }

  getAddress(id: number): string {
    return this.addressCache[id] ? this.addressCache[id] : 'Unknown Address';
  }

  getEdificeById(id: number): void {
    this.edificeService.getById(id).subscribe({
      next: (edifice: Edifice) => {
        this.selectedEdifice = edifice;
        this.edificeForm.patchValue({
          name: edifice.name,
          num_tag: edifice.num_tag,
          id_address: edifice.id_address,
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
    this.edificeForm.reset();      // Reset form fields
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
