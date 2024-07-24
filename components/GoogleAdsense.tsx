import Script from "next/script";

const GoogleAdsense = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4500026491096816"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};

export default GoogleAdsense;
