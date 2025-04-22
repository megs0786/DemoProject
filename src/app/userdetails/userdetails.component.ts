import { Component, inject } from '@angular/core';
import { SharedService } from '../shared.service';
import {  catchError, ignoreElements, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { userDetailsModel } from '../sharedmodel';


@Component({
  selector: 'app-userdetails',
  imports: [AsyncPipe],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.scss'
})
export class UserdetailsComponent {
  sharedService = inject(SharedService)
  userDetails$!: Observable<any>;
  userDetailsError$!: Observable<unknown>;
  ngOnInit(){
this.userDetails$ = this.sharedService.getAllUsers('https://jsonplaceholder.typicode.com/users');
this.userDetailsError$ = this.userDetails$.pipe(ignoreElements(),catchError((e)=>of(e)))
  }
}
