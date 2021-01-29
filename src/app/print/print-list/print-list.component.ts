import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print/print.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print-list',
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.scss']
})
export class PrintListComponent implements OnInit {
  printedList;
  produce = [];
  canned = [];
  frozen = [];
  misc = [];
  meat = [];
  baked = [];
  dried = [];
  dairy = [];
  default;
  listTitle;

  constructor(private printService: PrintService, public route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

    this.printService.printedList.subscribe(data => {
      if (data[0].source === 'costco' || data[0].source === 'grocery') {
        this.printedList = data;
        this.printedList.forEach(ingredient => {
          if (ingredient.department === 'Produce') {
            this.produce.push(ingredient);
          } else if (ingredient.department === 'Canned') {
            this.canned.push(ingredient);
          } else if (ingredient.department === 'Dairy') {
            this.dairy.push(ingredient);
          } else if (ingredient.department === 'Misc') {
            this.misc.push(ingredient);
          } else if (ingredient.department === 'Frozen') {
            this.frozen.push(ingredient);
          } else if (ingredient.department === 'Baked') {
            this.baked.push(ingredient);
          } else if (ingredient.department === 'Meat') {
            this.meat.push(ingredient);
          } else if (ingredient.department === 'Dried') {
            this.dried.push(ingredient);
          }
      });
      } else {
        this.default = data;
      }
      this.listTitle = capitalize(data[0].source);
    });
    setTimeout(() => {
      window.print();
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }

}
