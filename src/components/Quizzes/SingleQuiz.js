import React from 'react';

const SingleQuiz = ({ quiz, index }) => {

    const { question, options } = quiz;

    let quizOption;
    if (options.length > 0) {
        quizOption = options.map(o => <label key={Math.random()}>
            <input type="checkbox" id="option1_q1" />{o.option}
        </label>)
    }

    return (

        <div className="quiz">
            <h4 className="question">
                Quiz {index + 1}  - {question}
            </h4>
            <form className="quizOptions">
                {quizOption}
            </form>
        </div>

    );
};

export default SingleQuiz;