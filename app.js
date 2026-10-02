const ROUND_SIZE = 10;

const cardBank = [
  {
    type: "Direct definition",
    prompt: "Does this court have authority over this defendant?",
    answer: "personal",
    explanation: "Personal Jurisdiction concerns the court's authority over the defendant.",
  },
  {
    type: "Direct definition",
    prompt: "Does this court have authority to hear this type of lawsuit?",
    answer: "subject",
    explanation: "Subject Matter Jurisdiction concerns the court's authority to hear this type of case.",
  },
  {
    type: "Short fact",
    prompt: "The defendant lives in Pennsylvania and is sued in Pennsylvania.",
    answer: "personal",
    explanation: "This concerns the court's authority over the defendant.",
  },
  {
    type: "Short fact",
    prompt: "The lawsuit includes a claim arising under federal copyright law.",
    answer: "subject",
    explanation: "This concerns the court's authority to hear this type of federal claim.",
  },
  {
    type: "Short fact",
    prompt: "The defendant regularly sells products to customers in Pennsylvania.",
    answer: "personal",
    explanation: "This fact concerns the defendant's connection to the state.",
  },
  {
    type: "Short fact",
    prompt: "The plaintiff is a citizen of Pennsylvania, the defendant is a citizen of New Jersey, and the plaintiff seeks $120,000.",
    answer: "subject",
    explanation: "These facts relate to whether a federal court can hear the case based on diversity jurisdiction.",
  },
  {
    type: "Short fact",
    prompt: "The defendant was personally served while physically present in the state.",
    answer: "personal",
    explanation: "This fact concerns the court's authority over the defendant.",
  },
  {
    type: "Short fact",
    prompt: "The plaintiff files a claim created by federal law in federal court.",
    answer: "subject",
    explanation: "This concerns whether the federal court may hear that type of claim.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "The lawyer asks whether the defendant has enough connection to Pennsylvania.",
    answer: "personal",
    explanation: "The question focuses on the defendant's connection to the state.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "The lawyer asks whether a lawsuit arising under federal law can be filed in federal court.",
    answer: "subject",
    explanation: "The question focuses on the court's authority to hear the type of case.",
  },
  {
    type: "Short fact",
    prompt: "A corporation is incorporated in Delaware and is sued there.",
    answer: "personal",
    explanation: "This concerns the defendant corporation's connection to the state.",
  },
  {
    type: "Federal question",
    prompt: "The complaint alleges a violation of a federal employment law.",
    answer: "subject",
    explanation: "A claim created by federal law concerns Subject Matter Jurisdiction.",
  },
  {
    type: "Short fact",
    prompt: "The defendant agrees in writing to be sued in this state's courts.",
    answer: "personal",
    explanation: "The defendant's consent concerns authority over that defendant.",
  },
  {
    type: "Court authority",
    prompt: "The parties ask whether a state small claims court may hear a $90,000 dispute.",
    answer: "subject",
    explanation: "The question is whether that court may hear this kind and size of case.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Where does the defendant live, work, and conduct business?",
    answer: "personal",
    explanation: "These facts help identify the defendant's connections to a place.",
  },
  {
    type: "Court authority",
    prompt: "The lawyer checks whether only a probate court may hear the dispute.",
    answer: "subject",
    explanation: "This asks which court has authority to hear that type of case.",
  },
  {
    type: "Short fact",
    prompt: "The defendant owns a store and employs workers in the state where the lawsuit was filed.",
    answer: "personal",
    explanation: "Those facts concern the defendant's relationship with the state.",
  },
  {
    type: "Federal question",
    prompt: "The complaint alleges that a federal civil rights statute was violated.",
    answer: "subject",
    explanation: "A federal statutory claim concerns the federal court's authority to hear the case.",
  },
  {
    type: "Direct definition",
    prompt: "Which issue asks WHO the court may bind with its judgment?",
    answer: "personal",
    explanation: "Personal Jurisdiction is about the court's power over the defendant.",
  },
  {
    type: "Direct definition",
    prompt: "Which issue asks WHAT KIND OF CASE the court may decide?",
    answer: "subject",
    explanation: "Subject Matter Jurisdiction is about the category of case the court may hear.",
  },
  {
    type: "Short fact",
    prompt: "The defendant drove into the state and caused the collision involved in the lawsuit.",
    answer: "personal",
    explanation: "This concerns the defendant's connection to the state where suit was filed.",
  },
  {
    type: "Court authority",
    prompt: "A bankruptcy petition is filed in a court that does not hear bankruptcy cases.",
    answer: "subject",
    explanation: "The issue is whether that court may hear this type of case.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Did the defendant consent to this court's authority over the defendant?",
    answer: "personal",
    explanation: "Consent is relevant to the court's authority over the defendant.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Do the parties have different state citizenship, and is enough money at issue?",
    answer: "subject",
    explanation: "Those facts relate to federal diversity jurisdiction.",
  },
  {
    type: "Short fact",
    prompt: "An out-of-state defendant has never lived, worked, or done business in the forum state.",
    answer: "personal",
    explanation: "This concerns whether the defendant has a sufficient connection to the state.",
  },
  {
    type: "Court authority",
    prompt: "A federal court asks whether the complaint presents a federal question.",
    answer: "subject",
    explanation: "Federal-question authority is a form of Subject Matter Jurisdiction.",
  },
  {
    type: "Short fact",
    prompt: "The defendant's main office is in the state where the lawsuit was filed.",
    answer: "personal",
    explanation: "The location of the defendant's main office concerns authority over that defendant.",
  },
  {
    type: "Court authority",
    prompt: "A family court is asked to decide a patent infringement claim.",
    answer: "subject",
    explanation: "This asks whether that court has authority to hear that type of claim.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Did the defendant direct the conduct involved in the lawsuit toward this state?",
    answer: "personal",
    explanation: "The question examines the defendant's connection to the forum state.",
  },
  {
    type: "Federal question",
    prompt: "The only claim in the complaint is created by state contract law.",
    answer: "subject",
    explanation: "The source of the claim concerns what kind of case the court may hear.",
  },
  {
    type: "Short fact",
    prompt: "The defendant appears in court and does not object to the court's authority over the defendant.",
    answer: "personal",
    explanation: "This concerns the court's authority over the defendant, including possible consent.",
  },
  {
    type: "Court authority",
    prompt: "State law assigns this type of dispute exclusively to a specialized court.",
    answer: "subject",
    explanation: "The assignment concerns which court may hear this kind of case.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Where was the defendant when formal service was delivered?",
    answer: "personal",
    explanation: "That fact concerns the court's authority over the defendant.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Is the lawsuit within the limited types of cases this court is allowed to decide?",
    answer: "subject",
    explanation: "This asks about the court's authority to hear the category of case.",
  },
  {
    type: "Short fact",
    prompt: "The defendant shipped the product involved in the lawsuit into the forum state.",
    answer: "personal",
    explanation: "This fact concerns the defendant's connection to the forum state.",
  },
  {
    type: "Federal question",
    prompt: "The complaint seeks relief under the United States Constitution.",
    answer: "subject",
    explanation: "A federal constitutional claim concerns federal Subject Matter Jurisdiction.",
  },
  {
    type: "Direct definition",
    prompt: "Does the court have authority over the particular defendant being sued?",
    answer: "personal",
    explanation: "Authority over the particular defendant is a question of Personal Jurisdiction.",
  },
  {
    type: "Diversity",
    prompt: "The plaintiff is a citizen of Ohio, the defendant is a citizen of Kentucky, and the plaintiff seeks $90,000.",
    answer: "subject",
    explanation: "These facts relate to whether a federal court can hear the case based on diversity jurisdiction.",
  },
  {
    type: "Short fact",
    prompt: "The lawsuit arises from repair work the defendant performed in the state where suit was filed.",
    answer: "personal",
    explanation: "This concerns the defendant's connection to the forum and to the lawsuit.",
  },
  {
    type: "Diversity",
    prompt: "Both parties are citizens of Pennsylvania, and the lawyer asks whether diversity jurisdiction exists.",
    answer: "subject",
    explanation: "The parties' citizenship concerns the federal court's Subject Matter Jurisdiction.",
  },
  {
    type: "Consent",
    prompt: "The defendant signed a contract agreeing that disputes would be heard in this state's courts.",
    answer: "personal",
    explanation: "The defendant's agreement concerns the court's authority over that defendant.",
  },
  {
    type: "Federal question",
    prompt: "The complaint alleges patent infringement under federal law.",
    answer: "subject",
    explanation: "A claim created by federal law concerns the federal court's authority to hear the case.",
  },
  {
    type: "What should the lawyer investigate?",
    prompt: "Was the defendant formally served while visiting the state where the lawsuit was filed?",
    answer: "personal",
    explanation: "Service while the defendant is in the state concerns authority over that defendant.",
  },
  {
    type: "Court authority",
    prompt: "A court may hear claims up to $15,000, but the complaint seeks $25,000.",
    answer: "subject",
    explanation: "The amount limit concerns whether that court may hear the case.",
  },
  {
    type: "Short fact",
    prompt: "The defendant company operates a warehouse and employs workers in the state where it is sued.",
    answer: "personal",
    explanation: "Those facts concern the defendant company's connection to the forum state.",
  },
  {
    type: "Court authority",
    prompt: "A juvenile court is asked to decide an ordinary contract dispute between two businesses.",
    answer: "subject",
    explanation: "The issue is whether that court may hear this type of case.",
  },
  {
    type: "Direct definition",
    prompt: "The defendant challenges the court's authority over the defendant, not its authority over the type of claim.",
    answer: "personal",
    explanation: "A challenge to authority over the defendant concerns Personal Jurisdiction.",
  },
  {
    type: "Court authority",
    prompt: "The lawyer researches whether Congress authorized this federal court to hear the claim.",
    answer: "subject",
    explanation: "That question concerns the federal court's Subject Matter Jurisdiction.",
  },
];

function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function drawBalancedRound(random) {
  const eachType = ROUND_SIZE / 2;
  const personal = shuffle(cardBank.filter((card) => card.answer === "personal"), random).slice(0, eachType);
  const subject = shuffle(cardBank.filter((card) => card.answer === "subject"), random).slice(0, eachType);
  return shuffle([...personal, ...subject], random);
}

function cardSetKey(cards) {
  return cards.map((card) => card.prompt).sort().join("\n");
}

function createRound(random = Math.random, previousRound = []) {
  const previousKey = previousRound.length === ROUND_SIZE ? cardSetKey(previousRound) : "";
  let nextRound = drawBalancedRound(random);

  for (let attempt = 0; previousKey && cardSetKey(nextRound) === previousKey && attempt < 4; attempt += 1) {
    nextRound = drawBalancedRound(random);
  }

  if (previousKey && cardSetKey(nextRound) === previousKey) {
    const currentPrompts = new Set(nextRound.map((card) => card.prompt));
    const replacement = shuffle(
      cardBank.filter((card) => card.answer === nextRound[0].answer && !currentPrompts.has(card.prompt)),
      random,
    )[0];
    if (replacement) nextRound[0] = replacement;
  }

  return nextRound;
}

function labelFor(answer) {
  return answer === "personal" ? "Personal Jurisdiction" : "Subject Matter Jurisdiction";
}

if (typeof document !== "undefined") {
  const elements = {
    homeScreen: document.querySelector("#home-screen"),
    playScreen: document.querySelector("#play-screen"),
    endScreen: document.querySelector("#end-screen"),
    card: document.querySelector("#question-card"),
    questionText: document.querySelector("#question-text"),
    progress: document.querySelector("#progress"),
    answers: [...document.querySelectorAll(".answer-button")],
    feedback: document.querySelector("#feedback"),
    feedbackTitle: document.querySelector("#feedback-title"),
    feedbackText: document.querySelector("#feedback-text"),
    startButton: document.querySelector("#start-button"),
    nextButton: document.querySelector("#next-button"),
    finalScore: document.querySelector("#final-score"),
    playAgainButton: document.querySelector("#play-again-button"),
  };

  let round = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;

  function renderCard() {
    const card = round[currentIndex];
    answered = false;
    elements.questionText.textContent = card.prompt;
    elements.progress.textContent = `${currentIndex + 1} of ${ROUND_SIZE}`;
    elements.feedback.hidden = true;
    elements.feedback.className = "feedback";

    elements.answers.forEach((button) => {
      button.disabled = false;
      button.classList.remove("is-correct", "is-wrong");
    });

    elements.card.focus({ preventScroll: true });
  }

  function answerCard(choice) {
    if (answered) return;
    answered = true;

    const card = round[currentIndex];
    const isCorrect = choice === card.answer;
    if (isCorrect) correctCount += 1;

    elements.answers.forEach((button) => {
      button.disabled = true;
      const buttonAnswer = button.dataset.answer;
      if (buttonAnswer === card.answer) button.classList.add("is-correct");
      if (buttonAnswer === choice && !isCorrect) button.classList.add("is-wrong");
    });

    elements.feedbackTitle.textContent = isCorrect
      ? "Correct."
      : `Not quite. This is ${labelFor(card.answer)}.`;
    elements.feedbackText.textContent = card.explanation;
    elements.feedback.hidden = false;
    elements.nextButton.textContent = currentIndex === ROUND_SIZE - 1 ? "See Results" : "Next Card";
    elements.nextButton.focus({ preventScroll: true });
  }

  function finishRound() {
    elements.playScreen.hidden = true;
    elements.endScreen.hidden = false;
    document.body.dataset.screen = "end";
    elements.finalScore.textContent = `${correctCount} of ${ROUND_SIZE}`;

    elements.playAgainButton.focus({ preventScroll: true });
  }

  function nextCard() {
    if (!answered) return;
    if (currentIndex === ROUND_SIZE - 1) {
      finishRound();
      return;
    }
    currentIndex += 1;
    renderCard();
  }

  function startGame() {
    round = createRound(Math.random, round);
    currentIndex = 0;
    correctCount = 0;
    elements.homeScreen.hidden = true;
    elements.endScreen.hidden = true;
    elements.playScreen.hidden = false;
    document.body.dataset.screen = "play";
    renderCard();
  }

  elements.startButton.addEventListener("click", startGame);
  elements.answers.forEach((button) => {
    button.addEventListener("click", () => answerCard(button.dataset.answer));
  });
  elements.nextButton.addEventListener("click", nextCard);
  elements.playAgainButton.addEventListener("click", startGame);
  document.addEventListener("keydown", (event) => {
    if (!elements.playScreen.hidden && !answered && (event.key === "1" || event.key === "2")) {
      answerCard(event.key === "1" ? "personal" : "subject");
    } else if (!elements.playScreen.hidden && answered && event.key === "Enter") {
      nextCard();
    }
  });

  elements.startButton.focus({ preventScroll: true });
}

if (typeof module !== "undefined") {
  module.exports = { ROUND_SIZE, cardBank, shuffle, createRound, labelFor };
}
