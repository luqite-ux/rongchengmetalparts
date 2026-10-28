import type { CertificationStatement, NavItem } from '@/lib/types'

export const site = {
  name: 'RunCing Tech',
  legalNameEn: 'RunCing Electromechanical Technology Co., Ltd.',
  legalNameZh: '宁波荣城机电科技有限公司',
  url: 'https://rongchengmetalparts.com',
  domain: 'rongchengmetalparts.com',
  email: 'info@rongchengmetalparts.com',
  location: 'Ningbo, China',
  streetAddress: 'No. 1, Lane 10, Xuneng North Road, Dajiahe Industrial Park, Ninghai County, Ningbo, Zhejiang, China',
  tagline: 'Valves and connectors manufacturer',
  description:
    'RunCing Tech (RunCing Electromechanical Technology Co., Ltd.) supplies ball valves, valve assemblies and connector assemblies in brass, stainless steel and aluminum, with OEM/ODM support.',
  factory: {
    workshops: 4,
    hotForging: true,
    scale: '10,000 m² across four specialized workshops',
  },
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      {
        label: 'Ball Valve Series',
        href: '/products?family=ball-valve-series',
        description: 'Air Line Ball Valve',
      },
      {
        label: 'Valve Assemblies',
        href: '/products?family=valve-assemblies',
        description: 'Brass, stainless steel and aluminum',
      },
      {
        label: 'Connector Series',
        href: '/products?family=connector-series',
        description: 'Elbow Assembly and Straight Connector',
      },
    ],
  },
  { label: 'Applications', href: '/applications' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Manufacturing', href: '/manufacturing' },
    { label: 'Applications', href: '/applications' },
    { label: 'News', href: '/news' },
    { label: 'Contact / RFQ', href: '/contact' },
  ],
}

export const certificationStatements: CertificationStatement[] = [
  {
    label: 'ISO 9001',
    note: 'Quality management system applied to production management.',
  },
  {
    label: 'IATF 16949',
    note: 'Automotive quality management system applied to production management.',
  },
]
