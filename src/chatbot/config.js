import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Options from "../Front/Components/Options/Options";
import Quiz from "../Front/Components/Quiz/Quiz";
const getConfig = (onClick) => {
    const config = {
        botName: "LearningBot",
        initialMessages: [
            createChatBotMessage(`Hello. What do you want to learn`, {
                widget: "options",
            }),
        ],
        widgets: [
            {
                widgetName: "options",
                widgetFunc: (props) => <Options {...props} />,
            },
            {
                widgetName: "campaignQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "what is a campaign ?",
                            answer: "An organized course of action to achieve a goal.",
                            id: 1,
                        },
                        {
                            question: "What is the Campaign process !",
                            answer: "First you have to create a new campaign for your own project. You have to specify the project amount that you need and the deadline. After this period, the collected amount and the campaign will be managed by a specific project.",
                            id: 2,
                        },
                    ],
                },
            },
            {
                widgetName: "projectQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "What is a project",
                            answer: "It's the only version of campaign that can be managed by a Financial Advisor .",
                            id: 1,
                        },
                    ],
                },
            },
            {
                widgetName: "donationQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "How can we donate?",
                            answer: "You can donate as much as you like with your own card.",
                            id: 1,
                        },
                    ],
                },
            },
            {
                widgetName: "transactionQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "My card informations will be saved?",
                            answer: "No we will not save you card informations and we will try to present a secure service.",
                            id: 1,
                        },
                    ],
                },
            },
            {
                widgetName: "eventQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "How many types of events?",
                            answer: "We have two type of event, the first is virtual and the second is in person.",
                            id: 1,
                        },
                    ],
                },
            },
            {
                widgetName: "forumQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "what is the service that can be offered by a forum?",
                            answer: "You will have an interaction between you and us, you can also build new deals.",
                            id: 1,
                        },
                    ],
                },
            },
        ],
        customComponents: {
            // Replaces the default header
            header: () => (
                <div style={{ backgroundColor: "#2898ec", padding: "5px", borderRadius: "3px" }}>
                    <span style={{ color: "white" }}>let's learn about Fundise together </span>
                    <IconButton className="ml-5" onClick={onClick}>
                        <CloseIcon />
                    </IconButton>
                </div>
            ),
        },
    };
    return config;
};

export default getConfig;
