import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Dreampedia</title>
        <meta
          name="description"
          content="A Dream Journal for those obsessed with their inner psyche."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        isLoggedIn={pageProps.isLoggedIn}
        username={pageProps?.user?.username}
      />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
