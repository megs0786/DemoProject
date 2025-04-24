import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  providers: [SharedService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  sharedService = inject(SharedService);
  router = inject(Router);
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+@[A-Za-z]+\\.[a-z]{2,3}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
    });
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      return false;
    }
    const body = {
      EmailId: this.loginForm.controls['email'].value,
      Password: this.loginForm.controls['password'].value,
    };

    this.sharedService
      .postUsers('https://projectapi.gerasim.in/api/UserApp/login', body)
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          return this.router.navigateByUrl('/home');
        },
        error: (err) => {
          if (err.message) {
            window.alert(err.message);
          } else {
            window.alert(
              'Incorrect credentails. Please enter correct credentials' +
                err.message,
            );
          }
          this.loginForm.controls['email'].setValue('');
          this.loginForm.controls['password'].setValue('');
          return false;
        },
      });
    return true;
  }
}
