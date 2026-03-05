import HeaderLogo from '../../assets/investment-calculator-logo.png';
import './header.css';

export default function Header() {
    return (
        <header id="header">
            <img src={HeaderLogo} alt="Investment Calculator Logo" />

            <h1>Investment Calculator</h1>
        </header>
    );
}