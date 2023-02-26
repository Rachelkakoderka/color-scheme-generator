import React, { useEffect, useState } from 'react';
import './App.css';


function App() {

 const [colors, setColors] = useState<[]>([])
 const [chosenColor, setChosenColor] = useState<string>("0047AB")
 const [chosenScheme, setChosenScheme] = useState<string>("")

const schemesToChooseFrom : string[] = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "complement",
  "analogic-complement",
  "triad",
  "quad"
  ];

 const button = document.getElementById("get-colors-btn")



  function getColors() :void {
    
   
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
        }
      )
 }

useEffect(getColors, [colors])

const  colorElementsTorender =  colors.map(x => (<div className='color-stripe' style={{backgroundColor: x}}>{x}</div>)
      )
const inputSchemesOption = schemesToChooseFrom.map(x => (<option value={x}>{x}</option>)) 

 
//console.log(colors)
//console.log(chosenColor)


  return (
    <div className="App">
      
      
      <div className='colors-board'>
        <form>
          <div>
            <label htmlFor="color">Choose a color:</label> <br/>
            <input type="color" onChange={(e) => {setChosenColor(e.target.value.slice(1))}}/>
          </div>
          
          <div className='schemes-box'>
          <label htmlFor="schemes">Choose a scheme:    </label>
          <br/>
            <select id="schemes" name="schemes" onChange={(e) => setChosenScheme(e.target.value)}>
              {inputSchemesOption}
            </select>
          </div>
          
          <button id="get-colors-btn" onClick= {getColors}>Choose scheme</button>
        </form>        
      </div>

      <div className='color-palette'>{colorElementsTorender}</div>
    </div>
  );
}

export default App;
