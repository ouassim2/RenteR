import { useEffect } from "react"

const App = () => {

  useEffect(() => {
    const fetchData = async () => {

      try {
        const data = await fetch("/api/get-tools")
        const parsedData = await data.json()
        console.log("  ~ parsedData", parsedData)

      } 
      catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchData()

  }, [])

  return <div><h1>hello</h1></div>
}

export default App;
