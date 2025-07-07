// middleware/authMiddleware.js
import Partner from '../models/Partner.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Main authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized: No token provided' 
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Dynamically check user or partner
    let user;
    if (decoded.role === "partner") {
      user = await Partner.findById(decoded.id).select("-password");
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized: User not found' 
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);

    let errorMessage = 'Unauthorized: Invalid token';
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Unauthorized: Token expired';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Unauthorized: Malformed token';
    }

    res.status(401).json({ 
      success: false,
      error: errorMessage 
    });
  }
};


// Role-based access control middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized: No user session' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        error: `Forbidden: Requires one of these roles [${roles.join(', ')}]` 
      });
    }

    next();
  };
};

// Specific role checkers (convenience middlewares)
export const isAdmin = requireRole(['admin']);
export const isPartner = requireRole(['partner', 'admin']);
export const isPremiumPartner = requireRole(['premium_partner', 'admin']);

// Alias for backward compatibility
export const protect = authMiddleware;

export default authMiddleware;

