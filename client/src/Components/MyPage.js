import React, { useState, useEffect } from "react";
import Axios from "axios";
import TopHeading from "./TopHeading";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [data, setDate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn")
    if (isLogin) {
      fetchData();
    }
    else {
      navigate("/login")
    }
  }, []);

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const response = await Axios.post(`http://localhost:8000/get-all-purchased-courses`, {
        userId
      });
      setDate(response.data.courses)
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="">
      <TopHeading title="My Page" />
      <Header />
      <div className="container courses-cnt">
        <div className="row">
          <div className="col-sm-12">
            {data?.map((item) =>
              <div className="my-course postion-relative">
                <img src={item.image} style={{ width: 300, height: 200 }} />
                <div className="d-flex ">
                  <p className="courseTitle">Title: </p><p className="courseName">{item.title}</p>
                </div>
                <button className="startcoursebtn">Start Course</button>
              </div>
            )}
            <div className="d-flex total-price">
              <p>Total:</p><p>65 OMR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
