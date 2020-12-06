import { Component, OnInit } from '@angular/core';
import{ModalController} from '@ionic/angular';
import {AddDevicePage} from '../add-device/add-device.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
})
export class StartupPage implements OnInit {

  constructor(private modalController: ModalController, private navCtrl: NavController,) { }

  openModal(){
    this.modalController.create({component:AddDevicePage}).then((modalElement)=>{
      modalElement.present();
    })
  }
  ngOnInit() {
  }
openPage(){
   this.navCtrl.navigateForward('/home');
}
}
