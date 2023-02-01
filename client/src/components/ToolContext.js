import { createContext, useEffect, useState } from "react"

export const ToolContext = createContext(null)

const ToolProvider = ({ children }) => {
  // Home component states
  const [homeToolList, setHomeToolList] = useState(null)
  
  
  // refresh tool listing on Addition of a tool in newtool
  const [refreshToolListOnAddition, setRefreshToolListOnAddition] = useState(false)

  // refresh tool listing on deletion of a tool in DeleteTool
  const [refreshToolListOnDeletion, setRefreshToolListOnDeletion] = useState(false)

  
  useEffect(() => {

    const fetchAllTools = async () => {
      try {
        const data = await fetch("/api/get-tools")
        const parsedData = await data.json()
        // console.log("  ~ parsedData", parsedData.result)

        setHomeToolList(parsedData.reversedArray)

        // put back the state to initial after a tool has been added in Newtool = false 
        setRefreshToolListOnAddition(false)
      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchAllTools()

    
  }, [refreshToolListOnAddition, refreshToolListOnDeletion])

  // ToolDetails component states
  const [toolDetails, setToolDetails] = useState(null)

  
  return (
    <ToolContext.Provider value={{ homeToolList, setHomeToolList, toolDetails, setToolDetails, refreshToolListOnDeletion, setRefreshToolListOnDeletion, refreshToolListOnAddition, setRefreshToolListOnAddition  }}>
      {children}
    </ToolContext.Provider>
  )
}

export default ToolProvider
