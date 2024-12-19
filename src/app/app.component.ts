import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaisComponent } from "./pais/pais.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ PaisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appcwepds2';
}
