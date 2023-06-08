import './App.scss';
import { Data } from './Store';
import NavBar from './Components/NavBar';
import DisplayPages from './Components/DisplayPages';
import Messages from './Components/Messages';
import ApproveModal from './Components/ApproveModal';



function App() {


  return (
  
      <Data>
        <NavBar />
        <DisplayPages />
        <ApproveModal />
        <Messages/>
      </Data>

  );
}

export default App;
