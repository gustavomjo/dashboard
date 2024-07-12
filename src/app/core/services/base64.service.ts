import { Injectable } from '@angular/core';
import * as base64 from 'base64-js';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  decode(base64String: string): string {
    const decodedBytes = base64.toByteArray(base64String);
    const decodedArray = Array.from(decodedBytes); // Converte Uint8Array para array de números
    return String.fromCharCode.apply(null, decodedArray);
  }
}
