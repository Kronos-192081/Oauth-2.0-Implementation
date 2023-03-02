const Home = () => {

  return (
    <div className="home">
        <div className = "cont-center">
        Oauth 2.0 Implementation
        </div>
      <br></br>
      <h3>Provisions by the system:</h3>
      <ul>
          <li>An API to sign up as client</li>
          <li>An API to sign up as user</li>
          <li>An API to check the validity of an user</li>
          <li>An API to check the validity as well as the granted permissions of the user</li>
      </ul>
      <br/> <br />
      <h3>Flow of the system: </h3>
      <ul>
          <li>First the user signs up</li>
          <li>Next the user logs in using the username, password, client-Id and Access code (client-secret) (which will be provided to the user by the authorities)</li>
          <li>The login details like access token, refresh token and expiry time is stored in localstorage / cookie</li>
          <li>Whenever the user tries to do anything with the database (for eg: form submission or edit etc.) its grants and validity will be checked against what he/she is doing to check that whatever he/she is doing is permitted</li>
          <li>If not permitted, suitable errors to be shown</li>
      </ul>
      <br /> <br />
      <h3>User Types: </h3> <br />
      <table>
        <tr>
            <th>Faculty</th>
            <th>Official Body (Admin)</th>
            <th>Validator</th>
        </tr>
        <tr>
            <td>Form Submission</td>
            <td>All Grants (as given to faculties)</td>
            <td>Verification</td>
        </tr>
        <tr>
            <td>Data Editing</td>
            <td>Site Registration for Access-Control-Allow-Origin</td>
            <td>Data Entry and Editing</td>
        </tr>
        <tr>
            <td></td>
            <td>Client, Faculty, Official and Validator Registration</td>
            <td></td>
        </tr>
        
      </table>
    </div>
  );
}
 
export default Home;