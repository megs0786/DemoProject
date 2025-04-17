import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {registrationModel, loginModel } from './sharedmodel';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {}
  logindata:any=[];
  title!: string;
https= inject(HttpClient);

onLogin(body: loginModel){
  const storedData=localStorage.getItem('registeruser');
  storedData===null?undefined:JSON.parse(storedData);
if(storedData){
  let filteredValue = JSON.parse(storedData).find((i:any)=>{
   return i.email.includes(body.email)});
  this.title=filteredValue.name;
  return filteredValue;
  
}
}
onRegistration(body:registrationModel){
  console.log(this.logindata);
  this.logindata.push(body);
localStorage.setItem("registeruser",JSON.stringify(this.logindata))
return this.logindata
}}


