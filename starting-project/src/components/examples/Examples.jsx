import {useState} from 'react';
import {EXAMPLES} from './data';

import './examples.css';
import TabButton from "../core/tabs/TabButton";
import Section from "../core/section/Section";
import Tabs from "../core/tabs/Tabs";

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState()

    function handleSelect(selected) {
        setSelectedTopic(selected);
    }

    let tabContent = <p>Please select a topic.</p>;
    if (selectedTopic) {
        tabContent = <div id='tab-content'>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>{EXAMPLES[selectedTopic].code}</pre>
        </div>;
    }

    const tabs = <>
        <TabButton isSelected={selectedTopic === 'components'}
                   onClick={() => handleSelect('components')}>
            Components
        </TabButton>
        <TabButton isSelected={selectedTopic === 'jsx'}
                   onClick={() => handleSelect('jsx')}>
            JSX
        </TabButton>
        <TabButton isSelected={selectedTopic === 'props'}
                   onClick={() => handleSelect('props')}>
            Props
        </TabButton>
        <TabButton isSelected={selectedTopic === 'state'}
                   onClick={() => handleSelect('state')}>
            State
        </TabButton>
    </>;

    return (
        <Section title={"Examples"} id="examples">
            <Tabs tabs={tabs}>
                {tabContent}
            </Tabs>
        </Section>
    );
}