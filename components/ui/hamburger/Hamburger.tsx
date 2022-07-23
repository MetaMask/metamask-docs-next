const Hamburger = ({ onClick }: any) => {
  return (
    <div className="hamburger-menu">
      <input type="checkbox" className="input-check2" id="input-check2" 
        hidden onClick={onClick} />
      <label className="bars-container bars-container2" htmlFor="input-check2">
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
      </label>
    </div>
  )
}

export default Hamburger