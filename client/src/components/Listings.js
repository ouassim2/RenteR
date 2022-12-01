import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

const Listings = () => {
  const { user, isAuthenticated } = useAuth0()
  const [listingInfo, setListingInfo] = useState(null);
  console.log("  ~ listingInfo", listingInfo)

  // use uuid maybee in the server to get the right tool on click
  useEffect(() => {
       
    if (isAuthenticated) {

      const postData = async () => {

        try {
          // getting all the tools from ouassim2 db
          const fetchTools = await fetch(`/api/get-tools/${user.nickname}`)
          const parsedTools = await fetchTools.json()

          // console.log("  ~ parsedTools", parsedTools)

          setListingInfo(parsedTools.userListings)

        } catch (error) {
          console.log("  ~ error", error)
        }
      }

      postData()

    }

  }, [isAuthenticated])

// 

  return (
    <Wrapper>
      { user && listingInfo?.length === 0 ? <h1>You currently have no listings !</h1> : null }
      { user && listingInfo ? 
      <>
        {
          listingInfo.map(({ _id, toolName, toolImageSrc, priceOneHour, priceOneDay }) => {

          return(

          <ToolWrapper key={_id}>

            <LeftColumn>
              <img src={user.picture} />
            </LeftColumn>

            <RightColumn>
              <ListingCard>
            
                <div>Name: {toolName}</div> 
                <ToolImage src={toolImageSrc}/>
                <div> 1 Hour : {priceOneHour}</div> 
                <div>1 Day: {priceOneDay} </div> 
             
              </ListingCard>
            </RightColumn>

          </ToolWrapper>

          )

          })
        }
      </>
      : <h1>Loading...</h1> } 
    </Wrapper>
  )
}

const Wrapper = styled.div`
height: 100vh;
`

const ListingCard = styled.div`
display: flex;

div{
  margin-right: 15px;
}
`
const ToolImage = styled.img`
  width:15px;
`

const ToolWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  border-bottom: 1px solid black;
`
const LeftColumn = styled.div`
  img {
    width: 60px;
    border-radius: 50%;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
`
const RightColumn = styled.div``


export default Listings
