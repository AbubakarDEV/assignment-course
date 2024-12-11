import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CourseListing from "./Components/CourseListing";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import About from "./Components/About";
import Payment from "./Components/Payment";
import MyPage from "./Components/MyPage";
import AddCourse from "./Components/AddCourse";


const App = () => {
  return (
    <div>
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/courses" element={<CourseListing />}></Route>
            <Route path="/add-course" element={<AddCourse />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
