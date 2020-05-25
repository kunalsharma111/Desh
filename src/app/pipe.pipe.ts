import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(value: any, searchText: any, searchDate?: Date): any {
    if (!searchText && !searchDate) {
      return value;
    }
    if (!searchText && searchDate) {
      return value.filter((data) => this.matchValue(data, searchDate));
    }
    if (!searchDate && searchText) {
      return value.filter((data) => this.matchValue(data, searchText));
    }
  }
  matchValue(data, value) {
    return Object.keys(data).map((key) => {
      return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }
}
