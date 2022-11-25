// import { AiOutlineRetweet } from "react-icons/ai";
// import moment from 'moment';
// import { useContext } from "react";
// import { CurrentUserContext } from "./CurrentUserContext";
// import InteractionBar from "./InteractionBar";
import styled from "styled-components"
import cat from "../assets/catMechanic.png"
import catbg from "../assets/catMechanicbg.png"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

const Listings = () => {
  // const { userTweet } = useContext(CurrentUserContext)
  // const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  // console.log("  ~ user", user)

  useEffect(() => {
        // maybee use is authenticated instead of user to send data to db as soon as user isAuthenticated ?
      // to fix fetching not hapening as soon as user connect
    if (user) {

      const postData = async () => {

        try {
          // getting all the tools from ouassim2 db
          const fetchTools = await fetch(`/api/get-tool/${user.nickname}`)
          const parsedTools = await fetchTools.json()
          //todo: return an empty toolname key from the db so that means there are no tools for ouassim2 meaning we render no listing atm! in return
          console.log("  ~ parsedTools", parsedTools)

        } catch (error) {
          console.log("  ~ error", error)
        }
      }

      postData()

    }

  }, [])

  return (
    <>
      {/* { !userTweet ? <h1>Loading...</h1> :  */}
      <>
        {
          // userTweet.tweetIds.map(( tweetId )=>{

          // i love double destructuring! isnt it nice haha
          // const {id, author:{ avatarSrc, displayName, handle }, media, retweetFrom, status, timestamp} = userTweet.tweetsById[tweetId]

          // return(

          <TweetRetweetWrapper>
            <LeftColumn>
              <img src={cat} />
            </LeftColumn>

            <RightColumn>
              <RetweetDiv>{"yess"}</RetweetDiv>

              <NameHandleDiv>
                {
                  "ok"
                  /* <h2 onClick={()=> navigate(`/profile/${handle}`)}>{displayName}</h2>  <h5>@{handle} - {moment(timestamp).format("MMM Do")}</h5> */
                }
              </NameHandleDiv>

              <MediaOrStatusDiv>
                {
                  "hein"
                  /* { media[0] ? <img src={ media[0].url }/> :  <div>{status}</div> } */
                }
              </MediaOrStatusDiv>
            </RightColumn>
          </TweetRetweetWrapper>

          // )

          // })
        }
      </>
      {/* } */}
    </>
  )
}

const TweetRetweetWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  border-bottom: 1px solid black;
`
const LeftColumn = styled.div`
  img {
    width: 60px;
    border-radius: 50%;
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
  }
`
const RightColumn = styled.div``
const RetweetDiv = styled.div``
const NameHandleDiv = styled.div`
  display: flex;
  margin-top: 7px;
  height: 40px;

  h2 {
    cursor: pointer;
  }

  h5 {
    margin-left: 5px;
    margin-top: 9px;
    color: darkgray;
  }
`
const MediaOrStatusDiv = styled.div`
  img {
    width: 1000px;
    height: 600px;
    border-radius: 15px;
    margin-top: 15px;
  }

  div {
    margin-top: 10px;
    font-size: large;
  }
`

export default Listings
