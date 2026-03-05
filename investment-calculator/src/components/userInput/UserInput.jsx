import "./userInput.css";

export default function UserInput({ calculationValues, onInputChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            type="number"
            id="initialInvestment"
            required
            value={calculationValues.initialInvestment}
            onChange={onInputChange}
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input
            type="number"
            id="annualInvestment"
            required
            value={calculationValues.annualInvestment}
            onChange={onInputChange}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input
            type="number"
            id="expectedReturn"
            required
            value={calculationValues.expectedReturn}
            onChange={onInputChange}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration (Years)</label>
          <input
            type="number"
            id="duration"
            required
            value={calculationValues.duration}
            onChange={onInputChange}
          />
        </p>
      </div>
    </section>
  );
}
