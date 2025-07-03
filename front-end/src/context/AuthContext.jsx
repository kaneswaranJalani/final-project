import { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext();

// Context Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage (if present)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    } else {
      dispatch({ type: "STOP_LOADING" });
    }
  }, []);

  // Actions
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
