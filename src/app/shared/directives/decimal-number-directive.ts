/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimalCommaFormatter]',
})
export class DecimalCommaFormatterDirective {
  @Input() decimalDigits: number = 2;

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
    const newPosition = cursorPosition + lengthDiff;
    this.el.nativeElement.setSelectionRange(newPosition, newPosition);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    const value = event.target.value;

    if (value) {
      // Remove commas for parsing
      const numericValue = value.replace(/,/g, '');

      if (!isNaN(numericValue) && numericValue !== '') {
        const num = parseFloat(numericValue);
        const formatted = num.toFixed(this.decimalDigits);

        // Add commas to the integer part
        const parts = formatted.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.el.nativeElement.value = parts.join('.');

        if (this.ngControl?.control) {
          this.ngControl.control.setValue(this.el.nativeElement.value, {
            emitEvent: false,
          });
        }
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

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

    if (allowedKeys.includes(key)) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Allow decimal point only if not already present
    if (key === '.' || key === ',') {
      const currentValue = this.el.nativeElement.value;
      if (currentValue.includes('.')) {
        event.preventDefault();
      }
      return;
    }

    // Allow only numeric digits
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  private formatValue(value: string): void {
    // Remove all characters except digits and decimal point
    let cleanValue = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
      cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places
    const finalParts = cleanValue.split('.');
    if (finalParts.length === 2 && finalParts[1].length > this.decimalDigits) {
      cleanValue =
        finalParts[0] + '.' + finalParts[1].substring(0, this.decimalDigits);
    }

    // Add commas to the integer part only
    const [integerPart, decimalPart] = cleanValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedValue =
      decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;

    this.el.nativeElement.value = formattedValue;

    if (this.ngControl?.control) {
      this.ngControl.control.setValue(formattedValue, { emitEvent: false });
    }
  }
}
