import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ToolContext } from "../ToolContext";
import LoadingSpinner from "../LoadingSpinner";

// search through product inventory. state/props passed from app
const SearchBar = () => {
  const [value, setValue] = useState(""); // to store the search querry

  const { homeToolList } = useContext(ToolContext)
  // console.log("  ~ homeToolList", homeToolList)


  const handleSelect = () => {
    window.alert("should bring to a new matching search query page!"); // if a user type fitbit hit enter should go to a new page with all the fitbit
  };

  const handlesubmit = (e) => { // prevent the default behavior of the page reload for the form onSubmit event handler
    e.preventDefault()
  };

  let ResultArray = []
  let slicedResultArray = []

  if (homeToolList && value.length >= 1) { // we make sure the filtering starts only after 2 inputs have registered and we wait for our prop to load(the fetch)

    homeToolList.forEach(({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {
      let upperCaseUserInput = value.toUpperCase() // to case incentise 
      let upperCaseToolName = toolName.toUpperCase() // to case incentise 

      let result = upperCaseToolName.includes(upperCaseUserInput) // if the user input = toolName result will be true

      if (result ) { // we check if result is true  
        ResultArray.push({ _id, toolName, priceOneHour, toolImageSrc }) // we push the filtered new object to our array 

        slicedResultArray = ResultArray.slice(0, 5) // we finally make sure to get a shallow copy with only 5 noneFilteredItems 

      }

    })

  }


  return (
    <Wrapper>
      <form onSubmit={(e) => handlesubmit(e)}>

        {!homeToolList ? (
           <Loading> <LoadingSpinner fontSize="30"/> </Loading>
         ) : ( 
          <>
            <Input
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSelect(event.target.value);
                }
              }}
              placeholder="Search"
            ></Input>

            <Ok onClick={(event) => handleSelect(event.target.value)}>
              Search
            </Ok>

            <StyledUl>
              {slicedResultArray.map(({ toolName, toolImageSrc, priceOneHour, priceOneDay, _id }) => {

                let upperCaseUserInput = value.toUpperCase() // to case incentise 
                let upperCaseToolName = toolName.toUpperCase() // to case incentise 

                return (
                  // a clickable link to go to each tool by its id
                  <LinkItem key={_id} to={`/tool/details/${_id}`} onClick={() => setValue("")} >

                    <MiniWrapper>

                      <ToolImage src={toolImageSrc} alt="mini-ToolImages" />
                      <StyledLi>
                        {toolName.slice(
                          0,
                          upperCaseToolName.indexOf(upperCaseUserInput) + value.length
                        )}

                        <span>
                          {toolName.slice(
                            upperCaseToolName.indexOf(upperCaseUserInput) + value.length
                          )}
                        </span>
                        <p>Price : {priceOneHour}</p>

                      </StyledLi>

                    </MiniWrapper>

                  </LinkItem>
                );
              })}
            </StyledUl>
          </>
        )}
      </form>
    </Wrapper>
  );
};

const Loading = styled.div`
  display: flex;
  justify-content: center;

  font-size: 15px;
`;

const Wrapper = styled.div`
width: 280px;
z-index: 10;

  input {
    width: 200px;
    
  }

  h1 {
    color: white;
  }
`;
const MiniWrapper = styled.div`
display: flex;
border-radius: 5px;
`
const ToolImage = styled.img`
width: 80px;
background-color: blue;
border-radius: 5px;
z-index: 10;
`
const StyledUl = styled.ul`
    background-color: beige;
    display: flex;
    flex-direction: column;
  margin-top: 10px;
  height: 0; // check
  padding: 0px 20px;


  p {
    color: white;
    font-style: italic;
    span {
      color: #000000;
      font-weight: 100;
    }
  }

`;

const StyledLi = styled.li`
  width: 100%;
  color: white;
  padding: 10px 30px;
  border-radius: 5px;

  cursor: pointer;
  background-color: #d0b180;
  z-index: 2;

  :hover{
  background-color: #d8be97;
  }

`;

const Input = styled.input`
  width: 200px;
  outline: none;
  margin-top: 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 0 10px;

`;

const Ok = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }
`;

const LinkItem = styled(NavLink)`
text-decoration: none;
`
export default SearchBar;
