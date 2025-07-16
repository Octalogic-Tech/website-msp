'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaSearch, FaShoppingCart, FaQuoteLeft, FaPhone, FaBars, FaTimes } from 'react-icons/fa'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ConstructPro</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search parts, machinery, model numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.navLink}>Shop</Link>
          <Link href="/parts-finder" className={styles.navLink}>Parts Finder</Link>
          <Link href="/about-us" className={styles.navLink}>About</Link>
          <Link href="/contact-us" className={styles.navLink}>Contact</Link>
        </div>

        {/* Action Buttons */}
        <div className={styles.navActions}>
          <Link href="/cart" className={styles.actionButton}>
            <FaShoppingCart />
            <span className={styles.actionText}>Cart</span>
          </Link>
          <Link href="/quote-cart" className={styles.actionButton}>
            <FaQuoteLeft />
            <span className={styles.actionText}>Quote</span>
          </Link>
          <a href="tel:+1234567890" className={`${styles.actionButton} ${styles.phoneButton}`}>
            <FaPhone />
            <span className={styles.actionText}>Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileMenuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/shop" className={styles.mobileNavLink}>Shop</Link>
          <Link href="/parts-finder" className={styles.mobileNavLink}>Parts Finder</Link>
          <Link href="/about-us" className={styles.mobileNavLink}>About</Link>
          <Link href="/contact-us" className={styles.mobileNavLink}>Contact</Link>
          <div className={styles.mobileActions}>
            <Link href="/cart" className={styles.mobileActionButton}>
              <FaShoppingCart /> Cart
            </Link>
            <Link href="/quote-cart" className={styles.mobileActionButton}>
              <FaQuoteLeft /> Quote
            </Link>
            <a href="tel:+1234567890" className={styles.mobileActionButton}>
              <FaPhone /> Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
