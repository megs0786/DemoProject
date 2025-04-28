import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule],
  providers: [SharedService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  email!: string;
  sharedService = inject(SharedService);
  router = inject(Router);
  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
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
  registrationSubmit() {
    if (this.registrationForm.invalid) {
      return false;
    }
    const body = {
      fullname: this.registrationForm.controls['name'].value,
      emailId: this.registrationForm.controls['email'].value,
      password: this.registrationForm.controls['password'].value,
    };
    this.sharedService
      .postUsers(
        'https://projectapi.gerasim.in/api/UserApp/CreateNewUser',
        body,
      )
      .subscribe({
        next: (res) => {
          this.email = res.data;
          window.alert('Registration successful.');
          return this.router.navigate(['/login']);
        },
      });
    return true;
  }
}
