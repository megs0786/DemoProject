import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule,FormsModule, RouterModule],
  providers:[SharedService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.sass'
})

export class RegistrationComponent {
  registrationForm!: FormGroup;
  sharedService = inject(SharedService);
router =  inject(Router)
  ngOnInit(){
    this.registrationForm = new FormGroup({
      name:new FormControl('',Validators.required),
email:new FormControl('',Validators.required),
password:new FormControl('',[Validators.required,Validators.minLength(10)])
    })
  }
  registrationSubmit(){
    if (this.registrationForm.invalid){
      return false;
  }
  const body ={
    name:this.registrationForm.controls['name'].value,
    email:this.registrationForm.controls['email'].value,
    password:this.registrationForm.controls['password'].value,
  }
   const res = this.sharedService.onRegistration(body);
   if (res){
    window.alert('Registration successful.');
 
   }
  return this.router.navigate(['/login']);
  
  }
}
