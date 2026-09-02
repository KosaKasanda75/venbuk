export const QUIZ_TYPES = [
  { value: "word", label: "Words" },
  { value: "expression", label: "Expressions" },
  { value: "honorific", label: "Honorifics" },
];

// Which way round a question is asked. "meaning": show the term, pick its
// meaning. "name": show the meaning, pick the term.
export const QUIZ_MODES = [
  { value: "meaning", label: "Guess the meaning", hint: "See the term, choose its meaning" },
  { value: "name", label: "Guess the name", hint: "See the meaning, choose the term" },
];

// The short text shown as the question prompt for a term.
export function termLabel(term) {
  if (!term) return "";
  switch (term.type) {
    case "expression":
      return term.sentence ?? "";
    case "honorific":
      return term.placement === "prefix"
        ? `${term.word}-`
        : `-${term.word}`;
    default:
      return term.spelling ?? "";
  }
}

// The definition / meaning shown as an answer option for a term.
export function termMeaning(term) {
  if (!term) return "";
  switch (term.type) {
    case "expression":
      return term.real_meaning ?? term.literal_translation ?? "";
    case "honorific":
      return term.definition ?? term.meaning ?? "";
    default:
      return term.definition ?? "";
  }
}

// The text shown as the question prompt, given the display mode.
export function promptText(term, mode) {
  return mode === "name" ? termMeaning(term) : termLabel(term);
}

// The text shown for an answer option, given the display mode.
export function answerText(term, mode) {
  return mode === "name" ? termLabel(term) : termMeaning(term);
}

// Rows carry `options` as an array of full term objects (the correct `term`
// plus up to 3 distractors; deleted terms are simply absent). This finds the
// option object a selection id points at.
export function optionById(row, id) {
  return (row.options ?? []).find((opt) => opt.id === id) ?? null;
}

// Score a set of rows against the selections made for them. `selections` is a
// map of rowId -> chosen option id. The correct option is always the row's
// own term id.
export function scoreRows(rows, selections) {
  let correct = 0;
  let answered = 0;
  for (const row of rows) {
    const choice = selections[row.id];
    if (choice == null) continue;
    answered += 1;
    if (choice === row.term?.id) correct += 1;
  }
  return { correct, answered, total: rows.length };
}
