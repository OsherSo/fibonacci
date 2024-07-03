import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FibonacciService } from '../fibonacci.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fibonacci',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css'],
})
export class FibonacciComponent implements OnInit {
  currentNumber: number = 0;
  inputIndex: number = 0;

  constructor(
    public fibonacciService: FibonacciService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const index = +params['index'];
      this.currentNumber = this.fibonacciService.jumpToIndex(index);
    });
  }

  goToPrevious(): void {
    this.currentNumber = this.fibonacciService.getPreviousFibonacciNumber();
    this.updateRoute();
  }

  goToNext(): void {
    this.currentNumber = this.fibonacciService.getNextFibonacciNumber();
    this.updateRoute();
  }

  jumpTo(): void {
    if (this.inputIndex >= 0) {
      this.currentNumber = this.fibonacciService.jumpToIndex(this.inputIndex);
      this.updateRoute();
    }
  }

  private updateRoute(): void {
    this.router.navigate([
      '/fibonacci',
      this.fibonacciService.getCurrentIndex(),
    ]);
  }
}
