import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="about-hero-full">
        <img
          src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=1600&q=80"
          alt="Leather workshop"
          className="about-hero-bg"
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-text">
          <span className="eyebrow" style={{ color: '#b8964e' }}>
            Our Story
          </span>
          <h1>
            Born from <em>rust</em> <br />
            and raw leather.
          </h1>
          <p>
            VIEN started in a cramped garage workshop with one cobbler's bench, a
            stack of salvaged hides, and a stubborn belief that shoes should age
            like fine whiskey&mdash;better with every mile.
          </p>
        </div>
      </section>

      {/* ── Story Split ─────────────────────────────── */}
      <section className="about-story-split">
        <div className="story-img">
          <img
            src="https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=700&q=80"
            alt="Cobbler at work"
          />
        </div>
        <div className="story-text">
          <span className="eyebrow">The Beginning</span>
          <h2>From Garage to Workshop</h2>
          <p>
            In 2024, two friends—a cobbler and a designer—merged their obsessions.
            One loved the smell of tanned leather; the other couldn't stop
            sketching shoes on napkins. The result was VIEN: footwear that bridges
            the gap between raw craft and modern edge.
          </p>
          <p>
            Today we operate out of a converted warehouse in Portland, Oregon.
            Every pair still passes through the same hands that made our first
            boot.
          </p>
        </div>
      </section>

      {/* ── Values ────────────────────────────────── */}
      <section className="section values-section">
        <div className="section-header">
          <span className="eyebrow">What drives us</span>
          <h2>Built Different</h2>
        </div>
        <div className="values-grid">
          {[
            {
              title: 'Raw Materials',
              desc: 'Full-grain leather, waxed canvas, natural rubber. No synthetics. No shortcuts.',
              img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&h=300&q=80',
            },
            {
              title: 'Handcrafted',
              desc: 'Every pair is stitched, lasted, and finished by hand. Mass production is not our language.',
              img: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=400&h=300&q=80',
            },
            {
              title: 'Built to Age',
              desc: 'We design for patina, not perfection. These shoes get better the more you wear them.',
              img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=400&h=300&q=80',
            },
            {
              title: 'Small Batches',
              desc: "Limited runs mean you won't see your shoes on every corner. Each drop is intentional.",
              img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&h=300&q=80',
            },
          ].map((v, i) => (
            <div key={i} className="value-card value-card-img">
              <div className="value-card-image">
                <img src={v.img} alt={v.title} />
              </div>
              <div className="value-card-body">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Full-width Workshop Image ──────────────── */}
      <section className="about-full-img">
        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1600&h=500&q=80"
          alt="Workshop panoramic"
        />
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section className="section process-section">
        <div className="section-header">
          <span className="eyebrow">From workshop to doorstep</span>
          <h2>The Process</h2>
        </div>
        <div className="process-steps">
          {[
            {
              step: '01',
              title: 'Source',
              desc: 'We hunt down the finest leathers and textiles from tanneries that share our obsession with quality.',
              img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=400&h=250&q=80',
            },
            {
              step: '02',
              title: 'Design',
              desc: 'Every silhouette starts as a hand-sketch, refined until it balances edge with everyday wearability.',
              img: 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?auto=format&fit=crop&w=400&h=250&q=80',
            },
            {
              step: '03',
              title: 'Craft',
              desc: 'Our cobblers cut, stitch, and last each pair by hand, using techniques passed down for generations.',
              img: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=400&h=250&q=80',
            },
            {
              step: '04',
              title: 'Deliver',
              desc: 'Packed in recycled materials and shipped to your door, ready to hit the ground running.',
              img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&h=250&q=80',
            },
          ].map((s) => (
            <div key={s.step} className="process-card process-card-img">
              <div className="process-card-image">
                <img src={s.img} alt={s.title} />
              </div>
              <div className="process-card-body">
                <span className="process-number">{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Numbers ───────────────────────────────── */}
      <section className="about-numbers">
        <div className="about-numbers-inner">
          {[
            { number: '2,400+', label: 'Pairs crafted' },
            { number: '14', label: 'Artisan steps per shoe' },
            { number: '100%', label: 'Full-grain leather' },
            { number: '72hrs', label: 'Average craft time' },
          ].map((n, i) => (
            <div key={i} className="number-card">
              <span className="number-value">{n.number}</span>
              <span className="number-label">{n.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────── */}
      <section className="brand-banner">
        <div className="brand-banner-bg">
          <img
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1600&q=80"
            alt="Sneaker detail"
          />
        </div>
        <div className="brand-banner-content">
          <h2>
            Ready to walk <em>different</em>?
          </h2>
          <p>
            Browse our collection of handcrafted, weathered-look footwear and
            find the pair that tells your story.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
