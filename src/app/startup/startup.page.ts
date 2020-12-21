import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddDevicePage } from "../add-device/add-device.page";
import { NavController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-startup",
  templateUrl: "./startup.page.html",
  styleUrls: ["./startup.page.scss"],
})
export class StartupPage implements OnInit {
  devices: any = [];

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private afs: AngularFirestore
  ) {}

  openModal() {
    this.modalController
      .create({ component: AddDevicePage })
      .then((modalElement) => {
        modalElement.present();
      });
  }
  ngOnInit() {
    this.afs
      .collection("devices")
      .valueChanges()
      .subscribe((devices) => {
        this.devices = devices;
        console.log(this.devices);
        // debugger;
      });
  }
  openPage(item) {
    console.log(item);
    console.log(item.name);
    this.navCtrl.navigateForward([`/home`, { item: item }]);
    // debugger;
  }
}
