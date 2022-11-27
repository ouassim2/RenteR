import {createContext, useState} from "react"

export const ToolContext = createContext(null)


const ToolProvider = ({ children }) => {

const [homeToolList, setHomeToolList] = useState(null)


    return ( 
    
    <ToolContext.Provider value={{ homeToolList, setHomeToolList }}>
        {children}
    </ToolContext.Provider> );
}
 
export default ToolProvider;