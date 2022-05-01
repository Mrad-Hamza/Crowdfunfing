class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet = () => {
        const message = this.createChatBotMessage("Hello friend.");
        this.addMessageToState(message);
    };

    handleCampaignQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. Here is your quiz. Good luck!", {
            widget: "campaignQuiz",
        });

        this.addMessageToState(message);
    };

    handleProjectQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. Here is your quiz. Good luck!", {
            widget: "projectQuiz",
        });

        this.addMessageToState(message);
    };

    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;
