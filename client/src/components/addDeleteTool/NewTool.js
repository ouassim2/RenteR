import { useContext, useState } from 'react';
import styled  from 'styled-components';
import FileBase64 from "react-file-base64"
import { useAuth0 } from "@auth0/auth0-react"
import { ToolContext } from '../ToolContext';

const NewTool = () => {

  const {setRefreshToolListOnAddition} = useContext(ToolContext)

  const {user, isAuthenticated} = useAuth0()
  
  const [formData, setFormData] = useState({})
  // console.log("  ~ formData", formData)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isAuthenticated){

      const postNewTool = async () => {
        
        const result = await fetch("/api/post-tool",{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:JSON.stringify({...formData })
        })
        if(result.status === 413){
          window.alert("Your files are too Powerful please choose a smaller size file!")
        } else if (result.status === 200){
          window.alert("Tool Added Successfully!")
          // when a tool gets added successfuly
          setRefreshToolListOnAddition(true)
        }
        
      }
      
      postNewTool()
      
    }
  }
  
    return ( 
    <>

    <BodyWrapper>
    <Wrapper>
          <h1>New Tool</h1>

          <form onSubmit={(e)=> handleSubmit(e)}>

            <MiniWrapper>
                <label>Email :</label>
                <input onChange={(e)=> setFormData({...formData, email: e.target.value}) } type='email' required />
            </MiniWrapper>

            <MiniWrapper>
              <label>Tool Categorie:</label>
              <select required onChange={(e) => setFormData({ ...formData, toolCategorie : e.target.value })}>
                <option value="">Pick a Categorie!</option>
                <option value="">-------------------</option>
                <option value="gardentool">Garden tool</option>
                <option value="plumbingtool">Plumbing tool</option>
                <option value="mechanictool">Mechanic tool</option>
                <option value="electriciantool">Electrician tool</option>
                <option value="constructiontool">Construction tool</option>
                <option value="wintertool">Winter tool</option>
              </select>

            </MiniWrapper>

            <MiniWrapper>
              <label>Tool name:</label>
              <input autoComplete='off' onChange={(e)=> setFormData({...formData, toolName: e.target.value, userName : user?.nickname ? user.nickname : "" }) } type="text" id="toolname" required />
            </MiniWrapper>

            <MiniWrapper>
              <label>Tool brand:</label>
              <input autoComplete='off' onChange={(e)=> setFormData({...formData, brand: e.target.value}) } type="text" id="toolname" required />
            </MiniWrapper>

            <MiniWrapper>
              <label>Price 1 Hour:</label>
              <input onChange={(e)=> setFormData({...formData, priceOneHour: e.target.value }) } type="number" id="Price1Hour" required />
            </MiniWrapper>

            <MiniWrapper>
              <label>Price 1 Day:</label>
              <input onChange={(e)=> setFormData({...formData, priceOneDay: e.target.value }) } type="number" id="Price1Day" required />
            </MiniWrapper>

            <MiniWrapper>
              <label>Tool image:</label>
              <FileBase64 multiple={ false } onDone={( { base64 } ) => setFormData({...formData, toolImageSrc: base64 })}/>
            </MiniWrapper>
           
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
`;


const Wrapper = styled.div`
  margin-top: 32px;
  width: 380px;
  height: 500px;
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
  select {
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
  background-color: goldenrod;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
      background: darkgoldenrod;
    }

  &:active {
    transform: scale(0.9);
  }
`;

const SubmitButton = styled.button`
  font-size: 15px;
  background: goldenrod;

  color: white;
  border-radius: 5px;
  padding: 8px 40px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
      background: darkgoldenrod;
    }

  &:active {
    transform: scale(0.9);
  }
`;
export default NewTool;