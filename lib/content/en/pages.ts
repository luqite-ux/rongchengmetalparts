import type {
  ApplicationArea,
  FaqItem,
  HeroSlide,
  MaterialOption,
  ProcessStep,
} from '@/lib/types'
import {
  catalogIntroduction,
  customerApplications,
  customerHeroSlides,
  priorityCapabilities,
} from '@/lib/customer-revision'

export const heroSlides: HeroSlide[] = customerHeroSlides

export const homeSections = {
  families: {
    eyebrow: 'Featured Product Series',
    title: 'Air Ball Valve Series',
    description:
      'Browse Valve Assemblies, Fittings & Adapters, and other drawing-based requirements within the featured series.',
  },
  featured: {
    eyebrow: 'Representative Products',
    title: 'Product Examples and Regular Specifications',
    description: catalogIntroduction,
  },
  applications: {
    eyebrow: 'Applications',
    title: 'Confirmed Application Scope',
    description:
      'Start with compressed-air requirements or send a drawing for a custom-part review.',
  },
  materials: {
    eyebrow: 'Material Options',
    title: 'Brass, Stainless Steel and Aluminum',
    description:
      'Compare the three available materials and share your performance requirements during selection.',
  },
  manufacturing: {
    eyebrow: 'Manufacturing Capability',
    title: 'CNC, Hot Forging, Stamping and Welding',
    description:
      'Send a drawing or sample so RunCing can review the process, material, tolerance and interface requirements.',
  },
  quality: {
    eyebrow: 'Quality and Certification',
    title: 'Inspection, Reports and Quality Systems',
    description:
      'Discuss applicable quality-system documentation and inspection records for your project.',
  },
  customization: {
    eyebrow: 'Customization',
    title: 'Drawing-Based Customization Review',
    description:
      'Bring a drawing or a sample. The inputs below help technical review start quickly.',
  },
  process: {
    eyebrow: 'Cooperation Process',
    title: 'From Inquiry to Shipment',
    description:
      'Follow the path from technical review to production and shipment. Timing depends on the product, quantity and confirmed requirements.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Procurement Questions',
    description: 'Practical answers for product selection and quotation planning.',
  },
  rfq: {
    eyebrow: 'Request for Quotation',
    title: 'Send Your Requirements to RunCing',
    description:
      'Describe the part, the material and the application. Attach details by email if you have drawings.',
  },
}

export const applicationAreas: ApplicationArea[] = customerApplications

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
    name: 'Stainless Steel',
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
  facts: priorityCapabilities.map((capability) => ({
    label: capability.title,
    description: capability.description,
  })),
  capabilityLine: priorityCapabilities,
  scaleNote:
    'Share the product, quantity and delivery destination so production planning can be reviewed for your order.',
}

export const qualityContent = {
  inspection: [
    {
      title: 'Inspection Capability',
      description: 'Product inspection is integrated into the manufacturing workflow.',
    },
    {
      title: 'Inspection Reports',
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
      title: 'Material Discussion',
      description: 'Choose between brass, stainless steel and aluminum, or discuss the material for your part.',
    },
    {
      title: 'Size and Interface Discussion',
      description: 'Dimensions, threads and connection ends are reviewed against your requirements.',
    },
    {
      title: 'Sample Path',
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
    title: 'Technical Review',
    description: 'RunCing reviews material, size, interface and customization needs against your inputs.',
  },
  {
    title: 'Sample Confirmation',
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
    question: 'What Products Does RunCing Supply?',
    answer:
      'The website shows representative Air Ball Valve Series products across Valve Assemblies and Fittings & Adapters. Send a drawing or sample for other configurations and regular model details.',
  },
  {
    id: 'materials',
    question: 'Which Materials Are Available?',
    answer:
      'Brass, stainless steel and aluminum. Grades and finishes are confirmed during RFQ.',
  },
  {
    id: 'custom',
    question: 'Can I Request a Custom Part?',
    answer:
      'OEM/ODM work is supported. Send a drawing or sample with your material, size and interface requirements for technical review.',
  },
  {
    id: 'quality',
    question: 'What Quality Information Is Available?',
    answer:
      'RunCing works with ISO 9001 and IATF 16949 quality-management requirements. Ask which documentation and inspection records apply to your project.',
  },
  {
    id: 'rfq',
    question: 'What Should I Include in an RFQ?',
    answer:
      'Product or drawing, material, size and interface, application area, estimated quantity and destination country.',
  },
  {
    id: 'pricing',
    question: 'Are Prices and Stock Levels Listed?',
    answer:
      'Pricing and availability are confirmed through the RFQ process for the requested product, specification and quantity.',
  },
  {
    id: 'contact',
    question: 'How Do I Contact RunCing?',
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
    { label: 'English Name', value: 'RunCing Electromechanical Technology Co., Ltd.' },
    { label: 'Products', value: 'Ball valves, valve assemblies, connector assemblies' },
    { label: 'Materials', value: 'Brass, stainless steel, aluminum' },
    { label: 'Manufacturing', value: 'Hot-forging equipment, four workshops' },
    { label: 'Facility', value: '10,000 m² across four specialized workshops' },
    { label: 'Production Capacity', value: 'Approximately 500,000 pieces per month' },
    { label: 'Quality Systems', value: 'ISO 9001, IATF 16949' },
  ],
  note: 'Relevant company and quality documentation is available for applicable supplier-qualification reviews.',
}

export const pageMeta = {
  products: {
    title: 'Products: Air Ball Valves, Valve Assemblies, Fittings and Adapters',
    description:
      'Browse representative RunCing Tech Air Ball Valve Series products across Valve Assemblies and Fittings & Adapters, or send a drawing for another requirement.',
  },
  applications: {
    title: 'Applications',
    description:
      'Confirmed RunCing application scope for compressed-air systems and drawing-based custom component review.',
  },
  manufacturing: {
    title: 'Manufacturing Capability',
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
