import React from 'react'

export const CheckBox = props => {
  console.log("props"+JSON.stringify(props))
    return (
      
      <li key={props.id}>
       <input key={props.id} type="checkbox" onChange={HelloCHeck()} defaultChecked={props.isChecked} value={props.value} /> {props.value}
      </li>
    )

    function HelloCHeck(){
      alert();
    }
}

export default CheckBox