// server.js or routes/auth.js
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // Find user and verify credentials...
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
  
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    res.json({ user: { email: user.email, role: user.role, name: user.name } });
  });
  