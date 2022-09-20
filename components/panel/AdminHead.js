import Head from "next/head";

const AdminHead = ({ title }) => {
  const actualTitle = title !== undefined ? title + " - Admin" : "" + "Admin";

  return (
    <Head>
      <title>{actualTitle}</title>
      <link rel="icon" href="/logo.svg" />
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default AdminHead;
