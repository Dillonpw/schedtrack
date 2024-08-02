const GoogleAdsense = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4500026491096816&my_custom_param=value"></script>
  );
};

export default GoogleAdsense;
