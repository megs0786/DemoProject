import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,FormsModule, RouterModule],
  providers:[SharedService,HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm!: FormGroup;
  sharedService = inject(SharedService);
router =  inject(Router)
  ngOnInit(){
    this.loginForm = new FormGroup({
email:new FormControl('',Validators.required),
password:new FormControl('',[Validators.required,Validators.minLength(10)])
    })
  }

  loginSubmit(){
if (this.loginForm.invalid){
  return false;
}
const body ={
  email:this.loginForm.controls['email'].value,
  password:this.loginForm.controls['password'].value,
}
 const res = this.sharedService.onLogin(body);
 console.log(res);
 if (res){
  window.alert('login successful.');
 return this.router.navigateByUrl('/welcome');;
 }
 else{
  window.alert('Incorrect credentails. Please enter correct credentials');
  this.loginForm.controls['email'].setValue('');
  this.loginForm.controls['password'].setValue(''); 
  return false;
}
}}
