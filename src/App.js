import logo from './logo.svg';
import './App.css';
import MainPage from './Components/MainPage';
import Display from './Components/Display';
import Form from './Components/Form';
import { FaGithub } from 'react-icons/fa'

function App() {
  return (
    <div className="App">
      <div className='git'><FaGithub className='git-icon'/><h1>GitHub Issues</h1></div> 
      
     <div> <Display/></div>
    </div>
  );
}

export default App;
