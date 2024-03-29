import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Links } from '../../interfaces/links';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() links: Links[] = [];
  @Output() page: EventEmitter<string> = new EventEmitter<string>();
  current : number = 1;

  otherPage(event: string | null) {
      if (event !== "..." && event != null) {
          this.page.emit(event.split("=")[1]);
          // this.current = +event;
      }
  }




  pagination(c: number, m: number): (number | string)[] {
      let current: number = c;
      const last: number = m;
      const delta: number = 2;
      const left: number = current - delta;
      const right: number = current + delta + 1;
      const range: number[] = [];
      const rangeWithDots: (number | string)[] = [];
      let l: number | undefined;

      for (let i = 1; i <= last; i++) {
          if (i == 1 || i == last || (i >= left && i < right)) {
              range.push(i);
          }
      }

      for (const i of range) {
          if (l !== undefined) {
              if (i - l === 2) {
                  rangeWithDots.push(l + 1);
              } else if (i - l !== 1) {
                  rangeWithDots.push('...');
              }
          }
          rangeWithDots.push(i);
          l = i;
      }
      return rangeWithDots;
  }

  nextOrPreviewPage( url : string | null){
      if(url != null){
              this.otherPage(url[url.length - 1]);

      }
  }

}
