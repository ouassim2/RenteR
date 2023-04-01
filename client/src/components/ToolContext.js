// import { useAuth0 } from "@auth0/auth0-react"
import { createContext, useEffect, useState } from "react"

export const ToolContext = createContext(null)

const ToolProvider = ({ children }) => {
  // Auth0
  // const {user, isAuthenticated} = useAuth0()

  // Home component states
  const [homeToolList, setHomeToolList] = useState(null)
  
  // ToolDetails big picture and more tool details
  const [toolDetails, setToolDetails] = useState(null)

  // when the user change his name, profil pic or background pic
  const [profileInfo, setProfileInfo] = useState(null)

  // when you press enter or click on the search bar this is the result displayed
  const [filteredItems, setFilteredItems] = useState([]);  


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



  return (
    <ToolContext.Provider value={{ homeToolList, setHomeToolList, toolDetails, setToolDetails, refreshToolListOnDeletion, setRefreshToolListOnDeletion, refreshToolListOnAddition, setRefreshToolListOnAddition, filteredItems, setFilteredItems, profileInfo, setProfileInfo  }}>
      {children}
    </ToolContext.Provider>
  )
}

export default ToolProvider
