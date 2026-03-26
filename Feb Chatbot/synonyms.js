// Comprehensive Synonym Dictionary for Semantic Matching
const synonymDictionary = {
    // Timing related synonyms
    timing: ['timing', 'time', 'hours', 'schedule', 'open', 'close', 'when', 'opens', 'closes', 'operating', 'work hours', 'office hours', 'availability', 'working days'],
    
    // Fees related synonyms
    fees: ['fee', 'fees', 'cost', 'costs', 'price', 'pricing', 'tuition', 'payment', 'charge', 'charges', 'money', 'expensive', 'cheap', 'affordable', 'how much', 'pay', 'paying', 'amount', 'installment', 'emi'],
    
    // Contact related synonyms
    contact: ['contact', 'phone', 'call', 'email', 'reach', 'number', 'mobile', 'telephone', 'address', 'communicate', 'get in touch', 'touch', 'connect', 'mail', 'website', 'location'],
    
    // Courses related synonyms
    courses: ['course', 'courses', 'program', 'programs', 'study', 'studies', 'subject', 'subjects', 'curriculum', 'syllabus', 'offering', 'offerings', 'what do you teach', 'available', 'options', 'streams', 'branch', 'degree'],
    
    // Admission related synonyms
    admission: ['admission', 'admissions', 'enroll', 'enrollment', 'join', 'joining', 'apply', 'application', 'registration', 'register', 'how to join', 'getting in', 'entry', 'enrolment', 'admit', 'admitted'],
    
    // Eligibility related synonyms
    eligibility: ['eligibility', 'eligible', 'qualify', 'qualification', 'requirement', 'requirements', 'criteria', 'who can', 'can i', 'prerequisites', 'needed', 'need', 'necessary', 'minimum'],
    
    // Scholarship related synonyms
    scholarship: ['scholarship', 'scholarships', 'financial aid', 'aid', 'discount', 'discounts', 'concession', 'waiver', 'grant', 'grants', 'funding', 'free', 'subsidy', 'reduced fee'],
    
    // Faculty related synonyms
    faculty: ['faculty', 'teacher', 'teachers', 'professor', 'professors', 'instructor', 'instructors', 'staff', 'educator', 'educators', 'mentor', 'mentors', 'tutor', 'tutors', 'teaching staff'],
    
    // Placement related synonyms
    placement: ['placement', 'placements', 'job', 'jobs', 'career', 'careers', 'recruit', 'recruitment', 'recruiter', 'company', 'companies', 'employment', 'hiring', 'placed', 'package', 'salary', 'opportunities'],
    
    // Facilities related synonyms
    facilities: ['facility', 'facilities', 'infrastructure', 'amenity', 'amenities', 'lab', 'labs', 'library', 'libraries', 'campus', 'building', 'buildings', 'equipment', 'resources', 'cafeteria', 'canteen', 'gym', 'sports'],
    
    // Hostel related synonyms
    hostel: ['hostel', 'hostels', 'accommodation', 'accommodations', 'housing', 'residence', 'residency', 'stay', 'staying', 'living', 'dorm', 'dormitory', 'rooms', 'mess', 'boarding'],
    
    // Duration related synonyms
    duration: ['duration', 'how long', 'length', 'period', 'time', 'years', 'months', 'semester', 'semesters', 'takes', 'complete', 'finish', 'timeline', 'tenure'],
    
    // Location related synonyms
    location: ['location', 'address', 'where', 'place', 'situated', 'direction', 'directions', 'how to reach', 'route', 'way', 'find', 'landmark', 'landmarks', 'near', 'nearby'],
    
    // Batch related synonyms
    batch: ['batch', 'batches', 'class', 'classes', 'size', 'strength', 'students', 'how many', 'group', 'section', 'timing', 'shift', 'morning', 'evening', 'weekend'],
    
    // Online related synonyms
    online: ['online', 'virtual', 'remote', 'distance', 'e-learning', 'elearning', 'digital', 'internet', 'web', 'video', 'zoom', 'recorded', 'live', 'home'],

    // Exam related synonyms (checked for exam date/schedule queries)
    exam: ['exam', 'examination', 'exams', 'examinations', 'midterm', 'midterms', 'finals', 'end semester', 'semester exam', 'exam date', 'exam schedule', 'when is exam', 'exam when', 'date sheet', 'datesheet']
};

// Function to normalize input by expanding synonyms
function normalizeInput(userInput) {
    const input = userInput.toLowerCase();
    const words = input.split(/\s+/);
    const normalizedTerms = new Set();
    
    // For each word in user input
    words.forEach(word => {
        // Clean the word
        const cleanWord = word.replace(/[^\w]/g, '');
        
        // Check if this word is a synonym
        for (const [category, synonyms] of Object.entries(synonymDictionary)) {
            if (synonyms.includes(cleanWord) || synonyms.some(syn => cleanWord.includes(syn) || syn.includes(cleanWord))) {
                normalizedTerms.add(category);
            }
        }
    });
    
    // Also check for multi-word phrases
    for (const [category, synonyms] of Object.entries(synonymDictionary)) {
        for (const synonym of synonyms) {
            if (input.includes(synonym)) {
                normalizedTerms.add(category);
            }
        }
    }
    
    return Array.from(normalizedTerms);
}

// Function to get matched category with confidence score
function getMatchedCategory(userInput) {
    const normalizedCategories = normalizeInput(userInput);

    if (normalizedCategories.length === 0) {
        return null;
    }

    // Prioritize 'exam' when user is asking about exams (e.g. "when is SEM 5 CS exam?")
    const inputLower = userInput.toLowerCase();
    if (normalizedCategories.includes('exam') && /\bexam(s|ination)?\b/.test(inputLower)) {
        return {
            category: 'exam',
            allMatches: normalizedCategories,
            matchedKeywords: getMatchedKeywords(userInput, ['exam'])
        };
    }

    // Return the first matched category (or could implement priority logic)
    return {
        category: normalizedCategories[0],
        allMatches: normalizedCategories,
        matchedKeywords: getMatchedKeywords(userInput, normalizedCategories)
    };
}

// Function to identify which keywords were matched
function getMatchedKeywords(userInput, categories) {
    const input = userInput.toLowerCase();
    const matched = [];
    
    categories.forEach(category => {
        const synonyms = synonymDictionary[category];
        synonyms.forEach(synonym => {
            if (input.includes(synonym)) {
                matched.push(synonym);
            }
        });
    });
    
    return matched;
}