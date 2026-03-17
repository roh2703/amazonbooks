import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="main-container py-12">
      <div class="form-card glass-card">
        <header class="form-header">
          <h1 class="form-title text-gradient">Add New Masterpiece</h1>
          <p class="form-subtitle">Contribute to our growing library of timeless English literature.</p>
        </header>

        <form [formGroup]="bookForm" (ngSubmit)="onSubmit()" class="modern-form">
          <div class="form-section">
            <div class="input-group">
              <label for="title">Book Title</label>
              <input type="text" id="title" formControlName="title" placeholder="e.g. Wuthering Heights"
                     [class.error]="bookForm.get('title')?.invalid && bookForm.get('title')?.touched">
            </div>

            <div class="input-group">
              <label for="author">Author Name</label>
              <input type="text" id="author" formControlName="author" placeholder="e.g. Emily Brontë"
                     [class.error]="bookForm.get('author')?.invalid && bookForm.get('author')?.touched">
            </div>

            <div class="grid-row">
              <div class="input-group flex-1">
                <label for="price">Price (USD)</label>
                <div class="input-wrapper">
                  <span class="prefix">$</span>
                  <input type="number" id="price" formControlName="price" placeholder="0.00" step="0.01"
                         [class.error]="bookForm.get('price')?.invalid && bookForm.get('price')?.touched">
                </div>
              </div>

              <div class="input-group flex-1">
                <label for="stockQuantity">Stock Units</label>
                <input type="number" id="stockQuantity" formControlName="stockQuantity" placeholder="10"
                       [class.error]="bookForm.get('stockQuantity')?.invalid && bookForm.get('stockQuantity')?.touched">
              </div>
            </div>

            <div class="input-group">
              <label for="imageUrl">Cover Image URL</label>
              <input type="url" id="imageUrl" formControlName="imageUrl" placeholder="https://..."
                     [class.error]="bookForm.get('imageUrl')?.invalid && bookForm.get('imageUrl')?.touched">
            </div>

            <div class="input-group">
              <label for="description">Book Description</label>
              <textarea id="description" formControlName="description" rows="4" placeholder="Tell us more about this book..."
                        [class.error]="bookForm.get('description')?.invalid && bookForm.get('description')?.touched"></textarea>
            </div>
          </div>

          <div class="form-footer">
            <a routerLink="/" class="btn btn-secondary">Cancel</a>
            <button type="submit" class="btn btn-primary" [disabled]="bookForm.invalid || isSubmitting">
              {{ isSubmitting ? 'Adding...' : 'Add to Collection' }}
            </button>
          </div>
          
          <div class="error-toast" *ngIf="submitError">
            {{ submitError }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .main-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .form-card {
      padding: 3rem;
      box-shadow: var(--shadow-xl), 0 0 50px rgba(99, 102, 241, 0.1);
    }
    .form-header {
      margin-bottom: 3rem;
      text-align: center;
    }
    .form-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      letter-spacing: -0.04em;
    }
    .form-subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
    }
    .modern-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .grid-row {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .flex-1 { flex: 1; min-width: 200px; }
    
    label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    input, textarea {
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid var(--glass-border);
      color: var(--text-main);
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    input:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      background: rgba(15, 23, 42, 0.6);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
    }
    
    input.error, textarea.error {
      border-color: #EF4444;
      background: rgba(239, 68, 68, 0.05);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .prefix {
      position: absolute;
      left: 1.25rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .input-wrapper input {
      padding-left: 2.5rem;
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1.25rem;
      margin-top: 1rem;
      padding-top: 2rem;
      border-top: 1px solid var(--glass-border);
    }
    
    .error-toast {
      background: rgba(239, 68, 68, 0.1);
      color: #F87171;
      padding: 1rem;
      border-radius: 0.75rem;
      text-align: center;
      font-weight: 600;
    }
  `]
})
export class BookFormComponent {
  bookForm: FormGroup;
  isSubmitting = false;
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      const newBook: Book = this.bookForm.value;
      
      this.bookService.addBook(newBook).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          // Navigate back to the home page on success
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error saving book:', err);
          this.submitError = 'Failed to save the book. Please try again later.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
