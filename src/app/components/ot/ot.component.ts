import { Component, OnInit } from '@angular/core';
import { OtService } from '../../services/ot.service';
import { Ot } from '../../interfaces/ot';

@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.css']
})
export class OtComponent implements OnInit {
  ordenes: Ot[] = [];
  selectedOt: Ot | null = null; // Puede ser null o undefined si no se inicializa correctamente
  isEditing: boolean = false;

  constructor(private otService: OtService) {
    // Inicializar selectedOt con un objeto de la interfaz Ot
    this.selectedOt = {
      id_ot: 0,
      order_number: '',
      request_date: new Date(),
      initial_date: new Date(),
      completion_date: new Date(),
      observations: '',
      id_user: 0,
      id_task_list: 0,
      id_priority: 0,
      id_ot_state: 0,
      id_tag: 0
    };
  }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes(): void {
    this.otService.getAll().subscribe({
      next: (data) => this.ordenes = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  selectOt(ot: Ot): void {
    this.selectedOt = { ...ot };
    this.isEditing = true;
  }

  createOrUpdateOt(): void {
    if (this.selectedOt) {
      if (this.isEditing) {
        this.otService.update(this.selectedOt.id_ot, this.selectedOt).subscribe({
          next: () => {
            this.getOrdenes();
            this.resetForm();
          },
          error: (err) => console.error('Error updating order:', err)
        });
      } else {
        this.otService.create(this.selectedOt).subscribe({
          next: () => {
            this.getOrdenes();
            this.resetForm();
          },
          error: (err) => console.error('Error creating order:', err)
        });
      }
    }
  }

  deleteOt(id: number): void {
    this.otService.delete(id).subscribe({
      next: () => this.getOrdenes(),
      error: (err) => console.error('Error deleting order:', err)
    });
  }

  resetForm(): void {
    this.selectedOt = null;
    this.isEditing = false;
  }
}
