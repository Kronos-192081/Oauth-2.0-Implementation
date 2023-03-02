const Print_Grants = (grants) => {
    let ob = Object.keys(grants);
    
    return ( 
        <div className = "show">
            <h3>User Grants: </h3>
            <br></br>
            <ul>
            {
                ob.map((key) => {
                    return(
                    Object.keys(grants[key]).map((k) => {
                      return (<li>{grants[key][k]}</li>)
                    })
                    )
                 })
            }
            </ul>
        </div>
     );
}
 
export default Print_Grants;