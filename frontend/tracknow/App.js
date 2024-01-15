import DevelopmentInProgress from './components/DevelopmentInProgress';

export default function App() {
  const developmentInProgress = true;
  return (
    <>
          {developmentInProgress ? (
        <DevelopmentInProgress />
      ) : (
        /* Your main app content goes here */
        <></>
      )}
    </>


  );
}
