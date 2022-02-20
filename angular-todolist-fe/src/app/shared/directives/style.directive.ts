import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements OnChanges {

  @Input('appStyle') isCompleted!: boolean;

  @HostBinding('style.backgroundColor') bgColor = '#ebebeb';

  @HostBinding('style.textDecoration') txtDecor = 'initial';

  ngOnChanges() {
    if (this.isCompleted) {
      this.bgColor = '#d6e8f5';
      this.txtDecor = 'line-through';
    } else {
      this.bgColor = '#ebebeb';
      this.txtDecor = 'initial';
    }
  }
} 
