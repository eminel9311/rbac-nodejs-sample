const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const Employee = require("../model/employee");

/**
 * @DESC To register the employee (ENGINEER, MARKETER, HR-PERSONNEL)
 */
const employeeSignup = async (req, role, res) => {
  try {

    // validate the name
    const nameNotTaken = await validateEmployeename(req.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: 'Employee is already registered.'
      })
    }

    // validate the email
    const emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: 'Email is already registered.'
      })
    }

    // get the hashed password
    const password = await bcrypt.hash(req.password, 12);

    // create a new user
    const newEmployee = new Employee({
      ...req,
      password,
      role
    })

    await newEmployee.save();

    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login."
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}`
    });
  }
}

/**
 * @DESC To Login the employee (ENGINEER, MARKETER, HR-PERSONNEL)
 */
const employeeLogin = async (req, role, res) => {
  let { email, password } = req;
  console.log('role', role);

  // check if the email is in the database
  const employee = await Employee.findOne({ email });
  if (!employee) {
    return res.status(404).json({
      message: "Employee email is not found. Invalid login credentials.",
    })
  };

  // check the role
  if (employee.role !== role) {
    return res.status(404).json({
      message: "Please make sure you are logging in from the right portal.",
    })
  };

  // check for the password
  const isMatch = await bcrypt.compare(password, employee.password);
  if (isMatch) {
    // sign the token and issue it to the user
    const token = jwt.sign({
      id: employee.id,
      role: employee.role,
      name: employee.name,
      email: employee.email
    },
      process.env.APP_SECRET,
      { expiresIn: "1 days" }
    )

    let result = {
      id: employee.id,
      name: employee.name,
      role: employee.role,
      email: employee.email
    }

    res.status(200).cookie('jwt', token, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true
    })

    return res.json({
      ...result,
      message: "You are now logged in."
    })

  } else {
    return res.status(403).json({
      message: "Incorrect username or password."
    })
  }

}


/**
 * @DESC Verify JWT Middleware
 */
const employeeAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      message: 'Missing authorization header.'
    });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.APP_SECRET,
    (err, decoded) => {
      if (err) return res.status(404).json({
        message: 'invalid token'
      }); //invalid token

      console.log('decoded', decoded)
      req.auth = decoded;
      next();
    }
  )

}


/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => async (req, res, next) => {
  const email = req.auth?.email;
  console.log('email', email)

  const employee = await Employee.findOne({ email });
  console.log('employee', employee)

  !roles.includes(employee.role) ? res.status(401).json({ message: "Sorry you do not have access to this route" }) : next();
}

/**
 * @param {*} name 
 * @returns 
 */
const validateEmployeename = async name => {
  let employee = await Employee.findOne({ name });
  return employee ? false : true;
};


/**
 * @param {*} email 
 * @returns 
 */
const validateEmail = async email => {
  let employee = await Employee.findOne({ email });
  return employee ? false : true;
};


/**
 * Middleware auth jwt
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const jwtAuth = (req, res, next) => {
  const cookies = req.cookies
  console.log('cookies', cookies)
  const token = cookies.jwt;
  if (!token) {
    return res.status(401).json("token not found");
  }
  try {
    console.log("middleware is working");
    const user = jwt.verify(token, process.env.APP_SECRET);
    console.log(user)
    if (user) {
      next();
    }
  } catch (error) {
    return res.status(401).json("invalid token");
  }
}

module.exports = {
  employeeAuth,
  checkRole,
  employeeLogin,
  employeeSignup,
  jwtAuth
}





