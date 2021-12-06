 const data = {
    title: "Node.js Assessment",
    questions: [
        {
        question: "What is one way to check that a value is a date in Node?",
        timeInSec: 135,
        options: [
            {
            value: "util.date(value)",
            correct: false
            },
            {
            value: "assert.isDate(value)",
            correct: false
            },
            {
            value: "util.types.isDate(value)",
            correct: true
            },
            {
            value: "console.isDate(value)...",
            correct: false
            }
        ]
        },
        {
        question: "When a JavaScript function is invoked in Node, where is a new frame placed?",
        timeInSec: 90,
        options: [
            {
            value: "the call stack",
            correct: true
            },
            {
            value: "the event loop",
            correct: false
            },
            {
            value: "the poll phase",
            correct: false
            },
            {
            value: "the events queue",
            correct: false
            }
        ]
        },

        {
        question: "Which of the following is a core module in Node?",
        timeInSec: 45,
        options: [
            {
            value: "webpack",
            correct: false
            },
            {
            value: "crypto",
            correct: true
            },
            {
            value: "request",
            correct: false
            },
            {
            value: "console.isDate(value)...",
            correct: true
            }
        ]
        },
        {
         question: "What is the API that is designed to insulate Addons from changes in the underlying JavaScript engine?",
         timeInSec: 12,
         options: [
            {
             value: "A-API",
             correct: false
                },
                {
                value: "Z-API",
                correct: false
                },
                {
                value: "N-API",
                correct: true
                },
                {
                value: "X-API",
                correct: false
                }
            ]
            }
    ]
};

  export default data;