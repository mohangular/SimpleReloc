import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error:string;
  showSpinner = false;
  constructor(private router: Router, private logger: NGXLogger) {
    this.logger.debug("Debug message");
    this.logger.info("Info message");
    this.logger.log("Default log message");
    this.logger.warn("Warning message");
    this.logger.error("Error message");
  }

  ngOnInit() {}

  login() {
    this.showSpinner = true;
    if (this.username == "admin" && this.password == "admin") {
      this.showSpinner = false;
      this.router.navigate(["home"]);
    } else {
      this.showSpinner = false;
      this.error = "Invalid Credentials";
    }
  }
}
    

