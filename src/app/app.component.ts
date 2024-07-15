import { userService } from './services/user.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashComponent } from "./components/dash/dash.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { globalData,globalVars } from './globals';



@Component({
    selector: 'app-root',
    standalone: true, 
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, DashComponent,RouterModule]
})
export class AppComponent implements OnInit{
  isMobile = globalVars.gbMobile;
  active = false;

  constructor(public router: Router,
    private userService:userService,
    private BreakpointObserver: BreakpointObserver
  ) {
    globalVars.gbMobile = this.BreakpointObserver.isMatched('(max-width: 768px)');
    this.isMobile = globalVars.gbMobile;
  }

  ngOnInit(): void { }

  ActiveMenu(){
    this.active = !this.active;
    const nav = document.querySelector(".sidebar") as HTMLElement;
  }
  onLogout(){
    this.userService.deslogar();
  }


}
