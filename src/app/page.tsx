import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="page-wrapper">
      <header className="header-main">
        <div className="container header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Image src="/logo.png" alt="AllSet Logo" width={40} height={40} style={{ borderRadius: '8px' }} />
            <div className="logo-text">
              AllSet
            </div>
          </div>
          <nav className="nav-links">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="hero-section">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Dev Environment <br />
            <span className="hero-title-gradient">
              Ready in Minutes
            </span>
          </h1>
          <p className="hero-subtitle">
            Automate your local setup. Choose your stack, generate a profile, and get started at coding immediately.
          </p>
          <div className="hero-actions">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">Start Setup</Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button variant="secondary" size="lg" className="text-lg px-8">View on GitHub</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
