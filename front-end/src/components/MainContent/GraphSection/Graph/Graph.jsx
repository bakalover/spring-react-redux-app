import React, { useRef, useEffect } from 'react';
//import { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Graph.module.css';
//import GraphSvg from './GraphsPlusR/GraphSvg';
import FormButton from 'components/MainContent/ValuesSection/ValuesForm/FormButtonGroup/FormButton/FormButton';
import GraphSvg1 from './GraphSvg1';
import Canvas from './Canvas/Canvas';

//разобраться с тем, как выбирается X при клике!!!
const Graph = (props) => {
  let masR = [];
  const canone = 68;

  const pointsCanvasRef = useRef(null);
  const currentCanvasRef = useRef(null);

  const loadPrevPoints = (canvas, canvasCtx) => {
    for (let entry of props.entries) {
      canvasCtx.fillStyle = entry.result ? 'green' : 'red';
      canvasCtx.beginPath();
      canvasCtx.arc(
        150 + entry.x/4 * 100,
        150 - entry.y/4 * 100,
        2, 0, 2 * Math.PI);
      canvasCtx.fill();
    }
  }

  const clearCanvas = (canvas, canvasCtx) => {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const drawCurrent = (canvas, canvasCtx) => {
    //clearCanvas(canvas, canvasCtx);

    //alert(props.rCurrent);

    //const x = props.xCurrent * canone / props.rCurrent + canvas.width / 2;
    //const y = -(props.yCurrent / props.rCurrent * canone - canvas.height / 2);

    //const x2 = ((props.rCurrent * (props.xCurrent - 150))/100) * (4/props.rCurrent);
    // const y = ((props.rCurrent * (150 - props.yCurrent))/100) * (4/props.rCurrent);

    const x  = 150 + props.xCurrent/4 * 100;
    const y = 150 - props.yCurrent/4 * 100;

    
    //alert(x);
    //alert(x2);
    //alert(props.xCurrent);

    if (x > canvas.width || x < 0 ||
      y > canvas.height || y < 0) {
      return;
    }

    //canvasCtx.setLineDash([2, 2]);
    canvasCtx.fillStyle = 'black';
    canvasCtx.beginPath();
    canvasCtx.moveTo(x, canvas.width / 2);
    canvasCtx.lineTo(x, y);
    canvasCtx.moveTo(canvas.height / 2, y);
    canvasCtx.lineTo(x, y);
    //canvasCtx.stroke();
    canvasCtx.arc(x, y, 2, 0, 2 * Math.PI);
    canvasCtx.fill();
  }

  const handleClick = (canvasRef, event) => {
    //const canvas = canvasRef.current;

    //let canvasX = (event.nativeEvent.offsetX - canvas.width / 2) / canone * props.rCurrent;

    let canvasX = ((props.rCurrent * (event.nativeEvent.offsetX - 150))/100) * (4/props.rCurrent);

    let minDiff = Infinity;

    
  

    //let nearestX;

    for (let i = 0; i < props.xValues.length; i++) {
      if (Math.abs(canvasX - props.xValues[i]) < minDiff) {
        minDiff = Math.abs(canvasX - props.xValues[i]);
        //nearestX = props.xValues[i];
      }
    }

    //let canvasY = (-event.nativeEvent.offsetY + canvas.height / 2) / canone * props.rCurrent;
    let canvasY = ((props.rCurrent * (150 - event.nativeEvent.offsetY))/100) * (4/props.rCurrent);

    if (canvasY < props.yMin) {
      canvasY = props.yMin;
    } else if (canvasY > props.yMax) {
      canvasY = props.yMax;
    }

    //alert(canvasX);
    //alert(canvasY);

    //props.selectX(nearestX);
    props.selectX(canvasX);
    props.changeY(canvasY.toString().substring(0, 7));

    //const x  = 150 + props.xCurrent/4 * 100;
    //const y = 150 - props.yCurrent/4 * 100;

    //props.selectX(x);
    //props.changeY(y);
  }

  useEffect(() => {
    const pointsCanvas = pointsCanvasRef.current;
    const pointsCanvasCtx = pointsCanvas.getContext('2d');
    clearCanvas(pointsCanvas, pointsCanvasCtx);

    const currentCanvas = currentCanvasRef.current;
    const currentCanvasCtx = currentCanvas.getContext('2d');
    clearCanvas(currentCanvas, currentCanvasCtx);

    loadPrevPoints(pointsCanvas, pointsCanvasCtx);
    drawCurrent(currentCanvas, currentCanvasCtx);
  });

  let image = <GraphSvg1 rValue={props.rCurrent} />;
  //let image1 = <GraphTest rValue={props.rCurrent} />;
  //let image2 = <GraphMatw rValue={props.rCurrent} />;

  // switch(props.rCurrent){
  //       case 0:
  //           image = <GraphSvg0 rValue={props.rCurrent} />;
  //           break
  //       case 1:
  //           image = <GraphSvg1 rValue={props.rCurrent} />;
  //           break
  //       case 2:
  //           image = <GraphSvg2 rValue={props.rCurrent} />;
  //           break
  //       case 3:
  //           image = <GraphSvg3 rValue={props.rCurrent} />;
  //           break
  //       case 4:
  //           image = <GraphSvg4 rValue={props.rCurrent} />;
  //           break
  //       case -1:
  //           image = <GraphSvgMinus1 rValue={props.rCurrent} />;
  //           break
  //       case -2:
  //           image = <GraphSvgMinus2 rValue={props.rCurrent} />;
  //           break
  //       case -3:
  //           image = <GraphSvgMinus3 rValue={props.rCurrent} />;
  //           break
  //       case -4:
  //           image = <GraphSvgMinus4 rValue={props.rCurrent} />;
  //           break
  // }

  
 
 
  masR.push(props.xCurrent, props.yCurrent, props.rCurrent);

  // const [checked, setChecked] = useState(false);

  // let message;
	// if ((checked) && (props.value === 2)){
  //   message = <GraphSvg2 rValue={props.rCurrent} />
	// }
  // if ((checked)){
  //   message = <GraphSvg1 rValue={props.rCurrent} />
	// } 
  // else {
	// 	message = null
	// }

  // for(let i = 0; i<8;i++){
  //   masR[props.rCurrent] = props.rCurrent;
  // }
  // console.log(props.xCurrent);
  // console.log(props.rCurrent);
  // console.log(props.yCurrent);
  // console.log("");
  console.log(masR);

  return (
        <div styleName="graph-container" id='wrapper'>
          {image}         
          <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
          <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
        </div>
      

      );

  // if ((props.rCurrent)===-1){
  //   return (
  //     <div styleName="graph-container">
  //       <GraphSvgMinus1 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // } 

  // if ((props.rCurrent)===-2){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvgMinus2 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // } 

  // if ((props.rCurrent)===-3){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvgMinus3 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // } 

  // if ((props.rCurrent)===-4){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvgMinus4 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // } 
 
  // if ((props.rCurrent)===1){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvg1 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // }

  // if ((props.rCurrent)===2){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvg2 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // }


  // if ((props.rCurrent)===3){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvg3 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // }

  // if ((props.rCurrent)===4){
  //   return (
  //     <div styleName="graph-container">
        
  //       <GraphSvg4 rValue={props.rCurrent} />
  //       <Canvas canvasRef={pointsCanvasRef} alt="Интерактивная область графика (предыдущие точки)" />
  //       <Canvas canvasRef={currentCanvasRef} alt="Интерактивная область графика (текущая точка)" handleClick={handleClick} />
  //     </div>
  //   );
  // }
  
}

export default CSSModules(Graph, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });