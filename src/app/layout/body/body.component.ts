import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Aisle } from '../../core/models/aisle.model';
import { TagModule } from 'primeng/tag';
import { ModalAisleAddComponent } from "../../core/components/modal-aisle-add/modal-aisle-add.component";
import { ModalProductComponent } from "../../core/components/modal-product/modal-product.component";
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [TableModule, ButtonModule, TagModule, ModalAisleAddComponent, ModalProductComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  aislesOfMarketA: Aisle[] = [{
    aisleNumber: 'R1',
    type: 'Gıda',
    products: ['Pirinç', 'Ekmek', 'Un', 'Makarna']
  }, {
    aisleNumber: 'R2',
    type: 'Temizlik',
    products: ['Bez', 'Deterjan', 'Sabun', 'Sünger']
  }, {
    aisleNumber: 'R3',
    type: 'Kırtasiye',
    products: ['Kalem', 'Defter', 'Silgi']
  }, {
    aisleNumber: 'R4',
    type: 'Gıda',
    products: ['Pirinç', 'Un', 'Bulgur', 'Salça']
  },];

  aislesOfMarketB: Aisle[] = [{
    aisleNumber: 'R1',
    type: 'Gıda',
    products: ['Ekmek', 'Un', 'Makarna']
  }, {
    aisleNumber: 'R2',
    type: 'Temizlik',
    products: ['Sabun', 'Toz', 'Bezi']
  }, {
    aisleNumber: 'R3',
    type: 'Kırtasiye',
    products: ['Silgi', 'Kalemtraş', 'Kalem', 'Defter']
  }];
  modalAisleAddData: any = {};


  addAisle() {
    this.modalAisleAddData.open = true
  }

}
