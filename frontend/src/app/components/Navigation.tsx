'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { FaSearch, FaShoppingCart, FaQuoteLeft, FaPhone, FaBars, FaTimes } from 'react-icons/fa'
import { useCart } from './shop/CartContext'
import { useQuote } from './shop/QuoteContext'
import './navigation.css'

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
    <nav className="navbar">
      <div className="navContainer">
        {/* Logo */}
        <Link href="/" className="logo">
          <span className="logoText">ConstructPro</span>
        </Link>

        {/* Search Bar */}
        <div className="searchForm">
          <input
            type="text"
            placeholder="Search parts, machinery, model numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="searchInput"
            aria-label="Search products"
          />
          <button
            onClick={handleSearch}
            className="searchButton"
            aria-label="Search"
            disabled={!searchQuery.trim()}
          >
            <FaSearch />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="navLinks">
          <Link href="/shop" className="navLink">Shop</Link>
          <Link href="/parts-finder" className="navLink">Parts Finder</Link>
          <Link href="/about-us" className="navLink">About</Link>
          <Link href="/contact-us" className="navLink">Contact</Link>
        </div>

        {/* Action Buttons */}
        <div className="navActions">
          <Link href="/cart" className="actionButton">
            <FaShoppingCart />
            <span className="actionText">Cart</span>
            {cartItemCount > 0 && (
              <span className="itemCount">{cartItemCount}</span>
            )}
          </Link>
          <Link href="/quote" className="actionButton">
            <FaQuoteLeft />
            <span className="actionText">Quote</span>
            {quoteItemCount > 0 && (
              <span className="itemCount">{quoteItemCount}</span>
            )}
          </Link>
          <a href="tel:+1234567890" className="actionButton phoneButton">
            <FaPhone />
            <span className="actionText">Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobileMenuToggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobileMenu">
          {/* Mobile Search */}
          <div className="mobileSearchForm">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mobileSearchInput"
              aria-label="Search products"
            />
            <button
              onClick={handleSearch}
              className="mobileSearchButton"
              aria-label="Search"
              disabled={!searchQuery.trim()}
            >
              <FaSearch />
            </button>
          </div>

          <Link href="/shop" className="mobileNavLink">Shop</Link>
          <Link href="/parts-finder" className="mobileNavLink">Parts Finder</Link>
          <Link href="/about-us" className="mobileNavLink">About</Link>
          <Link href="/contact-us" className="mobileNavLink">Contact</Link>
          <div className="mobileActions">
            <Link href="/cart" className="mobileActionButton">
              <FaShoppingCart /> Cart
              {cartItemCount > 0 && (
                <span className="mobileItemCount">{cartItemCount}</span>
              )}
            </Link>
            <Link href="/quote" className="mobileActionButton">
              <FaQuoteLeft /> Quote
              {quoteItemCount > 0 && (
                <span className="mobileItemCount">{quoteItemCount}</span>
              )}
            </Link>
            <a href="tel:+1234567890" className="mobileActionButton">
              <FaPhone /> Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
