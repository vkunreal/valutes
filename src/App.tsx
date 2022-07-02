import { useEffect, useRef, useState } from "react";
import { ICourses } from "./interfaces";
import currencyTransfer from "./currencyTransfer";
import axios from "axios";
import "./App.scss";

const App: React.FC = () => {
  const [currency, setCurrency] = useState<number | string>(0);

  const [selectedValute1, setSelectedValute1] = useState("USD");
  const [selectedValute2, setSelectedValute2] = useState("RUB");

  const [courses, setCourses] = useState<ICourses | {}>({});

  const resultRef = useRef<HTMLDivElement | null>(null);

  // get data about courses
  useEffect(() => {
    axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => setCourses(res.data.Valute));
  }, []);

  // focus
  const handleFocus = () => setCurrency("");

  // change currency
  const handleChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCurrency(Number(e.target.value));

  // change selected valute 1
  const handleChangeSelectedValute1 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => setSelectedValute1(e.target.value);

  // change selected valute 2
  const handleChangeSelectedValute2 = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => setSelectedValute2(e.target.value);

  // calculating valute transfer
  useEffect(() => {
    if (resultRef.current) {
      const result = currencyTransfer(
        courses,
        currency,
        selectedValute1,
        selectedValute2
      );

      resultRef.current.innerText = result + " " + selectedValute2;
    }
  }, [currency, selectedValute1, selectedValute2, courses]);

  return (
    <div className="app">
      <div className="app-wrapper">
        <h1 className="app-header">Valute:</h1>

        <input
          className="app-input"
          type="number"
          step="any"
          value={currency}
          onChange={handleChangeCurrency}
          onFocus={handleFocus}
        />

        <div className="app-selectors">
          <select
            className="app-select"
            value={selectedValute1}
            onChange={handleChangeSelectedValute1}
          >
            <option>RUB</option>

            {Object.keys(courses).map((course) => (
              <option key={course}>{course}</option>
            ))}
          </select>

          <select
            className="app-select"
            value={selectedValute2}
            onChange={handleChangeSelectedValute2}
          >
            <option>RUB</option>

            {Object.keys(courses).map((course) => (
              <option key={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="app-result" ref={resultRef}>
          0
        </div>
      </div>
    </div>
  );
};

export default App;
