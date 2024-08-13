import { ApplicationConfig } from '@angular/core';
import { ROUTER_CONFIGURATION, provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NotificationService } from './services/notification.service';
import { NotificationComponent } from './components/notification/notification.component';


export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes, withComponentInputBinding()),
                {
                  provide: ROUTER_CONFIGURATION,
                  useValue: {
                    bindToComponentInputs: true,
                  }
                },
              HttpClient,
              provideHttpClient(), provideAnimationsAsync(),
              NotificationService
              ],

};

// adicionado aqui este providerouter para solucionar o problema de rotas
// provideRouter(routes, withComponentInputBinding()),
//     {
//       provide: ROUTER_CONFIGURATION,
//       useValue: {
//         bindToComponentInputs: true,
//       }
//     },
