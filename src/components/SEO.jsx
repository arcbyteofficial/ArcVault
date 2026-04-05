import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "ArcVault | Zero-Knowledge Architecture",
  description = "A decentralized zero-knowledge encrypted vault protocol engineered for seamless localized device synchronization.", 
  canonical = "https://vault.arcbyte.co/",
  type = "website",
  image = "https://vault.arcbyte.co/og-image.png"
}) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {/* Search Engine indexing */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
