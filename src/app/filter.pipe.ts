import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(value: any, name:string): any {
    let arr = [];
    if(name == '') {
      return value;
    }
    value.forEach(element=>{
      if(element.insurance == name) {
        arr.push(element);
      }
    })
    return arr;
  }

}
