import { Component } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent { 


  // definimos aqui , tipos e components que podem ser reaproveitados
  name : string = 'anderson'
}