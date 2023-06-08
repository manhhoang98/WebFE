import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Account} from "../module/Account";





const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private REST_API_SERVER_ACCOUNT = "http://localhost:8080/account";

  constructor(private httpClient: HttpClient) { }

  public login(data : Account): Observable<any> {
    const url = this.REST_API_SERVER_ACCOUNT +"/login";
    return this.httpClient.post<any>(url,data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  setId(id: any){
    localStorage.setItem("account_id",id)
  }

  getId(){
    return localStorage.getItem("account_id")
  }
  setUsername(username: any){
    localStorage.setItem("username",username);
  }
  getUsername(){
    return localStorage.getItem("username");
  }
  setRole(roles:any){
    localStorage.setItem("roles",roles)
  }
  gettRole(){
    return localStorage.getItem("roles")
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
