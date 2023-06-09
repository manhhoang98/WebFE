import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    // Kiểm tra quyền truy cập ở đây
    const isAuthenticated = localStorage.getItem("roles");
    // @ts-ignore
    if (isAuthenticated==1) {
      return true; // Cho phép truy cập
    } else {
      this.router.navigate(['/home']); // Chuyển hướng đến trang đăng nhập
      return false; // Không cho phép truy cập
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    const isAuthenticated2 = localStorage.getItem("username")
    if (isAuthenticated2) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
