import { Component, OnInit } from '@angular/core';
import { AssetTypeService } from '../../services/asset-type.service';
import { AssetType } from '../../interfaces/asset-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent implements OnInit {
  assetTypes: AssetType[] = [];
  selectedAssetType: AssetType | null = null;
  assetTypeForm: FormGroup;

  constructor(private assetTypeService: AssetTypeService, private formBuilder: FormBuilder) {
    this.assetTypeForm = this.formBuilder.group({
      id_asset_type: [null],
      name: ['', Validators.required],
      reference: ['', Validators.required],
      num_tag: ['', Validators.required],
      id_available: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAssetTypes();
  }

  getAllAssetTypes(): void {
    this.assetTypeService.getAll().subscribe({
      next: (data) => this.assetTypes = data,
      error: (err) => console.error('Error fetching asset types:', err)
    });
  }

  getAssetTypeById(id: number): void {
    this.assetTypeService.getById(id).subscribe({
      next: (data) => this.selectedAssetType = data,
      error: (err) => console.error('Error fetching asset type by ID:', err)
    });
  }

  createAssetType(): void {
    if (this.assetTypeForm.valid) {
      this.assetTypeService.create(this.assetTypeForm.value).subscribe({
        next: (newAssetType) => {
          this.assetTypes.push(newAssetType);
          this.assetTypeForm.reset();
        },
        error: (err) => console.error('Error creating asset type:', err)
      });
    }
  }

  updateAssetType(): void {
    if (this.assetTypeForm.valid && this.assetTypeForm.value.id_asset_type) {
      this.assetTypeService.update(this.assetTypeForm.value.id_asset_type, this.assetTypeForm.value).subscribe({
        next: (updatedAssetType) => {
          const index = this.assetTypes.findIndex(assetType => assetType.id_asset_type === updatedAssetType.id_asset_type);
          if (index !== -1) {
            this.assetTypes[index] = updatedAssetType;
          }
          this.assetTypeForm.reset();
        },
        error: (err) => console.error('Error updating asset type:', err)
      });
    }
  }

  deleteAssetType(id: number): void {
    this.assetTypeService.delete(id).subscribe({
      next: () => {
        this.assetTypes = this.assetTypes.filter(assetType => assetType.id_asset_type !== id);
      },
      error: (err) => console.error('Error deleting asset type:', err)
    });
  }

  editAssetType(assetType: AssetType): void {
    this.assetTypeForm.patchValue(assetType);
  }

  clearForm(): void {
    this.assetTypeForm.reset();
    this.selectedAssetType = null;
  }
}
