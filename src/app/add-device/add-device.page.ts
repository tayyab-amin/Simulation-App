import { Component, OnInit } from '@angular/core';
import{ModalController} from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
 validations_form: FormGroup;
validation_messages = {
    devicename: [
      { type: 'required', message: ' Device Name is required.' },
    ],
};

  constructor( private formBuilder: FormBuilder,private modalController: ModalController) { }

  Close(){
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      devicename: new FormControl('', Validators.compose([
        Validators.required
      ])),});
  }

}
