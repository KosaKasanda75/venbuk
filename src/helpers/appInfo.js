const AppDescription =
  "Venbuk is an app designed to help you learn a language by involving you in the process of discovery. Unlike the other apps that focus on telling you about the language, this app works by having you log all the new words you learn. This allows you to take an active role in understanding the the details of the language. This app is suitable for you whether you want to simply write down words you learn or add details that help you understand the underlying structure, syntax and ideas behind the language.";

const Features = [
  {
    name: "Create Dictionaries",
    details:
      "Start your learning by creating a dictionary to put your words in. Learn multiple languages at once by creating multiple dictionaries and naming them acordingly.",
  },
  {
    name: "Add Words",
    details:
      "Add words to your dictionaries, inlcuding their meanings, pronunciations, examples sentences, word classes, genders, and tags to help group them.",
  },
  {
    name: "Search Words",
    details: "You can look up words you have written down in you dictionary.",
  },
  {
    name: "Tag Words",
    details:
      "Create tags and add the to your words. Tags help you remain orgainsed and find words later. Use tags to group words together by topic (body parts, greetings, family). You can even put your tag in the search bar and have all the relevant words come up.",
  },
  {
    name: "Collaborate",
    details:
      "You do not have to do everything alone. Add your people to your dictionaries either as fellow editors or just viewers.",
  },
  {
    name: "Add Genders",
    details:
      "While English has 2 genders, other languages have more, so create as many as you discover in the languages you learn.",
  },
];

const WordClassDefinitions = [
  {
    name: "Overview",
    meaning:
      "Word classes (also called word types or parts of speech) are categories that group words according to their role and function in a sentence. Every word — whether it names something, describes it, connects it, or expresses an action — belongs to a class that shapes how it behaves grammatically. Understanding word classes is the foundation of understanding how any language is structured.",
  },
  {
    name: "Nouns",
    meaning: "Represent people, places, things, or ideas.",
    examples: "dog, city, happiness",
    note: "Some languages divide nouns further (e.g., gender in Spanish, noun classes in Swahili)",
  },
  {
    name: "Adjectives",
    meaning: "Describe nouns",
    examples: "big, red, happy",
    note: "Not all languages treat adjectives as a separate class. In some languages (like Japanese), adjectives behave like verbs. In others, they may function like nouns",
  },
  {
    name: "Pronouns",
    meaning: "Replace nouns",
    examples: "I, you, he, she, they, it",
    note: "Some languages drop pronouns entirely (e.g., Spanish: hablo = “I speak”) while others have complex systems (e.g., honorifics in Korean)",
  },
  {
    name: "Verbs",
    meaning: "Express actions, events, or states.",
    examples: "run, eat, be",
    note: "In different languages, how they are written can change depending on tense (past, present, future), aspect (completed vs ongoing) or subject noun class (human, tools, nature). Some languages (like Chinese) do not mark tense explicitly",
  },
  {
    name: "Adverbs",
    meaning: "Modify verbs, adjectives, or sentences",
    examples: "quickly, very, yesterday",
    note: "In some languages, adverbs are less distinct and overlap with adjectives",
  },
  {
    name: "Articles / Determiners",
    meaning: "Specify nouns",
    examples: "the, a, this, some",
    note: "They are not universal. Many languages (like Russian or Chinese) do not use articles like the or a",
  },
  {
    name: "Prepositions / Postpositions",
    meaning: "Show relationships (location, time, direction)",
    examples: "in, on, under (are prepositions)",
    note: "Postpositions come after the noun, e.g., in Hindi or Japanese",
  },
  {
    name: "Conjunctions",
    meaning: "Connect words or clauses",
    examples: "and, but, because",
  },
  {
    name: "Interjunctions",
    meaning: "Express emotion or reactions",
    examples: "oh!, wow!, hey!",
  },
  {
    name: "Particles",
    meaning: "Small words with grammatical function",
    note: "Common in languages like Chinese or Japanese (e.g. wa, ga, no). Hard to translate directly",
  },
  {
    name: "Numerals",
    meaning: "Express quantity, order, or amount.",
    examples: "one, three, first, twenty",
    note: "Languages vary in how numerals interact with nouns — some require agreement with noun class or gender (e.g. 'two' changes form based on what is being counted), while others use a single invariant form.",
  },
];

const NounClassDefinition = [
  {
    name: "Noun Classes",
    meaning:
      "A grammatical system that groups nouns into categories, often affecting the form of other words in a sentence.",
    examples: "Swahili: m-tu (person), ki-tabu (book), ma-ji (water)",
    note: "Common in Bantu and other African languages, noun classes function similarly to grammatical gender in European languages but are more numerous. Words like verbs, adjectives, and pronouns often change form to agree with the class of the noun they relate to.",
  },
];

const HonorificDefinition = [
  {
    name: "Honorifics",
    meaning:
      "Words or affixes that convey respect, social rank, or the relationship between speaker and listener.",
    examples: "Mr., Dr., Sir, San (Japanese), Vous (French formal 'you')",
    note: "Some languages, like Japanese and Korean, have deeply integrated honorific systems where verb forms, pronouns, and vocabulary all change depending on the social context. In others, honorifics are limited to titles or pronouns.",
  },
];

const TensesDefintion = [
  {
    name: "Overview",
    meaning:
      "Tenses are grammatical forms that indicate when an action or state occurs — whether in the past, present, or future. They are one of the most fundamental building blocks of any language, helping us express the time but also convey whether an action is ongoing, completed, habitual, or hypothetical. While English has a relatively straightforward tense system, many languages express time through mood, aspect, and context rather than dedicated verb forms",
  },
  {
    name: "Present Simple",
    meaning:
      "Describes habits, general truths, repeated actions, or states that are currently true.",
    examples: "She walks to school. Water boils at 100°C. I live in Nairobi.",
    note: "Formed with the base verb. Used with adverbs like always, usually, often, never.",
  },
  {
    name: "Past Simple",
    meaning:
      "Describes completed actions or events that happened at a specific time in the past.",
    examples:
      "He visited Paris last year. They finished the project. I woke up early.",
    note: "Regular verbs add '-ed' (walked, played); irregular verbs change form (went, saw, ate). Common with: yesterday, ago, last week.",
  },
  {
    name: "Future Simple",
    meaning:
      "Describes actions or events that will happen at a later time, or expresses predictions and intentions.",
    examples:
      "She will call you tomorrow. It will rain tonight. I will help you.",
    note: "Formed with 'will' + base verb. 'Going to' can also express future plans (I am going to travel). Some languages use present tense for near future.",
  },
  {
    name: "Imperative",
    meaning:
      "Gives commands, instructions, requests, or advice directly to the listener.",
    examples: "Close the door. Please sit down. Don't touch that!",
    note: "Uses the base verb with no subject. Negative imperative uses 'don't' + base verb. Tone shifts meaning: softened by 'please', sharpened by emphasis.",
  },
  {
    name: "Conditional",
    meaning:
      "Describes hypothetical situations and their consequences, often using 'if/then' logic.",
    examples:
      "If it rains, I will stay home. She would travel if she had money. Had I known, I would have helped.",
    note: "English has four conditionals (zero, first, second, third) varying by probability and time. Many languages express this with a dedicated mood (e.g., subjunctive in Spanish).",
  },
  {
    name: "Present Continuous",
    meaning:
      "Describes actions happening right now, or temporary situations currently in progress.",
    examples:
      "I am reading a book. They are building a new road. She is studying medicine.",
    note: "Formed with 'am/is/are' + verb + '-ing'. Some verbs rarely use this form (know, believe, want). Also used for fixed future plans: 'We are leaving tonight.'",
  },
];

export {
  AppDescription,
  Features as AppFeatures,
  WordClassDefinitions,
  NounClassDefinition,
  HonorificDefinition,
  TensesDefintion,
};
