import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  private readonly HISTORY_KEY = 'fibonacci-index';
  private sequence: number[] = [1, 1]; // Start with [1, 1] instead of [0, 1]
  private indexSubject: BehaviorSubject<number>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    const savedIndex = this.getSavedIndex();
    this.indexSubject = new BehaviorSubject<number>(savedIndex);
    this.generateSequence(savedIndex);
  }

  get currentIndex$() {
    return this.indexSubject.asObservable();
  }

  get currentNumber() {
    return this.sequence[this.indexSubject.value - 1]; // Subtract 1 from the index
  }

  next(): void {
    this.navigate(this.indexSubject.value + 1);
  }

  previous(): void {
    this.navigate(Math.max(1, this.indexSubject.value - 1)); // Minimum index is 1
  }

  jumpTo(index: number): void {
    this.navigate(Math.max(1, index)); // Ensure minimum index is 1
  }

  private navigate(index: number): void {
    this.generateSequence(index);
    this.indexSubject.next(index);
    this.saveIndex(index);
  }

  private generateSequence(upTo: number): void {
    while (this.sequence.length < upTo) {
      const nextNum =
        this.sequence[this.sequence.length - 1] +
        this.sequence[this.sequence.length - 2];
      this.sequence.push(nextNum);
    }
  }

  private getSavedIndex(): number {
    if (this.isBrowser) {
      return Math.max(1, Number(localStorage.getItem(this.HISTORY_KEY)) || 1);
    }
    return 1;
  }

  private saveIndex(index: number): void {
    if (this.isBrowser) {
      localStorage.setItem(this.HISTORY_KEY, index.toString());
    }
  }
}
