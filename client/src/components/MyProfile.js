import styled from "styled-components";
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { CgProfile } from 'react-icons/cg';
import bg from '../assets/bgnone.png'

const MyProfile = () => {
const {user, isAuthenticated} = useAuth0()
    
    return (         
    
    <ProfileWrapper>

            {user && user.picture ?  <div><img src={user.picture}  alt="profile-picture"/></div>
            :
           <NoPic> <CgProfile cursor="pointer" size="200" color="white" /> </NoPic> 
            }

         
        <BgImage src={bg}  alt="profile-picture-bg"/>


         <Div1>
          { user?.nickname ? user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1) : null} 
         </Div1>
         
        <NavLink to="/new-tool"> <button>New Tool</button> </NavLink>   
  

    </ProfileWrapper> 
    
    );
}
 

const ProfileWrapper = styled.div`
width: 100%;
/* height: 700px; */
/* border-right: 1px solid black; */

    div{
        img{
            position: absolute;
            top: 380px;
            border: 3px solid white;
            width: 200px;
            border-radius: 50%;
            margin: 15px;
        }
    }

    button{
        height: 40px;
        padding: 0px 10px;
        /* margin-left: 890px; */
        margin-top: 85px;
        margin-left: 65px;
        font-size: large;
        border-radius: 15px;
        border: none;
        background-color: green;
        color: white;
        cursor: pointer;
                
    }

`
const Div1 = styled.div`
    /* margin-top: 20px; */
    top: 500px;
      position: absolute;
    margin-left: 220px;
    font-size: xx-large;
    font-weight: bold;
    color: white;
`
const NoPic = styled.div`
    position: absolute;
    top: 200px;
    margin: 15px;
`
const BgImage = styled.img`
   
    width: 100%;
    height: 500px 
    
`

export default MyProfile;