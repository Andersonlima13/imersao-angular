import { Injectable } from '@angular/core';
import { Subject , Observable} from 'rxjs';
import { Budget } from '../intefaces/models/budget.interface';
import { BudgetCategory } from '../intefaces/models/budget-category.interface'; 

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
 // declaramos aqui quem vamos usar como local storage
  public BUDGETS: string = 'BUDGETS';
  public BUDGETS_CATEGORIES = 'BUDGET_CATEGORIES';

 // basicamente  servem como canais para notificar outros componentes quando os dados
  public budgetSubject: Subject<Budget[]> = new Subject();
  public budgetCategorySubject: Subject<BudgetCategory[]> = new Subject();
  
  constructor() { }


  // recupera os orcamentos do localstorage chamando a funcao get

  addBudget (budget: Budget) {
    const budgets = this.getBudgets()
    budgets.push(budget);
    this.setBudgets(budgets)
  }



// get para puxar os dados, vai ler o json e retornar como um Budget, se n existir , retorna o array vazio
  getBudgets(): Budget[]{
    const budgets = JSON.parse(localStorage.getItem(this.BUDGETS) || '[]') as Budget[]
    return budgets
  }

// le as categorias que sao geradas a partir  dos orcamentos que foram cadastradas
  getBudgetsCategories(): BudgetCategory[]{
    const categories = JSON.parse(localStorage.getItem(this.BUDGETS_CATEGORIES) || '[]') as BudgetCategory[]
    return categories
  }
/*
  getBudgetById(budgetId: string){
    const budgets = this.getBudgets()
    const index = budgets.findIndex(x => x.id === budgetId)
    if (index > -1 ) {
      return budgets[index]
    }

    throw Error('Orçamento nao existe')
  }
*/



/// Os orçamentos são salvos no localStorage.

// cada orcamento vira uma categoria


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
    this.budgetSubject.next(budgets)     // aqui lancamos apos atualizar os orcamentos com as categorias, notificando uma mudanca
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
