import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-add-device",
  templateUrl: "./add-device.page.html",
  styleUrls: ["./add-device.page.scss"],
})
export class AddDevicePage implements OnInit {
  validations_form: FormGroup;
  validation_messages = {
    devicename: [{ type: "required", message: " Device Name is required." }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private afs: AngularFirestore
  ) {}

  Close() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      devicename: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
    });
  }

  tryAdd(value) {
    const id = value.devicename;
    const ref = this.afs.collection("devices").doc(id);
    ref.set({
      name: value.devicename,
      soil: "0",
      humidity: "0",
      temperature: "0",
      motorIsrunning: false,
      startedAt: "0",
      water_level: "0",
      min: "0",
      max: "0",
      autoIsrunning: false,
    });

    console.log(value);
    this.validations_form.reset();
  }
}
