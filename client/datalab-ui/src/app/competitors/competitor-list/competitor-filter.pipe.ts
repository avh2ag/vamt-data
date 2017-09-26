import { Pipe, PipeTransform } from '@angular/core';
import { Competitor } from '../../config/models';

@Pipe({
    name: 'competitorFilter'
})
export class CompetitorPipe implements PipeTransform {
  transform(items: Competitor[], value: any): any {
    if(!items || !value) {
      return items;
    }
    return items.filter(item => {
   		return item.first_name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
    
  }
}