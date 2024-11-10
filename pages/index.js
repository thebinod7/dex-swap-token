import React from "react";
import { Header, Footer, HeroSection, Card } from "../components";

const home = () => {
    return (
        <div className="bg-[#1A1A1A]">
            <Header />
            <HeroSection />
            <Card />
            <Footer />
        </div>
    );
};

export default home;
