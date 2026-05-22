import { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext(null)


const DEMO_USER = {
  id: "u1",
  name: "Admin",
  email: "bhd@gmail.com",
  avatar:
    "https://media.istockphoto.com/id/517302398/photo/portrait-of-nigerian-man-with-beard-looking-at-camera.jpg?s=1024x1024&w=is&k=20&c=rugR-rmn2oe_ZN1W4oXmY2w8m4dPCVFL2SWDeW7QZsg=",
  balance: 12000000, 
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    try {
      const saved = localStorage.getItem('ambassador_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    setLoading(false)
  }, [])

  const login = (email, password) => {
    
    const u = { ...DEMO_USER, email }
    setUser(u)
    localStorage.setItem('ambassador_user', JSON.stringify(u))
    return true
  }

  const register = (data) => {
    const u = { ...DEMO_USER, ...data }
    setUser(u)
    localStorage.setItem('ambassador_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ambassador_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
