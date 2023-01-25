import React, { useRef, useEffect} from 'react';
//import { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Graph.module.css';
//import GraphSvg from './GraphsPlusR/GraphSvg';
//import FormButton from 'components/MainContent/ValuesSection/ValuesForm/FormButtonGroup/FormButton/FormButton';
import GraphSvg1 from './GraphSvg1';
import Canvas from './Canvas/Canvas';
import { hitCheck } from '../HitCheck';
import entryAPI from "../../../../api/entryAPI";

//разобраться с тем, как выбирается X при клике!!!
const Graph = (props) => {

  let masR = [];


  let arr = [];
    for (let i = 0; i < 9; i++){
      arr[i] = 10;
    }
  //const canone = 68;

  const pointsCanvasRef = useRef(null);
  const currentCanvasRef = useRef(null);

  const loadPrevPoints = (canvas, canvasCtx) => {
    for (let entry of props.entries) {
      for (let i = 0; i < props.rCurrent.length; i++) {
        if (entry.r === props.rCurrent[i]) {
          canvasCtx.fillStyle = entry.status ? 'green' : 'red';
          canvasCtx.beginPath();
          canvasCtx.arc(
            150 + entry.x / 4 * 100,
            150 - entry.y / 4 * 100,
            2, 0, 2 * Math.PI);
          canvasCtx.fill();
        }
      }
    }
  }

  const clearCanvas = (canvas, canvasCtx) => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const clearCurrent = (canvas, canvasCtx) => {

    const x  = 150 + props.xCurrent/4 * 100;
    const y = 150 - props.yCurrent/4 * 100;

    if (props.xCurrent==="-4n"){
      canvasCtx.clearRect(150 + -4/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[0] = -4;
    }
    if (props.xCurrent==="-3n"){
      canvasCtx.clearRect(150 + -3/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[1] = -4;
    }
    if (props.xCurrent==="-2n"){
      canvasCtx.clearRect(150 + -2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[2] = -4;
    }
    if (props.xCurrent==="-1n"){
      canvasCtx.clearRect(150 + -1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[3] = -4;
    }
    if (props.xCurrent==="0n"){
      canvasCtx.clearRect(150 + 0/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[4] = -4;
    }
    if (props.xCurrent==="1n"){
      canvasCtx.clearRect(150 + 1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[5] = -4;
    }
    if (props.xCurrent==="2n"){
      canvasCtx.clearRect(150 + 2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[6] = -4;
    }
    if (props.xCurrent==="3n"){
      canvasCtx.clearRect(150 + 3/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[7] = -4;
    }
    if (props.xCurrent==="4n"){
      canvasCtx.clearRect(150 + 4/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
      arr[8] = -4;
    }

  }

  const drawCurrent = (canvas, canvasCtx) => {
    //alert(props.xCurrent);

    //arr[props.xCurrent] = props.xCurrent;

    //clearCanvas(canvas, canvasCtx);

    //alert(props.rCurrent);

    //const x = props.xCurrent * canone / props.rCurrent + canvas.width / 2;
    //const y = -(props.yCurrent / props.rCurrent * canone - canvas.height / 2);

    //const x2 = ((props.rCurrent * (props.xCurrent - 150))/100) * (4/props.rCurrent);
    // const y = ((props.rCurrent * (150 - props.yCurrent))/100) * (4/props.rCurrent);

    // if (document.getElementById("-4x").checked){
    //   alert(props.xCurrent);
    // }
    // if (document.getElementById("-4x").checked === false){
    //   alert("nooooo");
    // }

    // if (props.xCurrent !== undefined){
    //   alert(document.getElementById(props.xCurrent + "x").getAttribute("value"));
    // }

    //alert(props.xCurrent);

    //for (let i = 0; i < props.xCurrent.length; i++) {



    const x  = 150 + props.xCurrent/4 * 100;
    const y = 150 - props.yCurrent/4 * 100;


    //alert(x);
    //alert(x2);
    //alert(props.xCurrent);

    if (x > canvas.width || x < 0 ||
      y > canvas.height || y < 0) {
      return;

      }


    canvasCtx.fillStyle = hitCheck(props.xCurrent, props.yCurrent, props.rCurrent) ? 'green' : 'red';
    //canvasCtx.setLineDash([2, 2]);
    canvasCtx.beginPath();
    // canvasCtx.moveTo(x, canvas.width / 2);
    // canvasCtx.lineTo(x, y);
    // canvasCtx.moveTo(canvas.height / 2, y);
    // canvasCtx.lineTo(x, y);

    // canvasCtx.stroke();
    canvasCtx.arc(x, y, 2, 0, 2 * Math.PI);
    canvasCtx.fill();
  }

    // if (props.xCurrent==="-4n"){
    //   canvasCtx.clearRect(150 + -4/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    //   props.xCurrent = undefined;
    // }
    // if (props.xCurrent==="-3n"){
    //   canvasCtx.clearRect(150 + -3/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="-2n"){
    //   canvasCtx.clearRect(150 + -2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="-1n"){
    //   canvasCtx.clearRect(150 + -1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="0n"){
    //   canvasCtx.clearRect(150 + 0/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="1n"){
    //   canvasCtx.clearRect(150 + 1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="2n"){
    //   canvasCtx.clearRect(150 + 2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="3n"){
    //   canvasCtx.clearRect(150 + 3/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if (props.xCurrent==="4n"){
    //   canvasCtx.clearRect(150 + 4/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }


    // if(props.xCurrent===undefined && document.getElementById("-4x").getAttribute("value").substring(2,3)!=="n"){
    //   arr[0] = -4;
    // }
    // if(props.xCurrent===undefined && document.getElementById("-3x").getAttribute("value").substring(2,3)!=="n"){
    //   arr[1] = -3;
    // }
    // alert(arr);

    // if(props.xCurrent===undefined && document.getElementById("-2x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + -2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("-1x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + -1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("0x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + 0/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("1x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + 1/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("2x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + 2/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("3x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + 3/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }
    // if(props.xCurrent===undefined && document.getElementById("4x").getAttribute("value").substring(2,3)!=="n"){
    //   canvasCtx.clearRect(150 + 4/4 * 100-2, y-2, 2 * Math.PI,2 * Math.PI);
    // }

  //}

  const handleClick = (canvasRef, event) => {
    let canvasX = ((props.rCurrent[0] * (event.nativeEvent.offsetX - 150))/100) * (4/props.rCurrent[0]);
    let canvasY = ((props.rCurrent[0] * (150 - event.nativeEvent.offsetY))/100) * (4/props.rCurrent[0]);
    let owner_token = JSON.parse(localStorage.getItem('userWl4'));
    entryAPI.checkEntry(owner_token.username,[canvasX],canvasY,props.rCurrent,owner_token.token);
  }
  useEffect(() => {
    const pointsCanvas = pointsCanvasRef.current;
    const pointsCanvasCtx = pointsCanvas.getContext('2d');
    clearCanvas(pointsCanvas, pointsCanvasCtx);

    const currentCanvas = currentCanvasRef.current;
    const currentCanvasCtx = currentCanvas.getContext('2d');

    loadPrevPoints(pointsCanvas, pointsCanvasCtx);
    clearCurrent(currentCanvas, currentCanvasCtx);
  });

  let image = <GraphSvg1 rValue={props.rCurrent} />;


  return (
        <div styleName="graph-container" id='wrapper'>
          {image}
          <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)"/>
          <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)"  handleClick = {handleClick}/>
        </div>


      );


}

export default CSSModules(Graph, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
