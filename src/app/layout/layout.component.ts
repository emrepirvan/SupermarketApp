import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SearchedDataService } from '../core/services/searched-data.service';
import { BodyComponent } from "./body/body.component";
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, BodyComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [MessageService, SearchedDataService]
})
export class LayoutComponent {

}
