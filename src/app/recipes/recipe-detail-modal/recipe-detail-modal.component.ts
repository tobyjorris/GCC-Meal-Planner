import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Recipe} from '../../../recipe';

@Component({
  selector: 'recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html'
})

export class NgbdModalBasic implements OnInit {
  closeResult = '';
  @Input() recipe: Recipe;


  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngOnInit(): void {
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  // updateQuantity() {
  //   const quantityChange = this.quantityChangeRef.nativeElement.value;
  //   console.log(quantityChange);
  //   for (const ingredient of this.recipe.ingredients) {console.log(ingredient.quantity);
  //   }
  // }

}
