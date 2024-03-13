import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Rive Stream</title>
        <meta
          name="description"
          content="A Movie and TV series streaming service"
        />
        <meta
          name="keywords"
          content="Movie, streaming, TV"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
