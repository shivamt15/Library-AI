const chatbotResponses = {
    // General Library Questions
    "hello": "Hello! 👋 Welcome to the GNDECB Library. How can I help you?",
    "hi": "Hi! 👋 Welcome to the Library Assistant. What are you looking for?",
    "what are the library timings": "The library is open from 9:00 AM to 5:00 PM, Monday to Saturday.",
    "where is the library": "The library is located inside the GNDECB college campus.",
    "what are the library facilities": "Our library provides textbooks, reference books, previous year question papers, journals, newspapers, and digital learning resources.",

    // Book Related Questions
    "where can i find ai books": "You can find Artificial Intelligence reference books in the Computer Science and Engineering section.",
    "which book is used for ai reference": "You can refer to Artificial Intelligence: A Modern Approach by Stuart Russell and Peter Norvig.",
    "where can i find python books": "Python programming books are available in the Computer Science section.",
    "where can i find dbms books": "DBMS textbooks are available in the Computer Science and Engineering section.",
    "how can i check book availability": "Please provide the book name or author name. You can also contact the librarian to check availability.",
    "can i borrow books": "Yes! Students can borrow books using their valid library ID card, according to library borrowing rules.",
    "how many books can i borrow": "The number of books you can borrow depends on the library borrowing policy. Please contact the librarian for details.",

    // VTU 5th Semester Questions
    "where can i find BCS501 question papers": "VTU VCS 501 previous year question papers are available in the Previous Year Question Papers section under the 5th Semester CSE category.",
    "where can i find BCS501 books": "You can find VCS 501 reference books in the Computer Science and Engineering 5th Semester section.",
    "where can i find 5th sem books": "5th Semester textbooks are arranged in the VTU CSE 5th Semester section.",
    "where can i find 5th sem question papers": "Previous year question papers are available in the Question Paper section, arranged according to semester and subject code.",
    "where can i find computer networks books": "Computer Networks reference books are available in the Computer Science section.",
    "where can i find software engineering books": "Software Engineering books are available in the Computer Science and Engineering section.",
    "where can i find ai and ml books": "AI and Machine Learning reference books are available in the Computer Science section.",

    // Previous Year Question Papers
    "where can i find previous year papers": "You can find previous year question papers in the Question Paper section. They are organized semester-wise and subject-wise.",
    "can i get vtu question papers": "Yes! VTU previous year question papers are available in the library. You can search using your subject code.",
    "how can i find a question paper": "Search using your subject name, subject code, semester, or branch. For example, VCS 501 for 5th Semester.",
    "do you have model question papers": "Yes! Model question papers are available in the Question Paper section, subject to availability.",

    // Membership and Rules
    "how can i get library membership": "All enrolled students can access library facilities using their college ID card.",
    "what is the fine for late return": "Late return fines depend on the library rules. Please contact the librarian for the current fine details.",
    "can i renew a book": "Yes! You can request book renewal at the library circulation counter, subject to availability.",
    "can i use library for studying": "Yes! Students can use the library reading room for individual study and reference.",

    // General Help
    "who is the librarian": "The librarian manages library resources, book lending, returns, and student assistance.",
    "where can i find journals": "You can find academic journals in the Journals and Periodicals section.",
    "where can i find newspapers": "Newspapers are available in the Newspaper Reading section.",
    "thank you": "You're welcome! 😊 Happy Learning!",
    "bye": "Goodbye! 👋 Have a great day. Visit the library again!"
};
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") {
        return;
    }
    addMessage(userText, "user");
    const response = getBotResponse(userText);
    setTimeout(function() {
        addMessage(response, "bot");
    }, 500);
    userInput.value = "";
}
function addMessage(text, sender) {
  const message = document.createElement("div");
    message.classList.add("message");
    if (sender === "user") {
        message.classList.add("user-message");
    } else {
        message.classList.add("bot-message");
    }
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
function getBotResponse(userText) {
    const question = userText.toLowerCase().trim();
    if (chatbotResponses[question]) {
        return chatbotResponses[question];
    }
    for (let key in chatbotResponses) {
        if (question.includes(key)) {
            return chatbotResponses[key];
        }
    }
    return "Sorry, I don't understand that question yet. 🤔";
}