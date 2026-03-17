import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <div class="container nav-content">
        <a routerLink="/" class="brand">
          <span class="brand-dots"></span>
          AmazonBooks
        </a>
        <div class="links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/add-book" routerLinkActive="active" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Book
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: all 0.3s ease;
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
    }
    .brand {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--text-main);
      text-decoration: none;
      letter-spacing: -0.04em;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-dots {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 3px;
      box-shadow: 0 0 15px var(--primary);
      transform: rotate(45deg);
    }
    .links {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
    .links a {
      text-decoration: none;
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      position: relative;
    }
    .links a:not(.btn):hover, .links a.active:not(.btn) {
      color: var(--primary);
    }
    .links a.active:not(.btn)::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary);
      border-radius: 2px;
      box-shadow: 0 0 10px var(--primary);
    }
    .btn {
      font-size: 0.9rem;
      padding: 0.6rem 1.2rem;
    }
  `]
})
export class NavbarComponent {}
