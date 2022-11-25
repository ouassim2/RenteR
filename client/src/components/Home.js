import { useEffect, useState } from "react"
import  styled  from 'styled-components';

const Home = () => {
  const [data, setData] = useState(null)
  // console.log("  ~ data", data)
  // auth0  returns an object auto integration doesnt work
  // can destruc. isAutenticated key (has true or false) from the useAuth0 hook!

  //todo the info created from ouassim2 are here by default since we loop through the big Tools3 collection!
  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetch("/api/get-tools")
        const parsedData = await data.json()
        // console.log("  ~ parsedData", parsedData.result)

        setData(parsedData.result)
      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
     {!data ? <h1>Loading...</h1>:
      <>
      <h1>Listings</h1>
      <ul>
      {data.map(({toolName,toolImageSrc,priceOneHour,priceOneDay,toolId})=>{
        return(
          <ListingCard key={toolId}>
            
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
