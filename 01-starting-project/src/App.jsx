import Header from "./components/header/Header";
import CoreConcepts from "./components/coreConcepts/CoreConcepts";
import Examples from "./components/examples/Examples";

function App() {
  return (
    <div>
     <Header />

      <main>
          <CoreConcepts />
          <Examples />
      </main>
    </div>
  );
}

export default App;
