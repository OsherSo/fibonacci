import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FibonacciService } from '../fibonacci.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fibonacci',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.css'],
})
export class FibonacciComponent implements OnInit, OnDestroy {
  currentIndex = 1;
  jumpIndex = 1;
  isChanging = false;
  private destroy$ = new Subject<void>();

  constructor(
    public fibonacciService: FibonacciService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const index = Math.max(1, +params['index'] || 1);
      this.fibonacciService.jumpTo(index);
    });

    this.fibonacciService.currentIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((index) => {
        this.currentIndex = index;
        this.router.navigate(['/fibonacci', index]);
        this.animateNumberChange();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  previous(): void {
    this.fibonacciService.previous();
  }

  next(): void {
    this.fibonacciService.next();
  }

  jumpTo(): void {
    this.fibonacciService.jumpTo(this.jumpIndex);
  }

  private animateNumberChange(): void {
    this.isChanging = true;
    setTimeout(() => {
      this.isChanging = false;
    }, 10);
  }
}
