export const SITE_URL = 'https://mentomory.pixyzbit.dev';

const pages = {
  home: {
    path: '/',
    title: 'Mentomory | Online Photo Booth & Photo Strip Maker',
    description:
      'Create photo strips with Mentomory’s online photo booth. Choose 21 layouts, add frames and face effects, then download JPG photos or seven-second MP4 live strips.',
    index: true,
  },
  templates: {
    path: '/templates',
    title: 'Photo Strip Templates & Layouts | Mentomory',
    description:
      'Explore 21 photo booth layouts: classic strips, Polaroids, single prints and photo grids. Pick your layout, capture your photos and customize your keepsake.',
    index: true,
  },
  booth: {
    path: '/booth',
    title: 'Capture Your Photos | Mentomory',
    description: 'Capture photos or seven-second live clips in your browser with Mentomory.',
    index: false,
  },
  editor: {
    path: '/edit',
    title: 'Customize Your Photo Strip | Mentomory',
    description:
      'Customize your Mentomory photo strip with frames, backgrounds, filters and captions.',
    index: false,
  },
};

export const publicPages = ['home', 'templates'];

export function getSeo(page = 'home') {
  const data = pages[page] || pages.home;
  return {
    ...data,
    url: SITE_URL + data.path,
    image: SITE_URL + '/mentomory-social-v4.jpg',
    robots: data.index ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  };
}

export function getStructuredData(page = 'home') {
  const seo = getSeo(page);
  if (!seo.index) return null;
  const graph = [
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL + '/',
      name: 'Mentomory',
      alternateName: 'Mentomory Photo Booth',
      inLanguage: 'en',
    },
    {
      '@type': page === 'templates' ? 'CollectionPage' : 'WebPage',
      '@id': seo.url + '#webpage',
      url: seo.url,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': SITE_URL + '/#website' },
      inLanguage: 'en',
    },
  ];
  if (page === 'home')
    graph.push({
      '@type': 'WebApplication',
      '@id': SITE_URL + '/#app',
      name: 'Mentomory',
      url: SITE_URL + '/',
      description: seo.description,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      image: seo.image,
      featureList: [
        '21 photo layouts',
        'Decorative frames and face effects',
        'JPG photo downloads',
        'Five-second MP4 live strips',
      ],
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function seoMetaTags(page) {
  const seo = getSeo(page);
  return [
    ['name', 'description', seo.description],
    ['name', 'robots', seo.robots],
    ['property', 'og:site_name', 'Mentomory'],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:type', 'website'],
    ['property', 'og:url', seo.url],
    ['property', 'og:image', seo.image],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', 'Mentomory hand-drawn camera logo'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', seo.image],
  ];
}
