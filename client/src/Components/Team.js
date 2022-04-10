import React, {Component, useState, useEffect} from 'react'
const Team = () => {

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
            <p className='text-blue-450' key = {i}> {team}</p>
          ))
        )}
      </div>
    )
}
export default Team