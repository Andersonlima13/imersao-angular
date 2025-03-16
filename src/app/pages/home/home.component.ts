import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormWrapperComponent } from '../../components/form-wrapper/form-wrapper.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ExpenseService } from '../../services/expense.service';
import { BudgetCategory } from '../../intefaces/models/budget-category.interface';
import { Budget } from '../../intefaces/models/budget.interface';
import {v4 as uuidv4} from 'uuid'    // gerar ids unicos para cada card
import { budgetCardConfig } from '../../intefaces/ui-config/budget-card-config.interface';
import { Router } from '@angular/router';
import { BudgetCardComponent } from '../../components/budget-card/budget-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Expense } from '../../intefaces/models/expense.interface';
import { TableDataConfig } from '../../intefaces/ui-config/table-data-config.interface';
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-home',
  imports: [FormWrapperComponent, ReactiveFormsModule, BudgetCardComponent, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  budgetForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),     // agrupar  os controles do form de orcamento, ambos como required
    budget: new FormControl(null, [Validators.required])
  })



  expenseForm: FormGroup = new FormGroup({         // agrupar  os controles do form de gastos, ambos como required
    name: new FormControl('', [Validators.required]),
    amount : new FormControl('null', [Validators.required]),
    budgetCategoryId : new FormControl('null', [Validators.required])
  })


 
  budgetCategories: BudgetCategory[] = []   //  var para armazenar as categorias de orcamento
  budgets : Budget[] = []                     // armazena os orcamentos
  budgetCards: budgetCardConfig[] = []    // vai armazenar cada um dos objetos com os dados do card
  ExpenseTableData : TableDataConfig[] = []

  constructor(public userService: UserService, private budgetService: BudgetService,    // UserService: Para acessar informações do usuário.
     private expenseService: ExpenseService,private router: Router) { }   // BudgetService: Para manipular os orçamentos (obter, adicionar, etc).
// ExpenseService: Para gerenciar as despesas.

     ngOnInit(): void {
        this.budgetCategories = this.budgetService.getBudgetsCategories()  // rrecuperando as categorias que foram adcionadas no orcamento
        this.budgets = this.budgetService.getBudgets();
        this.buildBudgetCards(this.budgets)
        console.log('orcamento carregando: ', this.budgets)   // faz o get dos orcamentos existentes
        this.budgetService.getBudgetData().subscribe({
          next: (res: Budget[]) => {
          this.budgets = res; 
          console.log('novo orcamento : ', this.budgets);
           


          this.buildBudgetCards(this.budgets)  // insere os cards

        },
        })
        this.budgetService.getBudgetCategoryData().subscribe({
          next: (res: BudgetCategory[]) => {
            this.budgetCategories = res
          },
          error:(error:any) => {
            console.log(error)
          }
        })



        const expenses = this.expenseService.getExpenses();
        this.ExpenseTableData = this.expenseService.buildExpenseTable(expenses);
        this.expenseService.getExpenseData().subscribe({
          next: (res: Expense[]) => {
            this.expenseService.buildExpenseTable(res)
          },
          error:(error:any) => {
            console.log(error)
          }
        })



     }

// metodo para adcionar um orcamento vindo do botao, cria um objeto Budget
  addBudget(){
    const budget: Budget = {
      id: uuidv4(),
      name:this.budgetForm.value.name,
      budget:parseInt(this.budgetForm.value.budget),
      spent:0,
      color: 'amber'

    }


    this.budgetService.addBudget(budget);
    this.budgetForm.reset()
  }

  addExpense(){
    console.log('clicado');
    const category = this.budgetService.getBudgetById(this.expenseForm.value.budgetCategoryId);
    
    const expense: Expense = {
      id : uuidv4(),
      name : this.expenseForm.value.name,
      budgetCategory: category,
      amount: parseFloat(this.expenseForm.value.amount),
      date: new Date(),
    };
    
    // Adiciona o gasto no serviço
    this.expenseService.addExpense(expense);
    
    // Atualiza os dados da tabela após a adição
    this.ExpenseTableData = this.expenseService.buildExpenseTable(this.expenseService.getExpenses());

    this.expenseForm.reset();
}






  handleDelete(data: TableDataConfig){
    this.expenseService.deleteExpenseById(data.id)

  }


  // Objetivo: Converter cada orçamento em um objeto de configuração para o cartão.
 // name, budget, spent, color: Dados que serão exibidos no cartão.
 // percorre o array com orcamentos criando um objeto budgetcardconfig.
  buildBudgetCards(budgets: Budget[]){
    this.budgetCards = budgets.map((item: Budget) => {
      return {
        name: item.name,
        budget: item.budget,
        spent: item.spent,
        color: item.color,
        onClick: () => {
          this.router.navigateByUrl(`details/${item.id}`)
         
        }
      }
    })
  }
}