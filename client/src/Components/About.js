import React from "react";
import TopHeading from "./TopHeading";
import Header from "./Header";
const About = () => {
    return (
        <div>
            <TopHeading title="About Us" />
            <Header />
            <div className="container-fluid about-cnt">
                <div className="row">
                    <div className="col-sm-12 col-lg-3"></div>
                    <div className="col-sm-12 col-lg-6">
                        <p className="text">Online courses play a pivotal role in education, making it more accessible, flexible and tailored to individual needs. They are essential for personal and professtional growth in an increasingly digital world.</p>
                        <div className="contact-us">
                            <p className="contact-text">Contact us:</p>
                            <div className="d-flex">
                                <p className="contact-text">Phone:</p><p className="contact-text-1">99999999</p>
                            </div>
                            <div className="d-flex">
                                <p className="contact-text">Email:</p><p className="contact-text-1">onlinecourse@gmail.com</p>
                            </div>
                        </div>    
                    </div>
                    <div className="col-sm-12 col-lg-3"></div>
                </div>
            </div>
        </div>
    );
};
export default About;
