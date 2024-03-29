import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxDigits]'
})
export class MaxDigitsDirective {
  @Input() appMaxDigits = 0;
  constructor(private readonly el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const maxLength = this.appMaxDigits;
    const currentValueLength = this.el.nativeElement.value.length;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!allowedKeys.includes(event.key) && !this.isDigit(event.key)) {
      event.preventDefault();
    }

    if (currentValueLength >= maxLength && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  private isDigit(key: string): boolean {
    return /^\d+$/.test(key);
  }
}
