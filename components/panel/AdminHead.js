import Head from "next/head";

const AdminHead = ({ title }) => {
  const actualTitle = title !== undefined ? title + " - Admin" : "" + "Admin";

  return (
    <Head>
      <title>{actualTitle}</title>
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
};

export default AdminHead;
