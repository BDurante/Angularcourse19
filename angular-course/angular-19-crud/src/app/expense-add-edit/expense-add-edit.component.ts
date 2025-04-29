import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-add-edit',
  imports: [CommonModule,
            ReactiveFormsModule, 
            MatButtonModule, 
            MatInputModule, 
            MatSelectModule, 
            MatDatepickerModule, 
            MatCardModule, 
            MatIconModule, 
            MatFormFieldModule],
  templateUrl: './expense-add-edit.component.html',
  styleUrl: './expense-add-edit.component.css'
})
export class ExpenseAddEditComponent {

  expenseService = inject(ExpenseService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);

  categories = ["Food", "Travel", "Entertainment", "Luxury", "Movies", "Dating"];

  expenseForm: FormGroup;
  
  isEditMode = false;

  expenseId: number = 0;

  constructor(private fb: FormBuilder){

    this.expenseForm = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: ["", Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get("id");

      if(id){
        this.isEditMode = true;
        this.expenseId = +id;
        this.expenseService.getExpenses();

        effect (() => {
          const expense = this.expenseService.expenses();
          if(expense.length > 0){
            this.loadExpenseData(this.expenseId);
          }
        })
      }
    });
  }

  loadExpenseData(expenseId: number){
    const expense = this.expenseService.getExpenseById(expenseId);
    console.log(expense);
  }

  onSubmit(){
    console.log("form submitted");
    console.log(this.expenseForm.value);

    if(this.expenseForm.valid) {
      const expense: Expense = { ...this.expenseForm.value, id:this.expenseId || Date.now() };

      if(this.isEditMode && this.expenseId !== null) {
        //edit an existing expense
      } else {
        //add new expense
      }
    }
  }
}
