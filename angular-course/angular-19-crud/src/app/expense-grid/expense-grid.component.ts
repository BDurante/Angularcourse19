import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../models/expense.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-grid',
  imports: [MatTableModule, MatPaginatorModule, MatSnackBarModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './expense-grid.component.html',
  styleUrl: './expense-grid.component.css'
})
export class ExpenseGridComponent {
  expenseService = inject(ExpenseService);
  snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ["id", "title", "category", "amount", "date", "actions"];

  dataSource = new MatTableDataSource<Expense>();

  totalItems: number = 0;
  pageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  expenses = this.expenseService.expenses;

  constructor() {
    this.expenseService.getExpenses();

    effect(() => {
      // any changes done will reflect real time in this part of the code
      const expenses = this.expenses();
      this.dataSource.data = expenses;
      console.log(this.dataSource.data)
      this.totalItems = expenses.length;
    })
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    // this will set the rows according to their sequenced number
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(){
    // this will set the number of rows per page according to the items per page
    this.dataSource.paginator = this.paginator;
  }
}
