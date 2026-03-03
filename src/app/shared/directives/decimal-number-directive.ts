/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimalCommaFormatter]',
})
export class DecimalCommaFormatterDirective {
  @Input() decimalDigits: number = 2;
  @Input() allowDecimals: boolean = true; // NEW — false = integer-only mode

  constructor(
    private readonly el: ElementRef,
    private readonly ngControl: NgControl,
  ) {}

  ngOnInit(): void {
    if (this.ngControl?.control) {
      this.ngControl.control.valueChanges.subscribe((value) => {
        if (value !== null && value !== undefined) {
          this.formatValue(value.toString());
        }
      });

      const initialValue = this.ngControl.control.value;
      if (initialValue !== null && initialValue !== undefined) {
        this.formatValue(initialValue.toString());
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    const value = this.el.nativeElement.value;
    const cursorPosition = this.el.nativeElement.selectionStart;
    const originalLength = value.length;

    this.formatValue(value);

    const newLength = this.el.nativeElement.value.length;
    const lengthDiff = newLength - originalLength;
    this.el.nativeElement.setSelectionRange(
      cursorPosition + lengthDiff,
      cursorPosition + lengthDiff,
    );
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    const value = event.target.value;
    if (!value) return;

    const numericValue = value.replace(/,/g, '');
    if (isNaN(numericValue) || numericValue === '') return;

    const num = parseFloat(numericValue);

    let formatted: string;
    if (this.allowDecimals) {
      // Round to decimalDigits and re-add commas
      const fixed = num.toFixed(this.decimalDigits);
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = parts.join('.');
    } else {
      // Integer only — no decimal places
      formatted = Math.trunc(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    this.el.nativeElement.value = formatted;
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(formatted, { emitEvent: false });
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'Home',
      'End',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    if (allowedKeys.includes(event.key)) return;
    if (event.ctrlKey || event.metaKey) return;

    // Block decimal input entirely when allowDecimals is false
    if (event.key === '.' || event.key === ',') {
      if (!this.allowDecimals || this.el.nativeElement.value.includes('.')) {
        event.preventDefault();
      }
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  private formatValue(value: string): void {
    if (this.allowDecimals) {
      // Original decimal formatting logic
      let cleanValue = value.replace(/[^0-9.]/g, '');
      const parts = cleanValue.split('.');
      if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
      }
      const finalParts = cleanValue.split('.');
      if (
        finalParts.length === 2 &&
        finalParts[1].length > this.decimalDigits
      ) {
        cleanValue =
          finalParts[0] + '.' + finalParts[1].substring(0, this.decimalDigits);
      }
      const [intPart, decPart] = cleanValue.split('.');
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const formattedValue =
        decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;

      this.el.nativeElement.value = formattedValue;
      this.ngControl?.control?.setValue(formattedValue, { emitEvent: false });
    } else {
      // Integer-only: strip everything except digits
      const cleanValue = value.replace(/[^0-9]/g, '');
      const formatted = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.el.nativeElement.value = formatted;
      this.ngControl?.control?.setValue(formatted, { emitEvent: false });
    }
  }
}
