import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { DashComponent } from "./components/dash/dash.component";
import { globalVars } from './global/globals';
import { ConfigService } from './services/config.service';

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

  constructor(
    public router: Router,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    this.configService.getConfig().subscribe(config => {
      environment.api = config.servidor;
      // console.log('API URL:', environment.api);
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  ActiveMenu() {
    this.active = !this.active;
    const nav = document.querySelector(".sidebar") as HTMLElement;
    if (nav) {
      nav.classList.toggle('active', this.active);
    }
  }

  onLogout() {
    this.userService.deslogar();
  }
}
