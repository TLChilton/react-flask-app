import { render } from '@testing-library/react'
import React, {Component, useState, useEffect} from 'react'
import Header from "./Components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Plot from 'react-plotly.js';
import rd3 from 'react-d3-library';
import Papa from 'papaparse';

class Upload extends Component {
  state = {
    selectedFile: null,
    stockDataXValues: [],
    stockDataYValues: []
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data)
        for(var key in results.data){
          
        }
      },
    });
    console.log(event.target.files[0])

  }
  uploadFile()
  {
    document.getElementById("csv").click()
  }
    render()
    {
      return(
        <div>
          <input id = "csv" type ="file" /*onChange = {this.fileSelectedHandler}*/ class="hidden"/>
          <button /*onClick = {this.uploadFile.bind(this)}*/ className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30">Get Prediction</button>
        </div>
      )
      
    }
}

function FloatingLabelInput({ type, name, children }) {
  const [active, setActive] = React.useState(false);

  function handleActivation(e) {
    setActive(!!e.target.value);
  }

  return (
    <div className="relative border rounded mb-2 opacity-90 bg-gray-600 text-white border-white border-opacity-25">
      <input
        className={[
          "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
          active ? "pt-6" : ""
        ].join(" ")}
        id={name}
        name={name}
        type={type}
        onChange={handleActivation}
      />
      <label
        className={[
          "absolute top-0 left-0 flex items-center text-white text-opacity-50 p-2 transition-all duration-200 ease-in-out",
          active ? "text-xs" : "text-sm"
        ].join(" ")}
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  );
}

function App() {
  const [data,setData] = useState([{}])

  useEffect(() => {
    fetch("/team").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )

  }, [])
  const [startDate, setStartDate] = useState(new Date());
  return (
      
    <div>
      <Header/>
      <div  id = 'mainDiv' className = 'container content-center p-60'>
      <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">Peak Prediction</h1>
      <FloatingLabelInput name="ticker" type="text">Stock Ticker</FloatingLabelInput>
      <DatePicker className = "relative border rounded mb-2 opacity-90 bg-gray-600 text-white border-white border-opacity-25" selected={startDate} onChange={(date) => setStartDate(date)} />
      <Upload/>
      <div className="flex flex-wrap justify-center">
        <div className="px-4">
          <img src={require("./Components/assets/chart.png")} alt="..." className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
        </div>
      </div>
      </div>
      {(typeof data.team === 'undefined') ? (
        <p>...</p>
      ) : (
        data.team.map((team, i) =>(
          <p class = "hidden" key = {i}> {team}</p>
        ))
      )}
    </div>
  )
}

function TWbutton(){
  
  return(
    <button className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30">
      Upload CSV File
    </button>
  )
}
export default App;