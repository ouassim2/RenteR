import { useState } from 'react';
import styled  from 'styled-components';
import FileBase64 from "react-file-base64"
import { useAuth0 } from "@auth0/auth0-react"

const EditProfile = () => {
    const {user, isAuthenticated} = useAuth0()

    const [formData, setFormData] = useState({})
    
    const handleSubmit = (e) => {
      e.preventDefault()
      
      if (isAuthenticated){
  
        const editUserInfo = async () => {
          
          const result = await fetch(`/api/edit-profile/${user.nickname}`,{
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body:JSON.stringify({...formData })
          })
          if(result.status === 413){
            window.alert("Your files are too Powerful please choose a smaller size file!")
          } else if (result.status === 200){
            window.alert("Your profile was edited successfully!")
          }
          
        }
        
        editUserInfo()
        
      }
    }
    return ( 
    
    <>
    
    <BodyWrapper>
        <Wrapper>
            <h1>Edit Profile</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>

            <MiniWrapper>
                <label>Name:</label>
                <input autoComplete='off' onChange={(e)=> setFormData({...formData, name: e.target.value, }) } type="text" id="name"  />
            </MiniWrapper>

            <MiniWrapper>
                <label>Profile picture:</label>
                <FileBase64 multiple={ false } onDone={( { base64 } ) => setFormData({...formData, profilePicture: base64 })}/>
            </MiniWrapper>

            <MiniWrapper>
                <label>Background image:</label>
                <FileBase64 multiple={ false } onDone={( { base64 } ) => setFormData({...formData, bgImage: base64 })}/>
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
  height: 350px;
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
    background-color: darkgoldenrod;
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
    background-color: darkgoldenrod;
  }

  &:active {
    transform: scale(0.9);
  }
`;
export default EditProfile;