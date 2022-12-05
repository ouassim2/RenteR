import { Link, useNavigate } from 'react-router-dom';
import  styled  from 'styled-components';
import {  useContext  } from "react"
import { ToolContext } from '../ToolContext';
import { useAuth0 } from "@auth0/auth0-react"



const HomeAllTools = () => {
  const { isAuthenticated } = useAuth0()

    const {homeToolList} = useContext(ToolContext)
    const navigate = useNavigate()

  return (
    <Wrapper>
      <h1>Listings</h1>
      <ul>
        {homeToolList.map(
          ({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {
            return (
              <Link to={`/tool/details/${_id}`} key={_id}>
                
                  <ListingCard>
                    <div><strong>Name: </strong>{toolName}</div>
                    <div><ToolImage src={toolImageSrc} /></div>
                    <div><strong> 1 Hour </strong>: {priceOneHour}</div>
                    <div><strong>1 Day: </strong>{priceOneDay} </div>

                  {isAuthenticated ? 
                    <Button onClick={(e)=>(e.preventDefault(), navigate(`/rent-tool/${_id}`))}>Rent!</Button>
                    : null
                  }
                  </ListingCard>
                  
              </Link>
            )
          }
        )}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
h1{
  z-index: 10;
  margin-top: 20px;
  margin-bottom: 20px;
}
`

const ListingCard = styled.div`
  z-index: 10;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  height: 300px;
  font-size: larger;  
padding: 0px 75px;
  /* box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); */
    :hover{
      background-color: #AD9F90;

    }
    /* &:active {
    transform: scale(0.95);
  } */
      div {
        z-index: 10;
        /* margin-right: 80px; */
    width:200px;

      }

  `

const ToolImage = styled.img`
z-index: 10;
  width: 100px;
  margin-left: 25px;
  margin-right: 25px;
`
const Button = styled.button`
    z-index: 10;
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
      background: goldenrod;
    }
`
export default HomeAllTools
