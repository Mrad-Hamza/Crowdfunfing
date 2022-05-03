import React from "react";

import "./Options.css";

const Options = (props) => {
    const options = [
        {
            text: "Campaign",
            handler: props.actionProvider.handleCampaignQuiz,
            id: 1,
        },
        {
            text: "Donation",
            handler: props.actionProvider.handleDonationQuiz,
            id: 2,
        },
        {
            text: "Transaction",
            handler: props.actionProvider.handleTransactionQuiz,
            id: 3,
        },
        {
            text: "Project",
            handler: props.actionProvider.handleProjectQuiz,
            id: 4,
        },
        {
            text: "Event",
            handler: props.actionProvider.handleEventQuiz,
            id: 5,
        },
        {
            text: "Forum",
            handler: props.actionProvider.handleForumQuiz,
            id: 6,
        },
    ];

    const buttonsMarkup = options.map((option) => (
        <button style={{ width: "60px", height: "25px" }} key={option.id} onClick={option.handler} className="option-button">
            <span style={{ fontSize: "10px" }}>{option.text}</span>
        </button>
    ));

    return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
