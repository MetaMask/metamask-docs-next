// import { useContext } from 'react'
// import { AppContext } from '../../context/AppContext'
import Toggle from '../components/ui/toggle/Toggle'

const Foot = () => {
  // const context = useContext(AppContext)
  // const isLight = context.themeMode === 'light'

  const handleSwitch = () => {
    console.log("Switch has been switched")
  }
  
  return (
    <>
      <div className="left">
        🦊 Stay Foxy
      </div>
      <div className="right">
        <Toggle onChange={handleSwitch} />
      </div>
    </>
  )
}

export default Foot