import React from 'react';
import { useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js'


const AudioVisualizer = (props) => {
    const audioRef = useRef();

    useEffect(()=>{
    if (audioRef.current){
        let audioTrack = wavesurfer.create({
            container: audioRef.current,
        });
        audioTrack.load(props.link);
        return () => {
            audioTrack.destroy();
          };
    }
    },[props.link])

    return (<div style={{minWidth: "200px"}} className='audio' ref={audioRef}>
            </div>)
}

export default AudioVisualizer;
