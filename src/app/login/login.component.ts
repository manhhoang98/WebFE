import {Component, OnInit} from '@angular/core';
import {AccountService} from "../service/account.service";
import { FormControl, FormGroup } from '@angular/forms';
import Swal from "sweetalert2";

import {Router} from "@angular/router";
import {Account} from "../module/Account";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private accountService: AccountService, private router:Router,private loginService :LoginService) {
  }
  ngOnInit(): void {

  }
  idroles:any;
  public loginForm :any = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  account?:Account;
  public login(){
          var account : Account= {
      username : this.loginForm.get('username').value,
      password : this.loginForm.get('password').value
          }
      this.loginService.login(account).subscribe( (data) => {
        console.log(data);
        this.loginService.setId(data.id);
        this.loginService.setUsername(data.username);
        this.loginService.setRole(data.roles.id);
        this.router.navigate(["/home"]);
        this.idroles=localStorage.getItem("roles");
        if (this.idroles==1){
          Swal.fire(
            ' Chào mừng admin! ',
            '<h2 style="color: green; font-size: 32px">Đăng nhập thành công !  </h2>',
            'success')
          this.router.navigate(["/admin"]);
        }else {
          Swal.fire(
            ' OK!! ',
            '<h2 style="color: green; font-size: 32px">Bạn đã đăng nhập thành công !</h2>',
            'success')
          this.router.navigate(["/home"]);
        }
      } ,(error)=>{
        Swal.fire(
          ' Có lỗi xảy ra !',
          '<h2 style="color: red; font-size: 32px">Sai mật khẩu hoặc tài khoản của bạn đã bị khóa !</h2>',
          'warning')
      });
  }


}
