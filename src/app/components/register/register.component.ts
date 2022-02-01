import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  pass: string;
  repeatPass: string;
  
  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  register() {
    if (this.pass != this.repeatPass) {
      this.flashMessages.show('Las contraseñas deben coincidir', {
        'cssClass': 'alert-danger', timeout: 4000
      });
      return;
    }

    this.loginService.register(this.email, this.pass).then(
      res => {
        this.router.navigate(['/']);
      }
    )
    .catch(error => {
      this.flashMessages.show(error.message, {
        'cssClass': 'alert-danger', timeout: 4000
      })
    })
  }
}
