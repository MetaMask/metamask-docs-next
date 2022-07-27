import { useState, createContext } from 'react'

const AppContext = createContext()
const AppProvider = ({ children }) => {

  const [appData, setAppData] = useState({
    themeMode: 'dark',
    changeTheme: mode => setAppData(data => (
      { ...data, themeMode: mode }
    ))
  })

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }