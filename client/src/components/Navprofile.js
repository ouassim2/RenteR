import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import { RiArrowDownSFill } from 'react-icons/ri';
import styled from "styled-components";
import { useState } from "react";
import LoginButton from "./auth0/LoginButton";
import LogoutButton from "./auth0/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react"

const Navprofile = () => {
const [isToggled, setIsToggled] = useState(false);

const {user, isAuthenticated} = useAuth0()

const navigate = useNavigate();
    
    return ( 
        <Wrapper onMouseEnter={()=>{setIsToggled(!isToggled)}} onMouseLeave={()=>{setIsToggled(!isToggled)}}>
            <UserProfilePic>

                {user && user.picture ? <img src={user.picture} alt="profile-picture" onClick={(()=>{navigate(`/profile/${user.nickname}`)})}/> 
                :
                <CgProfile cursor="pointer" size="35" color="white" />
                }
              <RiArrowDownSFill cursor="pointer" size="20" color="white"  /> 

            </UserProfilePic>

            {!isToggled ? null :
            <DropDownMenu >
                {!user ? null :
                <>
                <StyledLi onClick={(()=>{navigate(`/profile/${user.nickname}`)})}>Profile</StyledLi>
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

`

const DropDownMenu = styled.ul`
/* background-color: beige; */
/* display: flex; */
flex-direction: column;
/* margin-top: 10px; */
/* width: 400px; */
height: 0px; // check
/* padding: 0px 20px; */
/* -webkit-box-shadow: 5px 5px 15px 5px #000000;
box-shadow: 5px 5px 15px 5px #000000; */
`

const StyledLi = styled.li`
  width: 70px;
  color: white;
  padding: 10px 5px;
  /* border-radius: 5px; */
  cursor: pointer;
  background-color: black;
  /* border-radius: 15px; */
  z-index: 2;
  /* padding-right: 0px; */
  :hover {
    color: darkgray;
    transition: 0.3s ease-in-out;
  }
`


export default Navprofile;