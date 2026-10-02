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
    prompt: "The plaintiff is from Pennsylvania, the defendant is from New Jersey, and the plaintiff seeks $120,000.",
    answer: "subject",
    explanation: "These facts concern whether a federal court can hear the case based on diversity jurisdiction.",
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
];

function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function createRound(random = Math.random) {
  const eachType = ROUND_SIZE / 2;
  const personal = shuffle(cardBank.filter((card) => card.answer === "personal"), random).slice(0, eachType);
  const subject = shuffle(cardBank.filter((card) => card.answer === "subject"), random).slice(0, eachType);
  return shuffle([...personal, ...subject], random);
}

function labelFor(answer) {
  return answer === "personal" ? "Personal Jurisdiction" : "Subject Matter Jurisdiction";
}

if (typeof document !== "undefined") {
  const elements = {
    playScreen: document.querySelector("#play-screen"),
    endScreen: document.querySelector("#end-screen"),
    card: document.querySelector("#question-card"),
    questionType: document.querySelector("#question-type"),
    questionText: document.querySelector("#question-text"),
    cardNumber: document.querySelector("#card-number"),
    cardTotal: document.querySelector("#card-total"),
    score: document.querySelector("#score"),
    answers: [...document.querySelectorAll(".answer-button")],
    feedback: document.querySelector("#feedback"),
    feedbackLabel: document.querySelector("#feedback-label"),
    feedbackTitle: document.querySelector("#feedback-title"),
    feedbackText: document.querySelector("#feedback-text"),
    nextButton: document.querySelector("#next-button"),
    finalScore: document.querySelector("#final-score"),
    resultNote: document.querySelector("#result-note"),
    playAgainButton: document.querySelector("#play-again-button"),
  };

  let round = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;

  function renderCard() {
    const card = round[currentIndex];
    answered = false;
    elements.questionType.textContent = card.type;
    elements.questionText.textContent = card.prompt;
    elements.cardNumber.textContent = `Card ${currentIndex + 1}`;
    elements.score.textContent = `${correctCount} / ${currentIndex} correct`;
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

    elements.score.textContent = `${correctCount} / ${currentIndex + 1} correct`;
    elements.feedbackLabel.textContent = isCorrect ? "Correct" : "Not quite";
    elements.feedbackTitle.textContent = isCorrect
      ? labelFor(card.answer)
      : `The answer is ${labelFor(card.answer)}.`;
    elements.feedbackText.textContent = card.explanation;
    elements.feedback.classList.add(isCorrect ? "is-correct" : "is-wrong");
    elements.feedback.hidden = false;
    elements.nextButton.textContent = currentIndex === ROUND_SIZE - 1 ? "See Results" : "Next Card";
    elements.nextButton.focus({ preventScroll: true });
  }

  function finishRound() {
    elements.playScreen.hidden = true;
    elements.endScreen.hidden = false;
    elements.finalScore.textContent = `${correctCount} / ${ROUND_SIZE}`;

    if (correctCount === ROUND_SIZE) {
      elements.resultNote.textContent = "Excellent recognition. You kept the court's authority over the defendant separate from its authority over the type of case.";
    } else if (correctCount >= 8) {
      elements.resultNote.textContent = "Strong work. Keep using WHO / WHERE for the defendant and WHAT KIND OF CASE for the court's subject matter authority.";
    } else {
      elements.resultNote.textContent = "Keep practicing the core distinction: authority over the defendant versus authority to hear the type of case.";
    }

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
    round = createRound();
    currentIndex = 0;
    correctCount = 0;
    elements.cardTotal.textContent = ROUND_SIZE;
    elements.endScreen.hidden = true;
    elements.playScreen.hidden = false;
    renderCard();
  }

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

  startGame();
}

if (typeof module !== "undefined") {
  module.exports = { ROUND_SIZE, cardBank, shuffle, createRound, labelFor };
}
