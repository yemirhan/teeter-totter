
import './App.css';
import { Menu } from './containers/Menu';
import { TeeterTotter } from './containers/TeeterTotter';

function App() {
  return (<div className="absolute inset-0 flex flex-row">
    <Menu />
    <TeeterTotter />
  </div>
  );
}

export default App;
