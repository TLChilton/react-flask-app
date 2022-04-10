import { render } from '@testing-library/react'
import React, {Component, useState, useEffect} from 'react'
import Nav from './Components/Nav'
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
    <nav class="bg-white border-gray-200 sm:px-3 py-2.5 rounded dark:bg-gray-800">
          <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://www.paypal.com/" class="flex items-center">
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Paypal</span>
          </a>
          <div class="flex md:order-2">
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Try our model</button>
              <button data-collapse-toggle="mobile-menu-4" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Team</a>
              </li>
              <li>
                <a href="https://github.com/spewmaker/react-flask-app" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">GitHub</a>
              </li>
              <li>
                <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>
          </div>
          </div>
        </nav>

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