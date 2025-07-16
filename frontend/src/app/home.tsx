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
          alt="Hero Background"
          fill
          style={{ objectFit: 'cover' }}
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Construction{'\n'}Machinery &{'\n'}Spare Parts
          </h1>
          <Link href="/shop" className={styles.heroButton}>
            Shop Now
          </Link>
        </div>
      </div>

      {/* Category Quick Access */}
      <section className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>
          Shop by Category
        </h2>
        <div className={styles.categoryGrid}>
          {[
            { img: excavator1, label: 'Excavators' },
            { img: wheelLoader, label: 'Loaders' },
            { img: backhoeloader, label: 'Dumptrucks' },
            { img: hydraulics, label: 'Hydraulics' },
            { img: filters, label: 'Filters' },
            { img: undercarriage, label: 'Undercarriage' },
          ].map((cat, idx) => (
            <div
              key={idx}
              className={styles.categoryCard}
            >
              <Image src={cat.img} alt={cat.label} width={160} height={100} />
              <p className={styles.categoryLabel}>
                {cat.label}
              </p>
            </div>
          ))}
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
          <GrUserExpert className="text-gray-800 w-[50px] h-[50px]" />
          <div className={styles.whyChooseItem}>
            <div className={styles.whyChooseText}>
              <h3 className={styles.whyChooseTitle}>
                Expert Support
              </h3>
              <p className={styles.whyChooseDescription}>Guidance for every need</p>
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
            { img: excavator1, name: 'Excavator 1', price: 30000 },
            { img: wheelLoader, name: 'Wheel Loader', price: 38000 },
            { img: miniexcavator, name: 'Mini Excavator', price: 29000 },
            { img: backhoeloader, name: 'Backhoe Loader', price: 45000 },
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
  </div>
  <div className={styles.productInfo}>
    <h3 className={styles.productName}>
      {product.name}
    </h3>
    <p className={styles.productPrice}>
      ${product.price.toLocaleString()}
    </p>
    <button className={styles.productButton}>
      Add to Cart
    </button>
  </div>
</div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Company Name. All rights reserved.
      </footer>
    </div>
  )
}






