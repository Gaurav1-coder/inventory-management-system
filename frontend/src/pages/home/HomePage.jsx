// FRONTEND AUTO: reviewed on 2026-04-14\r\nimport React from "react";

import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import About from "./container/About";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <About/>
    </MainLayout>
  );
};

export default HomePage;

