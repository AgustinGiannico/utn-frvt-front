import { Pipe, PipeTransform } from '@angular/core';
import { EdificeComponent } from '../components/edifice/edifice.component';

@Pipe({
  name: 'addressFormat',
  pure: false // Esto permite que el pipe se actualice cuando el cache cambia
})
export class AddressFormatPipe implements PipeTransform {

  constructor(private edificeComponent: EdificeComponent) {}

  transform(id: number): string {
    return this.edificeComponent.getAddress(id);
  }
}