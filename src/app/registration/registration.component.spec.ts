import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { RegistrationComponent } from './registration.component';
import { SharedService } from '../shared.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let sharedService: SharedService;
  let sharedServiceMock: any;
  let router: Router;
  let httpMock: HttpTestingController;
  let el: DebugElement;
  const mockRegistrationData = {
    fullname: 'testing',
    emailId: 'test@ggmail.com',
    password: 'testing00000',
  };

  beforeEach(async () => {
    sharedServiceMock = {
      postUsers: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent],
      providers: [
        // { provide: SharedService, useValue: {  postUsers: jest.fn() } },
        { provide: SharedService, useValue: sharedServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    sharedServiceMock = TestBed.inject(SharedService);
    sharedService = TestBed.inject(SharedService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should valid the registration form', () => {
    component.registrationForm.setValue({
      name: 'Raj',
      email: 'rajtest@gmail.com',
      password: 'testing',
    });
    expect(component.registrationForm.valid).toBe(true);
  });
  it('should invalid the registration form', () => {
    component.registrationForm.setValue({
      name: 'Raj',
      email: 'rajtest@gmail.com',
      password: '',
    });
    expect(component.registrationForm.valid).toBe(false);
  });

  /* it('should check the labels', () => {
    let buttonDisabled = el.queryAll(By.css('btn'));
    expect(buttonDisabled[0].nativeElement.disabled).toBeTruthy();
  });*/
  it('should call registration method', fakeAsync(async (done: any) => {
    const response = {
      message: 'Sequence contains more than one element',
      result: false,
      data: null,
    };
    let finalResult;
    const body = {
      fullname: 'testing',
      emailId: 'testing@gmail.com',
      password: 'testing',
    };
    const url = 'https://projectapi.gerasim.in/api/UserApp/CreateNewUser';
    jest.spyOn(sharedService, 'postUsers').mockReturnValue(of(response));
    // const response = cold('-a|', { a: createBookResponse });
    //const expected = cold('-b|', { b: createBookResponse.data });
    // sharedService.postUsers = jest.fn((url,body) => response);

    //expect(component.registrationSubmit).toBeTruthy();
    sharedServiceMock.postUsers = jest.fn(() => response);
    component.registrationSubmit();
    fixture.detectChanges();

    expect(sharedServiceMock.postUsers(url, body)).toBe(response);
    /*const async =   jest.spyOn(sharedService, 'postUsers').mockReturnValue(of(response));
  
  component.registrationSubmit();
  fixture.detectChanges();

  await async;
  expect(async).toHaveBeenCalled();
  tick(4000);
  //expect(sharedService.postUsers).toHaveBeenCalled();
 //const loginSpy = jest.spyOn(router, 'navigate');
 expect(component.email).toBe(response.data);
 //expect(sharedService.postUsers).toHaveBeenCalledWith(url,mockRegistrationData);*/
  }));
});
