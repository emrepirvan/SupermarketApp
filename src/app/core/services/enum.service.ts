import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { };

}


export enum MarketType {
  A='Market A',
  B='Market B'
}

export enum ModalMode {
  EDIT = 'edit',
  ADD = 'add'
}