import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true,
})
export class FormatNamePipe implements PipeTransform {
  transform(value: string, length: number): unknown {
    if (value.length > length) {
      return value.slice(0, length - 3) + '...';
    } else {
      return value;
    }
  }
}
