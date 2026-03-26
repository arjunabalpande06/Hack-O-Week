// FAQ Knowledge Base (Enhanced with category IDs)
const faqDatabase = {
    timing: {
        category: 'timing',
        response: 'Our institute timings are:\n• Monday to Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 4:00 PM\n• Sunday: Closed'
    },
    fees: {
        category: 'fees',
        response: 'Our course fees vary by program:\n• Certificate Courses: ₹15,000 - ₹25,000\n• Diploma Programs: ₹50,000 - ₹80,000\n• Degree Programs: ₹1,50,000 - ₹3,00,000\n\nWe offer installment options and scholarships!'
    },
    contact: {
        category: 'contact',
        response: 'You can reach us at:\n📞 Phone: +91-9876543210\n📧 Email: info@techinstitute.edu\n🌐 Website: www.techinstitute.edu\n📍 Address: 123 Education Street, Pune, Maharashtra'
    },
    courses: {
        category: 'courses',
        response: 'We offer various courses:\n• Computer Science & IT\n• Business Management\n• Digital Marketing\n• Data Science & AI\n• Graphic Design\n• Web Development\n\nWould you like details about any specific course?'
    },
    admission: {
        category: 'admission',
        response: 'Admission process:\n1. Fill online application form\n2. Submit required documents\n3. Attend entrance test/interview\n4. Pay admission fee\n\nAdmissions are open! Visit our website or contact us for the application form.'
    },
    eligibility: {
        category: 'eligibility',
        response: 'Eligibility criteria:\n• Certificate: 10th pass\n• Diploma: 12th pass\n• Degree: 12th pass with 50% marks\n\nSpecific courses may have additional requirements. Please specify the course for detailed criteria.'
    },
    scholarship: {
        category: 'scholarship',
        response: 'We offer several scholarships:\n• Merit-based: Up to 50% fee waiver\n• Need-based: Up to 30% fee waiver\n• Sports quota: Up to 40% fee waiver\n\nContact our admission office for scholarship application details.'
    },
    faculty: {
        category: 'faculty',
        response: 'Our faculty includes:\n• 50+ experienced professors\n• Industry experts as guest lecturers\n• Average experience: 10+ years\n• Many hold PhD degrees\n\nAll faculty members are dedicated to student success!'
    },
    placement: {
        category: 'placement',
        response: 'Placement highlights:\n• 85% placement rate\n• 200+ recruiting companies\n• Average package: ₹4.5 LPA\n• Highest package: ₹12 LPA\n• Dedicated placement cell support'
    },
    facilities: {
        category: 'facilities',
        response: 'Our facilities include:\n• Modern computer labs\n• Well-stocked library\n• High-speed WiFi\n• Cafeteria\n• Sports complex\n• Auditorium\n• Hostel accommodation'
    },
    hostel: {
        category: 'hostel',
        response: 'Hostel facilities:\n• Separate boys and girls hostels\n• AC and non-AC rooms\n• Mess facility included\n• 24/7 security\n• Fees: ₹40,000 - ₹60,000 per year\n\nLimited seats available - apply early!'
    },
    duration: {
        category: 'duration',
        response: 'Course duration:\n• Certificate: 3-6 months\n• Diploma: 1-2 years\n• Degree: 3-4 years\n\nPart-time and weekend batches are also available!'
    },
    location: {
        category: 'location',
        response: 'We are located at:\n📍 123 Education Street, Pune, Maharashtra - 411001\n\nNearby landmarks:\n• 2 km from Pune Railway Station\n• 500m from City Bus Stand\n• Opposite City Mall'
    },
    batch: {
        category: 'batch',
        response: 'Batch information:\n• Average batch size: 30-40 students\n• Morning and evening batches available\n• Weekend batches for working professionals\n• Small batches ensure personal attention'
    },
    online: {
        category: 'online',
        response: 'Online learning options:\n• Live interactive sessions\n• Recorded lectures available\n• Same certification as offline\n• Flexible timings\n• 30% fee discount for online courses'
    },
    exam: {
        category: 'exam',
        response: null // Built dynamically using extracted entities
    }
};

// --- Entity recognition: extract dates, course codes, semester from questions ---
const COURSE_NAMES = { CS: 'Computer Science', CSE: 'Computer Science & Engineering', IT: 'Information Technology', ECE: 'Electronics & Communication', EEE: 'Electrical & Electronics', ME: 'Mechanical Engineering', CE: 'Civil Engineering', MCA: 'MCA', BCA: 'BCA', BBA: 'BBA', MBA: 'MBA' };

function extractEntities(userInput) {
    const text = userInput.trim();
    const entities = { date: null, courseCode: null, semester: null };

    // Semester: "SEM 5", "semester 5", "sem 3", "5th semester"
    const semMatch = text.match(/\b(?:sem\.?|semester)\s*(\d+)\b/i) || text.match(/\b(\d+)(?:st|nd|rd|th)?\s*(?:sem\.?|semester)s?\b/i);
    if (semMatch) entities.semester = semMatch[1];

    // Course code: common 2–4 letter codes
    const codeMatch = text.match(/\b(CS|CSE|IT|ECE|EEE|ME|CE|MCA|BCA|BBA|MBA)\b/i);
    if (codeMatch) entities.courseCode = codeMatch[1].toUpperCase();

    // Date: "15th March", "March 15", "15/03/2025", "next week", "tomorrow"
    const datePatterns = [
        /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/,
        /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?\s*,?\s*(\d{0,4})?\b/i,
        /\b(\d{1,2})(?:st|nd|rd|th)?\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s*(\d{0,4})?\b/i,
        /\b(tomorrow|today|next week|this week)\b/i
    ];
    for (const re of datePatterns) {
        const m = text.match(re);
        if (m) { entities.date = m[0]; break; }
    }

    return entities;
}

// Sample exam schedule (semester + course -> date or description). Expand as needed.
const examSchedule = {
    '5_CS': '10th–20th March 2025',
    '5_CSE': '10th–20th March 2025',
    '5_IT': '12th–22nd March 2025',
    '6_CS': '15th–25th April 2025',
    '6_CSE': '15th–25th April 2025',
    '3_CS': '5th–15th April 2025',
    '3_CSE': '5th–15th April 2025'
};

// Year name -> typical semester numbers (for "third year?" follow-up)
const YEAR_TO_SEMESTERS = { 'first': [1, 2], 'second': [3, 4], 'third': [5, 6], 'fourth': [7, 8], '1st': [1, 2], '2nd': [3, 4], '3rd': [5, 6], '4th': [7, 8] };

function buildExamResponse(userInput, mergedEntities) {
    const fromInput = extractEntities(userInput);
    const entities = mergedEntities || fromInput;
    // Merge: prefer merged entity, else from current input
    const sem = entities.semester || fromInput.semester;
    const code = entities.courseCode || fromInput.courseCode;
    const courseName = code ? (COURSE_NAMES[code] || code) : null;
    const key = sem && code ? `${sem}_${code}` : null;
    const scheduled = key ? examSchedule[key] : null;

    let msg = 'Exam information\n\n';
    if (sem) msg += '• Semester: ' + sem + '\n';
    if (code) msg += '• Course: ' + courseName + ' (' + code + ')\n';
    if (entities.date) msg += '• You asked about date: ' + entities.date + '\n';
    msg += '\n';
    if (scheduled) {
        msg += 'The ' + (sem && code ? 'Semester ' + sem + ' ' + courseName : 'exam') + ' exam is scheduled: ' + scheduled + '. Please check the notice board or student portal for the exact date sheet.';
    } else {
        if (sem || code) {
            msg += sem && code
                ? 'For Semester ' + sem + ' ' + courseName + ' (' + code + '), the end-semester exam dates will be announced by the exam cell. Please check the academic calendar or notice board for updates.'
                : 'Exam dates for ' + (sem ? 'Semester ' + sem : '') + (sem && code ? ' ' : '') + (code ? courseName : '') + ' are published on the notice board and student portal. Contact the exam cell for the exact schedule.';
        } else {
            msg += 'Exam dates are published on the institute notice board and student portal. Please specify a semester and/or course (e.g. SEM 5 CS) for exact dates.';
        }
    }
    return msg;
}

// --- Multi-turn: minimal conversation state ---
const conversationState = {
    lastCategory: null,
    lastEntities: null,
    turnsSinceNewTopic: 0,
    maxFollowUpTurns: 3
};

function isFollowUp(userText) {
    const t = userText.trim();
    const wordCount = t.split(/\s+/).length;
    const isShort = wordCount <= 6 && t.length <= 50;
    const hasState = conversationState.lastCategory && conversationState.turnsSinceNewTopic < conversationState.maxFollowUpTurns;
    return isShort && hasState;
}

/** Parse follow-up message for entity refinements (e.g. "For third year?" -> semester 5,6; "For CS?" -> CS). */
function parseFollowUpEntities(userText, lastEntities) {
    const text = userText.toLowerCase().trim();
    const merged = Object.assign({}, lastEntities || {});

    // "third year?", "for 3rd year?", "second year?"
    const yearMatch = text.match(/\b(first|second|third|fourth|1st|2nd|3rd|4th)\s*year\b/) ||
        text.match(/\bfor\s+(?:the\s+)?(first|second|third|fourth|1st|2nd|3rd|4th)\s*year\b/i);
    if (yearMatch) {
        const key = yearMatch[1].toLowerCase();
        const sems = YEAR_TO_SEMESTERS[key];
        if (sems) merged.semester = String(sems[0]); // use first semester of that year (e.g. 5 for third)
    }

    // "semester 5?", "sem 5?", "for sem 6?"
    const semMatch = text.match(/\b(?:sem\.?|semester)\s*(\d+)\b/i) || text.match(/\bfor\s+(?:sem\.?|semester)\s*(\d+)\b/i);
    if (semMatch) merged.semester = semMatch[1];

    // "for CS?", "what about IT?", "CS?", "and CSE?"
    const codeMatch = text.match(/\b(?:for|about|and)?\s*(CS|CSE|IT|ECE|EEE|ME|CE|MCA|BCA|BBA|MBA)\b/i);
    if (codeMatch) merged.courseCode = codeMatch[1].toUpperCase();

    return merged;
}

function handleFollowUp(userText) {
    if (conversationState.lastCategory === 'exam') {
        const merged = parseFollowUpEntities(userText, conversationState.lastEntities);
        conversationState.lastEntities = merged;
        conversationState.turnsSinceNewTopic += 1;
        return buildExamResponse(userText, merged);
    }
    // Other categories: re-use last response with a brief acknowledgment
    if (faqDatabase[conversationState.lastCategory] && faqDatabase[conversationState.lastCategory].response) {
        conversationState.turnsSinceNewTopic += 1;
        return 'Regarding that: ' + faqDatabase[conversationState.lastCategory].response;
    }
    return null;
}

function updateConversationState(matchResult, userInput) {
    if (!matchResult) return;
    conversationState.lastCategory = matchResult.category;
    conversationState.turnsSinceNewTopic = 0;
    if (matchResult.category === 'exam') {
        conversationState.lastEntities = extractEntities(userInput);
    } else {
        conversationState.lastEntities = null;
    }
}

// Enhanced pattern matching using semantic similarity
function findBestMatch(userInput) {
    // Use the synonym dictionary to get matched category
    const matchResult = getMatchedCategory(userInput);

    if (matchResult && faqDatabase[matchResult.category]) {
        const response = matchResult.category === 'exam'
            ? buildExamResponse(userInput, null)
            : faqDatabase[matchResult.category].response;
        return {
            response,
            category: matchResult.category,
            matchedKeywords: matchResult.matchedKeywords,
            allMatches: matchResult.allMatches
        };
    }

    return null;
}

// Default response when no match found
function getDefaultResponse() {
    return "I'm not sure about that. I can help you with:\n\n• Institute timings\n• Course fees\n• Contact information\n• Available courses\n• Admission process\n• Eligibility criteria\n• Scholarships\n• Faculty details\n• Placement statistics\n• Campus facilities\n• Hostel information\n• Course duration\n• Location & directions\n• Batch information\n• Online courses\n• Exam dates (e.g. When is SEM 5 CS exam?)\n\nPlease ask me anything from the above topics!";
}

// --- Strategy for unclear / out-of-scope questions ---
const HUMAN_ADVISOR = {
    email: 'btechadmissionsnagpur@siu.edu.in',
    deskUrl: 'https://sitnagpur.edu.in/contactus',
    deskLabel: 'Student desk / Contact'
};

const TOPIC_SUGGESTIONS = [
    { key: 'exam', label: 'exam dates (e.g. When is SEM 5 CS exam?)', example: 'When is the SEM 5 CS exam?' },
    { key: 'fees', label: 'course fees', example: 'What are the course fees?' },
    { key: 'admission', label: 'admission process', example: 'How do I apply for admission?' },
    { key: 'contact', label: 'contact information', example: 'How can I contact the institute?' },
    { key: 'courses', label: 'available courses', example: 'What courses do you offer?' }
];

function isUnclearInput(userText) {
    const t = userText.trim();
    const words = t.split(/\s+/).filter(w => w.length > 0);
    if (words.length <= 1 && t.length < 10) return true;
    const alphaCount = (t.match(/[a-zA-Z]/g) || []).length;
    if (alphaCount < 3) return true;
    return false;
}

function getClarificationResponse(userInput) {
    const unclear = isUnclearInput(userInput);
    const suggestions = TOPIC_SUGGESTIONS.slice(0, 4);
    const suggestionList = suggestions.map(s => '• ' + s.label).join('\n');

    let intro;
    if (unclear) {
        intro = "I didn't quite get that. Could you rephrase or add a bit more detail? For example:\n\n" +
            suggestions.slice(0, 2).map(s => '"' + s.example + '"').join('\n') + '\n\n';
    } else {
        intro = "I couldn't find that in our FAQs. I can help with things like:\n\n" + suggestionList + '\n\n';
    }

    const humanLine = "Need personal help? Our advisors are available by email or at the student desk.";
    return intro + humanLine;
}

function getAdvisorConfig() {
    return HUMAN_ADVISOR;
}

// Create message element
function createMessageElement(type, text, matchInfo = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    if (type === 'bot') {
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
            </svg>
        `;
    } else {
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        `;
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    // Advisor links for unclear/out-of-scope responses (safe, config-driven)
    if (type === 'bot' && matchInfo && matchInfo.showAdvisorLinks) {
        const advisor = getAdvisorConfig();
        const advisorDiv = document.createElement('div');
        advisorDiv.className = 'advisor-links';
        const emailLink = document.createElement('a');
        emailLink.href = 'mailto:' + advisor.email;
        emailLink.textContent = 'Email advisor';
        emailLink.rel = 'noopener';
        const deskLink = document.createElement('a');
        deskLink.href = advisor.deskUrl;
        deskLink.textContent = advisor.deskLabel;
        deskLink.target = '_blank';
        deskLink.rel = 'noopener noreferrer';
        advisorDiv.appendChild(emailLink);
        advisorDiv.appendChild(document.createTextNode(' | '));
        advisorDiv.appendChild(deskLink);
        contentDiv.appendChild(advisorDiv);
    }
    
    // Add match information if available (for debugging/transparency)
    if (matchInfo && matchInfo.matchedKeywords && matchInfo.matchedKeywords.length > 0) {
        const matchInfoDiv = document.createElement('div');
        matchInfoDiv.className = 'matched-info';
        matchInfoDiv.textContent = `Matched keywords: ${matchInfo.matchedKeywords.join(', ')}`;
        contentDiv.appendChild(matchInfoDiv);
    }
    
    if (type === 'bot') {
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
    } else {
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(avatarDiv);
    }
    
    return messageDiv;
}

// Add message to chat
function addMessage(type, text, matchInfo = null) {
    const chatMessages = document.getElementById('chat-messages');
    
    // Create messages container if it doesn't exist
    let messagesContainer = chatMessages.querySelector('.messages-container');
    if (!messagesContainer) {
        messagesContainer = document.createElement('div');
        messagesContainer.className = 'messages-container';
        chatMessages.appendChild(messagesContainer);
    }
    
    const messageElement = createMessageElement(type, text, matchInfo);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle user input
function handleUserInput() {
    const input = document.getElementById('user-input');
    const userText = input.value.trim();

    if (!userText) return;

    // Add user message
    addMessage('user', userText);

    // Clear input
    input.value = '';

    // Get bot response with slight delay
    setTimeout(() => {
        let response;
        let matchInfo = null;

        if (isFollowUp(userText)) {
            const followUpResponse = handleFollowUp(userText);
            if (followUpResponse) {
                response = followUpResponse;
                matchInfo = { category: conversationState.lastCategory, matchedKeywords: ['follow-up'] };
            }
        }

        if (response === undefined) {
            const matchResult = findBestMatch(userText);
            if (matchResult) {
                updateConversationState(matchResult, userText);
                response = matchResult.response;
                matchInfo = { category: matchResult.category, matchedKeywords: matchResult.matchedKeywords };
            } else {
                conversationState.lastCategory = null;
                conversationState.lastEntities = null;
                conversationState.turnsSinceNewTopic = 0;
                response = getClarificationResponse(userText);
                matchInfo = { category: null, matchedKeywords: [], showAdvisorLinks: true };
            }
        }

        addMessage('bot', response, matchInfo);
    }, 500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    
    // Send button click
    sendBtn.addEventListener('click', handleUserInput);
    
    // Enter key press
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Add welcome message
    addMessage('bot', 'Hello! Welcome to Tech Institute. How can I help you today? You can ask me about timings, fees, courses, admissions, and more!');
});
