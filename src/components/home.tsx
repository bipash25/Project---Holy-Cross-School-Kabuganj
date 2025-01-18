import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { SEO } from "./ui/seo";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="Home" description="Welcome to Holy Cross School Kabuganj" />
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Holy Cross School
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            Nurturing minds, Building futures
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
