import { render } from '@testing-library/react'
import React, {Component, useState, useEffect} from 'react'
import Header from "./Components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

function App() {
  const [data,setData] = useState([{}])
  const[stock, setStock] = useState('AMZN');
  function handleActivation(e) {
    setStock(e.target.value);
  }
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  const [startDate, setStartDate] = useState(new Date());
  
  return (
      
    <div>
      <Header/>
      <div  id = 'mainDiv' className = 'container content-center p-40 py-9'>
      <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">Peak Prediction</h1>
      <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">Enter a stock ticker (e.g. TSLA, GM, etc.)</h4>
      <div className="mb-3 pt-0">
      <input type="text" placeholder="Stock Ticker" onChange = {handleActivation} className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/></div>
      <h4 class="font-medium leading-tight text-2xl mt-0 mb-2 text-blue-600">Enter the starting date for your prediction</h4>
      <DatePicker className = "relative border rounded mb-2 opacity-90 bg-gray-600 text-white border-white border-opacity-25" selected={startDate} onChange={(date) => setStartDate(date)} />
      {console.log(startDate)}
      {console.log(stock.toString())}
      <button className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30" onClick={async () => await fetch('/predict?stock='+stock+'&todayTemp='+formatDate(startDate), {method: "POST",headers: {'Content-Type' : 'application/json'}})}>Get Prediction</button>
      <div className="flex flex-wrap justify-center">
        <div className="px-4">
          <img src={require("./Components/assets/chart.png")} alt="Loading" className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
        </div>
        <button className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30" 
          onClick={async () => await fetch('/getPlotCSV', {
            method: "GET",
            headers: {'Content-Type' : 'text/csv',
            },
          })
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(
                new Blob([blob]),
              );
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                'myplot.csv',
              );
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            })}>Download Prediction As CSV
        </button>
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

export default App;