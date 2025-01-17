import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

export function SEO({
  title,
  description = "Holy Cross School Kabuganj - Nurturing minds, Building futures",
  keywords = "school, education, Holy Cross, Kabuganj",
  type = "website",
  image = "/src/assets/logo.png",
  noindex = false,
}: SEOProps) {
  const siteUrl = "https://exciting-germain1-xclt8.dev.tempolabs.ai";
  const fullTitle = `${title} | Holy Cross School Kabuganj`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={siteUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Holy Cross School Kabuganj" />
    </Helmet>
  );
}
