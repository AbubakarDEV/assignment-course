import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TopHeading from "./TopHeading";
import Header from "./Header";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [errMsg, setErrMsg] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const isLogin = localStorage.getItem("isLoggedIn")
        if (isLogin) {
            navigate("/")
        }
    }, [])

    const submitHandler = async (e) => {
        errMsg["username"] = false
        errMsg["password"] = false
        e.preventDefault();
        if (data.username == "") {
            setErrMsg({ ...errMsg, username: true })
            return;
        }
        if (data.password == "") {
            setErrMsg({ ...errMsg, password: true })
            return;
        }
        try {
            const response = await axios.post(`http://localhost:8000/login`, {
                username: data.username,
                password: data.password,
            });
            debugger
            if (response.status == 200) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userId", response.data.user._id);
                setData({
                    username: "",
                    password: "",
                });
                navigate("/mypage")
                alert("loggedIn successfully")
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
        <div>
            <TopHeading title="Login" />
            <Header />
            <div className="container justify-content-center d-flex">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="login-cnt">
                            <p className="login-heading">Login to your page</p>
                            <div className="d-flex mb-10">
                                <label>UserName:</label>
                                <input type="text" value={data.username} onChange={handleOnChnage} name="username" className="usernameinput" />
                                <span className="err-msg">{errMsg.username}</span>
                            </div>

                            <div className="d-flex mb-10">
                                <label>Passowrd:</label>
                                <input type="text" value={data.password} onChange={handleOnChnage} name="password" className="passwordinput" />
                                <span className="err-msg">{errMsg.password}</span>
                            </div>
                            <button className="loginBtn" onClick={submitHandler}>Login</button>
                            <span className="if-you">If you don't have account yet:<Link className="signupbtn" to={"/signup"} >SignUp</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
