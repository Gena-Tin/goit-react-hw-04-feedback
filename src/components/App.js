import { useState } from 'react';
import css from './App.module.css';
import { Statistics } from './Section/Statistics/Statistics.jsx';
import { FeedbackOptions } from './Section/FeedbackOptions/FeedbackOptions.jsx';
import { Notification } from './Section/Notification/Notification.jsx';
import { Section } from './Section/Section.jsx';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = [ 'good', 'neutral', 'bad' ];

  const onLeaveFeedback = option => {
    switch (option) {
      case options[0]:
        setGood(prevState => prevState + 1);
        break;
      case options[1]:
        setNeutral(prevState => prevState + 1);
        break;
      case options[2]:
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return Math.round((100 / countTotalFeedback()) * good) || 0;
  };

  return (
    <div className={css.feedbackSection}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
  );
}