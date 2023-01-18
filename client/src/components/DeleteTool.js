import styled from "styled-components"

const DeleteTool = ({ _id }) => {

  const handleClick = (e) => {
    e.preventDefault()

        const deleteTool = async () => {

            try {
                const removedTool = await fetch(`/api/delete-tool${_id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
                })
                const parsedResponse = await removedTool.json()
                
            } catch (error) {
                console.log("error", error)
            }
        }

        deleteTool()
    }

  return (
    <>
      <DeleteButton onClick={(e) => handleClick(e)}>Delete</DeleteButton>
    </>
  )
}

const DeleteButton = styled.button`
  height: 40px;
  padding: 0px 10px;
  font-size: large;
  border-radius: 15px;
  border: none;
  background-color: darkgoldenrod;
  color: white;
  cursor: pointer;
  &:hover {
    background: #e62600;
  }
`

export default DeleteTool
