import {useState, useEffect} from 'react';

import OptionGroup from './components/OptionGroup';
import data from './data';
import './App.css';

function App() {

  const [questions, setQuestions] = useState(null);
  const [title, setTitle] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [chosenOption, setChosenOption] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(null);
  const [displayTimer, setDisplayTimer] = useState(null);


  // useEffect(()=> {

  //   if(!questions) {
  //     return;
  //   }
  //   console.log(questionNumber);
  //   setTimer(questions[questionNumber - 1].timeInSec);
  // }, [questions, questionNumber]);

  const formatTime = time => {
    let secs = time % 60;
    let mins = Math.floor(time/60);

    if (mins < 10) {
      mins = `0${mins}`;
    }

    if (secs < 10) {
      secs = `0${secs}`; 
    }
    return `${mins}:${secs}`;
  }

  // const fetchData = async () => {
  //   await setQuestions(data);
  //   const timeInSecs = data[questionNumber].timeInSec;
  //   setTimer(timeInSecs);
  //   const formattedTime = formatTime(timeInSecs);
  //   setDisplayTimer(formattedTime);
  // }
  
  useEffect(()=> {
    setQuestions(data.questions);
    setTitle(data.title);
    const timeInSecs = data.questions[questionNumber - 1].timeInSec;
    setTimer(timeInSecs);
    const formattedTime = formatTime(timeInSecs);
    setDisplayTimer(formattedTime);
  }, []);

  useEffect(()=> {

    if(!questions) {
      return;
    }
    
    const interval = setInterval(() => {
      setTimer(timer => {
        const newTime = timer - 1;
        const formattedTime = formatTime(newTime);
        setDisplayTimer(formattedTime);

        return newTime;

      });

    }, 1000);

    if(isEnd) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [questions, isEnd]);

  const handleChange = (e) => {
    const correct = e.currentTarget.getAttribute('data-correct') === "true";
    const {value} = e.target;
    const option = {value, correct};
    setChosenOption(option);
  }


  const handleNext = (e) => {
     
    if (!chosenOption && timer > 0) {
      console.log("clicked but option not chosen and timer is greater than 0");
      return;
    }

    if(chosenOption && chosenOption.correct) {
      setScore(prev => prev + 1);
    }
    
    setChosenOption(null);

    if (questions && questionNumber === questions.length) {
      setIsEnd(true);
    } else {
      setQuestionNumber(prev => prev + 1); 
      setTimer(questions[questionNumber].timeInSec);
    }

  };

  if(timer === 0 && !isEnd) {
     handleNext();
  }

  let btnClass = "next-btn";
  let btnValue = "Next";

  if(chosenOption) {
    btnClass += " chosen";
  }

  if(questions && questionNumber === questions.length) {
    btnValue = "Finish";
  } 

  const dataQuestion = questionNumber - 1;

  return (
    <div className="app">
      <div className="assessment">
        {!questions ? <h2 className="loading">Loading...</h2> : <> 
        <h2 className="assessment-title">{title}</h2>
        {isEnd ? <h2 className="scoreboard">Your score is {score}/{questions.length}</h2> : (
          <>
          <div className="question-and-options">
          <div className="question-div">
          <p className="question">{questions[dataQuestion].question}</p>
          </div>
        
           <div className="options">
             {questions[dataQuestion].options.map((option, index)=> (
               <OptionGroup 
                 option={option} 
                 key={option.value} 
                 index={index}
                 handleChange={handleChange}
                 />
             ))} 
           </div>
        </div>
        <div className="question-info">
          <h5>Something wrong with this question? <b>Give feedback</b></h5>
          <div className="progress-bar">
            <progress className="questions-bar" max={questions.length} value={questionNumber}/>
          </div>
          <div className="question-details">
            <div className="question-and-timer">
              <span className="questions-attempted">Q{questionNumber}/{questions.length}&nbsp;&nbsp;</span>
              <span className="countdown-timer">&nbsp;&nbsp;{displayTimer}</span>
            </div>
            <div className="next-button">
              <button type="button" className={btnClass} onClick={handleNext}>{btnValue}</button>
            </div>
          </div>
        </div>
        </>
        ) } 
        </>}
      </div>
   
    </div>
  );
}

export default App;


// <a
// className="App-link"
// href="https://reactjs.org"
// target="_blank"
// rel="noopener noreferrer"
// >