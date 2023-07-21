import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';
import { ToasterService } from '../services/toaster.service';


export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthservicesService)
  const toaster= inject(ToasterService)
  const router= inject(Router)
    if(auth.isLoggined()) {
      return true;

    }
    else{
      toaster.showWarning("operation denied, Please Login !","warning");
      router.navigateByUrl("");
      return false;
    }

};
