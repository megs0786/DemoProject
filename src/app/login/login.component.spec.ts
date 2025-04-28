import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SharedService } from '../shared.service';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Observable, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let sharedService: SharedService;
  let sharedServiceMock: any;
  let httpMock: HttpTestingController;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    sharedServiceMock = {
      postUsers: jest.fn(),
    };
   const localStorageMock = (function () {
      let store :any= {};
    
      return {
        getItem(key: any) {
          return store[key];
        },
    
        setItem(key:any, value:string) {
          store[key] = value;
        },
    
        getAll() {
          return store;
        },
      };
    })();
   
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        SharedService,
        provideHttpClient(),
        provideRouter([]),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    const mockLoginData = {
      email: 'test@ggmail.com',
      password: 'testing00000',
    };
    // jest.spyOn(sharedService, 'onLogin').mockResolvedValue(true);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should valid the login form', () => {
    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: 'testing',
    });
    expect(component.loginForm.valid).toBe(true);
  });
  it('should invalid the login form', () => {
    component.loginForm.setValue({
      email: 'rajtest@gmail.com',
      password: '',
    });
    expect(component.loginForm.valid).toBe(false);
  });
  it('should call the login service with error message', fakeAsync (() => {
    const body = {
      EmailId: 'test11@dummy.com',
      Password: '1234',
    };
    const mockResponse = {
      message: '',
    };
    const url = 'https://projectapi.gerasim.in/api/UserApp/login';
    jest.spyOn(sharedService, 'postUsers').mockReturnValue(of(mockResponse));
   component.loginSubmit();
    tick();
    expect(sharedService.postUsers).toHaveBeenCalled();
   expect(component.loginForm.controls['email'].value).toBe('');
   expect(component.loginForm.controls['password'].value).toBe('');
 
  }));
  it('should call the login service with correct credentials', fakeAsync (() => {
    const body = {
      EmailId: 'test11@dummy.com',
      Password: '1234',
    };
    const mockResponse = {
      message: 'Login Success',
      result: true,
      data: {
        userId: 4259,
        emailId: 'test11@dummy.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDUzMTY0MjAsImlzcyI6IlRlc3QuY29tIiwiYXVkIjoiVGVzdC5jb20ifQ.pma2WJlxL_KJNH6W7bE5rnZxPjUaN1UtRd1Y-YGlPTM',
        refreshToken: 'g06N5gXuL49TgRbKGwQzFNJKb8WjuUR9L1v79Nxe/MI=',
      },
    };
 /*  const setLocalStorage = (id: string, data: any) => {
      localStorage.setItem(id, JSON.stringify(data));
    };*/
    const url = 'https://projectapi.gerasim.in/api/UserApp/login';
   // jest.spyOn(sharedService, 'postUsers').mockReturnValue(of(mockResponse));
    const observable: Observable<any> = sharedService.postUsers(url, body);
    component.loginSubmit();
    tick();
    expect(sharedService.postUsers).toHaveBeenCalled();
    observable.subscribe((value) => {
      expect(value).toEqual(mockResponse);
    });
  
  //  expect(sharedService.postUsers).toHaveBeenCalled();
   // expect(sharedService.postUsers).toHaveBeenCalledWith(url, body);
   // setLocalStorage('userDetails', JSON.stringify(mockResponse));
   // expect(localStorage.getItem('userDetails')).toEqual(JSON.stringify(mockResponse));

 
  }));
});
