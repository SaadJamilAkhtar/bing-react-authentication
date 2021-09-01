import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Home() {
    return (
        <>
            <button onClick={action}
                    style={{
                        "font-size": "60px",
                        "padding": "30px",
                        "margin": "30px"
                    }}>Log In
            </button>
        </>
    );
}

function Callback() {
    let code = window.location.href.split("?")[1].split("&")[0].split("=")[1]
    let client_id = 'Your client id'
    let client_secret = 'your client secret'
    let url = "https://login.microsoftonline.com/common/oauth2/v2.0/token?" +
        "client_id=" + client_id +
        "&scope=https://ads.microsoft.com/msads.manage%20offline_access" +
        "&code=" + code +
        "grant_type=authorization_code" +
        "&redirect_uri=http://localhost:3000/callback&state=12345" +
        "&prompt=login&client_secret=" + client_secret

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ client_id: client_id,
                                     scope: "https://ads.microsoft.com/msads.manage%20offline_access",
                                     code: code, grant_type:"authorization_code",
            redirect_uri: "http://localhost:3000/callback", client_secret: client_secret})
    };
    let url_1 = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    fetch(url_1, requestOptions)
        .then(response => console.log(response.json()));
        // .then(data => alert(data));
    return(
        <>
            <p>Ok</p>
        </>
    );
}

function action() {
    let client_id = 'Your client id'
    let client_secret = 'Your client secret'
    let url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
        "client_id=" + client_id +
        "&scope=openid%20profile%20https://ads.microsoft.com/msads.manage%20offline_access" +
        "&response_type=code" +
        "&redirect_uri=http://localhost:3000/callback&state=12345" +
        "&prompt=login&client_secret=" + client_secret
    window.open(url, "_self")

}

function Logged(){

}

function App() {
    const authHandler = (err, data) => {
        console.log(err, data);
    };
    return (
        <Router>
            <div>


                <Switch>
                    <Route path="/callback">
                        <Callback/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                    <Route path="/logged">
                        <Logged/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
