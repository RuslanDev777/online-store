import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../store/login.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userActions } from '@arslan-workspace/store';
import { cartActions } from 'libs/common/store/src/lib/cart/cart.action';
export interface LoginInfo {
  username: string;
  password: string;
}

@Component({
  selector: 'lib-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  search = new FormControl('');
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(16),
    ]),
  });
  login() {
    this.loginService
      .login(
        this.loginForm.value.username as string,
        this.loginForm.value.password as string
      )
      .subscribe((token) => {
        console.log(token);
        this.loginService.isLoggetIn = true;
        this.store.dispatch(userActions.loadUserProfile({ id: 2 }));
        this.store.dispatch(cartActions.loadCartById({ id: 3 }));
        this.router.navigate(['/product']);
      });
  }
}
