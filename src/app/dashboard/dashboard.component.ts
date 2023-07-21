import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: string = ""
  balance: number = 0
  balancesuccessstatus: boolean = false

  // fundtransfer form
  transferForm = this.fb.group({
    creditacno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  })

  constructor(private api: ApiService, private toaster: ToasterService, private fb: FormBuilder, private dashboardRouter: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("loginUsername")) {
      this.user = localStorage.getItem("loginUsername") || ""
    }

  }

  getbalance() {
    // get acno from localstorage
    const acno = localStorage.getItem("loginUserAcno")
    // make api call to service
    this.api.getbalance(acno).subscribe({
      next: (output: any) => {

        this.balancesuccessstatus = true
        this.balance = output
      },
      error: (err: any) => {
        this.balancesuccessstatus = false
        // alert
        this.toaster.showWarning(err.error, "Warning")
      }
    })
  }
  // transfer
  transfer() {
    if (this.transferForm.valid) {
      let creditAcno = this.transferForm.value.creditacno
      let amount = this.transferForm.value.amount
      this.api.fundtransfer(creditAcno, amount).subscribe({
        next: (response: any) => {
          this.toaster.showSuccess(response, "success")
        },
        error: (err: any) => {
          this.toaster.showError(err.error, "Failed")
        }
      })
    }
    else {
      this.toaster.showWarning("Invalid Form", "Warning")
    }
  }

  // delete account
  deleteAccount() {
    this.api.deleteAcno().subscribe({
      next: (response: any) => {

        this.toaster.showSuccess(response, "Success")
        this.logout();
        setTimeout(() => {
          this.dashboardRouter.navigateByUrl("")
        }, 2000);
      },
      error: (err: any) => {
        this.toaster.showError(err.message, "Error")
      }
    })


  }

  // logout
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUsername");
    localStorage.removeItem("loginUserAcno");
    this.toaster.showSuccess("Logout Successfully","success");

    setTimeout(() => {

      this.dashboardRouter.navigateByUrl("");

    }, 2000);
  }
}

