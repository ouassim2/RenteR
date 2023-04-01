import  styled  from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"
import LoadingSpinner from "../LoadingSpinner";
import { useContext } from "react";
import { ToolContext } from "../ToolContext";

const RentByProfession = () => {

  const { isAuthenticated } = useAuth0()

  const navigate = useNavigate()

  const { filteredItems } = useContext(ToolContext)


  return (
    <>
      {!filteredItems ? <Loading> <LoadingSpinner fontSize="120"/> </Loading> : 
      <>
        {filteredItems.map(
          ({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {
            return (
              <Link to={`/tool/details/${_id}`} key={_id}>
                
                  <ListingCard>
                  <div><strong>Name: </strong>{toolName}</div>
                    <ToolImage src={toolImageSrc} />
                    <div><strong> 1 Hour </strong>: {priceOneHour}</div>
                    <div><strong>1 Day: </strong>{priceOneDay} </div>

                    {isAuthenticated ? 
                      <Button onClick={e =>[ e.preventDefault(), navigate(`/rent-tool/${_id}`)] }>Rent!</Button>
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

export default RentByProfession
