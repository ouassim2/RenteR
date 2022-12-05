import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import styled from "styled-components"
import Bot from "./Bot"
import LoadingSpinner from "./LoadingSpinner"

const RentMe = () => {
  // const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID
  // const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  // const userId = process.env.REACT_APP_EMAILJS_USER_ID

  const { user, isAuthenticated } = useAuth0()
  const { id } = useParams()
  const [emailInfo, setEmailInfo] = useState(null)
  const [rentalChoice, setRentalChoice] = useState(null);
  const [showChat, setShowChat] = useState(false);
  
  // console.log("showChat", showChat)

  useEffect(() => {
    const fetchEmail = async () => {

      try {
        const data = await fetch(`/api/get-tool/${id}`)
        const parsedData = await data.json()

        setEmailInfo(parsedData.result)
      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchEmail()

  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (user && rentalChoice && emailInfo) {
      console.log("user INSIDE", user)
      console.log("rentalChoice", rentalChoice)
      console.log("emailInfo", emailInfo)
      const sentEmail = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_nqx5lzm",
            template_id: "template_er855fq",
            user_id: "nJ4gM4fTwdKh8e5p5",
            template_params: {
              targetUsername: emailInfo.userName,
              targetEmail: emailInfo.email,
              targetToolName: emailInfo.toolName,
      
              fromUsername: user.nickname,
              fromUserRentalDuration : rentalChoice.rentalDuration,
              fromUserRentalTotal : rentalChoice.rentalTotal,
              fromUserPicture: user.picture,

            }
          }),
        }
      )
         const statusCode = await sentEmail.status
            if(statusCode === 200){
              window.alert("Request Sent Successfully!")
              setShowChat(true)
            }
    }
  }

  return (
    <>
      <Div>
        {!emailInfo ? <Loading> <LoadingSpinner fontSize="120"/> </Loading> : 
          <>
            <h1>You are renting !</h1>
            <Wrapper>
              <div>
                <img src={emailInfo.toolImageSrc} alt={emailInfo.toolName} />
              </div>
              <ItemInfo>
                <h3>
                  Tool name : <p>{emailInfo.toolName}</p>
                </h3>
                <p>
                  <strong>Price 1 Hour: </strong>
                  {emailInfo.priceOneHour}
                </p>
                <p>
                  <strong>Price 1 Day: </strong>
                  {emailInfo.priceOneDay}
                </p>
                <p>
                  <strong>Category: </strong>
                  {emailInfo.toolCategorie}
                </p>
                <p>
                  <strong>ID: </strong>
                  {emailInfo._id}
                </p>
              </ItemInfo>
            </Wrapper>
            <h1>Select rental duration</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
            <MiniWrapper>
              <div>
                <label>  <span>Rent for:</span> 1 hour</label>
                <input autoFocus required value={emailInfo.priceOneHour} onClick={e => setRentalChoice({rentalTotal : e.target.value, rentalDuration : "1 Hour"})} name="radio-family" type="radio"></input>
              </div>
              <div>
                <label> <span>Rent for:</span> 1 day</label>
                <input required value={emailInfo.priceOneDay} onClick={e => setRentalChoice({rentalTotal : e.target.value, rentalDuration : "1 Day"})} name="radio-family" type="radio"></input>
              </div>
            </MiniWrapper>

             <p>{isAuthenticated ? <StyledButton> Rent ! </StyledButton> : null} </p> 
            </form>
          </>
        }
      </Div>
        <Bot/>
      {/* {!showChat ? <h1>Chat Loading!</h1> :
      } */}
    </>
  )
}

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  height: 80vh;
`;

const MiniWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 250px;
  justify-content: center;
  align-items: center;
  margin-left: 100px;

  div{
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    /* padding-top: 20px; */
    color: #303636;


    span{
      color: #485151;
      font-weight: bold;
      
    }
  }
`

const Div = styled.div`
  h1 {
    text-align: center;
    margin-top: 25px;
    margin-bottom: 50px;
  }

  form{
    p{
      margin-top: 40px;
      margin-bottom: 50px;
      display: flex;
      /* grid-template-columns: 250px ; */
      justify-content: center;
      /* align-items: center; */
      /* margin-left: 100px; */
    }
  }
`
const Wrapper = styled.div`
  /* z-index: 1; */
  /* height: 100vh; */
  /* margin-top: 50px; */

  /* background: #f0ead6; */

  display: grid;
  grid-template-columns: 500px 500px;
  justify-content: center;
  align-items: center;
  div {
    img {
      height: 500px;
      width: 500px;
      /* height: fit-content;
    width: fit-content;
    transform: scale(0.5); */

      border-radius: 8px;
      margin-bottom: 20px;
      /* margin-top: 50px; */
      /* transform: scale(0.8); */
      /* box-shadow: 0 0 8px 8px white inset; */
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
  }

  h3 {
    font-size: 25px;
    padding-bottom: 10px;
    color: #303636;
  }
  p {
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 20px;
    color: #485151;
  }
`
const ItemInfo = styled.div`
  width: 500px;
  margin-left: 40px;

  h3 {
    p {
      padding: 0px;
      font-size: xx-large;
    }
  }
`
const StyledButton = styled.button`
  margin-top: 15px;
  background: black;
  border: none;
  border-radius: 5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  color: white;
  cursor: pointer;
  font-size: medium;
  height: 3rem;
  letter-spacing: 0.05em;
  width: 10rem;

  /* &:disabled {
    background-color: grey;
  } */

  &:hover {
    cursor: pointer;
    background: #e4b34d;
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`
export default RentMe
