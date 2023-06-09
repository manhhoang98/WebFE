import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Account} from "../module/Account";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private REST_API_SERVER_ACCOUNT = "http://localhost:8080/account";

  constructor(private httpClient: HttpClient) { }
  public register(data:Account): Observable<any> {
    const url = this.REST_API_SERVER_ACCOUNT +"/register";
    return this.httpClient.post<any>(url,data,httpOptions)
      .pipe(catchError(this.handleError));
  }


  public deleteAccount(accountId: number): Observable<any> {
    const url = this.REST_API_SERVER_ACCOUNT + "/" + accountId;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.handleError));
  }

  public getAccountById(id:number): Observable<any> {
    const url = this.REST_API_SERVER_ACCOUNT + "/" + id;
    return this.httpClient.get<any>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
  public updateAccount( data: Account): Observable<any> {
    const url = this.REST_API_SERVER_ACCOUNT + "/updateAccount" ;
    return this.httpClient.put<any>(url, data, httpOptions)
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
