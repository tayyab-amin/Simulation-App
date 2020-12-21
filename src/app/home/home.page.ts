import { registerLocaleData } from "@angular/common";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
// import { ReactiveFormsModule } from "@angular/forms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";

import { NavController, NavParams } from "@ionic/angular";

export interface MotorStatus {
  status: string;
  time: string;
}
export interface Motor {
  startedAt;
  motorIsrunning;
}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  item: any;
  value: any;
  devices: any = [];
  validations_form: FormGroup;
  errorMessage: "";
  successMessage: string = "";
  validation_messages = {
    temp: [{ type: "required", message: "Temp is required." }],
    soil: [{ type: "required", message: "Soil is required." }],
    humidity: [{ type: "required", message: "Humidity is required." }],
    water: [{ type: "required", message: "Water is required." }],
  };

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    // private navParams: NavParams,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    // this.value = navParams.get("item");
    // debugger;
  }
  // motorStatus: Observable<MotorStatus[]>;
  // motorButton: Observable<Motor>;
  // history: any = [];
  ngOnInit(): void {
    this.item = localStorage.getItem("name");
    // debugger;
    /********************************************************************************* */
    this.afs
      .collection("devices", (ref) => ref.where("name", "==", this.item))
      .valueChanges()
      .subscribe((devices) => {
        this.devices = devices;
        debugger;
        // console.log(this.devices);
        // debugger;
      });

    this.validations_form = this.formBuilder.group({
      temp: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ),
      soil: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ),
      humidity: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ),

      water: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]*")])
      ),
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

  sendData(value) {
    this.afs
      .collection("devices")
      .doc(this.item)
      .update({
        temperature: value.temp,
        soil: value.soil,
        water_level: value.water,
        humidity: value.humidity,
      })
      .then(() => {
        this.successMessage = "Auto Set Successfully.";
      });
    this.validations_form.reset();
  }
}
