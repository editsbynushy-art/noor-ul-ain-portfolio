import portraitImg from '@/src/assets/images/noor_ul_ain_reference_pose_1791228655315.jpg';
import shopifyImg from '@/src/assets/images/portfolio_shopify_store_1791227990623.jpg';
import brandImg from '@/src/assets/images/portfolio_brand_identity_1791228009310.jpg';
import socialImg from '@/src/assets/images/portfolio_social_campaign_1791228023404.jpg';
import videoImg from '@/src/assets/images/portfolio_video_editing_1791228039053.jpg';
import burgerImg from '@/src/assets/images/portfolio_burger_blaze_1791228441371.jpg';
import zenmartImg from '@/src/assets/images/portfolio_zenmart_store_1791228455303.jpg';
import carouselsImg from '@/src/assets/images/portfolio_social_carousels_1791228467765.jpg';
import auraImg from '@/src/assets/images/portfolio_aura_branding_1791268339092.jpg';
import omniImg from '@/src/assets/images/portfolio_omni_ad_creative_1791268360269.jpg';

export interface Project {
  id: string;
  title: string;
  category: 'Graphic Design' | 'Branding' | 'Video Editing' | 'Digital Marketing' | 'Shopify' | 'Social Media';
  tagline: string;
  image: string;
  gallery: string[];
  fileType?: 'image' | 'video' | 'pdf';
  fileName?: string;
  pdfUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  aspect?: 'wide' | 'tall' | 'square';
  overview: string;
  challenge?: string;
  solution?: string;
  services: string[];
  tools: string[];
  outcome: string;
  metricBadge: string;
  client?: string;
  year?: string;
  liveUrl?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface SkillItem {
  name: string;
  level: number;
  category: 'Marketing' | 'Design' | 'Technical';
}

export interface ExperienceItem {
  discipline: string;
  role: string;
  period: string;
  focus: string;
  achievements: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  level: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: 'NOOR UL AIN',
    roleTagline: 'Freelancer & Creative Digital Professional',
    roles: [
      'Digital Marketer',
      'Graphic Designer',
      'Video Editor',
      'Shopify Developer',
      'Social Media Manager'
    ],
    experienceYears: '4+ Years Experience',
    heroDescription:
      'I help brands and businesses grow through strategic digital marketing, creative design, engaging content, professional video editing and high-converting Shopify experiences.',
    avatar: portraitImg,
    location: 'Available Worldwide · Remote & Strategic Projects',
    email: 'editsbynushy@gmail.com',
    secondaryEmail: 'growthwithnoorulain@gmail.com'
  },
  socials: [
    {
      name: 'Instagram',
      handle: '@growth_withnoorulain',
      url: 'https://www.instagram.com/growth_withnoorulain?stkn=MXcxZjh5MTZreTN6eQ=='
    },
    {
      name: 'Facebook',
      handle: 'Noor Ul Ain',
      url: 'https://www.facebook.com/share/14nvCFsDc7D/'
    },
    {
      name: 'TikTok',
      handle: '@growth_withnoor',
      url: 'https://www.tiktok.com/@growth_withnoor'
    },
    {
      name: 'WhatsApp',
      handle: '+92 344 1519802',
      url: 'https://wa.me/923441519802'
    },
    {
      name: 'LinkedIn',
      handle: 'Noor Ul Ain',
      url: 'https://www.linkedin.com/in/noor-ul-ain-1ba744377?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  ],
  showcaseStream: [
    'Shopify Store Development',
    'High-Converting UI/UX',
    'Brand Identity Design',
    'Visual Arts & Art Direction',
    'Commercial Video Editing',
    'Viral TikTok & Instagram Reels',
    'Paid Ad Performance & CRO',
    'Packaging & Vector Identity',
    'Social Media Growth Campaigns',
    'E-Commerce Optimization'
  ],
  stats: [
    { value: '4+', label: 'Years Experience', context: 'Continuous creative & strategic growth' },
    { value: '140+', label: 'Creative Projects', context: 'High-converting brand & digital assets' },
    { value: '5+', label: 'Core Services', context: 'From marketing strategy to Shopify development' },
    { value: '100%', label: 'Creative Focus', context: 'Client satisfaction & tailored execution' }
  ],
  about: {
    heading: 'About Me',
    paragraphs: [
      'I’m Noor Ul Ain, a creative digital professional with 4+ years of experience helping brands and businesses build a stronger online presence through digital marketing, graphic design, video editing, Shopify development and social media management.',
      'I combine creativity with strategy to create visual content, digital experiences and marketing solutions that are designed to look professional, communicate clearly and deliver real business value.'
    ],
    highlights: [
      'Data-driven marketing combined with refined aesthetic sensibility',
      'End-to-end execution from concept design to high-converting development',
      'Proven experience scaling e-commerce brands and personal identities',
      'Clear, transparent communication and strict deadline adherence'
    ]
  },
  services: [
    {
      number: '01',
      title: 'Digital Marketing',
      description:
        'Strategic digital marketing solutions designed to improve online visibility, reach and business growth.',
      deliverables: ['Meta & Google Ads Campaign Setup', 'Funnel Strategy & Audience Targeting', 'Conversion Rate Optimization (CRO)', 'Performance Analytics & Reporting']
    },
    {
      number: '02',
      title: 'Graphic Design',
      description:
        'Professional social media designs, branding materials, promotional graphics and marketing creatives.',
      deliverables: ['Brand Identity & Style Guidelines', 'Social Media Carousel & Feed Graphics', 'Marketing Collateral & Pitch Decks', 'Print & Packaging Creative Systems']
    },
    {
      number: '03',
      title: 'Video Editing',
      description:
        'Engaging reels, shorts, promotional videos, product videos and social media video content.',
      deliverables: ['Viral TikTok & Instagram Reels', 'Commercial Product Showcases', 'Dynamic Kinetic Typography & SFX', 'Color Grading & Pacing Optimization']
    },
    {
      number: '04',
      title: 'Shopify Development',
      description:
        'Professional Shopify store development, customization, responsive layouts and e-commerce experiences.',
      deliverables: ['Custom Storefront Setup & Theme Tweaks', 'High-Converting Product & Landing Pages', 'Mobile-First Layout Optimization', 'App Setup & Checkout Streamlining']
    },
    {
      number: '05',
      title: 'Social Media Management',
      description:
        'Content planning, creative management, audience engagement and social media growth strategies.',
      deliverables: ['Monthly Content Calendar Curation', 'Community Engagement & Outreach', 'Hashtag & SEO Visibility Research', 'Organic Follower & Reach Growth']
    },
    {
      number: '06',
      title: 'Content Creation',
      description:
        'Creative visual and marketing content designed for brands, businesses and personal brands.',
      deliverables: ['Creative Copywriting & Scripts', 'Visual Brand Storytelling', 'Product Photography Concepts', 'Multi-Platform Asset Adaptation']
    }
  ] as ServiceItem[],
  skills: [
    { name: 'Digital Marketing', level: 94, category: 'Marketing' },
    { name: 'Graphic Design', level: 96, category: 'Design' },
    { name: 'Video Editing', level: 92, category: 'Design' },
    { name: 'Shopify Development', level: 90, category: 'Technical' },
    { name: 'Social Media Management', level: 95, category: 'Marketing' },
    { name: 'Content Creation', level: 93, category: 'Design' },
    { name: 'Branding', level: 91, category: 'Design' },
    { name: 'Social Media Strategy', level: 95, category: 'Marketing' },
    { name: 'Creative Strategy', level: 92, category: 'Marketing' }
  ] as SkillItem[],
  projects: [] as Project[],
  sampleProjects: [
    {
      id: 'aura-studio-identity',
      title: 'Aura Studio Identity',
      category: 'Branding',
      tagline: 'Luxury realtors club brand identity, letterhead, and embossed stationery',
      image: auraImg,
      gallery: [auraImg, brandImg],
      fileType: 'image',
      featured: true,
      aspect: 'wide',
      overview:
        'Crafted a prestigious dark green and gold embossed visual identity system for Aura Realtors Club. Included monogram mark, business collateral, presentation pitch decks, and architectural signage guidelines.',
      challenge:
        'Establishing instant architectural luxury and high-net-worth investor confidence across physical and digital customer touchpoints.',
      solution:
        'Designed a minimalist geometric monogram paired with deep forest green hues, gold-foil stamping standards, and clean typography.',
      services: ['Brand Identity Design', 'Logo Monogram Suite', 'Stationery Architecture', 'Signage Guidelines'],
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      outcome: 'Successfully established luxury identity generating 340+ qualified investor inquiries in the first quarter.',
      metricBadge: 'Luxury Brand Identity',
      client: 'Aura Realtors Club',
      year: '2025'
    },
    {
      id: 'omni-retail-campaign',
      title: 'Omni Retail Campaign',
      category: 'Digital Marketing',
      tagline: 'High-converting social media marketing ads and adaptive lifestyle design',
      image: omniImg,
      gallery: [omniImg, socialImg],
      fileType: 'image',
      featured: true,
      aspect: 'wide',
      overview:
        'Engineered an adaptive social media advertising suite for consumer wellness products. Designed carousel hooks, adaptive display layouts, and performance conversion creatives for Meta and Google campaigns.',
      challenge:
        'High ad fatigue and rising cost-per-click required fresh visual hooks and multi-format adaptability.',
      solution:
        'Built an adaptive design framework with high-contrast benefit callouts, ergonomic feature spotlights, and direct response hooks.',
      services: ['Social Media Design', 'Ad Creative Strategy', 'Adaptive Display Layouts', 'Conversion Optimization'],
      tools: ['Adobe Photoshop', 'Canva Pro', 'Figma', 'Meta Ads Manager'],
      outcome: '+64% Improvement in click-through rate and 3.9x average return on ad spend across active ad sets.',
      metricBadge: '+64% CTR Lift',
      client: 'Omni Health Tech',
      year: '2025'
    },
    {
      id: 'srimton-swiss-legacy',
      title: 'SRIMTON Swiss Legacy — Luxury Shopify Store',
      category: 'Shopify',
      tagline: 'High-end Swiss watchmaker e-commerce storefront with custom liquid animations',
      image: shopifyImg,
      gallery: [shopifyImg, zenmartImg],
      fileType: 'image',
      featured: true,
      aspect: 'wide',
      overview:
        'Architected and deployed a prestigious Shopify storefront for SRIMTON Swiss Legacy. Engineered custom Liquid sections, responsive dark luxury aesthetics, multi-currency support, and optimized sub-second product page load times.',
      challenge:
        'The client needed a digital storefront that reflected centuries of horological precision without sacrificing mobile conversion speed or checkout simplicity.',
      solution:
        'Implemented a bespoke typography system, high-contrast monochrome aesthetic with #360302 burgundy accents, custom interactive product zoom modules, and streamlined 1-click cart drawers.',
      services: ['Shopify Store Development', 'Custom Liquid Styling', 'UI/UX E-Commerce Design', 'Mobile CRO Optimization'],
      tools: ['Shopify', 'Liquid', 'Figma', 'CSS3', 'Google Tag Manager'],
      outcome: '+48% Mobile Conversion Rate, 1.4s First Contentful Paint, and over $85,000 in debut month sales.',
      metricBadge: '+48% Conversion',
      client: 'SRIMTON Horology',
      year: '2025',
      liveUrl: 'https://shopify.com'
    },
    {
      id: 'burger-blaze-branding',
      title: 'Burger Blaze — Complete Brand Identity & Packaging',
      category: 'Branding',
      tagline: 'Comprehensive visual identity, packaging suite, and digital marketing system',
      image: burgerImg,
      gallery: [burgerImg, brandImg],
      fileType: 'image',
      featured: true,
      aspect: 'tall',
      overview:
        'Designed the complete brand universe for fast-casual restaurant Burger Blaze. Created custom bold typography, logo marks, takeaway food packaging, menu boards, staff uniforms, and an energetic social media design guideline.',
      challenge:
        'Creating an energetic, appetizing visual language that stands out in a fiercely competitive urban food market while maintaining low packaging production costs.',
      solution:
        'Combined rich kraft paper textures with bold maroon burgundy stamp accents, high-contrast typography, and playful iconography engineered for maximum Instagram shareability.',
      services: ['Brand Strategy & Logo Design', 'Packaging & Box Architecture', 'Menu Board Graphics', 'Social Media Launch Creatives'],
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      outcome: 'Brand successfully expanded into 3 new regional locations within 6 months of visual rollout.',
      metricBadge: '3 Locations Launched',
      client: 'Burger Blaze Hospitality',
      year: '2025'
    },
    {
      id: 'zenmart-kitchen-store',
      title: 'ZenMart — Modern E-Commerce Shopify Store',
      category: 'Shopify',
      tagline: 'High-converting dropshipping & brand storefront for modern kitchen appliances',
      image: zenmartImg,
      gallery: [zenmartImg, shopifyImg],
      fileType: 'image',
      featured: false,
      aspect: 'wide',
      overview:
        'Full build of ZenMart, a modern home kitchen lifestyle store. Focused on high-trust customer reviews, bundle upsells, sticky add-to-cart buttons, and seamless mobile responsive checkout navigation.',
      challenge:
        'Dropshipping stores often suffer from low trust and poor visual differentiation from cookie-cutter templates.',
      solution:
        'Customized an editorial theme with custom video embed cards, verified badge systems, comparison tables, and FAQ accordion drawers.',
      services: ['Shopify Theme Customization', 'Conversion Rate Architecture', 'Product Copywriting', 'Apps Integration'],
      tools: ['Shopify', 'Loox Reviews', 'PageFly', 'Klaviyo'],
      outcome: 'Achieved a steady 3.6% average conversion rate and reduced cart abandonment rate by 22%.',
      metricBadge: '3.6% CRO Rate',
      client: 'ZenMart Goods',
      year: '2025'
    },
    {
      id: 'velour-commercial-reels',
      title: 'Velour Beauty Co. — Product Video & Reels',
      category: 'Video Editing',
      tagline: 'Dynamic short-form commercial reels with sound design and kinetic pacing',
      image: videoImg,
      gallery: [videoImg, socialImg],
      fileType: 'image',
      featured: true,
      aspect: 'wide',
      overview:
        'Produced and color-graded a multi-creative video campaign for Velour Beauty. Edited fast-paced TikTok hooks, Instagram reels, and YouTube shorts designed to capture attention in the first 2 seconds.',
      challenge:
        'Decreasing audience attention spans demanded visual hooks and kinetic sound design that halted scrolling immediately.',
      solution:
        'Employed seamless whip-pans, micro-sound effects, custom subtitle animations with bold typography, and vibrant color correction.',
      services: ['Video Editing', 'Kinetic Typography', 'Sound Design & SFX', 'Color Grading'],
      tools: ['Adobe Premiere Pro', 'CapCut', 'DaVinci Resolve', 'After Effects'],
      outcome: '1.8M+ Organic Views, 84% 3-Second Hook Retention, and an average 5.8% CTR on paid ad placements.',
      metricBadge: '1.8M+ Views',
      client: 'Velour Beauty Co.',
      year: '2026'
    },
    {
      id: 'social-media-carousel-suite',
      title: 'Creative Social Media Designs & Carousels',
      category: 'Graphic Design',
      tagline: '9-slide high-retention educational carousels with agency-level typography',
      image: carouselsImg,
      gallery: [carouselsImg, socialImg],
      fileType: 'image',
      featured: false,
      aspect: 'square',
      overview:
        'Designed a high-converting portfolio of multi-slide Instagram carousels and infographics. Engineered slide transitions that encourage swiping to the end, resulting in high save and share metrics.',
      challenge:
        'Translating complex e-commerce and marketing data into visually engaging, bite-sized social carousels.',
      solution:
        'Used modular typographic scales, custom vector charts, and consistent dark burgundy brand framing that elevated authority.',
      services: ['Social Media Design', 'Infographic Creation', 'Carousel Layouts', 'Brand Template System'],
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Canva Pro'],
      outcome: 'Average 1,200+ saves per carousel and 3.2x increase in profile visits from Explore feeds.',
      metricBadge: '1.2k+ Saves/Post',
      client: 'Growth Mentorship Hub',
      year: '2025'
    },
    {
      id: 'apex-growth-funnel',
      title: 'Product Marketing & Meta Ads Campaign',
      category: 'Digital Marketing',
      tagline: 'End-to-end customer acquisition campaign with tiered retargeting architecture',
      image: socialImg,
      gallery: [socialImg, carouselsImg],
      fileType: 'image',
      featured: true,
      aspect: 'square',
      overview:
        'Planned, structured, and scaled paid advertising funnels across Meta and Google for an online direct-to-consumer brand. Ran systematic creative testing and funnel optimization.',
      challenge:
        'Client was stuck at break-even ROAS and high customer acquisition costs due to ad fatigue and weak landing page funnels.',
      solution:
        'Overhauled ad creative angles, tested 12 video and carousel hooks, and aligned ad copy directly with landing page value propositions.',
      services: ['Paid Media Strategy', 'A/B Creative Testing', 'Landing Page Optimization', 'Performance Analytics'],
      tools: ['Meta Ads Manager', 'Google Ads', 'Google Analytics 4', 'Triple Whale'],
      outcome: 'Scaled monthly revenue to $42k/month at a profitable 4.2x ROAS with 38% decrease in cost-per-lead.',
      metricBadge: '4.2x ROAS',
      client: 'Apex Direct',
      year: '2025'
    },
    {
      id: 'aethel-brand-guidelines',
      title: 'Aethel Naturals — Brand Identity System',
      category: 'Branding',
      tagline: 'Minimalist luxury aesthetic, packaging guidelines, and vector mark suite',
      image: brandImg,
      gallery: [brandImg, burgerImg],
      fileType: 'image',
      featured: false,
      aspect: 'tall',
      overview:
        'Crafted a cohesive visual identity encompassing custom typography, color harmony, stationery packaging, and a full 45-page brand guidelines bible for a clean luxury skincare label.',
      challenge:
        'The brand needed a timeless, international luxury feel that communicated organic purity without appearing generic or sterile.',
      solution:
        'Formulated a subtle monochrome and deep burgundy color palette paired with bespoke serif title treatments and blind-embossed packaging specs.',
      services: ['Brand Architecture', 'Packaging Specs', 'Typography Bible', 'Digital Assets'],
      tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
      outcome: 'Successfully picked up by 14 boutique stockists across Europe and North America.',
      metricBadge: '14 Retail Stockists',
      client: 'Aethel Skincare',
      year: '2025'
    },
    {
      id: 'social-media-growth-retainer',
      title: 'Social Media Growth & Community Management',
      category: 'Social Media',
      tagline: 'Organic engagement workflows and editorial calendar scaling to 50k+ followers',
      image: socialImg,
      gallery: [socialImg, videoImg],
      fileType: 'image',
      featured: false,
      aspect: 'tall',
      overview:
        'Managed day-to-day community interaction, daily content scheduling, stories strategy, and brand partnerships across Instagram and TikTok.',
      challenge:
        'Client had inconsistent posting schedules, stagnant follower counts, and zero inbound DM sales inquiries.',
      solution:
        'Established a structured 30-day rolling content calendar, daily story polls, and proactive outreach to industry tastemakers.',
      services: ['Social Media Management', 'Community Outreach', 'Content Scheduling', 'Inbound Lead Strategy'],
      tools: ['Notion', 'Meta Business Suite', 'Later', 'CapCut'],
      outcome: 'Grew organic follower base from 4.1k to 52.8k in under 8 months with steady weekly inbound clients.',
      metricBadge: '+48k Followers',
      client: 'Studio Elevate',
      year: '2026'
    }
  ] as Project[],
  howIWork: [
    {
      number: '01',
      title: 'Discovery & Strategic Direction',
      subtitle: 'Understanding the Brand DNA & Audience',
      description:
        'Every project begins with a structured analysis of brand goals, customer demographics, competitor benchmarks, and conversion obstacles.',
      deliverables: ['Target Audience Mapping', 'Competitor & Moodboard Audit', 'Project Roadmap & Scope', 'Metric Milestones']
    },
    {
      number: '02',
      title: 'Concept & Creative Architecture',
      subtitle: 'Translating Strategy into Visual Form',
      description:
        'Developing the foundational visual direction, wireframes, kinetic typography, color palette, and high-impact layouts.',
      deliverables: ['Custom Typography & Palette', 'High-Fidelity Wireframes', 'Design Prototypes in Figma', 'Asset System Planning']
    },
    {
      number: '03',
      title: 'Execution & Shopify Development',
      subtitle: 'Building the High-Converting Experience',
      description:
        'Bringing designs to life with bespoke Shopify Liquid code, responsive styling, commercial video editing, and marketing assets.',
      deliverables: ['Custom Shopify Store Build', 'Mobile-First Layout Tuning', 'Kinetic Video Cuts & SFX', 'Ad Creative Suites']
    },
    {
      number: '04',
      title: 'Launch & Continuous Optimization',
      subtitle: 'Testing, Deployment & Growth',
      description:
        'Rigorous cross-browser QA, checkout flow verification, analytics pixel validation, and ongoing creative iteration.',
      deliverables: ['Storefront Speed Optimization', 'Analytics & Meta Pixel QA', 'Final Deliverables Handover', 'Post-Launch Support']
    }
  ] as ProcessStep[],
  experienceTimeline: [
    {
      discipline: 'Digital Marketing',
      role: 'Digital Marketing Specialist',
      period: '4+ Years Active Experience',
      focus: 'Performance Campaigns, Audience Growth & Conversion Optimization',
      achievements: [
        'Planned and scaled profitable paid advertising campaigns across Meta and Google ecosystems',
        'Implemented rigorous A/B creative testing protocols yielding higher click-through rates',
        'Built full-funnel customer acquisition roadmaps tailored to client business models'
      ]
    },
    {
      discipline: 'Graphic Design',
      role: 'Brand & Creative Designer',
      period: '4+ Years Active Experience',
      focus: 'Visual Identity, Marketing Collaterals & Promotional Creatives',
      achievements: [
        'Created cohesive brand guidelines, vector logos, and packaging materials for diverse industries',
        'Designed thousands of high-converting social media carousels, banners, and digital ads',
        'Maintained high aesthetic standards balancing modern minimalism with high visual impact'
      ]
    },
    {
      discipline: 'Video Editing',
      role: 'Video Editor & Motion Designer',
      period: '4+ Years Active Experience',
      focus: 'Short-Form Reels, Commercials & Social Video Content',
      achievements: [
        'Edited viral short-form videos optimized for TikTok, Instagram Reels, and YouTube Shorts',
        'Mastered pacing, kinetic typography, atmospheric sound design, and color grading',
        'Consistently exceeded client retention benchmarks in the critical first three seconds'
      ]
    },
    {
      discipline: 'Shopify Development',
      role: 'Shopify Developer & E-Commerce Consultant',
      period: '4+ Years Active Experience',
      focus: 'Storefront Setup, Theme Customization & Mobile Experience',
      achievements: [
        'Built and launched modern Shopify stores with responsive UX and smooth navigation',
        'Streamlined mobile cart flows, product page layouts, and payment gateway integrations',
        'Optimized site speed and conversion funnels to reduce bounce and cart abandonment'
      ]
    },
    {
      discipline: 'Social Media Management',
      role: 'Social Media Strategist & Manager',
      period: '4+ Years Active Experience',
      focus: 'Editorial Planning, Community Building & Organic Growth',
      achievements: [
        'Developed end-to-end content calendars aligned with quarterly marketing objectives',
        'Fostered genuine follower engagement and community advocacy across multiple channels',
        'Monitored real-time algorithmic trends to capture viral opportunities early'
      ]
    }
  ] as ExperienceItem[],
  tools: [
    { name: 'Adobe Photoshop', category: 'Creative Design', level: 'Expert', description: 'Advanced photo manipulation, mockups & raster composition' },
    { name: 'Adobe Illustrator', category: 'Creative Design', level: 'Expert', description: 'Vector logos, branding assets & bespoke illustrations' },
    { name: 'Adobe Premiere Pro', category: 'Video Production', level: 'Advanced', description: 'Cinematic long/short form video editing & color grading' },
    { name: 'Canva', category: 'Rapid Content', level: 'Master', description: 'Quick turnaround social graphics & client collaborative templates' },
    { name: 'CapCut', category: 'Viral Video', level: 'Master', description: 'Trend-driven short-form reels, subtitles & kinetic pacing' },
    { name: 'Figma', category: 'UI / UX Design', level: 'Advanced', description: 'E-commerce wireframing, component libraries & prototypes' },
    { name: 'Shopify', category: 'E-Commerce', level: 'Advanced', description: 'Store customization, app ecosystems & liquid theme tweaks' },
    { name: 'Meta Ads Manager', category: 'Marketing', level: 'Advanced', description: 'Targeting, custom pixel events, ROAS analytics & scaling' },
    { name: 'Google Ads', category: 'Marketing', level: 'Proficient', description: 'Search, display & video advertising setup & keyword planning' },
    { name: 'AI Creative Tools', category: 'Innovation', level: 'Advanced', description: 'Generative prompt engineering, asset expansion & concepting' }
  ] as ToolItem[],
  whyWorkWithMe: [
    { title: 'Creative & Strategic Approach', description: 'Every visual is rooted in clear business strategy, audience psychology, and revenue generation.' },
    { title: 'Professional Quality', description: 'Pixel-perfect execution, immaculate typography, and cinema-grade finishes across all deliverables.' },
    { title: 'Business-Focused Solutions', description: 'Focus on metrics that matter: customer acquisition, engagement rates, brand equity, and sales.' },
    { title: 'Modern Design', description: 'Contemporary, sleek, and timeless aesthetics avoiding fleeting clutter or generic templates.' },
    { title: 'Responsive Experiences', description: 'Seamless performance across mobile, tablet, and desktop viewports with fluid interaction.' },
    { title: 'Client-Focused Communication', description: 'Prompt responses, clear milestone updates, collaborative feedback loops, and zero ambiguity.' },
    { title: 'On-Time Delivery', description: 'Strict commitment to deadlines and production schedules without sacrificing quality.' },
    { title: 'Attention to Detail', description: 'Meticulous refinement from the smallest typographic kerning to overall brand coherence.' }
  ]
};

export const SAMPLE_PROJECTS: Project[] = INITIAL_PORTFOLIO_DATA.sampleProjects;
