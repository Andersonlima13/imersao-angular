import { Injectable } from '@angular/core';
import { Subject , Observable} from 'rxjs';
import { Budget } from '../intefaces/models/budget.interface';
import { BudgetCategory } from '../intefaces/models/budget-category.interface'; 

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public BUDGETS: string = 'BUDGETS';
  public BUDGETS_CATEGORIES = 'BUDGET_CATEGORIES';


  public budgetSubject: Subject<Budget[]> = new Subject();
  public budgetCategorySubject: Subject<BudgetCategory[]> = new Subject();
  
  constructor() { }

  addBudget (budget: Budget) {
    const budgets = this.getBudgets()
    budgets.push(budget);
    this.setBudgets(budgets)
  }

  getBudgets(): Budget[]{
    const budgets = JSON.parse(localStorage.getItem(this.BUDGETS) || '[]') as Budget[]
    return budgets
  }


  getBudgetsCategories(): BudgetCategory[]{
    const categories = JSON.parse(localStorage.getItem(this.BUDGETS_CATEGORIES) || '[]') as BudgetCategory[]
    return categories
  }

  getBudgetById(budgetId: string){
    const budgets = this.getBudgets()
    const index = budgets.findIndex(x => x.id === budgetId)
    if (index > -1 ) {
      return budgets[index]
    }

    throw Error('Orçamento nao existe')
  }





  setBudgets(budgets: Budget[]){
    localStorage.setItem(this.BUDGETS,JSON.stringify(budgets))

    const budgetCategories: BudgetCategory[] = budgets.map((item:Budget) =>{
      return {
            color: item.color,
            id: item.id,
            name: item.name,
      } as BudgetCategory
    })

    this.setBudgetCategories(budgetCategories)
    this.budgetSubject.next(budgets)
  }
  setBudgetCategories(budgetCategories: BudgetCategory[]){
    localStorage.setItem(this.BUDGETS_CATEGORIES,JSON.stringify(budgetCategories))
    this.budgetCategorySubject.next(budgetCategories)
  }


  getBudgetData(): Observable<Budget[]>{
    return this.budgetSubject
  }


  getBudgetCategoryData(): Observable<BudgetCategory[]>{
    return this.budgetSubject
  }




}
