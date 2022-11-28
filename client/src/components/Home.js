import  styled  from 'styled-components';
import {  useContext  } from "react"
import { ToolContext } from './ToolContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  //Todo why does this component not rerendering when i click on home but before 
  // with no context / just state and fetch it was rerendering ?
  const {homeToolList} = useContext(ToolContext)

  const navigate = useNavigate()

  return (
    <>
     {!homeToolList ? <h1>Loading...</h1>:
      <>
      <h1>Listings</h1>
      <ul>
      {homeToolList.map(({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id })=>{
        return(

        <Link to={`/tool/details/${_id}`} key={_id}> 
            <ListingCard>
              
              <div>Name: {toolName}</div> 
              <ToolImage src={toolImageSrc}/>
              <div> 1 Hour : {priceOneHour}</div> 
              <div>1 Day: {priceOneDay} </div> 

            <Link to={`/rent-tool/${_id}`}> <button >Rent!</button> </Link>
            
            </ListingCard>

        </Link>
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
/* z-index: 1; */
div{
  margin-right: 15px;
}


`

const ToolImage = styled.img`
  width:15px
`

export default Home
