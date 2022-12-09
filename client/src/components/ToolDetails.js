import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { ToolContext } from "./ToolContext";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth0 } from "@auth0/auth0-react"


// displays details of each toolDetails when clicked on from homepage
const ToolDetails = () => {
  const { isAuthenticated } = useAuth0()

  const { id } = useParams();
  
  const { toolDetails, setToolDetails } = useContext(ToolContext);
  // console.log("  ~ toolDetails", toolDetails)

useEffect(() => {
  
  const fetchToolDetails = async () => {
    try {
      
      const data = await fetch(`/api/get-tool/${id}`)
      const parsedData = await data.json()
      // console.log("  ~ parsedData", parsedData.result)
      
      setToolDetails(parsedData.result)
      
    } catch (error) {
      console.log("  ~ error", error)
    }
  }
  
  fetchToolDetails()

}, [id, setToolDetails]);

  return (
    <Div>
      {!toolDetails ? <Loading> <LoadingSpinner fontSize="120"/> </Loading> : 
        <Wrapper>
          <div>
            <img src={toolDetails.toolImageSrc} alt={toolDetails.toolName} />
          </div>
          <ItemInfo>
            <h3>Tool name : <p>{toolDetails.toolName}</p></h3>
            <p>
              <strong>Price 1 Hour: </strong>
              {toolDetails.priceOneHour}
            </p>
            <p>
              <strong>Price 1 Day: </strong>
              {toolDetails.priceOneDay}
            </p>
            <p>
              <strong>Category: </strong>
              {toolDetails.toolCategorie}
            </p>
            <p>
              <strong>Brand: </strong>
              {toolDetails.brand}
            </p>

            {isAuthenticated ? 
              <Link to={`/rent-tool/${toolDetails._id}`}> <StyledButton> Rent ! </StyledButton> </Link>
              : null
            }
          </ItemInfo>
        </Wrapper>

      }
    </Div>
  );
};

const Div = styled.div`
 
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
`;
const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 500px 500px;
  justify-content: center;
  align-items: center;

div{
  
  img {
    height: 700px;
    width: 500px; 
    object-fit: contain;

    border-radius: 8px;
    margin-bottom: 20px;
    }
  }

  h3 {
    font-size: 25px;
    padding-bottom: 10px;
    color: #303636;
  }
  p {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 20px;
    color: #485151;
  }
`;
const StyledButton = styled.button`
  margin-top: 15px;
  background: black;
  border: none;
  border-radius: 5rem;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  color: white;
  cursor: pointer;
  font-size: medium;
  height: 3rem;
  letter-spacing: .05em;
  width: 10rem;

  &:hover {
    cursor: pointer;
    background: #e4b34d;
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ItemInfo = styled.div`
width: 500px;
margin-left: 40px;

h3{
  p{
    padding: 0px;
    font-size:xx-large;
  }
}
`


  
export default ToolDetails;
