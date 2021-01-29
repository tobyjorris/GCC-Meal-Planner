import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit {
  @Input() historyItem;
  @Input() testProperty;
  constructor() { }

  ngOnInit(): void {
  }

}
