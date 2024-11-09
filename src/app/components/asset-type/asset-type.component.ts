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
  paginatedAssetTypes: AssetType[] = [];
  selectedAssetType: AssetType | null = null;
  message: string | null = null;
  showForm: boolean = false;
  assetTypeForm: FormGroup;

  // Variables de paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

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
      next: (data) => {
        this.assetTypes = data;
        this.updatePagination();
      },
      error: (err) => this.message = 'Error al cargar los tipos de activo'
    });
  }

  // Métodos de paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.assetTypes.length / this.itemsPerPage);
    this.updatePaginatedAssetTypes();
  }

  updatePaginatedAssetTypes(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedAssetTypes = this.assetTypes.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAssetTypes();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAssetTypes();
    }
  }

  openCreateForm(): void {
    this.selectedAssetType = null;
    this.assetTypeForm.reset();
    this.showForm = true;
  }

  clearForm(): void {
    this.assetTypeForm.reset();
    this.selectedAssetType = null;
    this.showForm = false;
    this.message = null;
  }

  onSubmit(): void {
    if (this.assetTypeForm.valid) {
      this.selectedAssetType ? this.updateAssetType() : this.createAssetType();
    }
  }

  createAssetType(): void {
    this.assetTypeService.create(this.assetTypeForm.value).subscribe({
      next: (newAssetType) => {
        this.assetTypes.push(newAssetType);
        this.message = 'Tipo de activo creado exitosamente';
        this.updatePagination();
        this.clearForm();
      },
      error: (err) => this.message = 'Error al crear el tipo de activo'
    });
  }

  updateAssetType(): void {
    if (this.selectedAssetType) {
      this.assetTypeService.update(this.selectedAssetType.id_asset_type, this.assetTypeForm.value).subscribe({
        next: (updatedAssetType) => {
          const index = this.assetTypes.findIndex(assetType => assetType.id_asset_type === updatedAssetType.id_asset_type);
          if (index !== -1) {
            this.assetTypes[index] = updatedAssetType;
          }
          this.message = 'Tipo de activo actualizado exitosamente';
          this.updatePagination();
          this.clearForm();
        },
        error: (err) => this.message = 'Error al actualizar el tipo de activo'
      });
    }
  }

  deleteAssetType(id: number): void {
    this.assetTypeService.delete(id).subscribe({
      next: () => {
        this.assetTypes = this.assetTypes.filter(assetType => assetType.id_asset_type !== id);
        this.message = 'Tipo de activo eliminado exitosamente';
        this.updatePagination();
      },
      error: (err) => this.message = 'Error al eliminar el tipo de activo'
    });
  }

  editAssetType(assetType: AssetType): void {
    this.selectedAssetType = assetType;
    this.assetTypeForm.patchValue(assetType);
    this.showForm = true;
  }
}
