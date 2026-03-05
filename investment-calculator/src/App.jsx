import { useState } from "react";
import Header from "./components/header/Header";
import Results from "./components/results/Results";
import UserInput from "./components/userInput/UserInput";
import { calculateInvestmentResults, formatter } from "./util/investment";

const initialValues = {
  initialInvestment: 1000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

const initialCalculationValues = {
  values: { ...initialValues },
  results: calculateInvestmentResults(initialValues),
};

const isValidInput = (values) =>
  Object.values(values).every(
    (value) =>
      value !== null &&
      value !== "" &&
      !isNaN(value) &&
      value !== undefined &&
      value > 0,
  );

function App() {
  const [calculationValues, setCalculationValues] = useState(
    initialCalculationValues,
  );

  function handleInputChange(event) {
    const { id, value } = event.target;
    setCalculationValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        values: {
          ...prevValues.values,
          [id]: +value,
        },
      };

      const results = isValidInput(updatedValues.values)
        ? calculateInvestmentResults(updatedValues.values)
        : [];

      return {
        values: updatedValues.values,
        results: results,
      };
    });
  }

  return (
    <>
      <Header />
      <main>
        <UserInput
          calculationValues={calculationValues.values}
          onInputChange={handleInputChange}
        />
        <Results calculatedResults={calculationValues.results} />
      </main>
    </>
  );
}

export default App;
