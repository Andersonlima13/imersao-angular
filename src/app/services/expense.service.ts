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
      this.updateExpenses(expenses, budget.id)
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








    buildExpenseTable(expenses:  Expense[]){
      return expenses.map((item: Expense) => {
        return {
          id: item.id,
          name: item.name,
          amount:item.amount,
          date: item.date,
          budget:item.budgetCategory.name,

        }
      })
    }


/// configaroces servics expense
  

  setExpense(expense: Expense[]){
    localStorage.setItem(this.EXPENSES, JSON.stringify(expense))
    this.expenseSubject.next(expense)

  }

  deleteExpenseBudgetId(budgetId: string){
    const expense = this.getExpenses()
    const deleted = expense.filter((expense : Expense) => expense.budgetCategory.id != budgetId);
    this.setExpense(deleted)
  }




  deleteExpenseById(expenseId: string){
    const expenses = this.getExpenses()
    const expense = expenses.filter((expense : Expense) => expense.id === expenseId) [0]; 
    if (!expense){
      throw Error('Não é possivel deletar um gasto inexistente')
      return;
    }
    const deleted = expenses.filter((expense : Expense) => expense.id != expenseId);
    this.setExpense(deleted)
    this.updateExpenses(deleted,expense.budgetCategory.id)
  }


  getExpenseByBudgetId (budgetId: string) {
    const expense = this.getExpenses();
    return  expense.filter((expense : Expense) => expense.budgetCategory.id === budgetId);
  }

  getExpenseData(): Observable<Expense[]>{
    return this.expenseSubject;
  }


}
