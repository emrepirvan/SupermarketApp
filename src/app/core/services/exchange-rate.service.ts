import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, interval, Observable, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  private readonly baseUrl = 'https://v6.exchangerate-api.com/v6/4904a931813e3877b8d96283/latest/';
  private readonly refreshInterval = 30000;
  private readonly baseCurrencies = ['USD', 'GBP', 'EUR'];

  constructor(private http: HttpClient) { }

  getExchangeRatesPeriodically(): Observable<any[]> {
    return interval(this.refreshInterval).pipe(
      startWith(0),
      switchMap(() => this.getAllExchangeRates())
    );
  }

  private getAllExchangeRates(): Observable<any[]> {
    const requests = this.baseCurrencies.map(currency => this.getExchangeRates(currency));
    return forkJoin(requests);
  }

  private getExchangeRates(currency: string): Observable<any> {
    const url = `${this.baseUrl}${currency}`;
    return this.http.get<any>(url);
  }
}
