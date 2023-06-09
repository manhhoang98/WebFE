import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../service/category.service";
import {CartService} from "../service/cart.service";
import {LoginService} from "../service/login.service";
import {Product} from "../module/Product";
import {AccountService} from "../service/account.service";
import {Category} from "../module/Category";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private productService : ProductService,
              private router:Router,
              private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    this.img  =localStorage.getItem("img");
    // @ts-ignore
    this.username =localStorage.getItem("username");
  }


  listProduct : Product[]=[];
  product : Product= new Product();

  idProduct?:any;
  quantityProduct: number=0;

  category: Category= new Category();
  listCategory: Category[]=[];

  img: any;
  username : String="";
  public productForm :any = new FormGroup({
    nameProduct: new FormControl(''),
    price: new FormControl(''),
    image: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl('')

  });

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

  public setidProduct(id: any){
    this.idProduct=id;
  }
  public create(){
    this.productService.createProduct(this.productForm.value).subscribe( (data) => {

      this.getAllProduct()
      this.product= new Product();
    })
  }

  public getProductById(productId: any){
    this.productService.getProductById(productId).subscribe( (data) => {
      console.log(data);
      this.idProduct=productId;
      this.product= data;
      this.category = data.category
      console.log(this.category)
      this.productForm  = new FormGroup({
        nameProduct: new FormControl(this.product.nameProduct),
        price: new FormControl(this.product.price),
        image: new FormControl(this.product.image),
        quantity: new FormControl(this.product.quantity),
        category: new FormControl(this.category)
      });

    } )
  }

  public deleteProduct(productId: any){
    this.productService.deleteProduct(productId).subscribe( (data) => {
      this.getAllProduct();
    })
  }

  public updateQuantityProduct(){
    var  product1: Product ={
      id :this.idProduct,
      quantity : this.quantityProduct
    }
    this.productService.UpdateQuantityProduct(product1).subscribe( (data) => {
      this.getAllProduct();
      this.idProduct=0;
    })
  }

  public editProduct() {
      this.productService.updateProduct(this.idProduct,this.productForm.value).subscribe(data => {
        this.getAllProduct();
        this.productForm.reset();
        this.idProduct=0;
      });
    }


}
