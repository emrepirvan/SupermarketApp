import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { SearchedDataService } from '../../core/services/searched-data.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchedValue: string = '';
  private searchedDataService: SearchedDataService = inject(SearchedDataService)
  @Output() searchedValueChanged: any = new EventEmitter();

  searched() {
    this.searchedDataService.updateSearchStringData(this.searchedValue);
  }
}
