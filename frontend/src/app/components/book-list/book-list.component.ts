import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { BookItemComponent } from '../book-item/book-item.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookItemComponent, RouterModule],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title"><span class="text-gradient">Premium</span> Book Collection</h1>
        <p class="hero-subtitle">Dive into timeless English classics with an immersive dark reading experience.</p>
        <div class="hero-actions">
          <button class="btn" (click)="scrollToBooks()">Explore Library</button>
          <a routerLink="/add-book" class="btn btn-secondary">Contribute</a>
        </div>
      </div>
    </div>

    <div id="books-grid" class="container main-content">
      <div *ngIf="loading" class="loading-state">
        <div class="loader"></div>
        <p>Curating your library...</p>
      </div>

      <div *ngIf="error" class="error-glass">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="book-grid">
        <app-book-item *ngFor="let book of books" [book]="book"></app-book-item>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      position: relative;
      padding: 6rem 0 4rem;
      text-align: center;
      background: radial-gradient(circle at center, rgba(129, 140, 248, 0.08) 0%, transparent 70%);
    }
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .hero-title {
      font-size: clamp(2.25rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      letter-spacing: -0.04em;
      white-space: normal;
      overflow-wrap: break-word;
    }
    @media (min-width: 768px) {
      .hero-title {
        white-space: nowrap;
      }
    }
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .main-content {
      padding-top: 4rem;
      padding-bottom: 6rem;
    }
    .book-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
      justify-content: center;
      width: 100%;
      margin: 0 auto;
    }
    @media (min-width: 1400px) {
      .book-grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    @media (max-width: 640px) {
      .book-grid {
        grid-template-columns: 1fr;
        max-width: 400px;
      }
    }
    .loading-state {
      text-align: center;
      padding: 5rem 0;
      color: var(--text-muted);
    }
    .loader {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(129, 140, 248, 0.1);
      border-radius: 50%;
      border-top-color: var(--primary);
      animation: spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      margin: 0 auto 1.5rem;
      box-shadow: 0 0 20px rgba(129, 140, 248, 0.2);
    }
    .error-glass {
      background: rgba(239, 68, 68, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #FCA5A5;
      padding: 1.5rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = true;
  error = '';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('BookListComponent: Attemting to fetch books from ' + this.bookService.getApiUrl());
    
    // Safety timeout: If no response in 10 seconds, show error
    const timeoutTimer = setTimeout(() => {
      if (this.loading) {
        console.warn('BookListComponent: Request timed out after 10s');
        this.error = 'Connection timed out. Please check if the backend is running at http://localhost:8080';
        this.loading = false;
      }
    }, 10000);

    this.bookService.getBooks().subscribe({
      next: (data) => {
        clearTimeout(timeoutTimer);
        console.log('BookListComponent: Received books:', data);
        this.books = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        clearTimeout(timeoutTimer);
        console.error('BookListComponent: API Error:', err);
        this.error = 'Unable to connect to the store API. Please ensure the backend server is active.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  scrollToBooks(): void {
    const element = document.getElementById('books-grid');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
