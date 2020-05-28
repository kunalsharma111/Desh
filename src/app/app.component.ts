import { Component } from '@angular/core';
import { DataTransferService } from './shared/data-transfer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'desh';
  constructor(service : DataTransferService){
    service.loadRouting();
  }
}
