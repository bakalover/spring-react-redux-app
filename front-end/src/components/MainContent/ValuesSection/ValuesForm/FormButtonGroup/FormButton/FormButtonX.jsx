import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './FormButton.module.css';
import {useState } from "react";
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import { useRef } from 'react';
import Drawing from 'components/MainContent/GraphSection/Drawing';
//import GraphSvg2 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg2';
//import GraphSvg1 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg1';


const FormButtonX = (props) => {

  let forRemoveDrow;
  let message;


  let forpr;
  const [checked, setChecked] = useState(false);

  //const ref = useRef(null);

  const changeValX = ()=>{
    //console.log(!checked);
    if(!checked){ // Реверсия checked (при нажатии используется предыдущее состояние)
      props.selectValue([...props.valueCurrent, props.value]);
    }
    if(checked){
      let newCurrent = props.valueCurrent; //копия для того, чтобы не менять состояние напрямую
      props.selectValue(newCurrent.filter(f => f!==props.value)); 
      // var k = 0;
      // for(let i = 0; i<props.valueCurrent.length; i++){
      //   if(props.valueCurrent[i]===props.value){
      //     k = i;
      //     break;
      //   }
      // }
      // let newCurrent = props.valueCurrent;
      // newCurrent.splice(k,1);              // Нельзя менять состояние props.valueCurrent не через reduce-ер (то есть напрямую), поэтому создаём копию состояния для безопаной работы
      // props.selectValue(newCurrent);
      //props.selectValue(props.valueCurrent.splice(k,1));
    }
  }


  if ((!checked)){
    message = props.value;
    forpr = props.value
    //mas.push(props.value);
	}
  else {
		message = props.value + "n";
    forpr = undefined;

  }

  //let mas = [];
	// if ((!checked)){
  //   message = props.value;
  //   forpr = props.value
  //   //mas.push(props.value);
	// }
  // else {
	// 	message = props.value + "n";
  //   forpr = undefined;

  // }

  //console.log("mas:" + mas);
  return (
    <div>

    <div>
		  {/* <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}  */}
      <Input type="checkbox" checked={checked} onClick={(e) => changeValX(e)} 
      onChange={()=>setChecked(!checked)}
      value = {message} //id = {props.value + "x"}
      id = {props.value + 'x'}/>
		  {/* <div id = 'message' ref={props.mesRef}>{message}</div> */}
	  </div>

      <label>
        {props.value}
      </label>



    </div>
  );
}

export default CSSModules(FormButtonX, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
