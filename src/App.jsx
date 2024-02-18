import { useEffect } from "react";
import "./App.css";
import { useRef } from "react";
import { useState } from "react";

function App() {
  const emptyArray = ["", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArray);
  const [missedcode, setMissedcode] = useState(emptyArray);
  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handleInputs = (e, index) => {
    const val = e.target.value;
    if (!Number(val)) {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }
    let copyInputs = [...inputs];
    copyInputs[index] = val;

    setInputs(copyInputs);
  };

  const handleKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      let copyinputs = [...inputs];
      copyinputs[index] = "";
      setInputs(copyinputs);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePast = (e, index) => {
    let data = e.clipboardData.getData("text");
    if (!Number(data) || data === inputs.length) {
      return;
    }
    let copydata = data.split("");
    setInputs(copydata);
    refs[inputs.length - 1].current.focus();
  };

  const handleSubmit = () => {
    const missed = inputs
      .map((item, i) => {
        if (item === "") return i;
      })
      .filter((item) => item || item == 0);

    setMissedcode(missed);

    // console.log(missed);
  };

  console.log(missedcode);

  return (
    <>
      <div className="wrapper">
        <h1>Two factor code input</h1>
        <div>
          {emptyArray.map((item, i) => (
            <input
              key={i}
              ref={refs[i]}
              value={inputs[i]}
              onChange={(e) => handleInputs(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={(e) => handlePast(e, i)}
              type="text"
              maxLength={1}
              className={
                missedcode.includes(i) ? "inputsbox error" : "inputsbox"
              }
            />
          ))}
        </div>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
