import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  keywords,
  type = "website",
  image,
  noindex,
}: SEOProps) => {
  const siteTitle = "Holy Cross School Kabuganj";
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};
