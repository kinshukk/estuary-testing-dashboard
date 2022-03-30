import logo from './opsci_logo.png';
import './App.css';

import Dropzone from 'react-dropzone'
import { useState } from 'react'

function App() {
    const estuary_endpoints = [
        "https://shuttle-4.estuary.tech/content/add",
        "https://shuttle-4.estuary.tech/content/add",
        "https://api.estuary.tech/content/add"
    ]

    const [debug, setDebug] = useState(["DEBUG LOGS ..."])

    const AUTH = "ADD_KEY_HERE"

    const logDebug = (line) => {
        console.log(line)

        const t = debug.slice()
        t.push(line)
        setDebug(t)

        console.log(debug)
    }

    const handleUpload = (acceptedFiles) => {
        logDebug(acceptedFiles)

        const formData  = new FormData()
        formData.append("data", acceptedFiles[0])

        logDebug("sending request for file")
        fetch('https://shuttle-4.estuary.tech/content/add', {
          method: "POST",
          headers: {
            Authorization: AUTH,
          },
          body: formData
        })
        .then(response => response.json())
        .then(json_response => { // returns a second promise for some reason
            logDebug("... response:")
            const json_res = json_response.toString().slice()
            logDebug(json_res)
            logDebug("\n\n")
        })
    }

    return (
        <>
            <div className="App">
              <header className="App-header">
                <p>
                    Estuary testing dashboard
                </p>
              </header>
            </div>

            <div style={{"min-height": "15vh"}}>
                <Dropzone onDrop={acceptedFiles => handleUpload(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                    )}
                </Dropzone>
            </div>

            <div style={{"background-color": "lightblue", "min-height": "70vh"}}>
                DEBUG AREA

                <div> {
                        debug.map(line => {
                            return <p>{line.toString()}</p>
                        })
                } </div>
            </div>
        </>
    );
}

export default App;
