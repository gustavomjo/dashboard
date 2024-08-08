import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { globalData } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class FiltrodataService {
  public data_de:string="";
  public data_ate:string="";
  private updateSubject = new Subject<void>();

  constructor() {
    this.updateSubject.subscribe(() => {
      if (this.onUpdateCallback) {
        this.onUpdateCallback();
      }
    });
  }

  private onUpdateCallback: (() => void) | null = null;

  setOnUpdateCallback(callback: () => void): void {
    this.onUpdateCallback = callback;
  }

  notifyUpdate(): void {
    this.updateSubject.next();
  }
}
