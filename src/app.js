import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
  const [steps, setSteps] = useState(data);
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const handleBackStep = () => {
    if (currentStep.id !== steps[0].id) {
      // На всякий случай добавил проверку, хоть она и есть на 59 строке
      setCurrentStep(
        steps.find((e) => Number(e.id) === Number(currentStep.id) - 1)
      );
    }
  };

  const handleForwardStep = () => {
    if (currentStep.id === steps[steps.length - 1].id) {
      setCurrentStep(steps[0]);
    } else {
      setCurrentStep(
        steps.find((e) => Number(e.id) === Number(currentStep.id) + 1)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>{currentStep.content}</div>
          <ul className={styles["steps-list"]}>
            {steps.map(({ id, title, content }) => {
              return (
                <li
                  className={
                    styles["steps-item"] +
                    " " +
                    (id <= currentStep.id ? styles.done : "") +
                    " " +
                    (currentStep.id === id ? styles.active : "")
                  }
                  key={id}
                  onClick={() => setCurrentStep({ id, title, content })}
                >
                  <button className={styles["steps-item-button"]}>
                    {Number(id)}
                  </button>
                  {title}
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              disabled={currentStep.id === steps[0].id ? true : false}
              onClick={handleBackStep}
            >
              Назад
            </button>
            <button className={styles.button} onClick={handleForwardStep}>
              {currentStep.id === steps[steps.length - 1].id
                ? "Начать сначала"
                : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
