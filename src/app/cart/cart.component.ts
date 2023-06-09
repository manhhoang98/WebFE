import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {LoginService} from "../service/login.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private router:Router,private cartService:CartService,private loginService:LoginService) {
  }
  ngOnInit(): void {
    this.getAllCart()
    this.img  =localStorage.getItem("img");
    // @ts-ignore
    this.username =localStorage.getItem("username");
  }

  listCartItem:any;
  img: any;
  username : String="";

  totalPrice: number=0;
  public getAllCart(){
    this.cartService.getAllCartItem(this.loginService.getId()).subscribe( (data) => {
      console.log(data);
      this.listCartItem = data;
      for (let i = 0; i < this.listCartItem.length; i++) {
        this.totalPrice += this.listCartItem[i].product.price * this.listCartItem[i].amount
      }
    })

  }
  account_id: any

  logout(){
    localStorage.clear();
    Swal.fire(
      ' ',
      '<h2 style="color: green; font-size: 32px">Đăng xuất thành công </h2>',
      'success')
    this.router.navigate(["/home"]);
  }
  public deleteCart(product_id:any){
    this.account_id  =this.loginService.getId();
    this.cartService.deleteCartItem(this.account_id,product_id).subscribe( (data) => {
      Swal.fire(
            ' Xóa! ',
            '<h2 style="color: green; font-size: 32px">Xóa thành công!  </h2>',
            'success')
          ;

    },(error)=>{
      this.getAllCart();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa thành công !',
        showConfirmButton: false,
        timer: 1500
      })
    });

  }


}
