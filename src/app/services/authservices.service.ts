import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor() { }

  isLoggined(){ 
    return !!localStorage.getItem("token") // !! make the string to  boolean
  }

}
