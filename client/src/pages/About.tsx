import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      {/* ── Hero ──────────────────────────────────── */}
      <section className="about-hero">
        <span className="eyebrow">Our Story</span>
        <h1>
          Born from <em>rust</em> <br />
          and raw leather.
        </h1>
        <p>
          VIEN started in a cramped garage workshop with one cobbler's bench, a
          stack of salvaged hides, and a stubborn belief that shoes should age
          like fine whiskey&mdash;better with every mile.
        </p>
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
              icon: '&#9775;',
            },
            {
              title: 'Handcrafted',
              desc: 'Every pair is stitched, lasted, and finished by hand. Mass production is not our language.',
              icon: '&#9998;',
            },
            {
              title: 'Built to Age',
              desc: 'We design for patina, not perfection. These shoes get better the more you wear them.',
              icon: '&#8986;',
            },
            {
              title: 'Small Batches',
              desc: 'Limited runs mean you won\'t see your shoes on every corner. Each drop is intentional.',
              icon: '&#9830;',
            },
          ].map((v, i) => (
            <div key={i} className="value-card">
              <span
                className="value-icon"
                dangerouslySetInnerHTML={{ __html: v.icon }}
              />
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
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
            },
            {
              step: '02',
              title: 'Design',
              desc: 'Every silhouette starts as a hand-sketch, refined until it balances edge with everyday wearability.',
            },
            {
              step: '03',
              title: 'Craft',
              desc: 'Our cobblers cut, stitch, and last each pair by hand, using techniques passed down for generations.',
            },
            {
              step: '04',
              title: 'Deliver',
              desc: 'Packed in recycled materials and shipped to your door, ready to hit the ground running.',
            },
          ].map((s) => (
            <div key={s.step} className="process-card">
              <span className="process-number">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────── */}
      <section className="brand-banner">
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
