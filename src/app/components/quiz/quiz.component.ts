import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizForm!: FormGroup;
  qBank: any[] = [];
  showResults = false;
  score = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Step 1: Load quiz data from localStorage
    const stored = localStorage.getItem('quizQuestions');
    this.qBank = stored ? JSON.parse(stored) : [];

    // Step 2: Create form controls dynamically
    this.quizForm = this.fb.group({});
    this.qBank.forEach(q => {
      this.quizForm.addControl(q.id.toString(), this.fb.control(''));
    });
  }

  onSubmit(): void {
    this.showResults = true;
    this.score = 0;

    // Step 3: Check answers and calculate the score
    this.qBank.forEach(q => {
      const selected = this.quizForm.get(q.id.toString())?.value || '';
      q.selected = selected;

      // Compare selected answer with correct answer
      if (selected === q.correctAnswer) {
        this.score++;
      }
    });

    // Optionally update localStorage with selected answers
    localStorage.setItem('quizQuestions', JSON.stringify(this.qBank));
  }

  // Helper method to safely retrieve the FormControl
  getFormControl(id: string): FormControl {
    return this.quizForm.get(id) as FormControl;
  }
}
