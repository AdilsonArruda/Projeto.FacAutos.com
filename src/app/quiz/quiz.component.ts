import { Component, OnInit, OnDestroy } from '@angular/core';
import { QUIZ_QUESTIONS, QuizQuestion } from './quiz-questions';

interface AnswerRecord {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

interface CategoryScore {
  category: string;
  correct: number;
  total: number;
  percentage: number;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  answers: AnswerRecord[] = [];
  quizStarted = false;
  quizFinished = false;
  showExplanation = false;
  answeredCurrent = false;

  // Timer
  timeRemaining = 0;
  timerInterval: any = null;
  totalTimeSeconds = 120 * 60; // 120 minutes

  // Results
  totalScore = 0;
  passingScore = 70;
  categoryScores: CategoryScore[] = [];

  // Pagination for review
  reviewMode = false;

  ngOnInit() {
    this.questions = this.shuffleArray([...QUIZ_QUESTIONS]);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startQuiz() {
    this.quizStarted = true;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.answers = [];
    this.showExplanation = false;
    this.answeredCurrent = false;
    this.reviewMode = false;
    this.timeRemaining = this.totalTimeSeconds;
    this.startTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  get formattedTime(): string {
    const hours = Math.floor(this.timeRemaining / 3600);
    const minutes = Math.floor((this.timeRemaining % 3600) / 60);
    const seconds = this.timeRemaining % 60;
    if (hours > 0) {
      return `${hours}:${this.pad(minutes)}:${this.pad(seconds)}`;
    }
    return `${minutes}:${this.pad(seconds)}`;
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get progressPercentage(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get answeredCount(): number {
    return this.answers.length;
  }

  selectAnswer(index: number) {
    if (!this.answeredCurrent) {
      this.selectedAnswer = index;
    }
  }

  confirmAnswer() {
    if (this.selectedAnswer === null || this.answeredCurrent) return;

    this.answeredCurrent = true;
    this.showExplanation = true;

    const isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;
    this.answers.push({
      questionId: this.currentQuestion.id,
      selectedAnswer: this.selectedAnswer,
      isCorrect: isCorrect
    });
  }

  nextQuestion() {
    this.showExplanation = false;
    this.answeredCurrent = false;
    this.selectedAnswer = null;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishQuiz();
    }
  }

  previousQuestion() {
    if (this.reviewMode && this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  finishQuiz() {
    this.clearTimer();
    this.quizFinished = true;
    this.quizStarted = false;
    this.calculateResults();
  }

  calculateResults() {
    const correctAnswers = this.answers.filter(a => a.isCorrect).length;
    this.totalScore = Math.round((correctAnswers / this.questions.length) * 100);

    const categoryMap = new Map<string, { correct: number; total: number }>();

    this.questions.forEach((q, index) => {
      if (!categoryMap.has(q.category)) {
        categoryMap.set(q.category, { correct: 0, total: 0 });
      }
      const cat = categoryMap.get(q.category);
      cat.total++;

      const answer = this.answers.find(a => a.questionId === q.id);
      if (answer && answer.isCorrect) {
        cat.correct++;
      }
    });

    this.categoryScores = [];
    categoryMap.forEach((value, key) => {
      this.categoryScores.push({
        category: key,
        correct: value.correct,
        total: value.total,
        percentage: Math.round((value.correct / value.total) * 100)
      });
    });
  }

  startReview() {
    this.reviewMode = true;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
  }

  backToResults() {
    this.reviewMode = false;
    this.quizFinished = true;
    this.currentQuestionIndex = 0;
  }

  restartQuiz() {
    this.quizFinished = false;
    this.quizStarted = false;
    this.reviewMode = false;
    this.questions = this.shuffleArray([...QUIZ_QUESTIONS]);
    this.answers = [];
    this.currentQuestionIndex = 0;
  }

  getAnswerForQuestion(questionId: number): AnswerRecord | undefined {
    return this.answers.find(a => a.questionId === questionId);
  }

  getOptionClass(optionIndex: number): string {
    if (this.reviewMode) {
      const answer = this.getAnswerForQuestion(this.currentQuestion.id);
      if (optionIndex === this.currentQuestion.correctAnswer) {
        return 'correct';
      }
      if (answer && answer.selectedAnswer === optionIndex && !answer.isCorrect) {
        return 'incorrect';
      }
      return '';
    }

    if (!this.answeredCurrent) {
      return this.selectedAnswer === optionIndex ? 'selected' : '';
    }

    if (optionIndex === this.currentQuestion.correctAnswer) {
      return 'correct';
    }
    if (this.selectedAnswer === optionIndex && optionIndex !== this.currentQuestion.correctAnswer) {
      return 'incorrect';
    }
    return '';
  }

  getScoreClass(): string {
    if (this.totalScore >= this.passingScore) return 'text-success';
    return 'text-danger';
  }

  getCategoryBarClass(percentage: number): string {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-danger';
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
