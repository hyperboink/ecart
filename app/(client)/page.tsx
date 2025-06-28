
import React from "react";
import Container from "@/components/Container";
import HeroBanner from "@/components/HeroBanner";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryBlocks from "@/components/CategoryBlocks";
import BrandBlocks from "@/components/BrandBlocks";
import ServicesInfoBlock from "@/components/ServiceInfoBlock";
import LatestBlog from "@/components/LatestBlog";

const Home = () => {
  return (
    <Container>
      <HeroBanner />

      <div className="py-12">
        <ProductGrid />
        <CategoryBlocks limit={6}/>
        <BrandBlocks />
        <ServicesInfoBlock />
        <LatestBlog />
      </div>
    </Container>
  )
};

export default Home;