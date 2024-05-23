import { Component } from '@angular/core';
import { MatSlideToggleModule, MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dark-toggle',
  standalone: true,
  imports: [MatSlideToggleModule, MatSlideToggle, FormsModule],
  templateUrl: './dark-toggle.component.html',
  styleUrl: './dark-toggle.component.scss'
})
export class DarkToggleComponent {
isDarkMode = true;
}
