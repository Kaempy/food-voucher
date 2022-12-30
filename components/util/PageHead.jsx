import Head from "next/head";

const PageHead = ({ title, content, path }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="canonical" href={path} />
    </Head>
  );
};

export default PageHead;
