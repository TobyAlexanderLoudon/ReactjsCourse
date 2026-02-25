import {useState} from 'react';
import {EXAMPLES} from './data';

import './examples.css';
import TabButton from "../core/tabButton/TabButton";

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState()

    function handleSelect(selected) {
        setSelectedTopic(selected);
    }

    let tabContent = <p>Please select a topic.</p>;
    if (selectedTopic) {
        tabContent = <>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>{EXAMPLES[selectedTopic].code}</pre>
        </>;
    }

    return (
        <section id="examples">
            <h2>Examples</h2>
            <menu>
                <TabButton isSelected={selectedTopic === 'components'}
                           onSelect={() => handleSelect('components')}>
                    Components
                </TabButton>
                <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handleSelect('jsx')}>
                    JSX
                </TabButton>
                <TabButton isSelected={selectedTopic === 'props'}
                           onSelect={() => handleSelect('props')}>
                    Props
                </TabButton>
                <TabButton isSelected={selectedTopic === 'state'}
                           onSelect={() => handleSelect('state')}>
                    State
                </TabButton>
            </menu>

            <div id='tab-content'>
                {tabContent}
            </div>
        </section>
    );
}