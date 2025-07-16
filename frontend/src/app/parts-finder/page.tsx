'use client'

import { useState } from 'react'
import './parts-finder.css'

interface PartFinderForm {
  make: string
  model: string
  year: string
  partCategory: string
}

interface Part {
  id: number
  name: string
  partNumber: string
  price: number
  availability: string
  compatibility: string
}

export default function PartsFinderPage() {
  const [formData, setFormData] = useState<PartFinderForm>({
    make: '',
    model: '',
    year: '',
    partCategory: ''
  })

  const [results, setResults] = useState<Part[]>([])
  const [loading, setLoading] = useState(false)

  const makes = ['Caterpillar', 'Komatsu', 'JCB', 'Volvo', 'John Deere', 'Case', 'Liebherr']
  const partCategories = ['Hydraulics', 'Filters', 'Undercarriage', 'Engine Parts', 'Electrical', 'Cabin Parts']

  const handleInputChange = (field: keyof PartFinderForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Use the existing product service for parts search
      const queryParams = new URLSearchParams()
      if (formData.make) queryParams.append('search', formData.make)
      if (formData.model) queryParams.append('search', `${formData.make} ${formData.model}`)
      if (formData.partCategory) queryParams.append('category', formData.partCategory)

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`)
      
      if (response.ok) {
        const data = await response.json()
        // Transform products to parts format
        const parts = data.products.map((product: { id: number; name: string; sku?: string; price: number; availability?: string }) => ({
          id: product.id,
          name: product.name,
          partNumber: product.sku || `PART-${product.id}`,
          price: product.price,
          availability: product.availability || 'In Stock',
          compatibility: `${formData.make} ${formData.model}`
        }))
        setResults(parts)
      }
    } catch (error) {
      console.error('Error searching parts:', error)
      // Mock results for demo
      setResults([
        {
          id: 1,
          name: 'Hydraulic Filter HF6555',
          partNumber: 'HF6555',
          price: 45.99,
          availability: 'In Stock',
          compatibility: 'CAT 320D, 325D, 330D'
        },
        {
          id: 2,
          name: 'Engine Oil Filter LF3000',
          partNumber: 'LF3000',
          price: 28.50,
          availability: 'Low Stock',
          compatibility: 'CAT 320D, 324D'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="parts-finder-container">
      <header className="parts-finder-header">
        <h1>Spare Parts Finder</h1>
        <p>Find compatible parts for your construction machinery</p>
      </header>

      <div className="finder-content">
        <form onSubmit={handleSearch} className="finder-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <select
                id="make"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                required
              >
                <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                placeholder="e.g. 320D, WA200"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                placeholder="e.g. 2015"
                min="1990"
                max="2025"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="partCategory">Part Category</label>
              <select
                id="partCategory"
                value={formData.partCategory}
                onChange={(e) => handleInputChange('partCategory', e.target.value)}
              >
                <option value="">All Categories</option>
                {partCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Find Parts'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="results-section">
            <h2>Compatible Parts ({results.length})</h2>
            <div className="results-grid">
              {results.map((part) => (
                <div key={part.id} className="part-card">
                  <h3 className="part-name">{part.name}</h3>
                  <p className="part-number">Part #: {part.partNumber}</p>
                  <p className="part-compatibility">Fits: {part.compatibility}</p>
                  <div className="part-footer">
                    <span className="part-price">${part.price}</span>
                    <span className={`availability-badge ${part.availability.toLowerCase().replace(' ', '-')}`}>
                      {part.availability}
                    </span>
                  </div>
                  <div className="part-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="add-to-quote-btn">Add to Quote</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !loading && formData.make && (
          <div className="no-results">
            <p>No compatible parts found. Please try different search criteria or contact our technical support.</p>
            <button className="contact-support-btn">Contact Technical Support</button>
          </div>
        )}
      </div>
    </div>
  )
}
