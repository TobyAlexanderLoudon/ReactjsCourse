import "./results.css";
import { formatter } from "../../util/investment";

export default function Results({ calculatedResults }) {
  return (
    <section>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {calculatedResults.map((result) => (
            <tr key={result.year}>
              <td>{result.year}</td>
              <td>{formatter.format(result.valueEndOfYear)}</td>
              <td>{formatter.format(result.interest)}</td>
              <td>{formatter.format(result.totalInterest)}</td>
              <td>{formatter.format(result.investedCapital)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {calculatedResults.length === 0 ? (
        <p id="no-results">
          No results to display. Please enter your investment details.
        </p>
      ) : null}
    </section>
  );
}
