'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GrUserExpert } from "react-icons/gr";
import styles from './HomeComponent.module.css'
import homebg from './assets/images/homebg.jpg'
import qualityassurance from './assets/images/qualityassurance.png'
import trustedpartners from './assets/images/trustedpartner.png'
import excavator1 from './assets/images/excavator1.png'
import miniexcavator from './assets/images/miniexcavator.png'
import wheelLoader from './assets/images/wheelLoader.png'
import backhoeloader from './assets/images/backhoeloader.png'
import hydraulics from './assets/images/hydraulics.png'
import filters from './assets/images/filters.png'
import undercarriage from './assets/images/undercarriage.png'

export default function HomeComponent() {
  return (
    <div className={styles.container}>

      {/* Hero Banner */}
      <div className={styles.hero}>
        <Image
          src={homebg}
          alt="Construction Machinery in Action"
          fill
          style={{ objectFit: 'cover' }}
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Construction{'\n'}Machinery &{'\n'}Spare Parts
          </h1>
          <p className={styles.heroSubtitle}>
            Professional Equipment & Genuine Parts for Construction Industry
          </p>
          <div className={styles.heroCTAGroup}>
            <Link href="/shop" className={styles.heroButton}>
              Shop Now
            </Link>
            <Link href="/parts-finder" className={`${styles.heroButton} ${styles.heroButtonSecondary}`}>
              Parts Finder
            </Link>
            <Link href="/contact-us" className={`${styles.heroButton} ${styles.heroButtonOutline}`}>
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Category Quick Access */}
      <section className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>
          Shop by Category
        </h2>
        <div className={styles.categoryGrid}>
          {[
            { img: excavator1, label: 'Excavators', link: '/shop/excavators' },
            { img: wheelLoader, label: 'Loaders', link: '/shop/loaders' },
            { img: backhoeloader, label: 'Dumptrucks', link: '/shop/dumptrucks' },
            { img: hydraulics, label: 'Hydraulics', link: '/shop/hydraulics' },
            { img: filters, label: 'Filters', link: '/shop/filters' },
            { img: undercarriage, label: 'Undercarriage', link: '/shop/undercarriage' },
          ].map((cat, idx) => (
            <Link 
              key={idx}
              href={cat.link}
              className={styles.categoryCard}
            >
              <div className={styles.categoryImageContainer}>
                <Image src={cat.img} alt={cat.label} width={160} height={100} className={styles.categoryImage} />
              </div>
              <p className={styles.categoryLabel}>
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* B2B Trust Section */}
      <section className={styles.trustSection}>
        <div className={styles.trustContainer}>
          <div className={styles.trustItem}>
            <div className={styles.trustNumber}>15+</div>
            <div className={styles.trustLabel}>Years Experience</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNumber}>500+</div>
            <div className={styles.trustLabel}>Projects Completed</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNumber}>24/7</div>
            <div className={styles.trustLabel}>Expert Support</div>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustNumber}>ISO</div>
            <div className={styles.trustLabel}>Certified</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection}>
        <h2 className={styles.sectionTitle}>
          Why Choose Us?
        </h2>
        <div className={styles.whyChooseContent}>
          <div className={styles.whyChooseItem}>
            <Image src={trustedpartners} alt="Trusted Partner" width={60} height={60} />
            <div className={styles.whyChooseText}>
              <h3 className={styles.whyChooseTitle}>
                Trusted Partner
              </h3>
              <p className={styles.whyChooseDescription}>Reliable service in heavy machinery</p>
            </div>
          </div>
          <div className={styles.whyChooseItem}>
            <Image src={qualityassurance} alt="Quality Assurance" width={60} height={60} />
            <div className={styles.whyChooseText}>
              <h3 className={styles.whyChooseTitle}>
                Quality Assurance
              </h3>
              <p className={styles.whyChooseDescription}>Only genuine or verified parts</p>
            </div>
          </div>
          <div className={styles.whyChooseItem}>
            <GrUserExpert className={styles.expertIcon} />
            <div className={styles.whyChooseText}>
              <h3 className={styles.whyChooseTitle}>
                Expert Support
              </h3>
              <p className={styles.whyChooseDescription}>Technical guidance for every need</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>
          Featured Products
        </h2>
        <div className={styles.productGrid}>
          {[
            { img: excavator1, name: 'CAT 320 Excavator', price: 89000, condition: 'New', availability: 'In Stock' },
            { img: wheelLoader, name: 'Komatsu WA200 Loader', price: 75000, condition: 'Used', availability: 'Low Stock' },
            { img: miniexcavator, name: 'JCB 8025 Mini Excavator', price: 35000, condition: 'Refurbished', availability: 'In Stock' },
            { img: backhoeloader, name: 'CAT 420F Backhoe', price: 125000, condition: 'New', availability: 'In Stock' },
          ].map((product, idx) => (
            <div key={idx} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <Image 
                  src={product.img} 
                  alt={product.name} 
                  width={200} 
                  height={140} 
                  className={styles.productImage} 
                />
                <div className={`${styles.availabilityBadge} ${styles[product.availability.toLowerCase().replace(' ', '-')]}`}>
                  {product.availability}
                </div>
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  {product.name}
                </h3>
                <div className={styles.productMeta}>
                  <span className={styles.productCondition}>{product.condition}</span>
                </div>
                <p className={styles.productPrice}>
                  ${product.price.toLocaleString()}
                </p>
                <div className={styles.productActions}>
                  <button className={styles.productButton}>
                    Add to Cart
                  </button>
                  <button className={styles.productButtonSecondary}>
                    Add to Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sectionCTA}>
          <Link href="/shop" className={styles.viewAllButton}>
            View All Products
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Company Name. All rights reserved.
      </footer>
    </div>
  )
}






