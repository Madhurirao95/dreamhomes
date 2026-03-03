import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMaxDigits]',
})
export class MaxDigitsDirective {
  @Input() appMaxDigits = 0;

  constructor(private readonly el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      '.'
    ];

    if (!allowedKeys.includes(event.key) && !this.isDigit(event.key)) {
      event.preventDefault();
      return;
    }

    if (!allowedKeys.includes(event.key)) {
      // Strip commas before counting — critical for formatted inputs
      const rawValue = this.el.nativeElement.value.replace(/,/g, '');
      // Also strip decimal part — max digits applies to integer digits only
      const integerPart = rawValue.split('.')[0];
      if (integerPart.length >= this.appMaxDigits) {
        event.preventDefault();
      }
    }
  }

  private isDigit(key: string): boolean {
    return /^\d$/.test(key);
  }
}
