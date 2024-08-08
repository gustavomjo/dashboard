import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrodataService {
  public data_de: string = "";
  public data_ate: string = "";
  private updateSubject = new Subject<void>();
  private updateCallbacks: (() => void)[] = [];

  constructor() {
    this.updateSubject.subscribe(() => {
      this.updateCallbacks.forEach(callback => callback());
    });
  }

  addOnUpdateCallback(callback: () => void): void {
    this.updateCallbacks.push(callback);
  }

  notifyUpdate(): void {
    this.updateSubject.next();
  }
}
