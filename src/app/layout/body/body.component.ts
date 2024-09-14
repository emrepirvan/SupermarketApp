import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ModalAisleAddComponent } from "../../core/components/modal-aisle-add/modal-aisle-add.component";
import { ModalProductComponent } from "../../core/components/modal-product/modal-product.component";
import { Aisle } from '../../core/models/aisle.model';
import { ModalData } from '../../core/models/modal-data.model';
import { MarketType, ModalMode } from '../../core/services/enum.service';
@Component({
  selector: 'app-body',
  standalone: true,
  imports: [TableModule, ButtonModule, TagModule, ModalAisleAddComponent, ModalProductComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  MarketType = MarketType;
  ModalMode = ModalMode;
  aislesOfMarketA: Aisle[] = [
    { aisleNumber: 'R1', type: 'Gıda', products: ['Pirinç', 'Ekmek', 'Un', 'Makarna'] },
    { aisleNumber: 'R2', type: 'Temizlik', products: ['Bez', 'Deterjan', 'Sabun', 'Sünger'] },
    { aisleNumber: 'R3', type: 'Kırtasiye', products: ['Kalem', 'Defter', 'Silgi'] },
    { aisleNumber: 'R4', type: 'Gıda', products: ['Pirinç', 'Un', 'Bulgur', 'Salça'] }];

  aislesOfMarketB: Aisle[] = [
    { aisleNumber: 'R1', type: 'Gıda', products: ['Ekmek', 'Un', 'Makarna'] },
    { aisleNumber: 'R2', type: 'Temizlik', products: ['Sabun', 'Toz', 'Bezi'] },
    { aisleNumber: 'R3', type: 'Kırtasiye', products: ['Silgi', 'Kalemtraş', 'Kalem', 'Defter'] }]
    ;
  modalAisleAddData: ModalData = new ModalData()
  modalProductData: ModalData = new ModalData()



  addAisle(marketType: MarketType) {
    this.modalAisleAddData.open = true;
    this.modalAisleAddData.data.marketType = marketType;
    this.modalAisleAddData.data.nextAisleNumber = undefined;
    let marketAisleData = marketType == MarketType.A ? this.aislesOfMarketA : this.aislesOfMarketB;

    marketAisleData.forEach((value: Aisle, index: number, array: Aisle[]) => {
      if (this.modalAisleAddData.data.nextAisleNumber) return
      if (value.aisleNumber != 'R' + (index + 1)) {
        this.modalAisleAddData.data.nextAisleNumber = 'R' + (index + 1);
        return
      }
      if (array.length - 1 == index) {
        this.modalAisleAddData.data.nextAisleNumber = 'R' + (index + 2);
      }
    });
  }

  openProductModal(aisle: any, mode: ModalMode, product?: any) {
    this.modalProductData.open = true;
    this.modalProductData.mode = mode;
    this.modalProductData.data.aisleData = aisle;
    this.modalProductData.data.selectedProduct = product
  }

  deleteAisle(deletedAisle: Aisle, marketType: MarketType) {
    if (marketType == MarketType.A) {
      this.aislesOfMarketA = this.aislesOfMarketA.filter((aisle: Aisle) => {
        return aisle.aisleNumber !== deletedAisle.aisleNumber
      });
    }
    else if (marketType == MarketType.B) {
      this.aislesOfMarketB = this.aislesOfMarketB.filter((aisle: Aisle) => {
        return aisle.aisleNumber !== deletedAisle.aisleNumber
      });
    }
  }


  aisleAdded(AddedAisle: any) {
    let newAisle: Aisle = {
      aisleNumber: AddedAisle.aisleNumber,
      type: AddedAisle.type,
      products: []
    }
    const addedMarket = MarketType.A == AddedAisle.marketType ? this.aislesOfMarketA : this.aislesOfMarketB
    addedMarket.push(newAisle);
    addedMarket.sort((a, b) => {
      const aisleA = parseInt(a.aisleNumber.substring(1));
      const aisleB = parseInt(b.aisleNumber.substring(1));
      return aisleA - aisleB;
    })
  }
}
