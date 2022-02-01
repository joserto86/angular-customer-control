import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../model/customer.model";
import { map } from "rxjs/operators"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable()
export class CustomerService {

    customerCollection: AngularFirestoreCollection<Customer>;
    customerDoc: AngularFirestoreDocument<Customer>;
    customers$: Observable<Customer[]>;
    customer$: Observable<Customer | null>;

    constructor(private db:AngularFirestore) {
        this.customerCollection = db.collection('customer', ref => ref.orderBy('name', 'asc'));
        this.customerCollection = db.collection('customer');
    }

    getCustomers(): Observable<Customer[]> {
        this.customers$ = this.customerCollection.snapshotChanges().pipe(
            map( changes => {
                return changes.map(action => {
                    const data = action.payload.doc.data() as Customer;
                    data.id = action.payload.doc.id;
                    return data;
                })
            })
        );
        return this.customers$;
    }

    addCustomer(customer:Customer) {
        this.customerCollection.add(customer);
    }

    getCustomer(id: string) {
        this.customerDoc = this.db.doc<Customer>(`customer/${id}`);
        this.customer$ = this.customerDoc.snapshotChanges().pipe(
            map(action => {
                if (action.payload.exists === false) {
                    return null;
                } else {
                    const data = action.payload.data() as Customer;
                    data.id = action.payload.id;
                    return data;
                }
            })

        );
        return this.customer$;
    }
}