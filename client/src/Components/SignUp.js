import React, { useEffect, useState, } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";


const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errMsg, setErrMsg] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

    useEffect(() => {
      const isLogin = localStorage.getItem("isLoggedIn")
      if (isLogin) {
          navigate("/")
      }
  }, [])

  const submitHandler = async (e) => {
    errMsg["email"] = false
    errMsg["username"] = false
    errMsg["password"] = false
    errMsg["confirmPassword"] = false
    e.preventDefault();
    if (data.email == "") {
      setErrMsg({ ...errMsg, email: true })
      return;
    }
    if (data.username == "") {
      setErrMsg({ ...errMsg, username: true })
      return;
    }
    if (data.password == "") {
      setErrMsg({ ...errMsg, password: true })
      return;
    }
    if (data.confirmPassword == "") {
      setErrMsg({ ...errMsg, confirmPassword: true })
      return;
    }

    try {
      const response = await Axios.post(`http://localhost:8000/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      if (response.status == 201) {
        //user created successfully
        navigate('/login');
        alert("user created successfully")
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "something went wrong")
      console.error("Error:", error.response?.data?.message || error.message);

    }
  };

  const handleOnChnage = (e) => {
    const value = e.target.value
    const name = e.target.name
    setData({ ...data, [name]: value })
  }

  return (
    <div className="">
      <div>
        <TopHeading title="Sign Up" />
        <Header />
        <div className="container justify-content-center d-flex">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-cnt">
                <p className="login-heading">Create your account</p>
                <div className="d-flex mb-10">
                  <label>Username:</label>
                  <input type="text" value={data.username} onChange={handleOnChnage} name="username" className="usernameinput" />
                  <span className="err-msg">{errMsg.username}</span>
                </div>
                <div className="d-flex mb-10">
                  <label>Email:</label>
                  <input type="text" value={data.email} onChange={handleOnChnage} name="email" className="passwordinput" />
                  <span className="err-msg">{errMsg.email}</span>

                </div>
                <div className="d-flex mb-10">
                  <label>Password:</label>
                  <input type="text" value={data.password} onChange={handleOnChnage} name="password" className="passwordinput" />
                  <span className="err-msg">{errMsg.password}</span>

                </div>
                <div className="d-flex mb-10">
                  <label>Confirm Passowrd:</label>
                  <input type="text" value={data.confirmPassword} onChange={handleOnChnage} name="confirmPassword" className="passwordinput" />
                  <span className="err-msg">{errMsg.confirmPassword}</span>
                </div>
                <button onClick={submitHandler} className="loginBtn">Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default SignUp;
