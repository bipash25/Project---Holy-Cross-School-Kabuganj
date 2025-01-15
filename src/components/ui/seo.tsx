import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultSEO = {
  title: "Holy Cross School Kabuganj",
  description:
    "Nurturing minds and building futures at Holy Cross School Kabuganj. Join our community of academic excellence and holistic development.",
  keywords: "school, education, Holy Cross, Kabuganj, admission, academics",
  image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
  url: "https://hcskabuganj.edu",
  type: "website",
};

export function SEO({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${defaultSEO.title}` : defaultSEO.title;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
