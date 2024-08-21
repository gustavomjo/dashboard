import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  public decodePayloadJWT(): any {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        return jwtDecode(token);
      }
      return null;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}
