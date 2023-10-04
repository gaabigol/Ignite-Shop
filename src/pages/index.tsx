import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import { stripe } from "@/service/stripe";
import { GetStaticProps } from "next";
import Head from "next/head";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Stripe from "stripe";
import React from "react";
import Link from "next/link";

interface ProductProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: ProductProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<number>(3);

  React.useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth <= 480) {
        setCurrentBreakpoint(1);
      } else if (window.innerWidth <= 768) {
        setCurrentBreakpoint(2);
      } else {
        setCurrentBreakpoint(3);
      }
    };

    window.addEventListener("resize", resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: currentBreakpoint,
      spacing: 48,
    },
  });
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    const amount = price.unit_amount || 0;
    if (amount === null) {
      throw new Error("Unexpected null value for unit_amount");
    }
    //const amount = typeof price.unit_amount === 'number' ? price.unit_amount : 0;
    //const imageUrl = product.images.length > 0 ? product.images[0] : '/default-product.jpg';
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(amount / 100),
    };
  });

  return {
    props: { products },
    revalidate: (60 * 60) / 2, // 2 hours
  };
};
