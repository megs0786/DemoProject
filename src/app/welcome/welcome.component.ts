import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-welcome',
  imports: [ CdkAccordionModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

  data: any = [{
    "parentName": "Parent One",
    "childProperties":
      [
        { "propertyName": "Property One" },
        { "propertyName": "Property Two" }
      ]
  }, {
    "parentName": "Parent Two",
    "childProperties":
      [
        { "propertyName": "Property Three" },
        { "propertyName": "Property Four" },
        { "propertyName": "Property Five" },
      ]
  }, {
    "parentName": "Parent Three",
    "childProperties":
      [
        { "propertyName": "Property Six" },
        { "propertyName": "Property Seven" },
        { "propertyName": "Property Eight" },
      ]
  }];
   /* this.sharedService.get().subscribe({
      next:(res)=>{
this.userDetails.push(this.userDetails);
      },
      error:(e)=>{
        console.log(e.messgae);
      }

    })*/
  }


