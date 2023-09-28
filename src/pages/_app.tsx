import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/template";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";
import LogoImg from "../assets/Logo.svg";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "700"],
  display: "swap",
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Ignite-Shop</title>
        <meta name="description" content="Ignite-Shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={roboto.className}>
        <Header>
          <Image src={LogoImg} alt="Logo" />
        </Header>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}
