import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  allowRegister: boolean;
  
  constructor(private loginService: LoginService,
              private router: Router,
              private configService: ConfigService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email as string;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.configService.getConfig().subscribe(
      config => {
        if (config) {
          this.allowRegister = config.allowRegister as boolean;
        }
      }
    )
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = '';
    this.router.navigate(['/login']);
  }

}
