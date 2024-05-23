import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dark-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './dark-toggle.component.html',
  styleUrl: './dark-toggle.component.scss'
})
export class DarkToggleComponent {

}
