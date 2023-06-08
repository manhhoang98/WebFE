import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Product} from "../module/Product";


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private REST_API_SERVER_CART = "http://localhost:8080/cart";
  constructor(private httpClient: HttpClient) { }

  public getAllCartItem(id :any): Observable<any> {
    const url = this.REST_API_SERVER_CART +"/getcartitem"+"/"+id;
    return this.httpClient.get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public pushInCart(account_id :any,product_id :any): Observable<any> {
    const url = this.REST_API_SERVER_CART +"/addcartitem"+"/"+account_id+"/"+product_id;
    return this.httpClient.get<any>(url,httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteCartItem(account_id :any,product_id :any): Observable<any> {
    const url = this.REST_API_SERVER_CART +"/delete"+"/"+account_id+"/"+product_id;
    return this.httpClient.delete<any>(url,httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, `+ `body was: ${error.error}`
      );
    }
    return throwError('St bad happend; plz try again later.');
  }




}
