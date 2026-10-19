import { useEffect } from 'react';
import { getSeo, getStructuredData, seoMetaTags } from '../data/seo.js';

export default function usePageSeo(page) {
  useEffect(() => {
    document.title = getSeo(page).title;
    for (const [attribute, key, value] of seoMetaTags(page)) {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = value;
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = getSeo(page).url;
    const data = getStructuredData(page);
    let script = document.getElementById('site-structured-data');
    if (!data) script?.remove();
    else {
      if (!script) {
        script = document.createElement('script');
        script.id = 'site-structured-data';
        script.type = 'application/ld+json';
        document.head.append(script);
      }
      script.textContent = JSON.stringify(data);
    }
  }, [page]);
}
