/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[decimal]'
})
export class DecimalDirective {
  @Input() decimalDigits: number = 2; // Default to 2 decimal places

  constructor(
    private readonly el: ElementRef,
    private readonly ngControl: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(): void {
    const initialValue = this.el.nativeElement.value;
    let value = initialValue;

    // Remove non-numeric characters except decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places
    if (parts.length === 2 && parts[1].length > this.decimalDigits) {
      value = parts[0] + '.' + parts[1].substring(0, this.decimalDigits);
    }

    // Only update if value changed
    if (value !== initialValue) {
      // Get cursor position before update
      const cursorPosition = this.el.nativeElement.selectionStart;
      const lengthDiff = initialValue.length - value.length;

      // Update both native element and form control
      this.el.nativeElement.value = value;
      if (this.ngControl?.control) {
        this.ngControl.control.setValue(value, { emitEvent: false });
      }

      // Restore cursor position
      const newPosition = cursorPosition - lengthDiff;
      this.el.nativeElement.setSelectionRange(newPosition, newPosition);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any): void {
    const value = event.target.value;

    // Format to specified decimal places
    if (value && !isNaN(value)) {
      const num = parseFloat(value);
      this.el.nativeElement.value = num.toFixed(this.decimalDigits);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    // Allow navigation and control keys
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
      'ArrowDown'
    ];

    if (allowedKeys.includes(key)) {
      return;
    }

    // Allow Ctrl/Cmd combinations (copy, paste, cut, select all)
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
}
