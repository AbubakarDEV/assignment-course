import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ENV_VARS } from "./constant";
import { User } from "./models/user.model";
import Courses from "./models/course.model";
import { Payments } from "./models/payment.model";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use('/temp', express.static(path.join(__dirname, 'temp')));
app.use(
  cors({
    origin: ENV_VARS.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'temp'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/login", async (req, res) => {
  // get data from req.body
  const { password, username } = req.body
  console.log(password, username)
  try {
    // username or email
    if (!username) {
      return res
        .status(400)
        .json({ message: "username  is required" });
    }

    // find the user
    const userDB = await User.findOne({
      $or: [{ username }]
    })
    if (!userDB) {
      return res
        .status(400)
        .json({ message: "user does not exist" });
    }

    if (password !== userDB.password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const loggedInUser = await User.findById(userDB._id).select(
      "-password"
    );
    res.status(200).json({ user: loggedInUser, login: true, message: "User logged In Successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', login: false, error: err.message });
  }
})

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  // validation - not empty
  if (
    [username, email, password].some((field) => field?.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "All fields are Required" });
  }

  // check if user already exists: username,email
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    return res
      .status(400)
      .json({ message: "User already exist" });
  }

  // create user object - create entry in db
  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password  field from response
  const createdUser = await User.findById(user._id).select(
    "-password"
  );

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while registering the user" });
  }

  return res
    .status(201)
    .json({ user: createdUser, register: true, message: "User registered successfully" });
})

app.post('/add-course', upload.single('image'), async (req, res) => {
  try {
    const { title, price, description } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const encodedFilename = encodeURIComponent(req.file.filename);
    const imageUrl = `http://localhost:8000/temp/${encodedFilename}`;

    // Create new course
    const newCourse = new Courses({
      image: imageUrl,
      contentType: req.file.mimetype,
      title,
      price,
      description,
    });
    await newCourse.save();

    res.status(200).json({ message: 'Course added successfully', course: newCourse });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course', error: err.message });
  }
});

app.get("/get-all-courses", async (req, res) => {
  const Course = await Courses.find();
  return res
    .status(200)
    .json({ data: Course, status: true, });
})

app.post('/get-all-purchased-courses', async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user by userId and populate their boughtCourses
    const user = await User.findById(userId).populate('boughtCourses');

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the courses the user has bought
    res.json({ message: 'User courses retrieved successfully', courses: user.boughtCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API Endpoint to Buy a Course
app.post('/buy-course', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the course exists
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user already has the course
    if (user.boughtCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Course already bought by the user' });
    }

    // Add the course to the user's bought courses
    user.boughtCourses.push(courseId);

    // Save the updated user document
    await user.save();

    // Return the updated user information along with the course
    const updatedUser = await User.findById(userId).populate('boughtCourses');
    res.json({ message: 'Course bought successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post("/card-payemnt", async (req, res) => {
  const { cvv, bankAccount, expiryDate, password } = req.body;

  if (!bankAccount) {
    return res.status(400).json({ message: "Bank Account is required" });
  }
  // validation - not empty
  if (
    [cvv, bankAccount, expiryDate, password].some((field) => field?.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "All fields are Required" });
  }

  const Payment = await Payments.create({
    cvv, bankAccount, expiryDate, password
  });

  const PaymentCreated = await Payments.findById(Payment._id).select(
    "-password"
  );

  if (!PaymentCreated) {
    return res
      .status(500)
      .json({ message: "Something went wrong" });
  }

  return res
    .status(201)
    .json({ data: PaymentCreated, payment: true });

})

export { app };
