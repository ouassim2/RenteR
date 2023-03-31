import MyProfile from './MyProfile';
import Listings from './Listings';
import styled from 'styled-components';


const User = () => {
    return ( 
    
    <Wrapper>
    
    <MyProfile/> 
    <Listings/>
    
    </Wrapper> );
}
 
const Wrapper = styled.div`

`
export default User;