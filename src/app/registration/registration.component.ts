import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../shared.service';
import { compileClassDebugInfo } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule,FormsModule, RouterModule],
  providers:[SharedService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent {
  registrationForm!: FormGroup;
email:string | undefined;
  sharedService = inject(SharedService);
router =  inject(Router)
  ngOnInit(){
    this.registrationForm = new FormGroup({
      name:new FormControl('',Validators.required),
email:new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
password:new FormControl('',[Validators.required,Validators.minLength(4)])
    })
  }
  registrationSubmit(){
    if (this.registrationForm.invalid){
      return false;
  }
  const body ={
    fullname:this.registrationForm.controls['name'].value,
    emailId:this.registrationForm.controls['email'].value,
    password:this.registrationForm.controls['password'].value,
  }
   this.sharedService.postUsers("https://projectapi.gerasim.in/api/UserApp/CreateNewUser",body).subscribe({
    next:(res)=>{
      this.email = res.data;
      console.log(this.email);
      window.alert('Registration successful.');
      return this.router.navigate(['/login']);
    }
   });
   /*if (res){
    
 
   }*/
  
  return true;
  }
}
