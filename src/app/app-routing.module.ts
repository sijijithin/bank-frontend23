import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { AuthservicesService } from './services/authservices.service';

const routes: Routes = [
  {
    path:"",component:LandingPageComponent
  },
  {
    path:"user/login",component:LoginComponent
  },
  {
    path:"user/register",component:RegisterComponent
  },
  {
    path:"user/dashboard",component:DashboardComponent,canActivate:[authGuardGuard]
  },
  {
    path:"user/transactions",component:TransactionsComponent,canActivate:[authGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
