import { useContext } from "react";
import styled from "styled-components"
import { ToolContext } from '../ToolContext';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const DeleteTool = ({ _id }) => {

  const {setRefreshToolListOnDeletion} = useContext(ToolContext)

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

                if(parsedResponse.deletedTool.deletedCount > 0){ // if we find and delete at least one tool only then we refresh the tool list
                    setRefreshToolListOnDeletion(true)
                }
                
            } catch (error) {
              toast.warn("failed to delete tool ... Please try again! ", error);
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
  &:active {
    transform: scale(0.9);
  }
`

export default DeleteTool
