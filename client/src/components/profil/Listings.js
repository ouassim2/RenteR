import styled from "styled-components"
import { useAuth0 } from "@auth0/auth0-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"
import DeleteTool from "../addDeleteTool/DeleteTool"
import { ToolContext } from "../ToolContext"

const Listings = () => {

  const {refreshToolListOnDeletion, setRefreshToolListOnDeletion} = useContext(ToolContext)

  const { user, isAuthenticated } = useAuth0()
  const [listingInfo, setListingInfo] = useState(null);
  // console.log("  ~ listingInfo", listingInfo)

  // use uuid maybee in the server to get the right tool on click
  useEffect(() => {
       
    if (isAuthenticated) {

      const getData = async () => {

        try {
          // getting all the tools from ouassim2 db
          const fetchTools = await fetch(`/api/get-user-tool-listings/${user.nickname}`)
          const parsedTools = await fetchTools.json()

          // console.log("  ~ parsedTools", parsedTools)

          setListingInfo(parsedTools.userListings)

          setRefreshToolListOnDeletion(false) // we set back refreshTooList to false so it can change to true when we delete another tool
          
        } catch (error) {
          console.log("  ~ error", error)
        }
      }

      getData()

    }

  }, [isAuthenticated, refreshToolListOnDeletion])

// 

  return (
    <Wrapper>
      { user && listingInfo?.length === 0 ? <h1>You currently have no listings !</h1> : null }
      { user && listingInfo ? 
      <>
        {
          listingInfo.map(({ _id, toolName, toolImageSrc, priceOneHour, priceOneDay }) => {

          return(

       <Link to={`/tool/details/${_id}`} key={_id}>
       
            
          <ListingCard>

            <LeftColumn>
              <img src={user.picture} />
            </LeftColumn>

              <RightColumn>
            
              <div><strong>Name: </strong>{toolName}</div>
                    <ToolImage src={toolImageSrc} />
                    <div><strong> 1 Hour </strong>: {priceOneHour}</div>
                    <div><strong>1 Day: </strong>{priceOneDay}</div>
                    
                    <DeleteTool _id={_id}/>

              </RightColumn>

          </ListingCard>

          </Link>

          )

          })
        }
      </>
      : <Loading> <LoadingSpinner fontSize="120"/> </Loading> } 
    </Wrapper>
  )
}
const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  height: 80vh;
`;

const Wrapper = styled.div`
height: 100vh;
`

const RightColumn = styled.div`
  border-radius: 15px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* margin-top: 25px; */
  /* height: 300px; */
  font-size: larger;  
  padding: 0px 20px;
  height: 100px;

  /* box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); */

div{
  /* margin-right: 15px; */
  width:220px;
}
`
const ToolImage = styled.img`
 /* z-index: 10; */
  width: 100px;
  margin-left: 25px;
  margin-right: 25px;
`

const ListingCard = styled.div`
  /* margin-top: 30px; */
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  /* justify-content: center; */
  :hover{
      background-color: #AD9F90;

    }
`
const LeftColumn = styled.div`
  img {
    width: 60px;
    border-radius: 50%;
    /* margin-top: 15px; */
    margin-left: 15px;
    /* margin-right: 15px; */
  }
`

export default Listings
