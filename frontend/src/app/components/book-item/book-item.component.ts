import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  template: `
    <div class="book-card-glass" [routerLink]="['/books', book.id]">
      <div class="image-wrapper">
        <img [src]="book.imageUrl" [alt]="book.title" class="book-cover" onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22600%22%20viewBox%3D%220%200%20400%20600%22%3E%3Crect%20fill%3D%22%231E293B%22%20width%3D%22400%22%20height%3D%22600%22%2F%3E%3Ctext%20fill%3D%22%23475569%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ENo%20Cover%3C%2Ftext%3E%3C%2Fsvg%3E'"/>
        <div class="price-badge">{{ book.price | currency }}</div>
      </div>
      <div class="card-body">
        <h3 class="book-title">{{ book.title }}</h3>
        <p class="book-author">by {{ book.author }}</p>
        <div class="card-footer">
          <span class="stock-status" [class.low]="book.stockQuantity < 10">
            {{ book.stockQuantity }} in stock
          </span>
          <button class="view-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .book-card-glass {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .book-card-glass:hover {
      transform: translateY(-8px) scale(1.01);
      background: rgba(45, 55, 72, 0.7);
      border-color: rgba(129, 140, 248, 0.4);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(99, 102, 241, 0.2);
    }
    .image-wrapper {
      aspect-ratio: 2/3;
      overflow: hidden;
      position: relative;
    }
    .book-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .book-card-glass:hover .book-cover {
      transform: scale(1.1);
    }
    .price-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(8px);
      color: var(--accent);
      padding: 0.4rem 0.8rem;
      border-radius: 0.75rem;
      font-weight: 800;
      font-size: 0.9rem;
      border: 1px solid rgba(34, 211, 238, 0.3);
    }
    .card-body {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .book-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
      line-height: 1.3;
      color: var(--text-main);
    }
    .book-author {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .card-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .stock-status {
      font-size: 0.8rem;
      font-weight: 600;
      color: #34D399;
      opacity: 0.8;
    }
    .stock-status.low {
      color: #F87171;
    }
    .view-btn {
      background: var(--primary);
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
    }
    .book-card-glass:hover .view-btn {
      transform: translateX(3px);
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.5);
    }
  `]
})
export class BookItemComponent {
  @Input() book!: Book;
}
