import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  isLoggedin: boolean = false
  // login form
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(2)]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(2)]]
  })

  constructor(private fb: FormBuilder, private toaster: ToasterService, private api: ApiService, private loginNavigator: Router) { }

  login() {
    if (this.loginForm.valid) {
      // get user input
      let acno = this.loginForm.value.acno;
      let pswd = this.loginForm.value.pswd;
      // make api service call
      this.api.login(acno, pswd).subscribe({
        next: (result: any) => {
          console.log(result);
          const { loginUser, token } = result
          // store username in local storage
          localStorage.setItem("loginUsername", loginUser.username)
          localStorage.setItem("loginUserAcno", loginUser.acno)

          localStorage.setItem("token", token)
          this.isLoggedin = true
          setTimeout(() => {
            this.isLoggedin = false
            this.toaster.showSuccess(`Welcome  ${loginUser.username}...`, "success")
            this.loginNavigator.navigateByUrl("user/dashboard")
          }, 1000)

        },
        error: (result: any) => {
          console.log(result.error);
          this.toaster.showError(result.error, "Error")
          setTimeout(() => {
            this.loginForm.reset()
          }, 2000)
        }
      })
    }
    else {
      // alert("invalid form")
      this.toaster.showWarning("Invalid Form", " Warning")
    }

  }
}
