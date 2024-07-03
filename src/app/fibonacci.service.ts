import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FibonacciService {
  private historyKey = 'fibonacci-history';
  private currentFibonacci: number[] = [1, 1];
  private currentIndex: number = 0;

  constructor() {
    if (this.isLocalStorageAvailable()) {
      const savedIndex = Number(localStorage.getItem(this.historyKey));
      if (!isNaN(savedIndex)) {
        this.currentIndex = savedIndex;
      }
    }
  }

  getCurrentFibonacciNumber(): number {
    return this.currentFibonacci[this.currentIndex];
  }

  getNextFibonacciNumber(): number {
    this.generateNextFibonacci();
    this.currentIndex++;
    this.saveCurrentIndex();
    return this.currentFibonacci[this.currentIndex];
  }

  getPreviousFibonacciNumber(): number {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.saveCurrentIndex();
    }
    return this.currentFibonacci[this.currentIndex];
  }

  jumpToIndex(index: number): number {
    while (this.currentFibonacci.length <= index) {
      this.generateNextFibonacci();
    }
    this.currentIndex = index;
    this.saveCurrentIndex();
    return this.currentFibonacci[this.currentIndex];
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  private generateNextFibonacci(): void {
    const nextNumber =
      this.currentFibonacci[this.currentFibonacci.length - 1] +
      this.currentFibonacci[this.currentFibonacci.length - 2];
    this.currentFibonacci.push(nextNumber);
  }

  private saveCurrentIndex(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.historyKey, this.currentIndex.toString());
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
