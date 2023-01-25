import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './FormButton.module.css';
import {useState } from "react";
import Drawing from 'components/MainContent/GraphSection/Drawing';


const FormButton = (props) => {

  let forRemoveDrow;
  let message;

  const onChangeR = (e1, e2, e3)=>{
    if ((!checked)){
      message = props.value;
    }
    else {
      message = 0;
      forRemoveDrow = props.value;
    }
    setChecked(!checked);

    {Drawing.svgDrawing(props.value, message, forRemoveDrow);}
}

const changeValR = ()=>{
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

  const [checked, setChecked] = useState(false);


  if ((!checked)){
    message = props.value;
	}
  else {
		message = 0;
  }

  return (
    <div>
      <label>
        {props.value}
      </label>
      <div>
        <input type='checkbox' checked={checked} onChange={(e1,e2,e3) => onChangeR(e1,e2,e3)}
        onClick={() => changeValR()} value = {props.value} id = {props.value}/>
      </div>
    </div>
  );
}

export default CSSModules(FormButton, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
