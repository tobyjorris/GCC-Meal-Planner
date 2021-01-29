import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() source;
  constructor() { }

  ngOnInit(): void {
    if (this.source === 'property') {
      console.log('test successful');
    }
  }

}
