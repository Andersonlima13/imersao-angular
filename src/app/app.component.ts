import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component'
import { SidebarComponentComponent } from './components/sidebar-component/sidebar-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FirstComponentComponent, SidebarComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estudos-angular';
}
