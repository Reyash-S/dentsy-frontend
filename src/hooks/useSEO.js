import { useEffect } from 'react';

export function useSEO(seo) {
  useEffect(() => {
    if (!seo) return;

    if (seo.title) {
      document.title = seo.title;
    }

    const metaTags = {
      description: seo.metaDesc,
      'og:title': seo.opengraphTitle || seo.title,
      'og:description': seo.opengraphDescription || seo.metaDesc,
      'og:image': seo.opengraphImage,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      const property = name.startsWith('og:') ? 'property' : 'name';
      let meta = document.querySelector(`meta[${property}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    if (seo.canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', seo.canonical);
    }
  }, [seo]);
}
