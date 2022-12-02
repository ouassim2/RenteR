import { createContext, useEffect, useState } from "react"

export const ToolContext = createContext(null)

const ToolProvider = ({ children }) => {
  // Home component states
  const [homeToolList, setHomeToolList] = useState(null)
  
  useEffect(() => {

    const fetchAllTools = async () => {
      try {
        const data = await fetch("/api/get-tools")
        const parsedData = await data.json()
        // console.log("  ~ parsedData", parsedData.result)

        setHomeToolList(parsedData.result)

      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchAllTools()

  }, [])

  // ToolDetails component states
  const [toolDetails, setToolDetails] = useState(null)

  

  
  return (
    <ToolContext.Provider value={{ homeToolList, setHomeToolList, toolDetails, setToolDetails,  }}>
      {children}
    </ToolContext.Provider>
  )
}

export default ToolProvider
