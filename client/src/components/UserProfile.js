import MyProfile from './MyProfile';
import Listings from './Listings';
import styled from 'styled-components';


const UserProfile = () => {
    return ( 
    
    <Wrapper>
    
    <MyProfile/> 
    <Listings/>
    
    </Wrapper> );
}
 
const Wrapper = styled.div`
/* display: flex;
flex-direction: column; */

`
export default UserProfile;