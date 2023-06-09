import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../service/account.service";
import { ActivatedRoute, Router } from '@angular/router';
import {Account} from "../module/Account";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm :any = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new  FormControl(''),
    confirm_password: new FormControl('')
  });

  constructor(private accountService:AccountService,private router: Router) {
  }

  messenger : String = "";
  public register() {
    var account : Account={
      username: this.registerForm.get('username')?.value,
      password : this.registerForm.get('password')?.value,
      phoneNumber : this.registerForm.get('phoneNumber')?.value
    }
    if (!this.registerForm.invalid) {
      const password = this.registerForm.get('password')?.value;
      const confirm_password = this.registerForm.get('confirm_password')?.value;

      if (password == confirm_password) {
        this.accountService.register(account as Account).subscribe(data => {
          this.router.navigate(['/login']);
        });
        return;
      }else {
        this.messenger= "Mật khẩu nhập lại không đúng !"
      }
      return;
    }




  }
}
