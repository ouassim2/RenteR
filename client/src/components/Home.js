import  styled  from 'styled-components';
import { useState, useEffect, useContext  } from "react"
import { ToolContext } from './ToolContext';


const Home = () => {
  //Todo why does this component not rerendering when i click on home but before 
  // with no context / just state and fetch it was rerendering ?
  const {homeToolList, setHomeToolList} = useContext(ToolContext)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetch("/api/get-tools")
        const parsedData = await data.json()
        // console.log("  ~ parsedData", parsedData.result)

        setHomeToolList(parsedData.result)

      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
     {!homeToolList ? <h1>Loading...</h1>:
      <>
      <h1>Listings</h1>
      <ul>
      {homeToolList.map(({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id })=>{
        return(
          <ListingCard key={_id}>
            
           <div>Name: {toolName}</div> 
           <ToolImage src={toolImageSrc}/>
           <div> 1 Hour : {priceOneHour}</div> 
           <div>1 Day: {priceOneDay} </div> 
           <button>Rent!</button>
            
          </ListingCard>
        )      

      })}
      </ul>
   
      </>
      }
    </>
  )
}

const ListingCard = styled.div`
display: flex;

div{
  margin-right: 15px;
}
`

const ToolImage = styled.img`
  width:15px
`

export default Home
