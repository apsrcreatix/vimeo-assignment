import { GlobalStoreProvider } from 'contexts/GlobalStore';
import Shop from 'pages/Shop';

function App() {
  return (
    <GlobalStoreProvider>
      <Shop />
    </GlobalStoreProvider>
  );
}

export default App;
