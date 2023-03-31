
const ConvertToBase64 = ({ alt, onDone }) => {

 const handleChange = (e) => {
      e.preventDefault()
      
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      
      reader.onload = () => {
        let base64 = reader.result
        onDone(base64)
      };

    }
    
    return ( 

    <>
      <input type='file' accept="image/*" alt={alt} onChange={handleChange}></input>
    </> 
    
    );
}
 
export default ConvertToBase64;