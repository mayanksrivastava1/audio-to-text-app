import React, { useState, useEffect } from 'react';

const AudioToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser.');
    }
  }, []);

  let recognition;

  const startRecording = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');

      setTranscription(transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        console.log('No speech detected.');
      } else {
        console.error('Error occurred in recognition:', event.error);
      }
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.onend = null; // Avoid onend event from being triggered after stopping
      recognition.stop();
    }
  };

  return (
    <div>
      <h1>Audio to Text</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <div>
        <h2>Transcription:</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
};

export default AudioToText;
