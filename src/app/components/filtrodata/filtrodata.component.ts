import { Component } from '@angular/core';
import { FiltrodataService } from './filtrodata.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';

@Component({
  selector: 'app-filtrodata',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './filtrodata.component.html',
  styleUrls: ['./filtrodata.component.scss']
})
export class FiltrodataComponent {

  constructor(public filtrodataService: FiltrodataService) {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
  }

  public onDateIn(event: any): void {
    this.filtrodataService.data_de = moment(new Date(event)).format('DD-MM-YYYY');

  }

  public onDateUntil(event: any): void {
    this.filtrodataService.data_ate = moment(new Date(event)).format('DD-MM-YYYY');
    this.filtrodataService.notifyUpdate();
  }

  public atualiza(): void {  }
}
