import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import { RiArrowDownSFill } from 'react-icons/ri';
import styled from "styled-components";
import { useContext, useState } from "react";
import LoginButton from "../auth0/LoginButton";
import LogoutButton from "../auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react"
import { ToolContext } from "../ToolContext";

const Navprofile = () => {
const [isToggled, setIsToggled] = useState(false);

const {user, isAuthenticated} = useAuth0()

const { profileInfo } = useContext(ToolContext)
// console.log("~~~TCL: profileInfo", profileInfo)


const navigate = useNavigate();
    
    return ( 
        <Wrapper onMouseEnter={()=>{setIsToggled(!isToggled)}} onMouseLeave={()=>{setIsToggled(!isToggled)}}>
           
            <UserProfilePic >
                {
                profileInfo?.userInfo?.profilePicture ? // if user changed his profile pic show it
                <>
                <img src={profileInfo.userInfo.profilePicture} alt="profile" onClick={ () =>{navigate(`/profile/${user.nickname}`)} }/>
                <RiArrowDownSFill cursor="pointer" size="20" color="white"  /> 
                </>
                
                :                
                user?.picture ? // if user has a picture on his connected account show it (user is a state from useAuth0 hook)
                <>
                <img src={user.picture} alt="your-avatar" onClick={ () =>{navigate(`/profile/${user.nickname}`)} }/> 
                <RiArrowDownSFill cursor="pointer" size="20" color="white"  /> 
                </>
               
                : // if not show a default no pic icon
                <div>
                  <CgProfile cursor="pointer" size="35" color="white" />
                  <RiArrowDownSFill cursor="pointer" size="20" color="white"  /> 
                </div>

                }

            </UserProfilePic>

            {!isToggled ? null : 
            <DropDownMenu >
                {!isAuthenticated ? null :
                <>
                <StyledLi onClick={ ()=>{navigate(`/profile/${user.nickname}`)} }>Profile</StyledLi>
                </>
                }
                
                <StyledLi>
                    <LoginButton/>
                    <LogoutButton/>
                </StyledLi>
            </DropDownMenu>
            }

        </Wrapper>
     );
}
 

const Wrapper = styled.div`
img{
    width:35px;
    border-radius: 50%;
    cursor: pointer;
    
  }
  `
const UserProfilePic = styled.div`
width: 70px;
  img{
  width:40px
  }
  div{
    /* display:flex; */
  }

`

const DropDownMenu = styled.ul`
flex-direction: column;
height: 0px; // check
`

const StyledLi = styled.li`
  width: 70px;
  color: white;
  padding: 10px 5px;
  cursor: pointer;
  background-color: black;
  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }
  `


export default Navprofile;