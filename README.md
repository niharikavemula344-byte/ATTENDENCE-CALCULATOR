# Attendance Planner

I made this calculator for a question students often have: “How many classes do I need to attend, or how many can I miss, and still reach my target?” It runs completely in the browser and does not store any attendance data.

## What it can calculate

- Configurable attendance target from 60% to 90%
- Clear validation for impossible or incomplete values
- Calculates classes required to reach the target
- Calculates classes that may be missed while staying above the target
- Keyboard-friendly and responsive interface
- No server, account, or data collection

## Built with

- Semantic HTML5
- CSS3
- Vanilla JavaScript

## Run locally

Clone the repository and open `index.html` in a modern browser. No build step is required.

```bash
git clone https://github.com/niharikavemula344-byte/ATTENDENCE-CALCULATOR.git
cd ATTENDENCE-CALCULATOR
```

## How the calculation works

If current attendance is below the target, the app solves `(present + x) / (total + x) >= target`. If attendance is already at or above the target, it calculates the maximum additional absences that preserve the target percentage.

## Privacy

All calculations happen locally in the browser. No attendance information is stored or transmitted.
