import styled from "styled-components"

import dewaltvid from "../../assets/dewaltpub.mp4"
import milwaukeevid from "../../assets/milwaukeepub.mp4"
import ryobivid from "../../assets/ryobipub.mp4"
import troybiltvid from "../../assets/troybiltpub.mp4"
import tomohawkvid from "../../assets/tomohawkpub.mp4"
import yardworksvid from "../../assets/yardworkspub.mp4"

import dewaltlogo from "../../assets/dewaltlogo.png"
import milwaukeelogo from "../../assets/milwaukeelogo.png"
import ryobilogo from "../../assets/ryobilogo.png"
import troybiltlogo from "../../assets/troybiltlogo.png"
import tomohawklogo from "../../assets/tomohawklogo.png"
import yardworkslogo from "../../assets/yardworkslogo.png"
import { Link } from "react-router-dom"

const HomeToolBrands = () => {

  const brands = [
    {id:"Dewalt123r3", brand:"Dewalt", logo: dewaltlogo, video: dewaltvid},
    {id:"Milwaukeer33rr", brand:"Milwaukee", logo: milwaukeelogo, video: milwaukeevid},
    {id:"Ryobi13r13r", brand:"Ryobi", logo: ryobilogo, video: ryobivid},
    {id:"Troybilt13r31r", brand:"Troybilt", logo:troybiltlogo, video: troybiltvid},
    {id:"Tomahawksd1r", brand:"Tomahawk", logo:tomohawklogo, video: tomohawkvid},
    {id:"Yardworks31rqs", brand:"Yardworks", logo:yardworkslogo, video: yardworksvid},
  ]

  return (
      <BodyWrapper>
      <h1>Rent by Brand</h1>
    <Wrapper>

      <MiniWrapper>
      {brands.map(({id, brand ,logo ,video }) => {
        return(
          <Link key={id} to={`/rent-tool/brand/${brand}`}>
          <div> 
            <Logo  src={logo}/>
            <Video src={video} muted onMouseEnter={e => e.target.play()} onMouseOut={e => e.target.pause()}/>
          </div>
        </Link>
        )
      })
    }
      </MiniWrapper>

    </Wrapper>
    </BodyWrapper>
  )
}
const BodyWrapper = styled.div`
h1{
  margin-top: 25px;
}
`

const Wrapper = styled.div`
display: flex;
justify-content: center;

`
const MiniWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin-top: 25px;
height: 500px;
width: 1000px;

div{
    z-index: 10;
    background-color: black;
    width: 300px;
    height: 200px;
    margin-right: 20px;
    
}
`
const Logo = styled.img`
    margin-top: 20px;
    margin-left:  50px;
    position: absolute;
    width: 200px;
    opacity: 0.8;

`
const Video = styled.video`
    width: 300px;
    height: 200px;

`

export default HomeToolBrands
