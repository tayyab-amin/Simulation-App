import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { ReactiveFormsModule} from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

export interface MotorStatus {
  status: string;
  time: string;
}
export interface Motor {
  startedAt;
  motorIsrunning;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   validations_form: FormGroup;
    errorMessage: '';
   successMessage: string = '';
   validation_messages = {
    temp: [
      { type: 'required', message: 'Temp is required.' },
    ],
    soil: [
      { type: 'required', message: 'Soil is required.' },
     
    ],
    humidity: [
      { type: 'required', message: 'Humidity is required.' },
     
    ],
     water: [
      { type: 'required', message: 'Water is required.' }
    ]
  };

  constructor( private afs: AngularFirestore, private formBuilder: FormBuilder,) {}
  // motorStatus: Observable<MotorStatus[]>;
  // motorButton: Observable<Motor>;
  history: any = [];
 ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      temp: new FormControl("",  Validators.compose([Validators.required, Validators.pattern("[0-9]*")])),
      soil: new FormControl('', Validators.compose([Validators.required,Validators.pattern("[0-9]*")])),
       humidity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]*")
       
      ])),
       water: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]*")
       
      ])),
    });
    //  this.statusCollection = this.afs.collection<MotorStatus>(
    //   `devices/farmEST17a/history`,
    //   (ref) => ref.orderBy('time', 'desc')
    // );
    // debugger;
    // this.motorStatus = this.statusCollection.valueChanges();

    // this.motorStatus.subscribe((history) => {
    //   // debugger;
    //   this.history = history;
    // });
    // this.motorButton = this.afs
    //   .doc<Motor>(`devices/farmEST17a`)
    //   .valueChanges();
    // this.motorButton.subscribe((state) => {
    //   // this.isChecker = state.motorIsrunning;
      // console.log('On value Observe:' + this.isChecker);
      // debugger;
    // });
 }


 sendData(value){
 this.afs
      .collection("devices")
      .doc("farmEST17a")
      .update({
        temperature: value.temp,
        soil: value.soil,
        water_level:value.water,
        humidity:value.humidity
      })
      .then(() => {
        this.successMessage = "Auto Set Successfully.";
      });
  }

 
}
