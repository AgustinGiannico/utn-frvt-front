import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../services/site.service';
import { Site } from '../../interfaces/site';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  sites: Site[] = [];
  message: string | null = null;
  selectedSite: Site | null = null;
  showForm: boolean = false;
  siteForm: FormGroup;

  constructor(private siteService: SiteService, private fb: FormBuilder) {
    this.siteForm = this.fb.group({
      name: ['', Validators.required],
      num_tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSites();
  }

  getAllSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => {
        this.sites = data;
      },
      error: (err) => {
        this.message = 'Error al cargar los sitios';
      }
    });
  }

  getSiteById(id: number): void {
    this.siteService.getById(id).subscribe({
      next: (site: Site) => {
        this.selectedSite = site;
        this.siteForm.patchValue({
          name: site.name,
          num_tag: site.num_tag
        });
        this.showForm = true;
      },
      error: (err) => {
        this.message = 'Error al cargar el sitio';
      }
    });
  }

  openCreateForm(): void {
    this.selectedSite = null;
    this.siteForm.reset();
    this.showForm = true;
  }

  clearForm(): void {
    this.siteForm.reset();
    this.selectedSite = null;
    this.showForm = false;
  }

  onSubmit(): void {
    if (this.siteForm.valid) {
      this.selectedSite ? this.updateSite() : this.createSite();
    }
  }

  createSite(): void {
    this.siteService.create(this.siteForm.value).subscribe({
      next: () => {
        this.message = 'Sitio creado correctamente';
        this.getAllSites();
        this.clearForm();
      },
      error: (err) => {
        this.message = 'Error al crear el sitio';
      }
    });
  }

  updateSite(): void {
    if (this.selectedSite) {
      this.siteService.update(this.selectedSite.id_site, this.siteForm.value).subscribe({
        next: () => {
          this.message = 'Sitio actualizado correctamente';
          this.getAllSites();
          this.clearForm();
        },
        error: (err) => {
          this.message = 'Error al actualizar el sitio';
        }
      });
    }
  }

  deleteSite(id: number): void {
    this.siteService.delete(id).subscribe({
      next: () => {
        this.message = 'Sitio eliminado correctamente';
        this.getAllSites();
      },
      error: (err) => {
        this.message = 'Error al eliminar el sitio';
      }
    });
  }
}
