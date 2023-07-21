import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  user:string=""
  isReadMore:boolean=true

  toggle(){
this.isReadMore=!this.isReadMore
  }
  
  ngOnInit(): void {
    if(localStorage.getItem("loginUsername")){
      this.user=localStorage.getItem("loginUsername")||""
    }
    
  }
}
