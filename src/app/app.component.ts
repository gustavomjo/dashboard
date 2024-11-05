import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { DashComponent } from "./components/dash/dash.component";
import { globalVars } from './global/globals';
import { ConfigService } from './services/config.service';
import { JwtDecodeService } from './services/jwt-decode.service';
import { filter } from 'rxjs/operators';

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
  globalVars = globalVars;

  constructor(
    public router: Router,


    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
    private jwtDecoder : JwtDecodeService,
  ) {}


  ngOnInit(): void {



    // this.currentPath = this.activatedRoute.snapshot.url.map(segment => segment.path).join('/');
    // console.log('Caminho atual:', this.currentPath);

    this.isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    this.configService.getConfig().subscribe(config => {
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
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
