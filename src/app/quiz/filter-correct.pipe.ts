import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCorrect'
})
export class FilterCorrectPipe implements PipeTransform {
  transform(answers: { isCorrect: boolean }[]): number {
    if (!answers) return 0;
    return answers.filter(a => a.isCorrect).length;
  }
}
