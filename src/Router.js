import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Calculator from "./routes/Calculator";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Storage from "./routes/Storage";

const RouterComponent = () => (
    <Router>
        <Stack key="root" navigationBarStyle={{ backgroundColor: 'transparent' }}>
            <Scene key="Register" initial={true} component={Register} hideNavBar/>
            <Scene key="Calculator" component={Calculator} hideNavBar/>
            <Scene key="Login" component={Login} hideNavBar/>
            <Scene key="Storage" component={Storage} />
        </Stack>
    </Router>
);

export default RouterComponent;