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
  selectedSite: Site | null = null;
  siteForm: FormGroup;

  constructor(private siteService: SiteService, private formBuilder: FormBuilder) {
    this.siteForm = this.formBuilder.group({
      id_site: [null],
      name: ['', Validators.required],
      num_tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSites();
  }

  getAllSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data,
      error: (err) => console.error('Error fetching sites:', err)
    });
  }

  getSiteById(id: number): void {
    this.siteService.getById(id).subscribe({
      next: (data) => this.selectedSite = data,
      error: (err) => console.error('Error fetching site by ID:', err)
    });
  }

  createSite(): void {
    if (this.siteForm.valid) {
      this.siteService.create(this.siteForm.value).subscribe({
        next: (newSite) => {
          this.sites.push(newSite);
          this.siteForm.reset();
        },
        error: (err) => console.error('Error creating site:', err)
      });
    }
  }

  updateSite(): void {
    if (this.siteForm.valid && this.siteForm.value.id_site) {
      this.siteService.update(this.siteForm.value.id_site, this.siteForm.value).subscribe({
        next: (updatedSite) => {
          const index = this.sites.findIndex(site => site.id_site === updatedSite.id_site);
          if (index !== -1) {
            this.sites[index] = updatedSite;
          }
          this.siteForm.reset();
        },
        error: (err) => console.error('Error updating site:', err)
      });
    }
  }

  deleteSite(id: number): void {
    this.siteService.delete(id).subscribe({
      next: () => {
        this.sites = this.sites.filter(site => site.id_site !== id);
      },
      error: (err) => console.error('Error deleting site:', err)
    });
  }

  editSite(site: Site): void {
    this.siteForm.patchValue(site);
  }

  clearForm(): void {
    this.siteForm.reset();
    this.selectedSite = null;
  }
}
