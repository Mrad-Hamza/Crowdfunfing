class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet = () => {
        const message = this.createChatBotMessage("Hello friend.");
        this.addMessageToState(message);
    };
    greetCampaign = () => {
        const message = this.createChatBotMessage("To begin your project you have to create a campaign.");
        this.addMessageToState(message);
    };
    handleCampaignQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about campaigns !", {
            widget: "campaignQuiz",
        });

        this.addMessageToState(message);
    };

    handleProjectQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about projects !", {
            widget: "projectQuiz",
        });

        this.addMessageToState(message);
    };

    handleDonationQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about donations !", {
            widget: "donationQuiz",
        });

        this.addMessageToState(message);
    };

    handleTransactionQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about transactions !", {
            widget: "transactionQuiz",
        });

        this.addMessageToState(message);
    };

    handleEventQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about events !", {
            widget: "eventQuiz",
        });

        this.addMessageToState(message);
    };

    handleForumQuiz = () => {
        const message = this.createChatBotMessage("Fantastic. What do you want to know about forums !", {
            widget: "forumQuiz",
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
