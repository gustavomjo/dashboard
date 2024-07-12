import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {MatSelectModule} from '@angular/material/select';

import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DashComponent} from '../dash/dash.component'

@Component({
  selector: 'app-menutop',
  standalone: true,
  imports: [AppComponent,MatFormFieldModule, MatDatepickerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './menutop.component.html',
  styleUrl: './menutop.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MenutopComponent implements OnInit{



  ngOnInit()
  {
    const frmFilter =  document.querySelectorAll('frmFilter');
  }



}

