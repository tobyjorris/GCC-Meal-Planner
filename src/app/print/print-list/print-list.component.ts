import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrintService} from '../../services/print.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-print-list',
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.css']
})
export class PrintListComponent implements OnInit {
  listId: string;
  printedList;
  listTitle;

  constructor(private printService: PrintService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    this.printService.printedList.subscribe(data => {
      this.printedList = data;
      this.listTitle = capitalize(data[0].source);
    });
    setTimeout(() => {
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
    console.log(this.printedList);
  }



}
