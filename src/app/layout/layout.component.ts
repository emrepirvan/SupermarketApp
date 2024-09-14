import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from "./body/body.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, BodyComponent, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [MessageService]
})
export class LayoutComponent {

}
