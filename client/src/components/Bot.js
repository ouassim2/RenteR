import styled from "styled-components"

const Bot = () => {
  const messageInput = document.querySelector("#user-input")
  const conversationElem = document.querySelector("#conversation-container")

  // updateConversation expects an object with 'user' and 'text'
  const updateConversation = (message) => {
    const { author, text } = message
    const messageElem = document.createElement("p")

    messageElem.classList.add("message", author)
    messageElem.innerHTML = `<span>${text}</span>`
    conversationElem.appendChild(messageElem)
    conversationElem.scrollTop = conversationElem.scrollHeight

    if (author === "user") messageInput.value = ""
  }

  const sendMessage = (e) => {
    e.preventDefault()

    const message = { author: "user", text: messageInput.value }
    updateConversation(message)

    fetch(`/bot-message?text=${message.text}`)
      .then((res) => res.json())
      .then((data) => {
        updateConversation(data.message)
      })
  }

  return (
    <Wrapper>
      <ChatApp>
        <ChatAppHeader>
          <h2>Chat</h2>
        </ChatAppHeader>
        <ChatAppContent>
          <Form onSubmit={(e) => sendMessage(e)} autoComplete="off">
            <UserFormLabel htmlFor="user-input">Message the bot</UserFormLabel>
            <UserFormInput
              name="user-input"
              id="user-input"
              placeholder="Type your message"
            />
            <UserFormButton>Send</UserFormButton>
          </Form>
          <Conversation>
            <ConvoContainer id="conversation-container"></ConvoContainer>
          </Conversation>
        </ChatAppContent>
      </ChatApp>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; 
`
const ChatApp = styled.div`
  background: #fff;
  border: #eaeaea;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
  height: 700px;
  width: 100%;
  max-width: 360px;
`
const ChatAppHeader = styled.div`
  background: black;
  border-radius: 5px;


  box-shadow: 0px 3px 3px -1px rgba(0, 0, 0, 0.06);
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  h2 {
    color: #fff;
  }
`
const ChatAppContent = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - 60px);
`
const Form = styled.form`
  box-shadow: 0px -3px 3px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  z-index: 1;
`
const UserFormLabel = styled.label`
  display: none;
`
const UserFormInput = styled.input`
  flex: 1 0 auto;
  border: none;
  border-radius: 0 0 0 4;
  height: 60px;
  padding: 4px 8px;
`
const UserFormButton = styled.button`
  background: black;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 0 0 4 0;
  letter-spacing: 0.95px;
  padding: 3px 8px;
  font-weight: 700;
`
const Conversation = styled.div`
  margin-top: auto;
  background: #fff;
  overflow: hidden;
  overflow-y: scroll;

`
const ConvoContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  padding: 25px 25px 35px;
  width: calc(100% + 18px);
  scroll-behavior: smooth;

  .message {
    margin-top: 6px;
    display: flex;
  }
  .message span {
    background: whitesmoke;
    border-radius: 3px;
    display: inline-block;
    padding: 8px 12px;
    margin-bottom: 5px;
  }
  .message.user span {
    background: black;
    color: #fff;
    margin-left: auto;
  }
`
export default Bot
