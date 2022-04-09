import React, {useState, useEffect} from 'react'

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
      {(typeof data.team === 'undefined') ? (
        <p>...</p>
      ) : (
        data.team.map((team, i) =>(
          <p key = {i}> {team}</p>
        ))
      )}
    </div>
  )
}

export default App;