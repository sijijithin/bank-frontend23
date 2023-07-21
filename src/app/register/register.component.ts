import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //  form group/ model

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2)]],
    acno: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(2)]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.minLength(2)]]
  })

  constructor(private fb: FormBuilder, private toaster: ToasterService, private api:ApiService,private registerRouter:Router) { }

  // register method
  register(): void {

    if (this.registerForm.valid) {

      //  get user inputs
      let username = this.registerForm.value.username
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd


      //  make api service call
      this.api.register(username, acno, pswd).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.showSuccess(`${res.username} register successfully...`, "success")
          setTimeout(() => {
            // navigate to login
            this.registerRouter.navigateByUrl("user/login")

          }, 3000)

        }, error: (err: any) => {
          console.log(err.error);
          this.toaster.showError(`${err.error}`, "Failed")
          setTimeout(() => {
            this.registerForm.reset()
          }, 2000)
        }
      })
    }
    else {
      // alert('Invalid Details')
      this.toaster.showWarning("Invalid Form", "wFailed");
      setTimeout(()=>{
        this.registerForm.reset()
      })
    }
  }


}
