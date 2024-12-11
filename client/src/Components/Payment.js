import React, { useEffect, useState } from "react";
import Axios from "axios";
import TopHeading from "./TopHeading";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    account: "",
    cvv: "",
    password: "",
    expiryDate: ""
  });

  const [errMsg, setErrMsg] = useState({
    account: "",
    cvv: "",
    password: "",
    expiryDate: ""
  });

  useEffect((item) => {
    const userId = localStorage.getItem("userId")
    const courseId = localStorage.getItem("courseId")
    console.log(userId, courseId)
    if (!userId && !courseId) {
      navigate("/login")
    }
  }, [])


  const submitHandler = async () => {
    errMsg["account"] = false
    errMsg["cvv"] = false
    errMsg["password"] = false
    errMsg["expiryDate"] = false

    if (data.account == "") {
      setErrMsg({ ...errMsg, account: true })
      return;
    }
    if (data.cvv == "") {
      setErrMsg({ ...errMsg, cvv: true })
      return;
    }
    if (data.password == "") {
      setErrMsg({ ...errMsg, password: true })
      return;
    }
    if (data.expiryDate == "") {
      setErrMsg({ ...errMsg, expiryDate: true })
      return;
    }

    const userId = localStorage.getItem("userId")
    const courseId = localStorage.getItem("courseId")

    try {
      const response = await Axios.post(`http://localhost:8000/buy-course`, {
        userId,
        courseId
      });
      if (response.status == 200) {
        alert("Course bought successfully")
        navigate("/mypage")
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error fetching data:", error);
    }
  }


  const handleOnChnage = (e) => {
    const value = e.target.value
    const name = e.target.name
    setData({ ...data, [name]: value })
  }

  return (
    <div className="">
      <div>
        <TopHeading title="Pay Now" />
        <Header />
        <div className="container justify-content-center d-flex">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-cnt">
                <p className="login-heading">Enter your Information</p>
                <div className="d-flex mb-10">
                  <label>Bank Account:</label>
                  <input type="text" value={data.account} onChange={handleOnChnage} name="account" className="usernameinput" />
                  <span className="err-msg">{errMsg.account}</span>

                </div>
                <div className="d-flex mb-10">
                  <label>CVV No:</label>
                  <input type="text" value={data.cvv} onChange={handleOnChnage} name="cvv" className="passwordinput" />
                  <span className="err-msg">{errMsg.cvv}</span>

                </div>
                <div className="d-flex mb-10">
                  <label>Expiry Date:</label>
                  <input type="text" value={data.expiryDate} onChange={handleOnChnage} name="expiryDate" className="passwordinput" />
                  <span className="err-msg">{errMsg.expiryDate}</span>

                </div>
                <div className="d-flex mb-10">
                  <label>Passowrd:</label>
                  <input type="text" value={data.password} onChange={handleOnChnage} name="password" className="passwordinput" />
                  <span className="err-msg">{errMsg.password}</span>

                </div>
                <button className="loginBtn" onClick={submitHandler}>Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default Payment;
