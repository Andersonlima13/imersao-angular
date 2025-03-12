import { Injectable } from '@angular/core';
import { BudgetService } from './budget.service';
import { Expense } from '../intefaces/models/expense.interface';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ExpenseService {



  EXPENSES: string = 'EXPENSES';  
  expenseSubject:  Subject<Expense[]> = new Subject();
  constructor(private budgetService: BudgetService) { }



  addExpense(expense: Expense) {
    try{
      const budget = this.budgetService.getBudgetById(expense.budgetCategory.id)
      const expenses = this.getExpenses()
      expenses.push(expense)
      this.setExpense(expenses)
    }catch(err: any){
      throw Error(err.message)
    }
  }

  getExpenses(): Expense[]  {
    return JSON.parse(localStorage.getItem(this.EXPENSES) || '[]') as Expense []
  }

  updateExpenses(expenses: Expense[], budgetId: string){
    const budgetExpenses = expenses.filter((item) => item.budgetCategory.id === budgetId)
    const totalExpense = budgetExpenses.reduce((sum: number, current: Expense) => sum + current.amount, 0)

    this.budgetService.updateBudgetAmount(budgetId, totalExpense)
  }






  

  setExpense(expense: Expense[]){
    localStorage.setItem(this.EXPENSES, JSON.stringify(expense))
    this.expenseSubject.next(expense)

  }

  deleteExpenseBudgetId(budgetId: string){
    const expense = this.getExpenses()
    const deleted = expense.filter((expense : Expense) => expense.budgetCategory.id != budgetId);
    this.setExpense(deleted)
  }

  getExpenseByBudgetId (budgetId: string) {
    const expense = this.getExpenses();
    return  expense.filter((expense : Expense) => expense.budgetCategory.id === budgetId);
  }

  getExpenseData(): Observable<Expense[]>{
    return this.expenseSubject;
  }


}
