import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: any, insurance:string, date:Date): any {
    let arr = [];
    console.log(date);
    if(insurance=='') {
      return null;
    }
    value.forEach(element=>{
      if(element.insurance == insurance) {

        console.log("truth");
        arr.push(element);
      }
    })
    return arr;
  }

}
