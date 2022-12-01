import { useEffect, useState } from "react"
import  styled  from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"

const RentByProfession = () => {
  
  const { isAuthenticated } = useAuth0()

  const { id } = useParams()
  const navigate = useNavigate()

  const [toolsByProfession, setToolsByProfession] = useState(null)

  useEffect(() => {
    const fetchToolsByProfession = async () => {
      try {
        const data = await fetch(`/api/get-tools/profession/${id}`)
        const parsedData = await data.json()
        // console.log("  ~ parsedData", parsedData.result)

        setToolsByProfession(parsedData.result)
        // console.log(parsedData.result)
      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchToolsByProfession()
  }, [])

  return (
    <>
      {!toolsByProfession ? <h1>Loading...</h1> : 
      <>
        {toolsByProfession.map(
          ({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {
            return (
              <Link to={`/tool/details/${_id}`} key={_id}>
                
                  <ListingCard>
                    <div>Name: {toolName}</div>
                    <ToolImage src={toolImageSrc} />
                    <div> 1 Hour : {priceOneHour}</div>
                    <div>1 Day: {priceOneDay} </div>

                    {isAuthenticated ? 
                      <Button onClick={e =>( e.preventDefault(), navigate(`/rent-tool/${_id}`) )}>Rent!</Button>
                      : null
                    }
                  </ListingCard>
                  
              </Link>
            )
        }
            )} 
      
      </>
      }
    </>
  )
}
const ListingCard = styled.div`
  z-index: 10;
  display: flex;
  width: 50%;
  div {
    z-index: 10;
    margin-right: 15px;
  }

  `

const ToolImage = styled.img`
z-index: 10;
  width: 100px;
`
const Button = styled.button`
    z-index: 10;
    cursor: pointer;
    height: 50px;
`

export default RentByProfession
