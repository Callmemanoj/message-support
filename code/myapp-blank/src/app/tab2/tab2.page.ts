import { Component, OnInit } from "@angular/core";
import { loginService } from "./login.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-tab2",
  templateUrl: "./tab2.page.html",
  styleUrls: ["./tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  constructor(public service: loginService, public router: Router) {}
  public login(data) {
    return this.service.authenticate(data).subscribe(
      (posRes) => {
        if (posRes.login == "success") {
          let str = JSON.stringify(posRes);
          window.localStorage.setItem("user_register", str);
          this.router.navigate(["/tabs/tab3"]);
        } else {
          alert("Login Failed");
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
