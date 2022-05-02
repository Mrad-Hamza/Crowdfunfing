import React from "react";

import "./Options.css";

const Options = (props) => {
    const options = [
        {
            text: "Campaign",
            handler: props.actionProvider.handleCampaignQuiz,
            id: 1,
        },
        { text: "Project", handler: props.actionProvider.handleProjectQuiz, id: 2 },
        // { text: "Golang", handler: () => {}, id: 3 },
    ];

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={option.handler} className="option-button">
            {option.text}
        </button>
    ));

    return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
