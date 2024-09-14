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
    {
      marketType: MarketType.A, aisleNumber: 'R1', type: 'Gıda', products: [{ id: '21341235', name: 'Pirinç' }, { id: '2314234', name: 'Ekmek' }, { id: '235346', name: 'Un' }, { id: '45645', name: 'Makarna' }]
    },
    {
      marketType: MarketType.A, aisleNumber: 'R2', type: 'Temizlik', products: [{ id: '3245', name: 'Bez' }, { id: '3246567', name: 'Deterjan' }, { id: '5435432', name: 'Sabun' }, { id: '1321312', name: 'Sünger' }]
    },
    {
      marketType: MarketType.A, aisleNumber: 'R3', type: 'Kırtasiye', products: [{ id: '534534', name: 'Kalem' }, { id: '345345', name: 'Defter' }, { id: '15465436', name: 'Silgi' }]
    },
    {
      marketType: MarketType.A, aisleNumber: 'R4', type: 'Gıda', products: [{ id: '654356435', name: 'Pirinç' }, { id: '43563456', name: 'Un' }, { id: '45363456', name: 'Bulgur' }, { id: '4364356435', name: 'Salça' }]

    }];

  aislesOfMarketB: Aisle[] = [
    {
      marketType: MarketType.B, aisleNumber: 'R1', type: 'Gıda', products: [{ id: '43563456', name: 'Ekmek' }, { id: '43563456', name: 'Un' }, { id: '34564356', name: 'Makarna' }]
    },
    {
      marketType: MarketType.B, aisleNumber: 'R2', type: 'Temizlik', products: [{ id: '45364356', name: 'Sabun' }, { id: '43563457', name: 'Toz' }, { id: '453756765', name: 'Bezi' }]
    },
    {
      marketType: MarketType.B, aisleNumber: 'R3', type: 'Kırtasiye', products: [{ id: '765756', name: 'Silgi' }, { id: '12312543', name: 'Kalemtr aş' }, { id: '005474345121', name: 'Kalem' }, { id: '00213121', name: 'Defter' }]
    }]
    ;
  modalAisleAddData: ModalData = new ModalData()
  modalProductData: ModalData = new ModalData()



  addAisle(marketType: MarketType) {
    this.modalAisleAddData.open = true;
    this.modalAisleAddData.data.marketType = marketType;
    this.modalAisleAddData.data.nextAisleNumber = undefined;
    let marketAisleData = marketType == MarketType.B ? this.aislesOfMarketA : this.aislesOfMarketB;

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
      products: [],
      marketType: AddedAisle.marketType
    }
    const addedMarket = MarketType.A == AddedAisle.marketType ? this.aislesOfMarketA : this.aislesOfMarketB
    addedMarket.push(newAisle);
    addedMarket.sort((a, b) => {
      const aisleA = parseInt(a.aisleNumber.substring(1));
      const aisleB = parseInt(b.aisleNumber.substring(1));
      return aisleA - aisleB;
    })
  }

  productAddedOrEdited(productModalData: any) {
    if (productModalData.newProductData) {
      const market: Aisle[] = productModalData.aisleData.marketType == MarketType.A ? this.aislesOfMarketA : this.aislesOfMarketB;
      const aisle = market.find((item: Aisle) => item.aisleNumber == productModalData.newProductData.aisle)
      aisle?.products.push(productModalData.newProductData)
    } else {

    }
  }
}
