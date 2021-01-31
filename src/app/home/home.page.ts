// import { registerLocaleData } from "@angular/common";
// import { analyzeAndValidateNgModules } from "@angular/compiler";
import { conditionallyCreateMapObjectLiteral } from "@angular/compiler/src/render3/view/util";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";

import { ActivatedRoute } from "@angular/router";

import { NavController, NavParams } from "@ionic/angular";
// import { runInThisContext } from "vm";

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
  motorStatus: boolean;
  setValue: boolean;
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
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.item = localStorage.getItem("name");

    this.afs
      .collection("devices", (ref) => ref.where("name", "==", this.item))
      .valueChanges()
      .subscribe((devices) => {
        this.devices = devices;
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

  setData() {
    if (this.setValue) {
      console.log("true here");
    } else {
      console.log("false here");
      let autoTemp = Math.random() * 100;
      autoTemp = autoTemp / 2;
      autoTemp = Math.round(autoTemp);
      let autoHumidity = Math.random() * 100;
      autoHumidity = Math.round(autoHumidity);
      let autoSoil = Math.random() * 100;
      autoSoil = Math.round(autoSoil);
      let autoWater = Math.random() * 100;
      autoWater = Math.round(autoWater);
      console.log(autoHumidity, autoSoil, autoTemp, autoWater);
      this.afs
        .collection("devices")
        .doc(this.item)
        .update({
          temperature: autoTemp,
          soil: autoSoil,
          water_level: autoWater,
          humidity: autoHumidity,
        })
        .then(() => {
          this.successMessage = "Auto Set Successfully.";
        });
    }
  }

  setAuto() {
    this.setValue = !this.setValue;
    setInterval(() => {
      this.setData();
    }, 10000);
  }

  setMotorStatus() {
    this.motorStatus = !this.motorStatus;
    console.log(this.motorStatus);
  }
}
