import { Component } from "@angular/core";
import { XMPPService } from "./ejab.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "ejab";
  private jid: string = "";
  private host: string = "";
  private password: string = "";
  private username: string = "";
  messageHide: boolean = true;
  paramsObject;
  message;
  user;
  loginButton: boolean = true;

  constructor(public xmppService: XMPPService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.paramsObject = { ...params.keys, ...params };
      console.log(
        this.paramsObject.params.username,
        this.paramsObject.params.password
      );
      localStorage.setItem("username", this.paramsObject.params.username);
      localStorage.setItem("password", this.paramsObject.params.password);
    });
    this.host = "ec2-44-195-129-233.compute-1.amazonaws.com";
  }

  login() {
    // this.xmppService.logout();
    //console.info('varun login');
    this.loginButton = false;
    this.messageHide = false;
    this.xmppService.login(
      localStorage.getItem("username"),
      this.host,
      localStorage.getItem("password")
    );
    // this.xmppService.login(localStorage.getItem('username'), this.host, localStorage.getItem('password'));
  }

  sendMessage() {
    this.xmppService.sendMessage(
      `${this.user}@ec2-44-195-129-233.compute-1.amazonaws.com`,
      `${this.message}`
    );
  }

  createGroup() {
    this.xmppService.createGroup("varun");
  }

  listRooms() {
    this.xmppService.listRooms(
      (result) => console.log("Success: ", result),
      (error) => console.log("Error: ", error)
    );
  }

  logout() {
    this.loginButton = true;
    this.messageHide = true;
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.xmppService.logout();
  }
}
