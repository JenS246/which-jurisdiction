# Personal Jurisdiction or Subject Matter Jurisdiction?

A fast browser-based learning game for beginning paralegal students in Civil Litigation. Each card asks students to recognize whether a short fact or question concerns **Personal Jurisdiction** or **Subject Matter Jurisdiction**.

## How it works

- Each round draws 10 unique cards from a bank of 48.
- Every round includes five Personal Jurisdiction cards and five Subject Matter Jurisdiction cards.
- A spare opening screen leads directly into the first question.
- Students choose one of two large answer buttons and receive immediate feedback with a short explanation.
- Plain card progress is shown during play; the score appears at the end.
- Desktop and laptop layouts reserve feedback space so answering does not increase the page height or cause scrolling.
- **Play Again** draws and shuffles a new selection while avoiding the exact previous set when alternatives are available.
- No account, backend, database, analytics, or external dependency is used.

The teaching distinction stays intentionally narrow:

- **Personal Jurisdiction:** the court's authority over the defendant. Think **WHO / WHERE?**
- **Subject Matter Jurisdiction:** the court's authority to hear the type of case. Think **WHAT KIND OF CASE?**

This is an introductory recognition exercise, not a detailed jurisdiction analysis or legal advice.

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Test

Requires Node.js 18 or newer.

```bash
npm test
npm run check
```

The test suite validates the 48-card bank, equal category balance, diversity wording, unique prompts, replay variation, and 100 shuffled balanced rounds.

## Add or edit cards

Edit the `cardBank` array near the top of `app.js`. Each card has four fields:

```js
{
  type: "Short fact",
  prompt: "The defendant lives in Pennsylvania and is sued in Pennsylvania.",
  answer: "personal",
  explanation: "This concerns the court's authority over the defendant.",
}
```

Use `personal` or `subject` for `answer`. Keep the two categories balanced and use short, unambiguous prompts suitable for beginning students.

## Keyboard and accessibility

- `1` selects Personal Jurisdiction.
- `2` selects Subject Matter Jurisdiction.
- `Enter` advances after feedback.
- Native buttons, visible focus rings, an ARIA live feedback region, large touch targets, and color-independent labels support keyboard and screen-reader use.
- Layouts adapt to phones, tablets, and desktop screens.
- A high-contrast paper-like palette keeps the exercise visually close to a printed classroom handout.
- The home screen uses restrained CSS-only margin and ruled-paper lines; gameplay remains undecorated.
- Reduced-motion preferences disable nonessential transitions.

## Publish with GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the repository as a static GitHub Pages site whenever `main` is updated.

1. Push this project to a public GitHub repository.
2. In the repository, open **Settings > Pages**.
3. Choose **GitHub Actions** as the source.
4. Run the **Deploy static site to Pages** workflow or push to `main`.

## Important URLs and services

- Production site: https://jens246.github.io/which-jurisdiction/
- Source repository: https://github.com/JenS246/which-jurisdiction
- Hosting: GitHub Pages
- Backend services: none
- Persistent data: none
- Backup and restore: clone the Git repository and redeploy the `main` branch

## License

MIT
