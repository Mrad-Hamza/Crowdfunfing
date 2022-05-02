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
                widgetName: "javascriptQuiz",
                widgetFunc: (props) => <Quiz {...props} />,
                props: {
                    questions: [
                        {
                            question: "What is closure?",
                            answer: "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
                            id: 1,
                        },
                        {
                            question: "Explain prototypal inheritance",
                            answer: "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
                            id: 2,
                        },
                    ],
                },
            },
        ],
        customComponents: {
            // Replaces the default header
            header: () => (
                <div style={{ backgroundColor: "#2898ec", padding: "5px", borderRadius: "3px" }}>
                    let's learn about Fundise together{" "}
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

// const config = {
//     botName: "LearningBot",
//     initialMessages: [
//         createChatBotMessage(`Hello. What do you want to learn`, {
//             widget: "options",
//         }),
//     ],
//     widgets: [
//         {
//             widgetName: "options",
//             widgetFunc: (props) => <Options {...props} />,
//         },
//         {
//             widgetName: "javascriptQuiz",
//             widgetFunc: (props) => <Quiz {...props} />,
//             props: {
//                 questions: [
//                     {
//                         question: "What is closure?",
//                         answer: "Closure is a way for a function to retain access to it's enclosing function scope after the execution of that function is finished.",
//                         id: 1,
//                     },
//                     {
//                         question: "Explain prototypal inheritance",
//                         answer: "Prototypal inheritance is a link between an object and an object store that holds shared properties. If a property is not found on the host object, javascript will check the prototype object.",
//                         id: 2,
//                     },
//                 ],
//             },
//         },
//     ],

// };
