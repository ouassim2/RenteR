import { useEffect, useState } from "react"
import  styled  from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"
import LoadingSpinner from "../LoadingSpinner";

const RentByBrand = () => {
    const { isAuthenticated } = useAuth0()

    const { id } = useParams()
    const navigate = useNavigate()
  
    const [toolsByBrand, setToolsByBrand] = useState(null)
  
    useEffect(() => {
      const fetchToolsByBrand = async () => {
        try {
          const data = await fetch(`/api/get-tools/brand/${id}`)
          const parsedData = await data.json()
  
          setToolsByBrand(parsedData.result)
        } catch (error) {
          console.log("  ~ error", error)
        }
      }
  
      fetchToolsByBrand()
    }, [id])


    return ( <>
    {!toolsByBrand ? <Loading> <LoadingSpinner fontSize="120"/> </Loading> : 
    <>
      {toolsByBrand.map(
        ({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {
          return (
            <Link to={`/tool/details/${_id}`} key={_id}>
              
                <ListingCard>
                <div><strong>Name: </strong>{toolName}</div>

                  <ToolImage src={toolImageSrc} />
                  <div><strong> 1 Hour </strong>: {priceOneHour}</div>
                    <div><strong>1 Day: </strong>{priceOneDay} </div>

                  {isAuthenticated ? 
                    <Button onClick={e =>[ e.preventDefault(), navigate(`/rent-tool/${_id}`) ]}>Rent!</Button>
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  height: 80vh;
`;
 
const ListingCard = styled.div`
  z-index: 10;
  border-radius: 15px;
  display: flex;
  align-items: center;
  /* margin-top: 25px; */
  font-size: larger;  
  padding: 0px 20px;

  :hover{
      background-color: #AD9F90;

    }


  div {
    z-index: 10;
    margin-right: 15px;
    width:220px;

  }

  `

const ToolImage = styled.img`
z-index: 10;
  width: 100px;
  height: 120px;
  object-fit: contain;
  margin-left: 25px;
  margin-right: 25px;
`
const Button = styled.button`
    z-index: 5;
    cursor: pointer;
    height: 50px;
    width:105px;
    font-size: medium;
    letter-spacing: .05em;
    background: black;
    border: none;
    border-radius: 5rem;
    color: white;

    &:active {
    transform: scale(0.95);
  }

  &:hover {
    background: #e4b34d;
  }
`
export default RentByBrand;