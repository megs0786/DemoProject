import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('SharedService', () => {
  let service: SharedService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
  
    TestBed.configureTestingModule({
      imports:[],
      providers:[ SharedService,provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(SharedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call get', () => {
    const response =[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      }
    ]    
    const url = 'https://jsonplaceholder.typicode.com/users';
    service.getAllUsers(url).subscribe((res:any)=>{
expect(res).toBeTruthy();
    })
   const req = httpTestingController.expectOne(url); 
    expect(req.request.method).toEqual("GET");
  });
  it('should call on Login', async () => {
    const body={
      "EmailId":"test11@dummy.com",
      "Password":'1234'
   } 
    const mockResponse = { 
      "message": "Login Success",
      "result": true,
      "data": {
        "userId": 4259,
        "emailId": "test11@dummy.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDUzMTY0MjAsImlzcyI6IlRlc3QuY29tIiwiYXVkIjoiVGVzdC5jb20ifQ.pma2WJlxL_KJNH6W7bE5rnZxPjUaN1UtRd1Y-YGlPTM",
        "refreshToken": "g06N5gXuL49TgRbKGwQzFNJKb8WjuUR9L1v79Nxe/MI="
      }
    };
    const url='/api/UserApp/login';
  await service.postUsers(url,body).subscribe((res:any)=>{
      expect(res).toBeTruthy();
    const req = httpTestingController.expectOne(url); 
    expect(req.request.method).toEqual("POST");
  });
});
});
