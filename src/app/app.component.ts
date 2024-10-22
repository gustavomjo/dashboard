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

  dash = false;
  dash_fin = false;
  dash_fat = false;
  dash_farm = false;
  dash_receitas = false;
  admin = false;


  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
    private jwtDecoder : JwtDecodeService
  ) {}


  ngOnInit(): void {


    this.isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    this.configService.getConfig().subscribe(config => {
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      environment.api = config.servidor;
      // console.log('API URL:', environment.api);
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });

    this.dash = false;
    this.dash_fin = false;
    this.dash_fat = false;
    this.dash_farm = false;
    this.dash_receitas = false;
    this.admin = false;
    let currentRoute: string = '';
    // Escuta eventos de navegação
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        currentRoute = this.router.url; // Captura a URL atual
        // console.log('Rota ativa:', currentRoute); // Exibe a rota ativa
      });
      console.log(currentRoute)
    if (currentRoute!=''){
      const payload = this.jwtDecoder.decodePayloadJWT(localStorage.getItem('token'));
      this.dash = payload.dash == 'S';
      this.dash_fin = payload.dash_fin == 'S';
      this.dash_fat = payload.dash_fat == 'S';
      this.dash_farm = payload.dash_farm == 'S';
      this.dash_receitas = payload.dash_receitas == 'S';
      this.admin = payload.admin == 'S';
    }
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
