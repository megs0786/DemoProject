import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {  HttpTestingController } from '@angular/common/http/testing';

import { RegistrationComponent } from './registration.component';
import { SharedService } from '../shared.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let sharedService:SharedService;
let sharedServiceMock:any;
let router:Router;
let httpMock: HttpTestingController;
let el:DebugElement;
const mockRegistrationData ={
  fullname:'testing',
  emailId:"test@ggmail.com",
  password:'testing00000'
}   
  beforeEach(async () => {
sharedServiceMock={
  postUsers:jest.fn(),
}
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers:[ { provide: SharedService, useValue:sharedServiceMock
      }
        , provideHttpClient(),
        provideHttpClientTesting()
]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    sharedServiceMock = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*it('should check the labels', () => {
    let buttonDisabled = el.queryAll(By.css('btn'));
    expect(buttonDisabled[0].nativeElement.disabled).toBeTruthy();
  });*/
  it('should call registration method',  fakeAsync( () => {
    const response = {
      "message": "Sequence contains more than one element",
      "result": false,
      "data": null
    };
    let finalResult;

  const url='https://projectapi.gerasim.in/api/UserApp/CreateNewUser';
  component.registrationSubmit();
 jest.spyOn(sharedServiceMock, 'postUsers').mockReturnValue(of(response));
 const loginSpy = jest.spyOn(router, 'navigate');
 expect(sharedServiceMock.postUsers).toHaveBeenCalledWith(url,mockRegistrationData);
  }));
});
