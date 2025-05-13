const router = require('express').Router();
const {
  checkRole,
  employeeAuth,
  employeeLogin,
  employeeSignup,
  jwtAuth
} = require('../controllers/authFunctions');


// Software engineering Registeration Route
router.post("/register-se", (req, res) => {
  employeeSignup(req.body, "se", res);
})

//Marketer Registration Route
router.post("/register-marketer", async (req, res) => {
  await employeeSignup(req.body, "marketer", res);
});

//Human resource Registration route
router.post("/register-hr", async (req, res) => {
  await employeeSignup(req.body, "hr", res);
});

// Software engineers Login Route
router.post("/login-se", async (req, res) => {
  await employeeLogin(req.body, "se", res);
});

// Human Resource Login Route
router.post("/login-hr", async (req, res) => {
  await employeeLogin(req.body, "hr", res);
});

// Marketer Login Route
router.post("/login-marketer", async (req, res) => {
  await employeeLogin(req.body, "marketer", res);
});

//Software engineers protected route
router.get(
  "/se-protected",
  employeeAuth,
  checkRole(["se"]),
  async (req, res) => {
    return res.json({ message: `welcome ${req.auth.role} - ${req.auth.name}` });
  }
);


//Marketers protected route
router.get(
  "/marketers-protected",
  employeeAuth,
  checkRole(["marketer"]),
  async (req, res) => {
    return res.json({ message: `welcome ${req.auth.role} - ${req.auth.name}` });
  }
);


//HR personels protected route
router.get(
  "/hr-protected",
  employeeAuth,
  checkRole(["hr"]),
  async (req, res) => {
    return res.json({ message: `welcome ${req.auth.role} - ${req.auth.name}` });
  }
);

router.post("/protected", jwtAuth, (req, res) => {
  res.status(200).send({ message: "Here's the info you requested " });
});

module.exports = router;
