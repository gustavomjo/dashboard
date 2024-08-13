import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

  showNotification(message: string) {
    this.messageSource.next(message);
    // Aqui você pode adicionar lógica adicional se necessário
  }
}
