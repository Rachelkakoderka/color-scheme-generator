import React, { useEffect, useState } from 'react';
import './App.css';


function App() {

 const [colors, setColors] = useState([])
 const [chosenColor, setChosenColor] = useState("0047AB")
 const [chosenScheme, setChosenScheme] = useState("complement")

  const button = document.getElementById("get-colors-btn")


  function getColors() :void{

    let url =  "https://www.thecolorapi.com/scheme?"
    let newColor = `hex=${chosenColor}`;
    let newScheme = `&mode=${chosenScheme}`
    fetch(url+newColor+newScheme)
  .then(res => res.json())
  .then(data => {
        let colorsArr = data.colors.map(((x:any) => {
          let color = x.hex.value
          return(color)}))
        setColors(colorsArr)
        console.log("gotColors")
        }
      )
 }

useEffect(getColors, [colors])

const  colorElementsTorender =  colors.map(x => (<div className='color-stripe' style={{backgroundColor: x}}></div>)
      )

 
console.log(colors)
console.log(chosenColor)


  return (
    <div className="App">
      <form>
        <input type="color" onChange={(e) => {setChosenColor(e.target.value.slice(1))}}/>
        <input type="text" placeholder='choosescheme'/>
        <button id="get-colors-btn" onClick= {getColors}>Choose scheme</button>
      </form>
      
      <div className='colors-board'>
        <h2>Color Scheme</h2>
        </div>
        <div className='color-palette'>{colorElementsTorender}</div>
    </div>
  );
}

export default App;
