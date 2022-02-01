import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private router: Router,
                private loginService: LoginService) 
    { }

    canActivate(): Observable<boolean> {
        return this.loginService.getAuth().pipe(
            map(auth => {
                if (!auth) {
                    this.router.navigate(['/login']);
                    return false;
                } else {
                    return true;
                }
            })
        );
    }
}