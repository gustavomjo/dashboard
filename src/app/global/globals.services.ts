import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen, take, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class Busca {
  private url!: string;
  private token: string | null = localStorage.getItem('token');
  private header!: HttpHeaders;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    this.updateHeader();
    this.loadConfig();
  }

  private loadConfig() {
    this.configService.getConfig().subscribe(config => {
      this.url = config.servidor;
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  getHtml<T>(request: string): Observable<HttpResponse<T>> {
    // Garantir que a configuração seja carregada antes da requisição
    return this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor; // Atualiza a URL com a configuração carregada
        return this.httpClient.get<T>(this.url + request, { headers: this.header, observe: 'response' }).pipe(
          tap(response => {
            // Armazena o token localmente após a resposta
            this.token = localStorage.getItem('token');
          }),
          retryWhen(errors =>
            errors.pipe(
              tap(() => {
                console.log('Tentativa de nova requisição com token:', this.token);
                this.updateToken(); // Atualiza o token em caso de erro
              }),

              delay(3000), // Tempo de espera entre as tentativas
              take(2) // Limita o número de tentativas a 2
            )
          ),
          catchError(error => {
            console.error('Erro ao realizar a requisição:', error);
            // Trate o erro final aqui (opcional)
            return throwError(() => error);
          })
        );
      })
    );
  }

  deleteRequest(request: string): Observable<any> {
    // Utiliza this.configService.getConfig para garantir que a configuração seja carregada antes de fazer a requisição
    return this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        return this.httpClient.delete(this.url + request, { headers: this.header }).pipe(
          tap(() => {
            this.token = localStorage.getItem('token');
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error);
            this.updateToken();
            return throwError(error);
          }),
          retryWhen(errors =>
            errors.pipe(
              tap(() => {
                console.log('Tentando novamente com novo token:', this.token);
              }),
              delay(5000),
              take(10)
            )
          )
        );
      })
    );
  }


  postComponent(request: string, params: any): Observable<any> {
    return this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        // console.log(this.url + request, params)
        // console.log(params)
        // console.log(params)
        return this.httpClient.post(this.url + request, params, { headers: this.header }).pipe(
          tap(() => {
            this.token = localStorage.getItem('token');
            console.log('Token após requisição:', this.token); // Verifique o token
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error); // Log de erro
            this.updateToken();
            return throwError(error);
          }),
          retryWhen(errors =>
            errors.pipe(
              tap(() => {
                console.log('Tentando novamente com novo token:', this.token);
              }),
              delay(5000),
              take(10)
            )
          )
        );
      })
    );
  }


  putComponent(request: string, params: string): Observable<any> { // Alterado para retornar um Observable
    // Utiliza this.configService.getConfig para garantir que a configuração seja carregada antes de fazer a requisição
    // console.log(params)
    // console.log(this.url + request, params)
    return this.configService.getConfig().pipe(
      switchMap(config => {
        this.url = config.servidor;
        return this.httpClient.put(this.url + request, params, { headers: this.header }).pipe(
          tap(() => {
            this.token = localStorage.getItem('token');
          }),
          catchError(error => {
            console.error('Erro ao subscrever:', error);
            this.updateToken();
            return throwError(error);
          }),
          retryWhen(errors =>
            errors.pipe(
              tap(() => {
                console.log('Tentando novamente com novo token:', this.token);
              }),
              delay(5000),
              take(10)
            )
          )
        );
      })
    );
  }


  private updateToken() {
    this.token = localStorage.getItem('token');
    this.updateHeader(this.token);
  }

  private updateHeader(token: string | null = this.token) {
    this.header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'

    });
  }
}
