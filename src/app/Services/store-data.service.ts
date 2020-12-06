import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor( private afs: AngularFirestore,) { }
}
