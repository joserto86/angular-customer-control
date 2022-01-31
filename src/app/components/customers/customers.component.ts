import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer.model';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];
  customer: Customer = {
    name : '',
    surname : '',
    money: 0,

  }

  constructor(private customerService:CustomerService,
              private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        console.log(this.customers);
      }
    );
  }

  getTotalCurrency() {
    let totalCurrency:number = 0;
    if (this.customers != null) {
      this.customers.forEach(customer => {
        totalCurrency += customer.money != null ? customer.money : 0;
      });
    }

    return totalCurrency;
  }

  addCustomer(f:NgForm) {
    if (!f.valid) {
      this.flashMessages.show('Todos los campos son obligatorios', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      
    }
  }

  // addCustomer({value, valid}: {value: Customer, valid:boolean}){
  //   if(!valid) {
  //     this.flashMessages.show('Todos los campos son obligatorios', {
  //       cssClass: 'alert-danger', timeout: 4000
  //     })
  //   } else {
  //     //add new component
  //   }
  // }
}
