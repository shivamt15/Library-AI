
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
    "where can i find bcs501 question papers": "VTU BCS501 previous year question papers are available in the Previous Year Question Papers section under the 5th Semester CSE category.",
    "where can i find bcs501 books": "You can find BCS501 reference books in the Computer Science and Engineering 5th Semester section.",
    "where can i find 5th sem books": "5th Semester textbooks are arranged in the VTU CSE 5th Semester section.",
    "where can i find 5th sem question papers": "Previous year question papers are available in the Question Paper section, arranged according to semester and subject code.",
    "where can i find computer networks books": "Computer Networks reference books are available in the Computer Science section.",
    "where can i find software engineering books": "Software Engineering books are available in the Computer Science and Engineering section.",
    "where can i find ai and ml books": "AI and Machine Learning reference books are available in the Computer Science section.",

    // Previous Year Question Papers
    "where can i find previous year papers": "You can find previous year question papers in the Question Paper section. They are organized semester-wise and subject-wise.",
    "can i get vtu question papers": "Yes! VTU previous year question papers are available in the library. You can search using your subject code.",
    "how can i find a question paper": "Search using your subject name, subject code, semester, or branch. For example, BCS501 for 5th Semester.",
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


// Get HTML Elements
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");


// Send Message on Button Click
sendButton.addEventListener("click", sendMessage);


// Send Message on Enter Key
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


// Send Message Function
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


// Display Messages
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


// Normalize Text
function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/\b([a-z]+)\s*(\d{3})\b/g, "$1$2")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}


// Common Words to Ignore During Matching
const stopWords = [
    "the", "is", "a", "an", "i", "can", "you",
    "me", "my", "do", "have", "are", "what",
    "where", "how", "which", "to", "for", "of",
    "in", "on", "and", "please", "tell", "about",
    "could", "would", "like", "want", "get",
    "find", "show"
];


// Calculate Similarity Between Two Words
function wordSimilarity(a, b) {

    if (a === b) {
        return 1;
    }

    if (Math.abs(a.length - b.length) > 2) {
        return 0;
    }

    const matrix = [];

    for (let i = 0; i <= a.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= b.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {

        for (let j = 1; j <= b.length; j++) {

            const cost = a[i - 1] === b[j - 1] ? 0 : 1;

            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }

    const distance = matrix[a.length][b.length];

    return 1 - distance / Math.max(a.length, b.length);
}


// Calculate Question Similarity Score
function calculateSimilarity(userWords, botWords) {

    let matchedWords = 0;

    botWords.forEach(botWord => {

        let bestMatch = 0;

        userWords.forEach(userWord => {

            const similarity = wordSimilarity(botWord, userWord);

            if (similarity > bestMatch) {
                bestMatch = similarity;
            }
        });

        if (bestMatch >= 0.8) {
            matchedWords++;
        }
    });

    const coverage = matchedWords / botWords.length;

    const precision = matchedWords / userWords.length;

    return (coverage * 0.85) + (precision * 0.15);
}


// Get Bot Response Using Fuzzy Matching
function getBotResponse(userText) {

    const question = normalizeText(userText);

    // Step 1: Check Exact Matching
    for (let key in chatbotResponses) {

        if (normalizeText(key) === question) {
            return chatbotResponses[key];
        }
    }

    // Step 2: Remove Unnecessary Words
    const userWords = question
        .split(" ")
        .filter(word => !stopWords.includes(word));

    if (userWords.length === 0) {
        return "Sorry, I couldn't understand your question. 🤔";
    }

    // Step 3: Find the Best Matching Question
    let bestMatch = 0;

    let bestResponse = null;

    for (let key in chatbotResponses) {

        const botWords = normalizeText(key)
            .split(" ")
            .filter(word => !stopWords.includes(word));

        if (botWords.length === 0) {
            continue;
        }

        const score = calculateSimilarity(userWords, botWords);

        if (score > bestMatch) {

            bestMatch = score;

            bestResponse = chatbotResponses[key];
        }
    }

    // Step 4: Return Best Matching Answer
    if (bestMatch >= 0.65) {
        return bestResponse;
    }

    // Step 5: Default Response
    return "Sorry, I couldn't understand your question. 🤔 Please try asking in a different way.";
}
