class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        console.log(message);
        const lowercase = message.toLowerCase();

        if (lowercase.includes("hello")) {
            this.actionProvider.greet();
        }

        if (lowercase.includes("Campaign")) {
            this.actionProvider.handleProjectQuiz();
        }

        if (lowercase.includes("Donation")) {
            this.actionProvider.handleDonationQuiz();
        }
        if (lowercase.includes("Transaction")) {
            this.actionProvider.handleTransactionQuiz();
        }
        if (lowercase.includes("Event")) {
            this.actionProvider.handleEventQuiz();
        }
        if (lowercase.includes("Forum")) {
            this.actionProvider.handleForumQuiz();
        }
        if (lowercase.includes("Project")) {
            this.actionProvider.handleProjectQuiz();
        }
    }
}

export default MessageParser;
