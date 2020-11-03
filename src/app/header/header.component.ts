import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/_models/user";
import { AuthenticationService } from "@app/_services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  currentUser: User;  

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    this._authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate(["/login"]);
  }
}
