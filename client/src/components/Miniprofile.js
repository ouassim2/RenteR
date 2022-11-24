import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import { RiArrowDownSFill } from 'react-icons/ri';

const Miniprofile = () => {

    const navigate = useNavigate();
    
    return ( 
        <>
        <CgProfile cursor="pointer" size="35" margin-right="50px" color="white" onClick={(()=>{navigate("/profil")})}/>
        {/* create this to logout */}
        <RiArrowDownSFill cursor="pointer" size="20" color="white"/> 
        </>

     );
}
 
export default Miniprofile;