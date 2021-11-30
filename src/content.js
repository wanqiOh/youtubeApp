import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Help from './pages/help';
import Youtube from './pages/youtube';
import Home from './pages/home';

class Content extends React.Component {
    render() { 
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/youtube" element={<Youtube/>}></Route>
                    <Route path="/help" element={<Help/>}></Route>
                </Routes>
            </div>
        )
    }
}
 
export default Content;