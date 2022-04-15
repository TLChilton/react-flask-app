import { render } from '@testing-library/react'
import React, {Component, useState, useEffect} from 'react'
import Header from "./Components/Header";
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
          <input id = "csv" type ="file" onChange = {this.fileSelectedHandler} class="hidden"/>
          <button onClick = {this.uploadFile.bind(this)} className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30">Upload CSV File(s)</button>
        </div>
      )
      
    }
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

  return (
      
    <div>
      <Header/>
      <div  id = 'mainDiv' className = 'container content-center p-60'>
      <Upload/>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
      
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