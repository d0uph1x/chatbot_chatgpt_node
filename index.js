import openai from "./config/open-ai.js";
import readLineSync from 'readline-sync';
import colors from 'colors';

const main = async ()=> {
    console.log(colors.bold.green("Welcome to the ChatBOT Program"));
    console.log(colors.bold.green("Hey, we can start chatting"));

    // store the history
    const chatHistory = [];
    
    while(true) {
        const userInput = readLineSync.question(colors.yellow('You: '));
        try {
            const messages = chatHistory?.map(([role,content])=> ({role, content}));
            // add the current user input
            messages.push({role:'user', content:userInput})
            const chatCompletion = await openai.createChatCompletion({
                model:'gpt-3.5-turbo',
                messages,
            });
    
            // Get completionText
            const completionText = chatCompletion.data.choices[0].message.content;
            if(userInput.toLowerCase() === 'exit'){
                console.log(colors.green(`Bot: ${completionText}`));
                return
            }
            console.log(colors.green(`Bot: ${completionText}`));
            // update the history
            chatHistory.push(['user',userInput]);
            chatHistory.push(['assistant',completionText]);
        } catch (error) {
            console.error(colors.red(error.message));
        }
    }   
}
main();