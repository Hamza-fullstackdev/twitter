import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
    <div className='flex max-w-6xl mx-auto'>
    <Sidebar/>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/notifications' Component={Notification} />
        <Route path='/profile/:username' Component={Profile} />
        <Route path='/signup' Component={Signup} />
        <Route path='/login' Component={Login} />
      </Routes>
      <Rightbar/>
		</div>
    </BrowserRouter>
  );
}

export default App;
