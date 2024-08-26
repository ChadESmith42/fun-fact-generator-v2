import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Login } from '../../models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authService: AuthService = inject(AuthService);
  private _fb: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  loginForm = this._fb.group({
    username: this._fb.control<string>('', { validators: [Validators.required] }),
    password: this._fb.control<string>('', { validators: [Validators.required] }),
  });

  login(): void {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;
    this._authService.login(this.loginForm.value as Login).pipe(takeUntil(this._destroy$)).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/fact']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
