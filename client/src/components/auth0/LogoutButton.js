import { useAuth0 } from "@auth0/auth0-react"

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0()

    return (
      isAuthenticated && (
        <div onClick={() => logout()}>Sign out</div>
      )
    )
}
 
export default LogoutButton;