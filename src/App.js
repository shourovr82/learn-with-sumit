import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import store from './redux/app/store';
import { router } from './router/router';

function App() {
  return (
    <Provider store={store} className="App">
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
