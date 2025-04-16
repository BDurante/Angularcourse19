import { Injectable, signal } from '@angular/core';
import { Expense } from '../models/expense.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseSignal =signal<Expense[]>([]);

  constructor(private http: HttpClient) { }

  getExpenses(){
    this.http.get<Expense[]>('http://localhost:3000/expenses')
    .subscribe(expenses => this.expenseSignal.set(expenses));
  }

  get expenses(){
    return this.expenseSignal;
  }

  addExpense(expense: Expense){
    this.http.post('http://localhost:3000/expenses', expense)
    .subscribe(() => this.getExpenses());
  }

  deleteExpense(id: number){
    this.http.delete(`http://localhost:3000/expenses/${id}`)
    .subscribe(() => this.getExpenses());
  }

  updateExpense(id: string, updateExpense: Expense){
    this.http.put(`http://localhost:3000/expenses/${id}`,updateExpense)
    .subscribe(() => this.getExpenses());
  }

  getExpenseById(id: number){
    return this.expenseSignal().find(expense => expense.id == id);
  }
}


