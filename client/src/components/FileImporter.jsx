import React from 'react';
import { useDropzone } from 'react-dropzone';

const timeConverter = (time) => {
  const re = /(\d\d:\d\d:\d\d)/g; // format: 00:00:00
  if (!re.test(time)) return alert("Time format is incorrect. Please upload a CSV file exported from Toggl");
  const hms = time.split(':');
  const hours = parseInt(hms[0], 10) * 60;
  const minutes = parseInt(hms[1], 10);
  const seconds = parseInt(hms[2], 10) / 60;
  const totalMinutes = hours + minutes + seconds;
  return totalMinutes;
}

const FileImporter = ({ setClients }) => {
  const tempClients = {};

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // only accept one file
    if (file.type !== "text/csv") return alert("Please upload a CSV file");
    const reader = new FileReader();
    reader.onabort = () => console.log('File reading was aborted');
    reader.onerror = () => console.log('File reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      const lines = typeof binaryStr == 'string' ? binaryStr.split(/\r?\n/) : [];
      lines.splice(0, 1)[0]; // remove header row
      if (lines[lines.length - 1] === '') lines.pop(); // if last row is empty, remove it
      lines.forEach((line) => {
        const inputs = line.split(',').map((i) => i.replaceAll('"', '')); // get each cell and remove quotes around it
        if (tempClients[inputs[3]]) {
          tempClients[inputs[3]] += timeConverter(inputs[inputs.length - 2]); // add converted time to current value stored
        }
        else {
          tempClients[inputs[3]] = timeConverter(inputs[inputs.length - 2]); // if no value is currently stored, set it to converted time
        }
      });
      for (let client in tempClients) {
        tempClients[client] = tempClients[client].toFixed(0); // round to 2 dp
      }
      setClients(tempClients);
    }
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="importer">
      <input {...getInputProps()} />
      <p>Click or drag a file here to upload an exported CSV file from Toggl</p>
    </div>
  )
}

export default FileImporter;