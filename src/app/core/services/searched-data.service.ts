import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchedDataService {
  private searchedStringData = new BehaviorSubject<string>(''); 
  currentStringData = this.searchedStringData.asObservable(); 


  updateSearchStringData(newString: string) {
    this.searchedStringData.next(newString.toLocaleLowerCase());
  }

}
