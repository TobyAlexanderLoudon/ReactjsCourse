import './coreConcepts.css';
import {CORE_CONCEPTS} from "./data";
import Concept from "./Concept";

export default function CoreConcepts() {
    return (
        <section id="core-concepts">
            <h2>Core Concepts</h2>
            <ul>
                {
                    CORE_CONCEPTS.map(concept => {
                        return Concept(concept);
                    })
                }
            </ul>
        </section>
    );
}
