import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/model/config.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  allowRegister?:boolean = false;
  
  constructor(private router: Router,
              private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe(
      (data: Config | undefined) => {
        if (data) {
          this.allowRegister = data.allowRegister as boolean;
        }
      }
    )
  }

  save() {
    let config = {allowRegister: this.allowRegister};
    this.configService.editConfig(config);
    this.router.navigate(['/']);
  }
}
