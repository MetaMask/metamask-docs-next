import { useState, createContext } from 'react'

interface AppContextInterface {
  themeMode: string;
  changeTheme: (themeMode: string) => void;
}

type AppContextType = AppContextInterface | undefined;

const AppContext = createContext<AppContextType>(undefined);

const AppProvider = ({ children }: any) => {

  const [appData, setAppData] = useState<AppContextInterface>({
    themeMode: 'dark',
    changeTheme: (mode: any) => setAppData(data => (
      { ...data, themeMode: mode }
    ))
  })

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>
}

export { AppContext, AppProvider }