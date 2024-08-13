import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../../services/notification.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  visible: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.message$.subscribe(message => {
      this.message = message;
      this.visible = message !='';
        timer(10000).subscribe(() => this.visible = false);
    });
  }
}
