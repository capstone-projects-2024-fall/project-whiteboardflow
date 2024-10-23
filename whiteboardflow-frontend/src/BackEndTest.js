import { useState, useEffect } from "react";

function BackEndTest(){

  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/hello").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return(
    <div>
      
      {(typeof data.test_data === 'undefined') ? (
        <p>loading</p>
      ) : (
        data.test_data.map((test, i) => (
          <p key={i}>{test}</p>
        ))
      )}

    </div>
  )
}

export default BackEndTest