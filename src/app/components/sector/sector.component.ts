import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { Sector } from '../../interfaces/sector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  sectors: Sector[] = [];
  paginatedSectors: Sector[] = [];
  sectorForm: FormGroup;
  message: string | null = null;
  showForm: boolean = false;
  selectedSector: Sector | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private sectorService: SectorService, private formBuilder: FormBuilder) {
    this.sectorForm = this.formBuilder.group({
      id_sector: [null],
      name: ['', Validators.required],
      num_tag: ['', Validators.required],
      id_available: [null, Validators.required],
      available: ['']
    });
  }

  ngOnInit(): void {
    this.getAllSectors();
  }

  getAllSectors(): void {
    this.sectorService.getAll().subscribe({
      next: (data) => {
        this.sectors = data;
        this.updatePagination();
      },
      error: () => this.message = 'Error al cargar los sectores.'
    });
  }

  openCreateForm(): void {
    this.selectedSector = null;
    this.sectorForm.reset();
    this.showForm = true;
  }

  onSubmit(): void {
    if (this.sectorForm.valid) {
      this.selectedSector ? this.updateSector() : this.createSector();
    }
  }

  createSector(): void {
    this.sectorService.create(this.sectorForm.value).subscribe({
      next: (newSector) => {
        this.sectors.push(newSector);
        this.updatePagination();
        this.clearForm();
        this.message = 'Sector creado exitosamente.';
      },
      error: () => this.message = 'Error al crear el sector.'
    });
  }

  updateSector(): void {
    if (this.selectedSector) {
      this.sectorService.update(this.selectedSector.id_sector, this.sectorForm.value).subscribe({
        next: (updatedSector) => {
          const index = this.sectors.findIndex(sector => sector.id_sector === updatedSector.id_sector);
          if (index !== -1) this.sectors[index] = updatedSector;
          this.updatePagination();
          this.clearForm();
          this.message = 'Sector actualizado exitosamente.';
        },
        error: () => this.message = 'Error al actualizar el sector.'
      });
    }
  }

  deleteSector(id: number): void {
    this.sectorService.delete(id).subscribe({
      next: () => {
        this.sectors = this.sectors.filter(sector => sector.id_sector !== id);
        this.updatePagination();
        this.message = 'Sector eliminado exitosamente.';
      },
      error: () => this.message = 'Error al eliminar el sector.'
    });
  }

  editSector(sector: Sector): void {
    this.selectedSector = sector;
    this.sectorForm.patchValue(sector);
    this.showForm = true;
  }

  clearForm(): void {
    this.sectorForm.reset();
    this.selectedSector = null;
    this.showForm = false;
    this.message = null;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.sectors.length / this.itemsPerPage);
    this.updatePaginatedSectors();
  }

  updatePaginatedSectors(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedSectors = this.sectors.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedSectors();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedSectors();
    }
  }
}
