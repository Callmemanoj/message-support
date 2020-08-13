import { Component, OnInit } from "@angular/core";
import { registerService } from "./register.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab1",
  templateUrl: "./tab1.page.html",
  styleUrls: ["./tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  constructor(public service: registerService, public router: Router) {}
  public ufirst: any;
  public ulast: any;
  public uname: any;
  public upwd: any;
  public enroll(data: any): any {
    this.service.insert(data).subscribe(
      (posRes) => {
        if (posRes.register == "success") {
          console.log("Registration Success");
          alert("Register Success");
          this.router.navigate(["/tabs/tab2"]);
        } else {
          alert("Registration Failed");
        }
      },
      (errRes: HttpErrorResponse) => {
        if (errRes.error instanceof Error) {
          console.log("Client Side Error");
        } else {
          console.log("Server Side Error");
        }
      }
    );
  }

  ngOnInit() {}
}
