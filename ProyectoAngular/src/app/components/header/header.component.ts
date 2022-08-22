import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isCollapsed= true;
  constructor(private acct: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn =this.acct.isLoggedIn();
    console.log(this.isLoggedIn );
    this.acct.isLoggedInObservable().subscribe(isLoggedIn => this.isLoggedIn =isLoggedIn);
    document.getElementById('navigation').addEventListener("focusout", this.hideNavBar);
  }
  hideNavBar():void {
    console.log("Probando")
    document.getElementById("navigation").classList.remove("show");
}
  onLogOut(): void{
    this.acct.logout();
  }
}
