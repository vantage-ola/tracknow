import DevelopmentInProgress from './components/DevelopmentInProgress';
import Home from './components/Home';

export default function App() {
  const developmentInProgress = false;
   
  return (
    <>
          {developmentInProgress ? (
        <DevelopmentInProgress />
      ) : (
        <>      
        <Home/>
        </>
      )}
    </>


  );
}
