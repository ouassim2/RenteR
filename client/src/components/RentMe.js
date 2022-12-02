import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const RentMe = () => {
  const { id } = useParams()
    // console.log(id);

  const [emailInfo, setEmailInfo] = useState(null)
  useEffect(() => {
      const fetchUserInfoAndPostEmail = async () => {
          try {
              const data = await fetch(`/api/get-tool/${id}`)
              const parsedData = await data.json()
              console.log(" parsedData", parsedData)
              console.log("  ~ parsedData", parsedData.result)
              
              setEmailInfo(parsedData.result)
              if(emailInfo){

                  console.log(emailInfo?.userName);
              }
        //       const sentEmail = await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        //           method: "POST",
        //           headers: {
        //               Accept: "application/json",
        //               "Content-Type": "application/json",
        //             },
        //             body:JSON.stringify( {service_id: 'service_v8i5c35',
        //     template_id: 'template_0u7yqxh',
        //     user_id: 'euZiL0IloCdjrvhF5',
        //     template_params: {
        //        "username": emailInfo.userName,
        //     }
        // })
        //   })

        // const emailResponse = await sentEmail.json()
        //   console.log(emailResponse);
        
      } catch (error) {
        console.log("  ~ error", error)
      }
    }

    fetchUserInfoAndPostEmail()
  }, [id])
// 
  return (
    <>
      <h1>The renting Page!</h1>
    </>
  )
}

export default RentMe
