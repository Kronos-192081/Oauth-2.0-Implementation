import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {API_URL} from "../constants";
import { Notyf } from "notyf";
import Print_Grants from "../components/print_grants";
import 'notyf/notyf.min.css';

const Dashboard = () => {
    const history = useHistory();
    const notyf = new Notyf();
    const [isPending, setIsPending] = useState(false);
    const [grants, setGrants] = useState(null);
    const [userid, setUserid] = useState('');


    const validClick = (e) => {
        const b_token = localStorage.getItem('b_token');
        fetch(API_URL + "/secret", {
            headers: { "Authorization": b_token }
            })
            .then(res => {
                if(res.ok)
                {
                    notyf.success("Valid User");
                }
                else 
                {
                  history.push('/signin');
                  notyf.error("Invalid User");
                }
        })
    }

    const validCheck = (e) => {
        setIsPending(true);
            const b_token = localStorage.getItem('b_token');
            fetch(API_URL + "/check", {
                headers: { "Authorization": b_token }
                })
                .then(res => {
                    if(res.ok)
                    {
                        res.json().then((msg) => {
                            setGrants(msg.userGrants);
                            setUserid(msg.userid);
                            setIsPending(false);
                        });
                    }
                    else 
                    {
                      history.push('/signin');
                      notyf.error("Invalid User");
                    }
            })
        }
    
        const deletetoken = (e) => {
            localStorage.removeItem('b_token');
            localStorage.removeItem('r_token');
            history.push('/signin');
            history.go(0);
        }

    return ( 
        <div className = "home">
            <div className = "cont-center">
                <h4>Hello User</h4>
            </div>
            <div className="buttons">
                <button className= "buttonleft" onClick={validClick}>Check User Status</button>
                <button className= "buttonright" onClick={validCheck}>Check User Grants</button>
                <button className = "buttoncenter" onClick={deletetoken}>Sign Out</button>
                { isPending && <div>Loading...</div> }
                { grants && <Print_Grants grants={ grants }/> }
            </div>
        </div>
     );
}
 
export default Dashboard;