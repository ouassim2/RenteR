import styled  from 'styled-components';

const Newtool = () => {

//todo: fill out the form here and the server will patch the db with the info here 
// e.target.value everything onChange of the inputs need to add the rest of keys in input as well
      const postNewTool = async () => {

    const result = await fetch("/api/post-tools",{
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body:JSON.stringify({ 
          // toolCategorie: 
          //   toolName:
          //   toolId:
          //  priceOneHour:
          //  priceOneDay:
          // toolImageSrc:
            })
          })

          const parsedData = await result.json()
          const { userName } = parsedData.objectToDb
          console.log("  ~ userName", userName)

        }

        // postNewTool()


    return ( 
    <>

    <BodyWrapper>
    <Wrapper>
          <h1>New Tool</h1>
          <form >
            <MiniWrapper>
              <label>Tool Categorie:</label>
              <input autoFocus type="text" id="toolcategorie" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Tool name:</label>
              <input type="text" id="toolname" required />
            </MiniWrapper>
            {/* <MiniWrapper>
              <label>Tool brand:</label>
              <input type="text" id="toolbrand" required />
            </MiniWrapper> */}
            <MiniWrapper>
              <label>Price 1 Hour:</label>
              <input type="number" id="Price1Hour" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Price 1 Day:</label>
              <input type="number" id="Price1Day" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Tool image:</label>
              {/* implement base 64 send to server */}
              <input type="number" id="Toolimage" required />
            </MiniWrapper>
            {/* <MiniWrapper>
              <label>Email address:</label>
              <input type="email" id="email" required />
            </MiniWrapper>
            <MiniWrapper>
              <label>Phone number:</label>
              <input type="tel" id="phone" required />
            </MiniWrapper> */}
            <footer>
              <ClearButton type="reset">Clear</ClearButton>
              <SubmitButton type="submit">Submit</SubmitButton>
            </footer>
          </form>
        </Wrapper>
        </BodyWrapper>


    </> );
}
 
const BodyWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  /* background-color: #f0ead6; */
`;

const Wrapper = styled.div`
  margin-top: 32px;
  width: 380px;
  height: 450px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  h1 {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }

  input {
    border: 1px inset lightgray;
    border-radius: 3px;
    margin-top: 5px;
    width: 170px;
    height: 20px;
  }

  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
`;

const MiniWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  color: #555555;
`;

const ClearButton = styled.button`
  font-size: 15px;
  background-color: #023f05;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #326841;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const SubmitButton = styled.button`
  font-size: 15px;
  background: #daa520;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #eec64f;
  }

  &:active {
    transform: scale(0.9);
  }
`;
export default Newtool;