import { useContext, useState, createContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Guarda el usuario completo, por ejemplo: { name, email, role }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(UserContext);
