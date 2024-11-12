import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<any> {
    return this.http.get(this.configUrl).pipe(
      map(response => {
        // console.log('Config recebida:', response); // Verifique a resposta
        return response;
      }),
      catchError(error => {
        console.error('Erro ao carregar configuração:', error);
        return throwError(error);
      })
    );
  }


}





