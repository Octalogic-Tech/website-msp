'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { FaSearch, FaShoppingCart, FaQuoteLeft, FaPhone, FaBars, FaTimes } from 'react-icons/fa'
import { useCart } from './shop/CartContext'
import { useQuote } from './shop/QuoteContext'
import styles from './Navigation.module.css'

export default function Navigation() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount: cartItemCount } = useCart()
  const { itemCount: quoteItemCount } = useQuote()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      router.push(`/shop/search?q=${encodeURIComponent(trimmedQuery)}`)
      setSearchQuery('') // Clear search after submission
    }
  }, [searchQuery, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }, [handleSearch])

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>ConstructPro</span>
        </Link>

        {/* Search Bar */}
        <div className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search parts, machinery, model numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
            aria-label="Search products"
          />
          <button 
            onClick={handleSearch}
            className={styles.searchButton} 
            aria-label="Search"
            disabled={!searchQuery.trim()}
          >
            <FaSearch />
          </button>
        </div>

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
            {cartItemCount > 0 && (
              <span className={styles.itemCount}>{cartItemCount}</span>
            )}
          </Link>
          <Link href="/quote" className={styles.actionButton}>
            <FaQuoteLeft />
            <span className={styles.actionText}>Quote</span>
            {quoteItemCount > 0 && (
              <span className={styles.itemCount}>{quoteItemCount}</span>
            )}
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
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {/* Mobile Search */}
          <div className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.mobileSearchInput}
              aria-label="Search products"
            />
            <button 
              onClick={handleSearch}
              className={styles.mobileSearchButton} 
              aria-label="Search"
              disabled={!searchQuery.trim()}
            >
              <FaSearch />
            </button>
          </div>

          <Link href="/shop" className={styles.mobileNavLink}>Shop</Link>
          <Link href="/parts-finder" className={styles.mobileNavLink}>Parts Finder</Link>
          <Link href="/about-us" className={styles.mobileNavLink}>About</Link>
          <Link href="/contact-us" className={styles.mobileNavLink}>Contact</Link>
          <div className={styles.mobileActions}>
            <Link href="/cart" className={styles.mobileActionButton}>
              <FaShoppingCart /> Cart
              {cartItemCount > 0 && (
                <span className={styles.mobileItemCount}>{cartItemCount}</span>
              )}
            </Link>
            <Link href="/quote" className={styles.mobileActionButton}>
              <FaQuoteLeft /> Quote
              {quoteItemCount > 0 && (
                <span className={styles.mobileItemCount}>{quoteItemCount}</span>
              )}
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
