import { Link, useNavigate } from 'react-router-dom';
import  styled  from 'styled-components';
import {  useContext  } from "react"
import { ToolContext } from '../ToolContext';


const HomeAllTools = () => {
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
                    <div>Name: {toolName}</div>
                    <ToolImage src={toolImageSrc} />
                    <div> 1 Hour : {priceOneHour}</div>
                    <div>1 Day: {priceOneDay} </div>

                    <Button onClick={(e)=>(e.preventDefault(), navigate(`/rent-tool/${_id}`))}>Rent!</Button>
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
export default HomeAllTools
