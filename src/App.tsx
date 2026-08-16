import { About } from './components/About'
import { Debate } from './components/Debate'
import { Donations } from './components/Donations'
import { Faq } from './components/Faq'
import { Finances } from './components/Finances'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { IdentityCard } from './components/IdentityCard'
import { Section } from './components/Section'
import { Sources } from './components/Sources'
import { Spending } from './components/Spending'
import { Timeline } from './components/Timeline'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <Hero />

        <Section
          id="overview"
          title="Overview"
          lead="The essentials: what the PM CARES Fund is, who runs it, and its headline numbers — exactly as documented on Wikipedia."
        >
          <IdentityCard />
        </Section>

        <Section
          id="finances"
          title="Finances — money in, money left"
          lead="Receipts and year-end balances as published on pmcares.gov.in and reproduced by Wikipedia, plus an estimate of who donated. The fund's accounts are audited privately (SARC & Associates), not by the CAG."
          dark
        >
          <Finances />
        </Section>

        <Section
          id="donations"
          title="Donations — who gave what"
          lead="Selected institutional donation figures reported in the article. Periods and donor counts differ between reports, so these figures are not additive."
        >
          <Donations />
        </Section>

        <Section
          id="spending"
          title="Spending — allocations and delivery"
          lead="The fund's first allocation (13 May 2020) and what independent reports said about delivery of ventilators and oxygen plants."
        >
          <Spending />
        </Section>

        <Section
          id="timeline"
          title="Timeline — key events"
          lead="From creation on 27 March 2020 through allocations, court rulings and audit reporting."
        >
          <Timeline />
        </Section>

        <Section
          id="debate"
          title="The debate — transparency contested"
          lead="The fund's structure has been widely debated. Wikipedia documents both the criticism and the government's response; both are presented here without editorial verdict."
          dark
        >
          <Debate />
        </Section>

        <Section
          id="faq"
          title="Frequently asked questions"
          lead="Quick answers, each drawn from the source article."
        >
          <Faq />
        </Section>

        <Section
          id="sources"
          title="Sources & caveats"
          lead="Where every figure comes from, and what to keep in mind when reading it."
        >
          <Sources />
        </Section>

        <Section
          id="about"
          title="About this site"
          lead="Who maintains this page, how its facts are sourced and verified, and how to report an error."
          dark
        >
          <About />
        </Section>
      </main>
      <Footer />
    </>
  )
}
