import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      <Head>
        <title>Ignite-Shop</title>
        <meta name="description" content="Ignite-Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      
      </Head>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
