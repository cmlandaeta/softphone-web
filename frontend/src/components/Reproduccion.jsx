import React, { useEffect, useState, useRef } from "react";
import start from "../tonos/bienvenida.mp3";
// import cuatro from "../audios/solicitudid.wav";
// import idinvalido from "../audios/IDinvalido.mp3";
// import idsuspendido from "../audios/IDsuspendido.mp3";
// import msjticket from "../audios/dejarmsjparaelticket+beep.mp3";
// import beep from "../audios/tono.mp3";
// import postmsj from "../audios/mensajeluegodecrearunticket.mp3";
// import "../styles/style.css";

const Reproduccion = (props) => {
  // let audioId = `audio-${Date.now()}---` + props.audio;

  const [audioSource, setAudioSource] = useState(props.audio);
  const [detenerAudio, setDetenerAudio] = useState(false);
  const [audioId, setAudioId] = useState();

  const audioRef = useRef();

  useEffect(() => {
    if (props.audio) {
      setAudioSource(
        props.audio === "4"
          ? cuatro
          : props.audio === "5"
          ? start
          : props.audio === "6"
          ? idinvalido
          : props.audio === "7"
          ? idsuspendido
          : props.audio === "8"
          ? msjticket
          : props.audio === "0"
          ? beep
          : props.audio === "9"
          ? postmsj
          : props.audio === "colgar"
          ? setDetenerAudio() || setAudioId()
          : ""
      );
    }
  }, [props.audio]);

  useEffect(() => {
    // Si audioSource está presente, intenta reproducir el audio
    if (audioSource) {
      audioRef.current.play();
    }
  }, [audioSource]);

  useEffect(() => {
    if (detenerAudio) {
      audioRef.current.pause();
      audioRef.currentTime = 0;
    }
  }, [detenerAudio]);

  useEffect(() => {
    if (audioId) {
      audioRef.current.pause();
      audioRef.currentTime = 0;
    }
  }, [audioId]);

  return (
    <>
      {audioSource && (
        <audio
          ref={audioRef}
          id={audioId}
          data-ticket={audioId}
          className="repro"
          controls
        >
          <source src={audioSource} type="" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      )}
    </>
  );
};

export default Reproduccion;
