import { SITE_NAME, SITE_URL, WIKIPEDIA_URL, faq, finances } from '../data/fund'

/**
 * schema.org JSON-LD for search engines (rich FAQ results) and LLM grounding.
 * Rendered as an inline script so prerendering bakes it into the static HTML.
 */
export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}#webpage`,
        name: SITE_NAME,
        url: SITE_URL,
        isPartOf: { '@id': `${SITE_URL}#website` },
        about: { '@type': 'Thing', name: 'PM CARES Fund' },
        description:
          'What is the PM CARES Fund? How much it raised and spent, ventilator and oxygen allocations, audit and RTI status — explained with charts, sourced from Wikipedia.',
        inLanguage: 'en',
        isAccessibleForFree: true,
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'Dataset',
        '@id': `${SITE_URL}#dataset`,
        name: 'PM CARES Fund — receipts, balance and allocation figures (FY2019-20 to FY2020-21)',
        description:
          'Receipts and year-end balances in ₹ crore as published on pmcares.gov.in and reproduced by Wikipedia, plus the 13 May 2020 allocation of ₹3,100 crore (ventilators, migrant-worker welfare, vaccine support) and institutional donation figures.',
        url: SITE_URL,
        isBasedOn: WIKIPEDIA_URL,
        isAccessibleForFree: true,
        keywords: ['PM CARES Fund', 'COVID-19 India', 'donations', 'expenditure', 'transparency'],
        temporalCoverage: '2020-03/2022-02',
        variableMeasured: [
          'Receipts (₹ crore) — ' + finances.years.map((y) => `${y.fiscalYear}: ${y.receiptsCrore}`).join('; '),
          'Year-end balance (₹ crore) — ' + finances.years.map((y) => `${y.fiscalYear}: ${y.balanceCrore}`).join('; '),
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
