const AppDescription =
  "Venbuk is an app designed to help you learn a language by involving you in the process of discovery. Unlike the other apps that focus on telling you about the language, this app works by having you log all the new words you learn. This allows you to take an active role in understanding the the details of the language. This app is suitable for you whether you want to simply write down words you learn or add details that help you understand the underlying structure, syntax and ideas behind the language";

const Features = [
  {
    feature: "Create Dictionaries",
    details:
      "Start your learning by creating a dictionary to put your words in. Learn multiple languages at once by creating multiple dictionaries and naming them acordingly.",
  },
  {
    feature: "Add Words",
    details:
      "Add words to your dictionaries, inlcuding their meanings, pronunciations, examples sentences, word classes, genders, and tags to help group them.",
  },
  {
    feature: "Search Words",
    details: "You can look up words you have written down in you dictionary.",
  },
  {
    feature: "Tag Words",
    details:
      "Create tags and add the to your words. Tags help you remain orgainsed and find words later. Use tags to group words together by topic (body parts, greetings, family). You can even put your tag in the search bar and have all the relevant words come up.",
  },
  {
    feature: "Collaborate",
    details:
      "You do not have to do everything alone. Add your people to your dictionaries either as fellow editors or just viewers.",
  },
  {
    feature: "Add Genders",
    details:
      "While English has 2 genders, other languages have more, so create as many as you discover in the languages you learn.",
  },
];

const WordClassDefinitions = [
  {
    wordClass: "Nouns",
    meaning: "Represent people, places, things, or ideas.",
    examples: "dog, city, happiness",
    note: "Some languages divide nouns further (e.g., gender in Spanish, noun classes in Swahili)",
  },
  {
    wordClass: "Adjectives",
    meaning: "Describe nouns",
    examples: "big, red, happy",
    note: "Not all languages treat adjectives as a separate class. In some languages (like Japanese), adjectives behave like verbs. In others, they may function like nouns",
  },
  {
    wordClass: "Pronouns",
    meaning: "Replace nouns",
    examples: "I, you, he, she, they, it",
    note: "Some languages drop pronouns entirely (e.g., Spanish: hablo = “I speak”) while others have complex systems (e.g., honorifics in Korean)",
  },
  {
    wordClass: "Verbs",
    meaning: "Express actions, events, or states.",
    examples: "run, eat, be",
    note: "In different languages, how they are written can change depending on tense (past, present, future), aspect (completed vs ongoing) or subject noun class (human, tools, nature). Some languages (like Chinese) do not mark tense explicitly",
  },
  {
    wordClass: "Adverbs",
    meaning: "Modify verbs, adjectives, or sentences",
    examples: "quickly, very, yesterday",
    note: "In some languages, adverbs are less distinct and overlap with adjectives",
  },
  {
    wordClass: "Articles / Determiners",
    meaning: "Specify nouns",
    examples: "the, a, this, some",
    note: "They are not universal. Many languages (like Russian or Chinese) do not use articles like the or a",
  },
  {
    wordClass: "Prepositions / Postpositions",
    meaning: "Show relationships (location, time, direction)",
    examples: "in, on, under (are prepositions)",
    note: "Postpositions come after the noun, e.g., in Hindi or Japanese",
  },
  {
    wordClass: "Conjunctions",
    meaning: "Connect words or clauses",
    examples: "and, but, because",
  },
  {
    wordClass: "Interjunctions",
    meaning: "Express emotion or reactions",
    examples: "oh!, wow!, hey!",
  },
  {
    wordClass: "Particles",
    meaning: "Small words with grammatical function",
    note: "Common in languages like Chinese or Japanese (e.g. wa, ga, no). Hard to translate directly",
  },
  {
    wordClass: "Numerals",
    meaning: "Express quantity, order, or amount.",
    examples: "one, three, first, twenty",
    note: "Languages vary in how numerals interact with nouns — some require agreement with noun class or gender (e.g. 'two' changes form based on what is being counted), while others use a single invariant form.",
  },
];

const NounClassDefinition = {
  name: "Noun Classes",
  meaning:
    "A grammatical system that groups nouns into categories, often affecting the form of other words in a sentence.",
  examples: "Swahili: m-tu (person), ki-tabu (book), ma-ji (water)",
  note: "Common in Bantu and other African languages, noun classes function similarly to grammatical gender in European languages but are more numerous. Words like verbs, adjectives, and pronouns often change form to agree with the class of the noun they relate to.",
};

const HonorificDefineition = {
  wordClass: "Honorifics",
  meaning:
    "Words or affixes that convey respect, social rank, or the relationship between speaker and listener.",
  examples: "Mr., Dr., Sir, San (Japanese), Vous (French formal 'you')",
  note: "Some languages, like Japanese and Korean, have deeply integrated honorific systems where verb forms, pronouns, and vocabulary all change depending on the social context. In others, honorifics are limited to titles or pronouns.",
};

export {
  AppDescription,
  Features,
  WordClassDefinitions,
  NounClassDefinition,
  HonorificDefineition,
};
