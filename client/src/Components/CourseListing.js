import React, { useEffect, useState, } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import TopHeading from "./TopHeading";
import Header from "./Header";

const CourseListing = () => {
  const navigate = useNavigate();

  const [courseListing, setCourse] = useState([]);

  useEffect(() => {
    fetchDate()
  }, [])

  const fetchDate = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/get-all-courses`);
      if (response.status == 200) {
        setCourse(response?.data?.data)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePay = (id) => {
    navigate("/payment")
    const newArr = courseListing.filter((item) => item._id == id)
    localStorage.setItem("courseId", newArr[0]._id)
  }

  return (
    <div className="">
      <TopHeading title="Let's Learn" />
      <Header />

      <div className="container courses-cnt">
        <div className="row">
          <div className="col-md-4 d-flex justify-content-between" style={{ width: "100%" }}>
            {courseListing?.map((item) =>
              <div className="each-course">
                <img src={item.image} style={{ width: "100%", height: 200 }} />
                <div className="d-flex ">
                  <p className="courseTitle">Title: </p><p className="courseName">{item.title}</p>
                </div>
                <div className="d-flex ">
                  <p className="courseTitle">Description: </p><p className="courseName">{item.description}</p>
                </div>
                <div className="d-flex ">
                  <p className="courseTitle">Price: </p><p className="courseName">{item.price} OMR</p>
                </div>
                <button className="payBtn" onClick={() => handlePay(item._id)}>Pay</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default CourseListing;
