import './App.css';
import Player from './components/Player';
import { React, useState } from 'react';

function App() {
  let [newWidth, setWidth] = useState("800");
  let [newHeight, setHeight] = useState("450");
  let [testFile, setTestFile] = useState("");

  function resize() {
    let chooseWidth = prompt("Enter new width for video player");
    let chooseHeight = prompt("Enter new height for video player");
    if (chooseWidth !== null) {
      setWidth(chooseWidth);
    }
    if (chooseHeight !== null) {
      setHeight(chooseHeight);
    }
  }
  function load() {
    let chooseURL = prompt("Enter new url for video player");
    if (chooseURL !== null && chooseURL.substring(chooseURL.length - 4) === ".mp4") {
      setTestFile(chooseURL)
    }
  }
  return (
    <div>
      <Player
        width={newWidth}
        height={newHeight}
        testFile={testFile}
      />
      <div id="app-buttons">
        <input id="resize-button"
               type="button"
               onClick={resize}
               value="CLICK HERE TO RESIZE PLAYER"
        />
        <input id="load-button"
               type="button"
               onClick={load}
               value="CLICK HERE TO LOAD VIDEO"
        />
      </div>
    </div>
  );
}

export default App;
