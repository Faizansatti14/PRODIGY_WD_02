import React, { useEffect, useState } from 'react';
import '../components/stopwatch.css';

const Stopwatch = () => {
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [second, setSecond] = useState(0);
    const [milisecond, setMilisecond] = useState(0);
    const [stop, setStop] = useState(true);
    const [laps, setLaps] = useState([]);

    // Add functionality to update the stopwatch time here.
    const handleStart = () => {
        setStop(false);
        //setMilisecond(milisecond+1);
    }

    const handleReset=()=>{
        setStop(true);
        setHour(0);
        setMin(0);
        setSecond(0);
        setMilisecond(0);
        setLaps([]);
    }

    const handleStop=()=>{
        setStop(true);
    }

    const handleLap = () => {
        if (!stop) {
            setLaps([...laps, `${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')} : ${milisecond.toString().padStart(2, '0')}`]);
        }
    }

    useEffect(()=>{
        let interval =null;
        if(!stop){
            interval = setInterval(() => {
                if(min>59){
                    setHour(hour+1);
                    setMin(0);
                    clearInterval(interval);
                }

                if(second>59){
                    setMin(min+1);
                    setSecond(0);
                    clearInterval(interval);
                }

                if(milisecond >85){
                    setSecond(second+1);
                    setMilisecond(0);
                    clearInterval(interval);
                }
                if(milisecond<=85){
                    setMilisecond(milisecond+1);
                }
            },5)
        }
        else{
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    })

    return (
        <div className='timer'>
        <h1>Stop Watch</h1>
        <h2>{`${hour.toString().padStart(2, '0')} : ${min.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')} : ${milisecond.toString().padStart(2, '0')}`}</h2>
        <div>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleLap} disabled={stop}>Lap</button>
        </div>
        <div className='laps'>
            <h1>Laps</h1>
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{lap}</li>
                ))}
            </ul>
        </div>
    </div>
    );
};

export default Stopwatch;
