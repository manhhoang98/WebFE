import {Component, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {LoginService} from "../service/login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  constructor(private cartService:CartService,private loginService:LoginService) {
  }
  ngOnInit(): void {
    this.getAllCart()
  }

  listCartItem:any;
  public getAllCart(){
    this.cartService.getAllCartItem(this.loginService.getId()).subscribe( (data) => {
      console.log(data);
      this.listCartItem = data;

    } )
  }account_id: any
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

    });

  }


}
