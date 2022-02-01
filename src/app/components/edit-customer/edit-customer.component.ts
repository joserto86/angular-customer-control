import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  // customers: Customer[] = [];
  customer: Customer = {
    name : '',
    surname : '',
    email: '',
    money: 0,
  }

  id: string;

  // @ViewChild("customerForm") customerForm: NgForm;
  // @ViewChild("buttonClose") buttonClose: ElementRef;

  constructor(private customerService:CustomerService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe(
      customer => {
        if (customer != null) {
          this.customer = customer;
        }
      }
    )
  }

  saveCustomer(f:NgForm) {
    if (!f.valid) {
      this.flashMessages.show('Todos los campos son obligatorios', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      f.value.id = this.id;
      this.customerService.editCustomer(f.value);
      this.router.navigate(['/']);
    }
  }

  removeCustomer() {
    if(confirm('¿Está seguro de que desea eliminar el cliente?')) {
      this.customerService.removeCustomer(this.customer);
      this.router.navigate(['/']);
    }
  }

}
