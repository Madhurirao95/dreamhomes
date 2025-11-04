import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListingWithMediaList } from '../Interfaces/IListing';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input() listing!: IListingWithMediaList;
  @Output() view = new EventEmitter<any>();

  onCardClick(): void {
    this.view.emit(this.listing);
  }
}
