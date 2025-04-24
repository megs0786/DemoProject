import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedService } from '../shared.service';
import { UserdetailsComponent } from './userdetails.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('UserdetailsComponent', () => {
  let component: UserdetailsComponent;
  let fixture: ComponentFixture<UserdetailsComponent>;
  let sharedService: SharedService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdetailsComponent],
      providers: [
        SharedService,
        provideHttpClient(),
        provideRouter([]),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserdetailsComponent);
    component = fixture.componentInstance;
    sharedService = TestBed.inject(SharedService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
