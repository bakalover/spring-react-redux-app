import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './FormButton.module.css';
import {useState } from "react";
import Input from 'react-toolbox/lib/input';


const FormButtonX = (props) => {

  let message;

  const [checked, setChecked] = useState(false);

  const changeValX = ()=>{
    if(!checked){
      props.selectValue([...props.valueCurrent, props.value]);
    }
    else{
      var k = 0;
      for(let i = 0; i<props.valueCurrent.length; i++){
        if(props.valueCurrent[i]===props.value){
          k = i;
          break;
        }
      }
      let newCurrent = [...props.valueCurrent];
      newCurrent.splice(k,1);
      props.selectValue(newCurrent);
    }
  }

	if ((!checked)){
    message = props.value;
	}
  else {
		message = props.value + "n";
  }

  return (
    <div>
      <div>
        <Input type="checkbox" checked={checked} onClick={() => changeValX()}
        onChange={()=>setChecked(!checked)} value = {message} id = {props.value + "x"}/>
      </div>
      <label>
        {props.value}
      </label>
    </div>
  );
}

export default CSSModules(FormButtonX, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
