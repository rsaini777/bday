"use client";

import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const videoId = 'Jov7W06z_3M';
    const baseSrc = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=0&loop=1&playlist=${videoId}`;

    const toggleMusic = () => {
        if (!iframeRef.current) return;
        
        if (isPlaying) {
            iframeRef.current.src = "about:blank";
            setIsPlaying(false);
        } else {
            iframeRef.current.src = baseSrc;
            setIsPlaying(true);
        }
    };

    return (
        <div className="fixed bottom-8 left-8 z-[100] bg-white px-5 py-3 rounded-full shadow-xl flex items-center gap-4 border-2 border-pink-400 group">
            <div className="overflow-hidden w-px h-px fixed bottom-0 right-0 opacity-0 pointer-events-none">
                <iframe 
                    ref={iframeRef}
                    width="100" height="100" 
                    src="" 
                    frameBorder="0" 
                    allow="autoplay; encrypted-media"
                />
            </div>
            <button 
                onClick={toggleMusic} 
                className="text-2xl transition hover:scale-110 active:scale-95"
            >
                {isPlaying ? '⏸️' : '🎵'}
            </button>
            <div className="flex items-end gap-[2px] h-5">
                {[...Array(4)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-[3px] bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-[pulse-bar_0.5s_ease-in-out_infinite_alternate]' : 'h-1'}`}
                        style={{ animationDelay: `${i * 0.1}s`, height: isPlaying ? '15px' : '4px' }}
                    />
                ))}
            </div>
            <span className={`text-sm font-semibold text-pink-600 ${isPlaying ? 'animate-pulse' : ''}`}>
                {isPlaying ? 'PLAYING 🎶' : 'PAUSED'}
            </span>
            <style jsx>{`
                @keyframes pulse-bar {
                    0% { height: 5px; }
                    100% { height: 15px; }
                }
            `}</style>
        </div>
    );
};

export default MusicPlayer;
