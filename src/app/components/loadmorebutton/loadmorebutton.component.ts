import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-loadmorebutton',
  standalone: true,
  imports: [],
  templateUrl: './loadmorebutton.component.html',
  styleUrl: './loadmorebutton.component.css'
})
export class LoadmorebuttonComponent {
  @Output() loadMore: EventEmitter<boolean> = new EventEmitter<boolean>();


  tellParentLoadMore(){
    this.loadMore.emit(true);
  }
}
