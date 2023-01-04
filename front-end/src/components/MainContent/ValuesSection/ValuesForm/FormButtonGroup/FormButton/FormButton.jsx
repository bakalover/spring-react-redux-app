import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './FormButton.module.css';
import {useState } from "react";
import { useRef } from 'react';
import Drawing from 'components/MainContent/GraphSection/Drawing';
//import GraphSvg2 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg2';
//import GraphSvg1 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg1';


const FormButton = (props) => {

  let forRemoveDrow;
  let message;

  const onChangeR = (e1, e2, e3)=>{
    //setRValue(parseFloat(e));
    //setRValueForSvg(parseFloat(e));
    if ((!checked)){
      message = props.value; 
      //forDrow = props.value;
      //alert(forDrow);
      //mas.push(props.value);   
    }
    else {
      message = 0;
      forRemoveDrow = props.value;
      //alert(forDrow);
    }
    setChecked(!checked);

    {Drawing.svgDrawing(props.value, message, forRemoveDrow);}
    //Drawing.svgDrawing(props.value);
}


  const [checked, setChecked] = useState(false);

  const ref = useRef(null);

 
  //let mas = [];
	if ((!checked)){
    message = props.value; 
    //mas.push(props.value);   
	}
  else {
		message = 0;
  }

  //console.log("mas:" + mas);
  return (
    <div>
      
      {/* <input styleName={(props.valueCurrent === props.value) ? "form-button form-button_active" : "form-button"}
       type= "checkbox" onClick={() => props.selectValue(props.value)} value = {props.value}>
      </input> */}

      {/* <input styleName={(props.valueCurrent === props.value) ? "form-button form-button_active" : "form-button"}
       type= "checkbox" onChange={() => props.selectValue(props.value)} value = {props.value}>
      </input> */}

    {/* <div>
		  <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} 
      onClick={() => props.selectValue(props.value)} value = {props.value}/>
		  <div id = 'message' ref={props.mesRef}>{message}</div>
	  </div>      */}
      
      <label>
        {props.value}
      </label>
    
    {/* <div>
		  <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} 
      onClick={() => props.selectValue(message)} value = {message}/>
		  <div id = 'message'>{message}</div>
	  </div>     */}

    <div>
		  <input type="checkbox" checked={checked} onChange={(e1,e2,e3) => onChangeR(e1,e2,e3)} 
      onClick={() => props.selectValue(props.value)} value = {props.value} id = {props.value}/>
		  {/* <div id = 'message'>{message}</div> */}
	  </div>   

    </div>
  );
}

export default CSSModules(FormButton, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
