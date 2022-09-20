import Head from "next/head";

const SEO = ({ title, desc }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name={desc}
        content="This website will help you find the best candidate for the upcomming election."
      />
      <link rel="icon" href="/logo.svg" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="candidate" />
      <meta property="og:title" content="Choose Your Candidate" />
      <meta
        property="og:description"
        content="This website will help you find the best candidate for the upcomming election."
      />
      <meta
        property="og:image"
        content="https://chooseyourcandidate.ml/homeImg.png"
      />
      <meta property="og:url" content="https://chooseyourcandidate.ml/" />
      <meta property="og:site_name" content="Choose Your Candidate" />
    </Head>
  );
};

export default SEO;
