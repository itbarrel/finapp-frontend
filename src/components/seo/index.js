import Head from "next/head";
import ENV from "../../configs/";
import PropTypes from "prop-types";
import { memo } from "react";

const SEO = memo(({ title, description, canonical, css, js, image }) => {
  return (
    <Head>
      <title>{`${title} ${title === "CrisisHub" ? "" : "| CrisisHub"}`}</title>
      <meta
        name="description"
        content={description ? description : ENV.siteDescription}
      />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={ENV.siteName} />
      <meta
        name="og:description"
        property="og:description"
        content={ENV.siteDescription}
      />
      <meta property="og:site_name" content={ENV.siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ENV.siteName} />
      <meta name="twitter:description" content={ENV.siteDescription} />
      <meta name="twitter:image" content="images/ogimg.png" />

      {css && <link rel="stylesheet" href={`${css}`} crossOrigin="anonymous" />}
      {image ? (
        <meta property="og:image" content={`${image}`} />
      ) : (
        <meta property="og:image" content="images/ogimg.png" />
      )}
      {image && <meta name="twitter:image" content={`${image}`} />}
      {canonical && <link rel="canonical" href={`${canonical}`} />}
      {js && <script type="text/javascript" src={`${js}`}></script>}
    </Head>
  );
});

SEO.displayName = SEO;
export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  css: PropTypes.string,
  js: PropTypes.string,
  image: PropTypes.string,
};
