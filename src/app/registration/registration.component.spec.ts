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
import { DebugElement, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, lastValueFrom, Observable, of } from 'rxjs';

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

 it('should check the disable button', () => {
    let buttonDisabled = el.query(By.css('.btn'));
   expect(buttonDisabled.nativeElement.disabled).toBeTruthy();
  });

  it('should call registration method',async()  => {
    const response = {
      message: 'Sequence contains more than one element',
      result: false,
      data: {},
    };
    const body = {
      fullname: 'testing',
      emailId: 'testing@gmail.com',
      password: 'testing',
    };
    const url = 'https://projectapi.gerasim.in/api/UserApp/CreateNewUser';
 jest.spyOn(router, 'navigate');
 jest.spyOn(sharedService, 'postUsers').mockReturnValue(of(response));

 component.registrationSubmit();
});

});

