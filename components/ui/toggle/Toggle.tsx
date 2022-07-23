const Toggle = ({ onChange }: any) => {
  return (
    <div>
      <label className="ui-switch">
        <input id="check" className="input" type="checkbox" 
          onChange={onChange} />
        <div className="circle"></div>
      </label>
    </div>
  )
}

export default Toggle