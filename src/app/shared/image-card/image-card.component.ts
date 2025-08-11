import { Component, Input } from '@angular/core';
import { IListingWithSourceList } from '../Interfaces/IListing';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input() listing!: IListingWithSourceList;
}
