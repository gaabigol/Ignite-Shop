import { HomeContainer, Product } from "@/styles/pages/home";
import camiseta1 from "../assets/images/1.png";
import camiseta2 from "../assets/images/2.png";

import Image from "next/image";
export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
      <Product>
        <Image src={camiseta2} width={520} height={480} alt="" />
        <footer>
          <strong>Camiseta Z</strong>
          <span>R$ 89,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
