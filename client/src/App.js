import { render } from '@testing-library/react'
import React, {Component, useState, useEffect} from 'react'
import Header from "./Components/Header";
//import './output.css'

class Upload extends Component {

  state = {
    selectedFile: null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
    console.log(event.target.files[0])
  }

  fileUploadHandler = () => {
    
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
          <button onClick = {this.uploadFile.bind(this)} className="block py-2 pr-4 pl-3 md:p-0 text-white bg-blue-450 rounded px-30">Upload CSV File</button>
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
      <div className = 'container content-center p-60'>
      <Upload/>
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