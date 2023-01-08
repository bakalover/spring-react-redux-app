import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './FormButton.module.css';
import {useState } from "react";
import { useRef } from 'react';
import Drawing from 'components/MainContent/GraphSection/Drawing';
//import GraphSvg2 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg2';
//import GraphSvg1 from 'components/MainContent/GraphSection/Graph/GraphsPlusR/GraphSvg1';


const FormButtonX = (props) => {

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
      message = props.value;
      forRemoveDrow = props.value;
      //alert(forDrow);
    }
    //setChecked(!checked);

    //{Drawing.svgDrawing(props.value, message, forRemoveDrow);}
    //Drawing.svgDrawing(props.value);
}

  let forpr;
  const [checked, setChecked] = useState(false);

  //const ref = useRef(null);

 
  //let mas = [];
	if ((!checked)){
    message = props.value;
    forpr = props.value
    //mas.push(props.value);   
	}
  else {
		message = props.value + "n";
    forpr = undefined;

  }

  //console.log("mas:" + mas);
  return (
    <div>
      
    <div>
		  {/* <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}  */}
      <input type="checkbox" checked={checked} onClick={() => setChecked(!checked)}
      onChange={() => props.selectValue(props.value)} value = {message} id = {props.value + "x"}/>
		  {/* <div id = 'message' ref={props.mesRef}>{message}</div> */}
	  </div>     
      
      <label>
        {props.value}
      </label>
    


    </div>
  );
}

export default CSSModules(FormButtonX, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
