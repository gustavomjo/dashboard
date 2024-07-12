import { NgModule } from '@angular/core';
import { RouterModule, Routes, withComponentInputBinding, provideRouter } from '@angular/router';
import { DashComponent } from './components/dash/dash.component';
import { DashFinComponent } from './components/dash-fin/dash-fin.component';
import { DashFatComponent } from './components/dash-fat/dash-fat.component';
import { LoginComponent } from './components/login/login.component';
import { DashFarmComponent } from './components/dash-farm/dash-farm.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './_guard/auth.guard';
import { DashReceitasComponent } from './components/dash-receitas/dash-receitas.component';

export const routes: Routes = [
  {path:'',component :  LoginComponent},
  //{path:'dash/:id/:access',component:DashComponent},
  {path:'dash',component:DashComponent,canActivate:[authGuard]},
  {path:'dash-fin',component:DashFinComponent,canActivate:[authGuard]},
  {path:'dash-fat',component:DashFatComponent,canActivate:[authGuard]},
  {path:'dash-farm',component:DashFarmComponent,canActivate:[authGuard]},
  {path:'dash-receitas',component:DashReceitasComponent,canActivate:[authGuard]},
  { path: '**', component:LoginComponent}
];

@NgModule({
  declarations:[],
  imports:[RouterModule.forRoot(routes,{
    bindToComponentInputs: true // <-- enable this feature
  })],
  exports:[RouterModule],
  providers: [
    provideRouter(routes,withComponentInputBinding())
  ]

})
export class AppRoutingModule{}
