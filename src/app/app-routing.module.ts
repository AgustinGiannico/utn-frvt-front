import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { LaunchpadComponent } from './pages/launchpad/launchpad.component';
import { GestionOrdenesComponent } from './pages/gestion-ordenes/gestion-ordenes.component';
import { GestionInfraestructuraComponent } from './pages/gestion-infraestructura/gestion-infraestructura.component';
import { GestionOperariosComponent } from './pages/gestion-operarios/gestion-operarios.component';
import { EdificeComponent } from './components/edifice/edifice.component';
import { FloorComponent } from './components/floor/floor.component';
import { SectorComponent } from './components/sector/sector.component';
import { SiteComponent } from './components/site/site.component';
import { AssetTypeComponent } from './components/asset-type/asset-type.component';
import { TagComponent } from './components/tag/tag.component';
import { TaskComponent } from './components/task/task.component';
import { TaskTypeComponent } from './components/task-type/task-type.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { OtComponent } from './components/ot/ot.component';
import { CrearOrdenComponent } from './components/crear-orden/crear-orden.component';

const routes: Routes = [
  {
    path: '',
    component: LaunchpadComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'gestion-ordenes', 
    component: GestionOrdenesComponent 
  },
  { 
    path: 'gestion-infraestructura', 
    component: GestionInfraestructuraComponent 
  },
  { 
    path: 'gestion-operarios', 
    component: GestionOperariosComponent
  },
  { 
    path: 'edificio', 
    component: EdificeComponent 
  },
  { 
    path: 'piso', 
    component: FloorComponent
  },
  { 
    path: 'sector', 
    component: SectorComponent
  },
  { 
    path: 'ubicacion', 
    component: SiteComponent
  },
  { 
    path: 'tipo-activo', 
    component: AssetTypeComponent
  },
  { 
    path: 'tag', 
    component: TagComponent
  },
  { 
    path: 'task', 
    component: TaskComponent
  },
  { 
    path: 'task-type', 
    component: TaskTypeComponent
  },
  { 
    path: 'task-list', 
    component: TaskListComponent
  },
  { 
    path: 'ver-ordenes', 
    component: OtComponent
  },
  { 
    path: 'crear-orden', 
    component: CrearOrdenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
