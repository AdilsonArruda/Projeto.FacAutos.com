import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { FilterCorrectPipe } from './filter-correct.pipe';

@NgModule({
  declarations: [QuizComponent, FilterCorrectPipe],
  imports: [CommonModule],
  exports: [QuizComponent]
})
export class QuizModule { }
