import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook
  const passwordRef = useRef(null);

  // usecallable is used to memoize the function so that it doesn't get recreated on every render
  // this is important for performance optimization
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
    console.log(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const debouncedSetLength = useCallback(
    debounce((newLength) => setLength(newLength), 300),
    []
  );

  // useEffect is used to call the passwordGenerator function whenever the length, numberAllowed or characterAllowed state changes
  useEffect(() => {
    passwordGenerator();
    // return () => {
    //   passwordGenerator();
    // }
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800">
        <div className="flex shadow rounded-lg bg-gray-900 overflow-hidden mb-4">
          {/* <label htmlFor='length'>Length</label> */}
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            id="length"
            readOnly
            ref={passwordRef}
          />
          {/* what to copy, which input field, selection range, browser clipboard access */}
          <button
            className="outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0"
            // onClick={() => navigator.clipboard.writeText(password)}
            onClick={copyPasswordToClipboard}

          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              // onChange={(e) => setLength(e.target.value)}
              onChange={(e) => debouncedSetLength(Number(e.target.value))}
              id="length"
              className="outline-none w-full py-1 px-3"
            />
            <label htmlFor="length">Length {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="numberInput"
              className="outline-none w-full py-1 px-3"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              id="charInput"
              className="outline-none w-full py-1 px-3"
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
