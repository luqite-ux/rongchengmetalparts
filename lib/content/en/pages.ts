import type {
  ApplicationArea,
  FaqItem,
  HeroSlide,
  ImageAsset,
  MaterialOption,
  ProcessStep,
} from '@/lib/types'

export const heroSlides: HeroSlide[] = [
  {
    id: 'global-supply',
    image: {
      src: '/images/hero-global-supply.jpg',
      alt: 'Valve and connector assemblies on a stepped platform in front of a world map with a container ship and port cranes',
      width: 2576,
      height: 1073,
    },
    eyebrow: 'Ball valves, valve assemblies and connectors',
    headline: 'Valves and connectors for industrial equipment',
    body: 'RunCing Tech supplies ball valves, valve assemblies and connector assemblies in brass, stainless steel and aluminum, with OEM/ODM support.',
    primaryCta: { label: 'Browse products', href: '/products' },
    secondaryCta: { label: 'Request a quote', href: '/contact#rfq' },
    tone: 'on-dark',
    textSide: 'left',
    objectPosition: { mobile: '76% 50%', desktop: '70% 50%' },
  },
  {
    id: 'product-range',
    image: {
      src: '/images/hero-product-range.jpg',
      alt: 'Stainless valves and fittings arranged on a blue platform with light trails',
      width: 2576,
      height: 1073,
    },
    eyebrow: 'Three product families',
    headline: 'Compare the Ball Valve, Valve Assembly and Connector ranges',
    body: 'Compare the catalog by product family, then send a drawing or sample for technical review and quotation.',
    primaryCta: { label: 'Compare product families', href: '/products' },
    secondaryCta: { label: 'Send an RFQ', href: '/contact#rfq' },
    tone: 'on-dark',
    textSide: 'left',
    objectPosition: { mobile: '84% 50%', desktop: '72% 50%' },
  },
  {
    id: 'workshop',
    image: {
      src: '/images/hero-workshop.jpg',
      alt: 'Manufacturing hall with CNC machines and conveyors beside a pale open area',
      width: 2576,
      height: 1073,
    },
    eyebrow: 'Manufacturing capability',
    headline: 'Hot-forging equipment and four workshops',
    body: 'See the manufacturing capability behind the range, from forging equipment to inspection and reports.',
    primaryCta: { label: 'View manufacturing', href: '/manufacturing' },
    secondaryCta: { label: 'Request a quote', href: '/contact#rfq' },
    tone: 'on-light',
    textSide: 'right',
    objectPosition: { mobile: '18% 50%', desktop: '0% 50%' },
  },
]

export const homeSections = {
  families: {
    eyebrow: 'Product families',
    title: 'Three product families for faster selection',
    description:
      'Start from the family that matches your line. Each link opens the catalog filtered to that family.',
  },
  featured: {
    eyebrow: 'Featured products',
    title: 'Six products across the current catalog',
    description:
      'Every product has its own page with product images, material information and an RFQ path.',
  },
  applications: {
    eyebrow: 'Applications',
    title: 'Where these components are used',
    description:
      'Explore common use areas for RunCing valves and connectors.',
  },
  materials: {
    eyebrow: 'Material options',
    title: 'Brass, stainless steel and aluminum',
    description:
      'Compare the three available materials and share your performance requirements during selection.',
  },
  manufacturing: {
    eyebrow: 'Manufacturing capability',
    title: 'Equipment and workshops behind the range',
    description:
      'Explore RunCing\'s production equipment, workshop organization and inspection workflow.',
  },
  quality: {
    eyebrow: 'Quality and certification',
    title: 'Inspection, reports and quality systems',
    description:
      'Discuss applicable quality-system documentation and inspection records for your project.',
  },
  customization: {
    eyebrow: 'Customization',
    title: 'OEM/ODM, material, size and interface discussion',
    description:
      'Bring a drawing or a sample. The inputs below help technical review start quickly.',
  },
  process: {
    eyebrow: 'Cooperation process',
    title: 'From inquiry to shipment',
    description:
      'Follow the path from technical review to production and shipment. Timing depends on the product, quantity and confirmed requirements.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Procurement questions',
    description: 'Practical answers for product selection and quotation planning.',
  },
  rfq: {
    eyebrow: 'Request for quotation',
    title: 'Send your requirements to RunCing',
    description:
      'Describe the part, the material and the application. Attach details by email if you have drawings.',
  },
}

export const applicationAreas: ApplicationArea[] = [
  {
    slug: 'commercial-vehicles',
    name: 'Commercial vehicles',
    summary:
      'Valves and connector assemblies for commercial vehicle systems. Share the system, the media and the interface so RunCing can review fit.',
    rfqInputs: ['Vehicle system', 'Media', 'Thread or interface standard'],
  },
  {
    slug: 'trailers',
    name: 'Trailers',
    summary:
      'Valves and connector assemblies for trailer systems. Drawings or samples help confirm the right product family and material.',
    rfqInputs: ['Trailer system', 'Media', 'Thread or interface standard'],
  },
  {
    slug: 'cnc-equipment',
    name: 'CNC equipment',
    summary:
      'Valves and connector assemblies for CNC equipment lines. Technical review starts from your interface and material needs.',
    rfqInputs: ['Machine line', 'Media', 'Size and interface'],
  },
  {
    slug: 'hydraulic-pneumatic-systems',
    name: 'Hydraulic and pneumatic systems',
    summary:
      'Connector assemblies and valves for hydraulic and pneumatic systems. Operating conditions are provided by the buyer and reviewed with RunCing.',
    rfqInputs: ['System type', 'Operating conditions', 'Thread or interface standard'],
  },
  {
    slug: 'industrial-equipment',
    name: 'Related industrial equipment',
    summary:
      'Valves and connector assemblies for related industrial equipment. If your use is not listed, describe it in the RFQ.',
    rfqInputs: ['Equipment type', 'Media', 'Size and interface'],
  },
]

export const materialOptions: MaterialOption[] = [
  {
    slug: 'brass',
    name: 'Brass',
    summary: 'Available for the Air Line Ball Valve and Brass Valve Assembly.',
    note: 'Finish and dimensions are confirmed during RFQ.',
    productSlugs: ['air-line-ball-valve', 'brass-valve-assembly'],
  },
  {
    slug: 'stainless-steel',
    name: 'Stainless steel',
    summary: 'Available for the Stainless Steel Valve Assembly.',
    note: 'Grade is confirmed during RFQ.',
    productSlugs: ['stainless-steel-valve-assembly'],
  },
  {
    slug: 'aluminum',
    name: 'Aluminum',
    summary: 'Available for the Aluminum Valve Assembly.',
    note: 'Alloy and surface treatment are confirmed during RFQ.',
    productSlugs: ['aluminum-valve-assembly'],
  },
]

export const manufacturingContent = {
  facts: [
    {
      label: 'Hot-forging equipment',
      description: 'RunCing operates hot-forging equipment as part of its manufacturing capability.',
    },
    {
      label: 'Four workshops',
      description: 'A 10,000 m² facility is organized into four specialized workshops for brass, iron, aluminum and stamping work.',
    },
    {
      label: 'Production capacity',
      description: 'Monthly capacity of approximately 500,000 pieces supports current manufacturing operations.',
    },
    {
      label: 'Inspection and reports',
      description: 'Inspection records and report formats are confirmed for each project.',
    },
  ],
  capabilityLine: [
    {
      title: 'Materials',
      description: 'Brass, stainless steel and aluminum.',
    },
    {
      title: 'Hot forging',
      description: 'Hot-forging equipment.',
    },
    {
      title: 'Four workshops',
      description: 'Production across four workshops.',
    },
    {
      title: 'Inspection',
      description: 'Inspection and report capability.',
    },
  ],
  images: [
    {
      src: '/images/hero-workshop.jpg',
      alt: 'Manufacturing hall with CNC machines and conveyors',
      width: 2576,
      height: 1073,
    },
  ] satisfies ImageAsset[],
  scaleNote:
    'Share the product, quantity and delivery destination so production planning can be reviewed for your order.',
}

export const qualityContent = {
  inspection: [
    {
      title: 'Inspection capability',
      description: 'Product inspection is integrated into the manufacturing workflow.',
    },
    {
      title: 'Inspection reports',
      description: 'Reports can be discussed per project. Format and content are confirmed during RFQ.',
    },
  ],
  disclaimer:
    'Quality-system documentation and inspection records can be reviewed for applicable projects.',
}

export const customizationContent = {
  capabilities: [
    {
      title: 'OEM/ODM',
      description: 'OEM and ODM work is supported. Start from a drawing, a sample or a described need.',
    },
    {
      title: 'Material discussion',
      description: 'Choose between brass, stainless steel and aluminum, or discuss the material for your part.',
    },
    {
      title: 'Size and interface discussion',
      description: 'Dimensions, threads and connection ends are reviewed against your requirements.',
    },
    {
      title: 'Sample path',
      description: 'A sample can be confirmed before production where it applies to your project.',
    },
  ],
  buyerInputs: [
    'Drawing, sample or reference part',
    'Product family or product name',
    'Material: brass, stainless steel, aluminum or undecided',
    'Size, thread and interface standard',
    'Application area and media',
    'Estimated quantity',
    'Destination country',
    'Documents you need, such as inspection reports',
  ],
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Inquiry',
    description: 'Send your drawing, sample details or product requirement through the RFQ form.',
  },
  {
    title: 'Technical review',
    description: 'RunCing reviews material, size, interface and customization needs against your inputs.',
  },
  {
    title: 'Sample confirmation',
    description: 'Where a sample path applies, the sample is confirmed before production.',
  },
  {
    title: 'Production',
    description: 'Production proceeds once requirements are confirmed.',
  },
  {
    title: 'Shipment',
    description: 'Shipping arrangements are agreed for the confirmed order.',
  },
]

export const faqItems: FaqItem[] = [
  {
    id: 'products',
    question: 'What products does RunCing supply?',
    answer:
      'The current range has six products: the Air Line Ball Valve, the Brass, Stainless Steel and Aluminum Valve Assemblies, the Elbow Assembly and the Straight Connector.',
  },
  {
    id: 'materials',
    question: 'Which materials are available?',
    answer:
      'Brass, stainless steel and aluminum. Grades and finishes are confirmed during RFQ.',
  },
  {
    id: 'custom',
    question: 'Can I request a custom part?',
    answer:
      'OEM/ODM work is supported. Send a drawing or sample with your material, size and interface requirements for technical review.',
  },
  {
    id: 'quality',
    question: 'What quality information is available?',
    answer:
      'RunCing works with ISO 9001 and IATF 16949 quality-management requirements. Ask which documentation and inspection records apply to your project.',
  },
  {
    id: 'rfq',
    question: 'What should I include in an RFQ?',
    answer:
      'Product or drawing, material, size and interface, application area, estimated quantity and destination country.',
  },
  {
    id: 'pricing',
    question: 'Are prices and stock levels listed?',
    answer:
      'Pricing and availability are confirmed through the RFQ process for the requested product, specification and quantity.',
  },
  {
    id: 'contact',
    question: 'How do I contact RunCing?',
    answer:
      'Use the RFQ form on the Contact page, or write to info@rongchengmetalparts.com.',
  },
]

export const aboutContent = {
  intro: [
    'RunCing Tech is the brand of RunCing Electromechanical Technology Co., Ltd., founded in 2014 with roots in custom metalworking dating to 1997.',
    'From its 10,000 m² facility in Ningbo, the company supplies ball valves, valve assemblies and connector assemblies in brass, stainless steel and aluminum, with OEM/ODM support.',
  ],
  facts: [
    { label: 'English name', value: 'RunCing Electromechanical Technology Co., Ltd.' },
    { label: 'Products', value: 'Ball valves, valve assemblies, connector assemblies' },
    { label: 'Materials', value: 'Brass, stainless steel, aluminum' },
    { label: 'Manufacturing', value: 'Hot-forging equipment, four workshops' },
    { label: 'Facility', value: '10,000 m² across four specialized workshops' },
    { label: 'Production capacity', value: 'Approximately 500,000 pieces per month' },
    { label: 'Quality systems', value: 'ISO 9001, IATF 16949' },
  ],
  note: 'Relevant company and quality documentation is available for applicable supplier-qualification reviews.',
}

export const pageMeta = {
  products: {
    title: 'Products: ball valves, valve assemblies, connectors',
    description:
      'Browse the RunCing Tech catalog: Ball Valve Series, Valve Assemblies and Connector Series in brass, stainless steel and aluminum.',
  },
  applications: {
    title: 'Applications',
    description:
      'Application areas for RunCing valves and connector assemblies: commercial vehicles, trailers, CNC equipment, hydraulic and pneumatic systems and related industrial equipment.',
  },
  manufacturing: {
    title: 'Manufacturing capability',
    description:
      'RunCing manufacturing facts: hot-forging equipment, four workshops, and inspection and report capability.',
  },
  about: {
    title: 'About RunCing Tech',
    description:
      'About RunCing Tech and RunCing Electromechanical Technology Co., Ltd., a valve and connector assembly manufacturer.',
  },
  contact: {
    title: 'Contact and RFQ',
    description:
      'Send an RFQ to RunCing Tech with your drawing, material, size and application. Email info@rongchengmetalparts.com.',
  },
  news: {
    title: 'News',
    description: 'News and updates from RunCing Tech.',
  },
}
