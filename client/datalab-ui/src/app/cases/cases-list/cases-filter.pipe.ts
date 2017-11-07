import { Pipe, PipeTransform } from '@angular/core';
import { Case } from '../../config/models';

@Pipe({
    name: 'casesFilter'
})
export class CasesPipe implements PipeTransform {
  transform(items: Case[], value: any): any {
    if(!items || !value) {
      return items;
    }
    return items.filter(item => {
   		return item.case_name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
    
  }
}