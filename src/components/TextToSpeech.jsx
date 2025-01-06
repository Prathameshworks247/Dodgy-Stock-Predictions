// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { HfInference } from '@huggingface/inference';

// const TextToSpeech = ({ text }) => {
//   const [speechUrl, setSpeechUrl] = useState(null);
//   const hf = new HfInference(import.meta.env.VITE_HF_TOKEN); // Ensure your token is set in the environment variables

//   useEffect(() => {
//     const fetchSpeech = async () => {
//       try {
//         const response = await hf.textToSpeech({
//           inputs: text,
//           model: 'espnet/kan-bayashi_ljspeech_vits',
//         });

//         const url = URL.createObjectURL(response);
//         setSpeechUrl(url);
//       } catch (error) {
//         console.error('Error fetching speech:', error);
//       }
//     };

//     if (text) {
//       fetchSpeech();
//     }
//   }, [text, hf]);

//   return (
//     <div>
//       {speechUrl ? (
//         <audio id="speech" controls src={speechUrl} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// TextToSpeech.propTypes = {
//   text: PropTypes.string.isRequired,
// };

// export default TextToSpeech;
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;

    loadVoices();
  }, []);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const defaultVoice = availableVoices.find(
        (voice) => voice.name === 'Google US English' 
      );
      setSelectedVoice(defaultVoice || availableVoices[0]);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };
  speak();
  return (
    <div>
    </div>
  );
};

export default TextToSpeech;
