import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Config } from "../model/config.model";

@Injectable()
export class ConfigService {

    configDoc: AngularFirestoreDocument<Config>;
    config$: Observable<Config | undefined>

    //id unique
    id = '1';

    constructor(private db: AngularFirestore) {

    }

    getConfig(): Observable<Config | undefined>{
        this.configDoc = this.db.doc<Config>(`config/${this.id}`);
        console.log(this.configDoc.valueChanges());
        this.config$ = this.configDoc.valueChanges();
        //     map(action => {
        //         if (action.payload.exists === false) {
        //             return null;
        //         } else {
        //             const data = action.payload.data() as Config;
        //             return data;
        //         }
        //     })
        // );
        return this.config$;
    }

    editConfig(config: Config) {
        this.configDoc = this.db.doc<Config>(`config/${this.id}`);
        this.configDoc.update(config);
    } 

}