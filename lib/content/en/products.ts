import type { Product, ProductFamily } from '@/lib/types'

export const families: ProductFamily[] = [
  {
    slug: 'ball-valve-series',
    name: 'Ball Valve Series',
    descriptor: 'Ball valves',
    summary:
      'Quarter-turn style ball valve with a handle, represented by the Air Line Ball Valve.',
    scope: ['Air Line Ball Valve'],
  },
  {
    slug: 'valve-assemblies',
    name: 'Valve Assemblies',
    descriptor: 'Valve Series',
    summary:
      'Machined valve assemblies supplied in three materials: brass, stainless steel and aluminum.',
    scope: [
      'Brass Valve Assembly',
      'Stainless Steel Valve Assembly',
      'Aluminum Valve Assembly',
    ],
  },
  {
    slug: 'connector-series',
    name: 'Connector Series',
    descriptor: 'Connector assemblies',
    summary:
      'Connector assemblies for joining lines and changing direction: the Elbow Assembly and the Straight Connector.',
    scope: ['Elbow Assembly', 'Straight Connector'],
  },
]

const rfqFact = { label: 'Size, thread and interface', value: 'Confirmed during RFQ and technical review' }
const customFact = { label: 'Customization', value: 'OEM/ODM discussion supported' }

export const products: Product[] = [
  {
    slug: 'air-line-ball-valve',
    name: 'Air Line Ball Valve',
    familySlug: 'ball-valve-series',
    materialSlug: 'brass',
    materialLabel: 'Brass body',
    summary:
      'Ball valve with a brass body, wing-style handle and threaded ends.',
    description: [
      'The Air Line Ball Valve is the Ball Valve Series product in RunCing’s current range.',
      'The supplied product image shows a brass body, a wing-style handle, a male threaded end and a female threaded end.',
      'Thread standard, size and handle style are confirmed against your drawing or sample during technical review.',
    ],
    highlights: [
      'Ball Valve Series',
      'Brass body as shown',
      'Wing-style handle',
      'Male and female threaded ends as shown',
    ],
    facts: [
      { label: 'Product family', value: 'Ball Valve Series' },
      { label: 'Material', value: 'Brass body' },
      { label: 'Handle', value: 'Wing-style, as shown' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/air-line-ball-valve.jpg',
        alt: 'Air Line Ball Valve with brass body, red wing-style handle and threaded ends',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Air Line Ball Valve',
      description:
        'Air Line Ball Valve from RunCing Tech: brass body ball valve with wing-style handle. Request a quote with your size and thread requirements.',
    },
  },
  {
    slug: 'brass-valve-assembly',
    name: 'Brass Valve Assembly',
    familySlug: 'valve-assemblies',
    materialSlug: 'brass',
    materialLabel: 'Brass',
    summary:
      'Machined brass valve assembly with a cross port, hex collar and grooved shoulders.',
    description: [
      'The Brass Valve Assembly is the brass option within RunCing’s valve assemblies.',
      'The supplied product image shows a turned cylindrical body with a cross port, a hex collar and several machined shoulders and grooves.',
      'Dimensions, port layout and finish are agreed from your drawing or sample during technical review.',
    ],
    highlights: [
      'Valve Assemblies family',
      'Brass',
      'Cross port as shown',
      'Hex collar and machined shoulders',
    ],
    facts: [
      { label: 'Product family', value: 'Valve Assemblies' },
      { label: 'Material', value: 'Brass' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/brass-valve-assembly.jpg',
        alt: 'Brass Valve Assembly with cross port, hex collar and machined grooves',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Brass Valve Assembly',
      description:
        'Brass Valve Assembly from RunCing Tech. Machined brass valve assembly available through OEM/ODM discussion. Send your drawing to request a quote.',
    },
  },
  {
    slug: 'stainless-steel-valve-assembly',
    name: 'Stainless Steel Valve Assembly',
    familySlug: 'valve-assemblies',
    materialSlug: 'stainless-steel',
    materialLabel: 'Stainless steel',
    summary:
      'Compact stainless steel valve assembly body with a top bore and a threaded side port.',
    description: [
      'The Stainless Steel Valve Assembly is the stainless steel option within RunCing’s valve assemblies.',
      'The supplied product image shows a compact cylindrical body with a large top bore, a seam line and an internally threaded side port.',
      'Grade, dimensions and thread are confirmed from your drawing or sample during technical review.',
    ],
    highlights: [
      'Valve Assemblies family',
      'Stainless steel',
      'Threaded side port as shown',
      'Top bore as shown',
    ],
    facts: [
      { label: 'Product family', value: 'Valve Assemblies' },
      { label: 'Material', value: 'Stainless steel' },
      { label: 'Material grade', value: 'Confirmed during RFQ' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/stainless-steel-valve-assembly.jpg',
        alt: 'Stainless Steel Valve Assembly body with top bore and threaded side port',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Stainless Steel Valve Assembly',
      description:
        'Stainless Steel Valve Assembly from RunCing Tech. Request a quote and confirm grade, size and thread through technical review.',
    },
  },
  {
    slug: 'aluminum-valve-assembly',
    name: 'Aluminum Valve Assembly',
    familySlug: 'valve-assemblies',
    materialSlug: 'aluminum',
    materialLabel: 'Aluminum',
    summary:
      'Aluminum valve assembly with a hex end, a side port and a visible sealing ring.',
    description: [
      'The Aluminum Valve Assembly is the aluminum option within RunCing’s valve assemblies.',
      'The supplied product image shows a valve body with a hex end, a side port and a sealing ring at the upper shoulder.',
      'Alloy, surface treatment, dimensions and thread are confirmed from your drawing or sample during technical review.',
    ],
    highlights: [
      'Valve Assemblies family',
      'Aluminum',
      'Hex end and side port as shown',
      'Sealing ring as shown',
    ],
    facts: [
      { label: 'Product family', value: 'Valve Assemblies' },
      { label: 'Material', value: 'Aluminum' },
      { label: 'Alloy and surface treatment', value: 'Confirmed during RFQ' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/aluminum-valve-assembly.jpg',
        alt: 'Aluminum Valve Assembly with hex end, side port and sealing ring',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Aluminum Valve Assembly',
      description:
        'Aluminum Valve Assembly from RunCing Tech. Send your drawing or sample to confirm alloy, finish and interface before quoting.',
    },
  },
  {
    slug: 'elbow-assembly',
    name: 'Elbow Assembly',
    familySlug: 'connector-series',
    materialSlug: null,
    materialLabel: 'Material confirmed per RFQ',
    summary:
      'Bent connector assembly with a male threaded end and a hex swivel-nut end.',
    description: [
      'The Elbow Assembly is a Connector Series product used to change line direction.',
      'The supplied product image shows a bent tube section with a male threaded end on one side and a hex swivel-nut end on the other.',
      'Material, angle, tube size and thread standard are confirmed from your drawing or sample during technical review.',
    ],
    highlights: [
      'Connector Series',
      'Bent form as shown',
      'Male threaded end',
      'Hex swivel-nut end',
    ],
    facts: [
      { label: 'Product family', value: 'Connector Series' },
      { label: 'Material', value: 'Confirmed during RFQ' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/elbow-assembly.jpg',
        alt: 'Elbow Assembly with male threaded end and hex swivel-nut end',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Elbow Assembly',
      description:
        'Elbow Assembly from the RunCing Tech Connector Series. Request a quote with your angle, thread and material requirements.',
    },
  },
  {
    slug: 'straight-connector',
    name: 'Straight Connector',
    familySlug: 'connector-series',
    materialSlug: null,
    materialLabel: 'Material confirmed per RFQ',
    summary:
      'Straight connector with a ribbed barb end and a hex nut end.',
    description: [
      'The Straight Connector is a Connector Series product for joining lines in a straight run.',
      'The supplied product image shows a ribbed barb end, a sealing shoulder and a hex nut end.',
      'Material, barb size and thread standard are confirmed from your drawing or sample during technical review.',
    ],
    highlights: [
      'Connector Series',
      'Ribbed barb end as shown',
      'Hex nut end as shown',
      'Straight configuration',
    ],
    facts: [
      { label: 'Product family', value: 'Connector Series' },
      { label: 'Material', value: 'Confirmed during RFQ' },
      rfqFact,
      customFact,
    ],
    images: [
      {
        src: '/images/products/straight-connector.jpg',
        alt: 'Straight Connector with ribbed barb end and hex nut end',
        width: 1920,
        height: 1920,
      },
    ],
    seo: {
      title: 'Straight Connector',
      description:
        'Straight Connector from the RunCing Tech Connector Series. Share your drawing or sample to request a quote.',
    },
  },
]
