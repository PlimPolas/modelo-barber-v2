'use client';

const pricingColumns = [
  [
    ['Tailored Haircuts', '$25'],
    ['Modern Fade', '$30'],
    ['Beard Trim and Sculpt', '$20'],
    ['Hot Towel Razor Shave', '$35'],
    ['Executive Grooming', '$45'],
    ['Color and Highlights', '$50'],
    ['Hair Treatment', '$25'],
  ],
  [
    ['Refreshing Facial', '$40'],
    ['Hair Color Enhancement', '$35'],
    ['Shampoo and Blowout', '$25'],
    ["Kids' Cut (Under 12)", '$20'],
    ["Senior's Special", '$15'],
    ['Head Shave', '$20'],
    ['Custom Consultation', 'Free'],
  ],
];

export function PricingSection() {
  return (
    <section className="atelier-section pricing-section" aria-labelledby="pricing-title">
      <div className="section-shell">
        <div className="pricing-header" data-reveal>
          <div className="pricing-heading-block">
            <p className="pricing-eyebrow">What We Offer</p>
            <h2 className="pricing-title" id="pricing-title">Our Prices</h2>
          </div>

          <p className="pricing-description">
            Experience luxury grooming with our diverse services designed just for you.
            Discover clear pricing aligned with the value you get.
          </p>
        </div>

        <div className="pricing-grid" data-reveal>
          {pricingColumns.map((column, columnIndex) => (
            <div className="pricing-column" key={`pricing-column-${columnIndex + 1}`}>
              {column.map(([name, price]) => (
                <div className="pricing-row" key={name}>
                  <span className="pricing-service-name">{name}</span>
                  <span className="pricing-leader" aria-hidden="true" />
                  <span className="pricing-price">{price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
