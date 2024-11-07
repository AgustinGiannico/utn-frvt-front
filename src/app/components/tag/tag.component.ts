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
  tagForm: FormGroup;

  constructor(private tagService: TagService,private fb: FormBuilder) {
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
      next: (tags) => this.tags = tags,
      error: (err) => console.error('Error fetching tags:', err)
    });
  }

  getTagById(id: number): void {
    this.tagService.getById(id).subscribe({
      next: (tag) => this.tagForm.patchValue(tag),
      error: (err) => console.error('Error fetching tag:', err)
    });
  }

  createTag(): void {
    if (this.tagForm.valid) {
      this.tagService.create(this.tagForm.value).subscribe({
        next: (newTag) => {
          this.tags.push(newTag);
          this.tagForm.reset();
        },
        error: (err) => console.error('Error creating tag:', err)
      });
    }
  }

  updateTag(): void {
    if (this.tagForm.valid && this.tagForm.value.id_tag) {
      this.tagService.update(this.tagForm.value.id_tag, this.tagForm.value).subscribe({
        next: (updatedTag) => {
          const index = this.tags.findIndex(tag => tag.id_tag === updatedTag.id_tag);
          if (index !== -1) {
            this.tags[index] = updatedTag;
          }
          this.tagForm.reset();
        },
        error: (err) => console.error('Error updating tag:', err)
      });
    }
  }

  deleteTag(id: number): void {
    this.tagService.delete(id).subscribe({
      next: () => this.tags = this.tags.filter(tag => tag.id_tag !== id),
      error: (err) => console.error('Error deleting tag:', err)
    });
  }

  clearForm(): void {
    this.tagForm.reset();
  }

  editTag(tag: Tag): void {
    this.tagForm.patchValue(tag);
  }
}
