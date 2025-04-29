import { Component } from '@angular/core';
import { FormGroup, FormArray,FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.scss']
})
export class AddquizComponent {
  questionForm!: FormGroup;
  quizForm!: FormGroup;
  qBank: any[] = [];
  questionId = 1;
  showResults = false;

  constructor(private fb: FormBuilder,public router:Router) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      questions: this.fb.array([this.createQuestionGroup()])
    });

    this.quizForm = this.fb.group({});
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      question: [''],
      option0: [''],
      option1: [''],
      option2: [''],
      option3: [''],
      answer: ['']
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  submitAllQuestions(): void {
    const allQuestions = this.questionForm.value.questions;

    allQuestions.forEach((q: any) => {
      const question = {
        id: this.questionId++,
        question: q.question,
        options: [q.option0, q.option1, q.option2, q.option3],
        answer: q.answer,
        selected: ''
      };

      this.qBank.push(question);
      this.quizForm.addControl(question.id.toString(), this.fb.control(''));
    });

    this.questionForm.reset();
    this.questionForm.setControl('questions', this.fb.array([this.createQuestionGroup()]));
    this.saveQuestionsToLocalStorage()
  }

  onSubmit(): void {
    this.showResults = true;

    this.qBank.forEach(q => {
      q.selected = this.quizForm.get(q.id.toString())?.value || '';
    });

    this.saveQuestionsToLocalStorage();
  }

  saveQuestionsToLocalStorage(): void {
    const stored = this.qBank.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      selectedAnswer: q.selected
    }));
  
    localStorage.setItem('quizQuestions', JSON.stringify(stored));
  
  
    this.router.navigate(['/quiz'])
  }
}
