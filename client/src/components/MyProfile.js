import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { CgProfile } from "react-icons/cg"
import bg from "../assets/bgnone.png"
import { useEffect, useState } from "react"

const MyProfile = () => {
  const { user, isAuthenticated } = useAuth0()
  const [profileInfo, setProfileInfo] = useState(null)

    console.log("profileInfo", profileInfo)
     
    useEffect(() => {
        if (isAuthenticated) {
            
            const fetchProfileInfo = async () => {
            try {

          const fetchInfo = await fetch(`/api/get-user-profile/${user.nickname}`)
          const parsedInfo = await fetchInfo.json()

          console.log("  ~ parsedInfo", parsedInfo)

          setProfileInfo(parsedInfo)

        } catch (error) {
          console.log("  ~ error", error)
        }
      }

      fetchProfileInfo()
    }
  }, [isAuthenticated])

  return (
    <ProfileWrapper>
        {!profileInfo || !user ? <h1>Loading...</h1> : 
        <>
        {profileInfo?.status === 200 && profileInfo?.userInfo?.profilePicture === undefined ? // if the user has not uploaded a picture go check auth0 github info instead

        user && user.picture ? // if user has a picture in his git hub show it (user is a github state from useAuth0 hook)
        <div>
          <img src={user.picture} alt="profile-picture" />
        </div>
        :  // if not show a default no pic icon
        <NoPic> <CgProfile cursor="pointer" size="200" color="white" /></NoPic>
      

      :   // else the user has  uploaded profil info (pic) show it
       <div>
         <img src={profileInfo?.userInfo?.profilePicture} alt="profile-picture" />
       </div>
       }
            {/*  the user has  uploaded profil info (bg) show it else show default bg*/}
      <BgImage src={profileInfo?.userInfo?.bgImage ? profileInfo?.userInfo?.bgImage : bg} alt="profile-picture-bg" />

      <Div1>
      { profileInfo?.status === 200 && profileInfo?.userInfo?.name === undefined ? // if the user has not uploaded any profil info (pic, name, bg) go check auth0 github info instead
        user?.nickname ? user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1) //if user has a picture in has a nickname in github show it (user is a github state from useAuth0 hook)
          : "User" // user has no nickname in github show string " user"

        //   else the user has  uploaded profil info (name) show it (the rest is just to uppercase the first letter)
          : profileInfo?.userInfo?.name.charAt(0).toUpperCase() + profileInfo?.userInfo?.name.slice(1)} 
      </Div1>

      <NavLink to="/new-tool">
        <button>New Tool</button>
      </NavLink>

      <NavLink to="/edit-profil">
        <button>Edit Profil</button>
      </NavLink>
      </>
        }
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  width: 100%;
  /* height: 700px; */
  /* border-right: 1px solid black; */

  div {
    img {
      position: absolute;
      top: 380px;
      border: 3px solid white;
      width: 200px;
      border-radius: 50%;
      margin: 15px;
    }
  }

  button {
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
  top: 380px;
  margin: 15px;
`
const BgImage = styled.img`
  width: 100%;
  height: 500px;
`

export default MyProfile
