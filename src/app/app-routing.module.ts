import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenValidationGuard } from './guards/token-validation.guard';
import { LoginComponent } from './auth/pages/login/login.component';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren:()=> import ('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren:()=> import ('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[TokenValidationGuard],
    canLoad:[TokenValidationGuard]
  },

  {
    path:'',redirectTo: 'auth/login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
