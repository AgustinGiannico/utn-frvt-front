import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../interfaces/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  tags: Tag[] = [];
  paginatedTags: Tag[] = [];
  tagForm: FormGroup;
  selectedTag: Tag | null = null;
  message: string | null = null;
  showForm: boolean = false; // Agregado para controlar la visibilidad del formulario

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private tagService: TagService, private fb: FormBuilder) {
    this.tagForm = this.fb.group({
      id_tag: [null],
      final_tag: ['', Validators.required],
      asset_number: ['', Validators.required],
      id_edifice: [null, Validators.required],
      id_floor: [null, Validators.required],
      id_sector: [null, Validators.required],
      id_site: [null, Validators.required],
      id_asset_type: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags(): void {
    this.tagService.getAll().subscribe({
      next: (tags) => {
        this.tags = tags;
        this.updatePagination();
      },
      error: () => {
        this.message = 'Error al cargar los tags';
      }
    });
  }

  // Paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.tags.length / this.itemsPerPage);
    this.updatePaginatedTags();
  }

  updatePaginatedTags(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTags = this.tags.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTags();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTags();
    }
  }

  openCreateForm(): void {
    this.selectedTag = null;
    this.tagForm.reset();
    this.showForm = true;
    this.message = null;
  }

  clearForm(): void {
    this.tagForm.reset();
    this.selectedTag = null;
    this.showForm = false;
    this.message = null;
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      this.selectedTag ? this.updateTag() : this.createTag();
    }
  }

  createTag(): void {
    this.tagService.create(this.tagForm.value).subscribe({
      next: (newTag) => {
        this.tags.push(newTag);
        this.message = 'Tag creado exitosamente';
        this.updatePagination();
        this.clearForm();
      },
      error: () => this.message = 'Error al crear el tag'
    });
  }

  updateTag(): void {
    if (this.selectedTag) {
      this.tagService.update(this.selectedTag.id_tag, this.tagForm.value).subscribe({
        next: (updatedTag) => {
          const index = this.tags.findIndex(tag => tag.id_tag === updatedTag.id_tag);
          if (index !== -1) {
            this.tags[index] = updatedTag;
          }
          this.message = 'Tag actualizado exitosamente';
          this.updatePagination();
          this.clearForm();
        },
        error: () => this.message = 'Error al actualizar el tag'
      });
    }
  }

  deleteTag(id: number): void {
    this.tagService.delete(id).subscribe({
      next: () => {
        this.tags = this.tags.filter(tag => tag.id_tag !== id);
        this.message = 'Tag eliminado exitosamente';
        this.updatePagination();
      },
      error: () => this.message = 'Error al eliminar el tag'
    });
  }

  editTag(tag: Tag): void {
    this.selectedTag = tag;
    this.tagForm.patchValue(tag);
    this.showForm = true;
  }
}
