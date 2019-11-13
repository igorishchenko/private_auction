import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginRoutingModule } from './user-login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/shared/core/interceptors/token-interceptor';

@NgModule({
  imports: [
    CommonModule,
    UserLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [LoginComponent]
})
export class UserLoginModule { }
