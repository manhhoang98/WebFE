import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Router} from "@angular/router";
import {Product} from "../module/Product";
import {CategoryService} from "../service/category.service";
import {Category} from "../module/Category";
import {CartService} from "../service/cart.service";
import Swal from "sweetalert2";
import {LoginService} from "../service/login.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private productService : ProductService,
              private router:Router,
              private categoryService: CategoryService,
              private cartService:CartService,

              private loginService:LoginService
              ) {
  }

  listProduct : Product[]=[];
  listCategory: Category[]=[];

  img: any;
  username : any;
  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    this.img  =localStorage.getItem("img");
    this.username =localStorage.getItem("username");
  }
  logout(){
    localStorage.clear();
    Swal.fire(
      ' ',
      '<h2 style="color: green; font-size: 32px">Đăng xuất thành công </h2>',
      'success')
    this.router.navigate(["/home"]);
  }
  public getAllProduct(){
    this.productService.getProduct().subscribe( (data) => {
      console.log(data);
      this.listProduct = data;
    } )
  }
  public getAllCategory(){
    this.categoryService.getAllCategory().subscribe( (data) => {
      console.log(data);
      this.listCategory = data;
    } )
  }

  searchByname(value: string) {
      this.productService.searchbyname(value).subscribe((data) => {
        this.listProduct = data
      })
  }

  public getProductByCategory(id : any){
    this.productService.getProductByCategory(id).subscribe( (data) => {
      console.log(data);
      this.listProduct = data;
    } )
  }

  account_id?:any;

  public pushInCart(product_id:any){
    this.account_id  =this.loginService.getId();
    console.log(this.account_id);
    this.cartService.pushInCart(this.account_id,product_id).subscribe( (data) => {
      console.log(data);

    },(error)=>{Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm thành công !',
      showConfirmButton: false,
      timer: 1500
      })
      this.router.navigate(["/cart"]);} )
  }
}
