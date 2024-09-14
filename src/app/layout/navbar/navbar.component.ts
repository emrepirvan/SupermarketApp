import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ExchangeRateService } from '../../core/services/exchange-rate.service';
import { SearchedDataService } from '../../core/services/searched-data.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, InputTextModule, FormsModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private exchangeRateService: ExchangeRateService = inject(ExchangeRateService)
  exchangeRates: any;

  ngOnInit(): void {
    this.getRates();
  }
  searchedValue: string = '';
  private searchedDataService: SearchedDataService = inject(SearchedDataService)
  @Output() searchedValueChanged: any = new EventEmitter();

  searched() {
    this.searchedDataService.updateSearchStringData(this.searchedValue);
  }

  getRates(): void {
    this.exchangeRateService.getExchangeRatesPeriodically().subscribe({
      next: data => {
        if (data) {
          data = data.map((item: any) => {
            return {
              code: item.base_code.toLocaleUpperCase(),
              currency: item.conversion_rates.TRY
            }
          }
          )
        }
        this.exchangeRates = data;
      }
    }
    );
  }
}
