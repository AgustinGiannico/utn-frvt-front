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
  selectedSector: Sector | null = null;
  sectorForm: FormGroup;

  constructor(private sectorService: SectorService, private formBuilder: FormBuilder) {
    this.sectorForm = this.formBuilder.group({
      id_sector: [null],
      name: ['', Validators.required],
      num_tag: ['', Validators.required],
      id_available: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSectors();
  }

  getAllSectors(): void {
    this.sectorService.getAll().subscribe({
      next: (data) => this.sectors = data,
      error: (err) => console.error('Error fetching sectors:', err)
    });
  }

  getSectorById(id: number): void {
    this.sectorService.getById(id).subscribe({
      next: (data) => this.selectedSector = data,
      error: (err) => console.error('Error fetching sector by ID:', err)
    });
  }

  createSector(): void {
    if (this.sectorForm.valid) {
      this.sectorService.create(this.sectorForm.value).subscribe({
        next: (newSector) => {
          this.sectors.push(newSector);
          this.sectorForm.reset();
        },
        error: (err) => console.error('Error creating sector:', err)
      });
    }
  }

  updateSector(): void {
    if (this.sectorForm.valid && this.sectorForm.value.id_sector) {
      this.sectorService.update(this.sectorForm.value.id_sector, this.sectorForm.value).subscribe({
        next: (updatedSector) => {
          const index = this.sectors.findIndex(sector => sector.id_sector === updatedSector.id_sector);
          if (index !== -1) {
            this.sectors[index] = updatedSector;
          }
          this.sectorForm.reset();
        },
        error: (err) => console.error('Error updating sector:', err)
      });
    }
  }

  deleteSector(id: number): void {
    this.sectorService.delete(id).subscribe({
      next: () => {
        this.sectors = this.sectors.filter(sector => sector.id_sector !== id);
      },
      error: (err) => console.error('Error deleting sector:', err)
    });
  }

  editSector(sector: Sector): void {
    this.sectorForm.patchValue(sector);
  }

  clearForm(): void {
    this.sectorForm.reset();
    this.selectedSector = null;
  }
}
