import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import Head from "next/head";
import { Toaster } from 'sonner';
import "@/styles/checkbox.scss";

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
          content="movie, streaming, tv, rive, stream. movie app, tv shows, movie download"
        />
        <link rel="manifest" href="manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rive" />
        <link rel="icon" href="./images/logo512.png" />
        <link rel="apple-touch-icon" href="./images/logo512.png" />
        <link rel="mask-icon" href="/images/logo512.svg" color="#1b1919" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1b1919" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="shortcut icon" href="/images/logo512.png" />
      </Head>
      <Layout>
        <Toaster toastOptions={{
          className: 'sooner-toast',
        }} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
