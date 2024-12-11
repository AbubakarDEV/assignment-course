
import pic1 from "../Images/banner1.jpg";
import React from "react";
import Header from "./Header";
import TopHeading from "./TopHeading";

const Home = () => {
    return (
        <div className="home">
            <TopHeading title="Start Learning!" />
            <Header />
            <img  src={pic1} className="home-page-banner"/>
        </div>
    );
};

export default Home;

