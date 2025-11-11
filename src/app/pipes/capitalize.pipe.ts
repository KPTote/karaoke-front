import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
console.log(value);
    const firstCharacter = value.trim().charAt(0).toUpperCase();
    return firstCharacter + value.slice(1)

  }

}
