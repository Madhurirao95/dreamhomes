/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[commaFormatter]'
})
export class CommaFormatterDirective implements OnInit {
  constructor(
    private readonly el: ElementRef,
    private readonly ngControl: NgControl
  ) {}

  ngOnInit(): void {
    // Format initial value if exists
    if (this.ngControl?.control) {
      this.ngControl.control.valueChanges.subscribe((value) => {
        if (value !== null && value !== undefined) {
          this.formatValue(value.toString());
        }
      });

      // Format the initial value
      const initialValue = this.ngControl.control.value;
      if (initialValue !== null && initialValue !== undefined) {
        this.formatValue(initialValue.toString());
      }
    }
  }

  @HostListener('input', ['$event'])
  onInput(): void {
    const value = this.el.nativeElement.value;

    // Get cursor position before formatting
    const cursorPosition = this.el.nativeElement.selectionStart;
    const originalLength = value.length;

    this.formatValue(value);

    // Adjust cursor position after formatting
    const newLength = this.el.nativeElement.value.length;
    const lengthDiff = newLength - originalLength;
    const newPosition = cursorPosition + lengthDiff;
    this.el.nativeElement.setSelectionRange(newPosition, newPosition);
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

    // Allow Ctrl/Cmd combinations
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Allow only numeric digits
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  private formatValue(value: string): void {
    // Remove all non-numeric characters
    const cleanValue = value.replace(/\D/g, '');

    // Add commas
    const formattedValue = this.addCommas(cleanValue);

    // Update the native element
    this.el.nativeElement.value = formattedValue;
  }

  private addCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
