import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Recipe} from '../../../../recipe';

@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.css']
})
export class PrintModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Recipe) { }

  ngOnInit(): void {
  }

  onPrint() {
    window.print();
  }

}
