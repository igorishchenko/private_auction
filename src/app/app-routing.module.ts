import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/core/auth.guard';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './modules/customers/customers.module#CustomersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: './modules/orders/orders.module#OrdersModule',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: './modules/main/main.module#MainModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './modules/user-login/user-login.module#UserLoginModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './modules/user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './modules/register/register.module#RegisterModule',
    // canActivate: [AuthGuard]
  },

  //othrwise redirect to home
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
