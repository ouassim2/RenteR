// import { useContext } from "react";
// import { CurrentUserContext } from "./CurrentUserContext";
// import { COLORS } from './constants';
// import moment from 'moment';
// import { GoLocation } from "react-icons/go"
// import { AiOutlineCalendar } from "react-icons/ai"
// import cat from "../assets/catMechanic.png"
// import catbg from "../assets/catMechanicbg.png"
import styled from "styled-components";
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { CgProfile } from 'react-icons/cg';
import bg from '../assets/bgnone.png'

const MyProfile = () => {
const {user, isAuthenticated} = useAuth0()
    
    // const { currentUser } = useContext(CurrentUserContext);
    
    return (         
    
    
    <ProfileWrapper>

            {user && user.picture ?  <div><img src={user.picture}  alt="profile-picture"/></div>
            :
            <CgProfile cursor="pointer" size="35" color="white" />
            }

        {/* <div><img src={cat}  alt="profile-picture"/></div> */}
         
        <img src={bg}  alt="profile-picture-bg"/>
         
      <NavLink to="/new-tool"> <button>New Tool</button> </NavLink>   
  
         <Div1>
          { user?.nickname ? user.nickname : null}
         </Div1>

         {/* <Div2>
          { <> 
          <p>@{ "hello" }</p>{"hello" } </>}
         </Div2>
  
         <Div3>
          { "hello"}
         </Div3>
  
         <Div4>
          <GoLocation/> {"hello"} - <AiOutlineCalendar/> Joined {"hello"}
         </Div4>
  
         <Div5>
          <div>{"hello"} Following</div>  <div>{ "hello"} Followers</div> 
         </Div5>
          */}
         {/* <Div6>
          <div>Tweets</div>
          <div>Media</div>
          <div>Likes</div>
         </Div6> */}
         
    </ProfileWrapper> 
    
    );
}
 

const ProfileWrapper = styled.div`
width: 1000px;
/* height: 700px; */
border-right: 1px solid black;

    img{
        width: 1000px;
    }

    div{
        img{
            position: absolute;
            top: 200px;
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
        margin-top: 15px;
        font-size: large;
        border-radius: 15px;
        border: none;
        background-color: green;
        color: white;
        cursor: pointer;
                
    }



`
const Div1 = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    font-size: xx-large;
    font-weight: bold;
`
const Div2 = styled.div`
   margin-left: 30px;
   display: flex;
   p{
       color: darkgray;
    }
    
    div{
    color: darkgray;
    margin-left: 10px;
    padding: 2px 5px;
    border-radius: 5px;
    background: lightgray;
   }
`
const Div3 = styled.div`
 margin-left: 15px;
 margin-top: 10px;
`
const Div4 = styled.div`
 margin-top: 20px;
   margin-left: 15px;
   div{
    margin-left: 10px;
   }
`
const Div5 = styled.div`
display: flex;
 margin-top: 20px;
    margin-left: 15px;
    div{
        margin-right: 15px;
    }
`
const Div6 = styled.div`
margin-top: 40px;
display: flex;
justify-content: space-around;
color:green;
`


export default MyProfile;