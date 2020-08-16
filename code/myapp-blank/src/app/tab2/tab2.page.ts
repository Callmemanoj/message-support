import { Component, OnInit } from "@angular/core";
import { loginService } from "./login.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from "firebase/app";
import { User } from "../models/user.module";
import {
  ToastController,
  LoadingController,
  NavController,
} from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  user = {} as User;
  constructor(
    public service: loginService,
    public router: Router,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}
  public uname: any;
  public upwd: any;
  // public login(data) {
  //   return this.service.authenticate(data).subscribe(
  //     (posRes) => {
  //       if (posRes.login == "success") {
  //         let str = JSON.stringify(posRes);
  //         window.localStorage.setItem("user_register", str);
  //         this.router.navigate(["/dashboard"]);
  //       } else {
  //         alert("Login Failed");
  //       }
  //     },
  //     (errRes: HttpErrorResponse) => {
  //       if (errRes.error instanceof Error) {
  //         console.log("Client Side Error");
  //       } else {
  //         console.log("Server Side Error");
  //       }
  //     }
  //   );
  // }
  public google() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log("Manoj");
    this.router.navigate(["/dashboard"]);
  }

  ngOnInit() {}

  async login(user: User) {
    if (this.formValidation()) {
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please Wait",
      });
      (await loader).present();

      try {
        await this.afAuth.auth
          .signInWithEmailAndPassword(user.uname, user.upwd)
          .then((data) => {
            console.log(data);
            //redirect to dashboard;
            this.navCtrl.navigateRoot("/dashboard");
          });
      } catch (e) {
        this.showToast(e);
      }

      //dismiss
      (await loader).dismiss();
    }
  }

  formValidation() {
    if (!this.user.uname) {
      this.showToast("Enter Username");
      return false;
    }

    if (!this.user.upwd) {
      this.showToast("Enter Password");
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }
}
