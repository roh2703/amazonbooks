import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="main-container py-8">
      <div class="back-nav mb-8">
        <a routerLink="/" class="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Library
        </a>
      </div>

      <div *ngIf="loading" class="loader-container">
        <div class="loader"></div>
      </div>
      
      <div *ngIf="error" class="error-glass">{{ error }}</div>

      <div *ngIf="book && !loading" class="detail-grid">
        <div class="gallery-section">
          <div class="image-box">
            <img [src]="book.imageUrl" [alt]="book.title" class="detail-image" onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22600%22%20viewBox%3D%220%200%20400%20600%22%3E%3Crect%20fill%3D%22%231E293B%22%20width%3D%22400%22%20height%3D%22600%22%2F%3E%3Ctext%20fill%3D%22%23475569%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ENo%20Cover%3C%2Ftext%3E%3C%2Fsvg%3E'"/>
          </div>
        </div>

        <div class="content-section">
          <header class="book-header">
            <div class="status-badge" [class.out]="book.stockQuantity === 0">
              {{ book.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }}
            </div>
            <h1 class="book-title text-gradient">{{ book.title }}</h1>
            <p class="book-author">by <span class="author-highlight">{{ book.author }}</span></p>
          </header>

          <div class="pricing-card glass-card">
            <div class="price-info">
              <span class="price-label">Price</span>
              <span class="price-value">{{ book.price | currency }}</span>
            </div>
            <button class="btn btn-primary buy-btn" [disabled]="book.stockQuantity === 0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Add to Collection
            </button>
          </div>

          <div class="meta-section">
            <div class="meta-item">
              <h3>Description</h3>
              <p>{{ book.description }}</p>
            </div>
            <div class="stock-meta">
              <span class="stock-circle"></span>
              {{ book.stockQuantity }} items ready for dispatch
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 2rem;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s ease;
    }
    .back-link:hover {
      color: var(--primary);
      transform: translateX(-4px);
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
      align-items: start;
    }
    @media (min-width: 900px) {
      .detail-grid {
        grid-template-columns: 1.2fr 1.8fr;
      }
    }
    .image-box {
      border-radius: 2rem;
      background: rgba(30, 41, 59, 0.5);
      padding: 1rem;
      border: 1px solid var(--glass-border);
      box-shadow: var(--shadow-xl), 0 0 40px rgba(99, 102, 241, 0.1);
    }
    .detail-image {
      width: 100%;
      border-radius: 1.5rem;
      display: block;
      object-fit: contain;
    }
    .status-badge {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: rgba(52, 211, 153, 0.1);
      color: #74f0c4;
      border: 1px solid rgba(52, 211, 153, 0.2);
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1.5rem;
    }
    .status-badge.out {
      background: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.2);
    }
    .book-title {
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1rem;
      letter-spacing: -0.04em;
    }
    .book-author {
      font-size: 1.1rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
    }
    .author-highlight {
      color: var(--text-main);
      font-weight: 700;
    }
    .pricing-card {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
      box-shadow: var(--shadow-lg), 0 0 20px rgba(99, 102, 241, 0.1);
    }
    @media (min-width: 600px) {
      .pricing-card {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    .price-info {
      display: flex;
      flex-direction: column;
    }
    .price-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 800;
    }
    .price-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--accent);
    }
    .buy-btn {
      padding: 1.25rem 2.5rem;
      font-size: 1.1rem;
    }
    .meta-item h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--primary-light);
    }
    .meta-item p {
      color: var(--text-muted);
      line-height: 1.8;
      font-size: 1.05rem;
    }
    .stock-meta {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 600;
    }
    .stock-circle {
      width: 8px;
      height: 8px;
      background: #34D399;
      border-radius: 50%;
      box-shadow: 0 0 5px #34D399;
    }
    .loader-container {
      display: flex;
      justify-content: center;
      padding: 10rem 0;
    }
    .loader {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(129, 140, 248, 0.1);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }
    .error-glass {
      padding: 3rem;
      text-align: center;
      background: rgba(239, 68, 68, 0.05);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 2rem;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.bookService.getBook(id).subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load book details.';
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
