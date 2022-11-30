import styled from "styled-components"
import dewaltvid from "../../assets/dewaltpub.mp4"
import milwaukeevid from "../../assets/milwaukeepub.mp4"
import ryobivid from "../../assets/ryobipub.mp4"

import dewaltlogo from "../../assets/dewaltlogo.png"
import milwaukeelogo from "../../assets/milwaukeelogo.png"
import ryobilogo from "../../assets/ryobilogo.png"

const HomeToolBrands = () => {


  return (
    <Wrapper>
    <h1>Rent by Brand</h1>

    <MiniWrapper>
      <div onClick={() => console.log("yehh siiir!")}>
        <Logo src={dewaltlogo}/>
        <Video src={dewaltvid} muted onMouseEnter={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
      </div>

      <div>
        <LogoMilwaukee src={milwaukeelogo}/>
        <Video src={milwaukeevid} muted onMouseEnter={e => e.target.play()} onMouseOut={e => e.target.pause()}/>

      </div>

      <div>
        <LogoRyobi src={ryobilogo}/>
        <Video src={ryobivid} muted onMouseEnter={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
        
      </div>
      <div></div>
      <div></div>
      <div></div>
      {/* <div></div>
      <div></div> */}
    </MiniWrapper>
    </Wrapper>
  )
}
const Wrapper = styled.div`
margin-top: 25px;
`
const MiniWrapper = styled.div`
margin-top: 25px;
margin-left:130px ;
height: 500px;
width: 1000px;
flex-wrap: wrap;
display: flex;
/* justify-content: center; */
/* align-items: center; */
div{
    z-index: 10;
    background-color: green;
    width: 300px;
    height: 200px;
    margin-right: 20px;
    
}
`
const Logo = styled.img`
    /* z-index: 9; */
    margin-left:  50px;
    position: absolute;
    /* left: 150px; */
    width: 200px;
    opacity: 0.8;

`
const LogoMilwaukee = styled.img`
margin-top: 30px;
    /* z-index: 9; */
    margin-left:  50px;
    position: absolute;
    /* left: 150px; */
    width: 200px;
    opacity: 0.8;


`

const LogoRyobi =styled.img`
margin-top: 70px;
    /* z-index: 9; */
    margin-left:  80px;
    position: absolute;
    /* left: 150px; */
    width: 150px;
    opacity: 0.8;

`
const Video = styled.video`
    width: 300px;
    height: 200px;

`
export default HomeToolBrands
