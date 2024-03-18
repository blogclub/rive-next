import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Rive</title>
        <meta
          name="description"
          content="Your Personal Streaming Oasis"
        />
        <meta
          name="keywords"
          content="movie, streaming, tv, rive"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1b1919" />
        <link rel="icon" href="./images/logo.png" />
        <link rel="apple-touch-icon" href="./images/logo.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
