import {Component, OnInit} from '@angular/core';
import {LoginService} from "../service/login.service";
import {Account} from "../module/Account";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {AccountService} from "../service/account.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  img ?: any;
  phone?: any;
  address?: any;
  username: any
  account_id: any;

  ngOnInit(): void {
    this.img = this.loginServiec.getImg();
    this.phone = this.loginServiec.getphone();
    this.address = this.loginServiec.getaddress();
    this.username = this.loginServiec.getUsername();
    this.account_id = this.loginServiec.getId();
  }

  constructor(private loginServiec: LoginService, private router: Router, private accountService: AccountService) {
  }

  public accountForm: any = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    img: new FormControl(''),
    phoneNumber: new FormControl('')
  });


  logout() {
    localStorage.clear();
    Swal.fire(
      ' ',
      '<h2 style="color: green; font-size: 32px">Đăng xuất thành công </h2>',
      'success')
    this.router.navigate(["/home"]);
  }

  public deleteAccount() {
    this.accountService.deleteAccount(this.account_id).subscribe((data) => {
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Xóa tài khoản thành công </h2>',
        'success')
      this.router.navigate(["/login"]);
    }, (error) => {
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Xóa tài khoản thành công </h2>',
        'success')
      this.router.navigate(["/login"]);
    })
  }

  confirmDelete1(): void {
    const confirmDelete = confirm('Xác nhận xóa tài khoản ?');
    if (confirmDelete) {
      this.deleteAccount();
    }
  }

  account: Account = new Account();

  public getAccount() {
    this.accountService.getAccountById(this.account_id).subscribe((data) => {
      this.account = data;
      console.log(
        this.account
      )
      this.accountForm = new FormGroup({
        username: new FormControl(data.username),
        password: new FormControl(data.password),
        address: new FormControl(data.address),
        img: new FormControl(data.img),
        phoneNumber: new FormControl(data.phoneNumber)
      })
    })
  }

  public editAccount() {
    var account : Account= {
      id : this.account_id,
      username : this.accountForm.get('username').value,
      password : this.accountForm.get('password').value,
      address: this.accountForm.get('address').value,
      img: this.accountForm.get('img').value,
      phoneNumber:this.accountForm.get('phoneNumber').value,
    }
    this.accountService.updateAccount(account).subscribe((data) => {
      localStorage.clear();
      this.loginServiec.login(account).subscribe((data) => {
        console.log(data);
        this.loginServiec.setId(data.id);
        this.loginServiec.setUsername(data.username);
        this.loginServiec.setRole(data.roles.id);
        this.loginServiec.setImg(data.img);
        this.loginServiec.setphone(data.phoneNumber);
        this.loginServiec.setaddress(data.address);
      });
    })
  }
}





