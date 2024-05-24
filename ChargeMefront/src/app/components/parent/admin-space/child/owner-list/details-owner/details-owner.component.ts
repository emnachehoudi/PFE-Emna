import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-details-owner',
  templateUrl: './details-owner.component.html',
  styleUrl: './details-owner.component.css'
})
export class DetailsOwnerComponent {
  @Input() owner: any;
}
