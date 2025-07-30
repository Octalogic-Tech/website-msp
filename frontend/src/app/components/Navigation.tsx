'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { FaSearch, FaShoppingCart, FaQuoteLeft, FaPhone, FaBars, FaTimes, FaUser, FaSignInAlt, FaHeart } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from './shop/CartContext'
import { useQuote } from './shop/QuoteContext'
import { useSavedProducts } from '../contexts/SavedProductsContext'
import styles from './Navigation.module.css'

export default function Navigation() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const { itemCount: cartItemCount } = useCart()
  const { itemCount: quoteItemCount } = useQuote()
  const { savedProducts } = useSavedProducts()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      router.push(`/shop/search?q=${encodeURIComponent(trimmedQuery)}`)
      setSearchQuery('')
    }
  }, [searchQuery, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }, [handleSearch])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link href="/" className={styles.brand} aria-label="ConstructPro Home">
          <span className={styles.brandText}>ConstructPro</span>
        </Link>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchForm} role="search">
          <input
            type="search"
            placeholder="Search parts, machinery, model numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            aria-label="Search products"
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="Search"
            disabled={!searchQuery.trim()}
          >
            <FaSearch aria-hidden="true" />
          </button>
        </form>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="/shop" className={styles.navLink}>Shop</Link>
          <Link href="/parts-finder" className={styles.navLink}>Parts Finder</Link>
          <Link href="/about-us" className={styles.navLink}>About</Link>
          <Link href="/contact-us" className={styles.navLink}>Contact</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className={styles.actionButtons}>
          {user ? (
            <div className={styles.userMenu}>
              <Link href="/account" className={styles.actionButton} aria-label="My Account">
                <FaUser aria-hidden="true" />
                <span className={styles.accountText}>Account</span>
              </Link>
            </div>
          ) : (
            <Link href="/auth" className={styles.actionButton} aria-label="Login or Register">
              <FaSignInAlt aria-hidden="true" />
              <span className={styles.accountText}>Login</span>
            </Link>
          )}

          <Link href="/cart" className={styles.actionButton} aria-label={`Shopping cart with ${cartItemCount} items`}>
            <FaShoppingCart aria-hidden="true" />
            {cartItemCount > 0 && (
              <span className={styles.badge} aria-label={`${cartItemCount} items in cart`}>
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link href="/quote-cart" className={styles.actionButton} aria-label={`Quote requests with ${quoteItemCount} items`}>
            <FaQuoteLeft aria-hidden="true" />
            {quoteItemCount > 0 && (
              <span className={styles.badge} aria-label={`${quoteItemCount} items in quote`}>
                {quoteItemCount}
              </span>
            )}
          </Link>

          <Link href="/account/saved" className={styles.actionButton} aria-label={`Saved products with ${savedProducts.length} items`}>
            <FaHeart aria-hidden="true" />
            {savedProducts.length > 0 && (
              <span className={styles.badge} aria-label={`${savedProducts.length} saved products`}>
                {savedProducts.length}
              </span>
            )}
          </Link>

          <a href="tel:+1234567890" className={`${styles.actionButton} ${styles.callButton}`} aria-label="Call us now">
            <FaPhone aria-hidden="true" />
            <span className={styles.callText}>Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />
          <div
            id="mobile-menu"
            className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className={styles.mobileSearchForm} role="search">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.mobileSearchInput}
                aria-label="Search products"
              />
              <button
                type="submit"
                className={styles.mobileSearchButton}
                aria-label="Search"
                disabled={!searchQuery.trim()}
              >
                <FaSearch aria-hidden="true" />
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <div className={styles.mobileNavLinks}>
              <Link href="/shop" className={styles.mobileNavLink} onClick={closeMenu}>Shop</Link>
              <Link href="/parts-finder" className={styles.mobileNavLink} onClick={closeMenu}>Parts Finder</Link>
              <Link href="/about-us" className={styles.mobileNavLink} onClick={closeMenu}>About</Link>
              <Link href="/contact-us" className={styles.mobileNavLink} onClick={closeMenu}>Contact</Link>
              {user && (
                <Link href="/account" className={styles.mobileNavLink} onClick={closeMenu}>My Account</Link>
              )}
            </div>

            {/* Mobile Action Buttons */}
            <div className={styles.mobileActions}>
              {!user && (
                <Link href="/auth" className={styles.mobileActionButton} onClick={closeMenu}>
                  <FaSignInAlt aria-hidden="true" />
                  <span>Login</span>
                </Link>
              )}

              <Link href="/cart" className={styles.mobileActionButton} onClick={closeMenu}>
                <FaShoppingCart aria-hidden="true" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className={styles.mobileBadge}>{cartItemCount}</span>
                )}
              </Link>

              <Link href="/quote-cart" className={styles.mobileActionButton} onClick={closeMenu}>
                <FaQuoteLeft aria-hidden="true" />
                <span>Quote</span>
                {quoteItemCount > 0 && (
                  <span className={styles.mobileBadge}>{quoteItemCount}</span>
                )}
              </Link>

              <Link href="/account/saved" className={styles.mobileActionButton} onClick={closeMenu}>
                <FaHeart aria-hidden="true" />
                <span>Saved</span>
                {savedProducts.length > 0 && (
                  <span className={styles.mobileBadge}>{savedProducts.length}</span>
                )}
              </Link>

              <a href="tel:+1234567890" className={`${styles.mobileActionButton} ${styles.mobileCallButton}`}>
                <FaPhone aria-hidden="true" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
