"use client";

import React, { useEffect, useState } from 'react';

const HeartBackground = () => {
    const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; opacity: number }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newHeart = {
                id: Date.now(),
                left: Math.random() * 100 + 'vw',
                duration: (Math.random() * 3 + 3) + 's',
                opacity: Math.random(),
            };
            setHearts(prev => [...prev.slice(-20), newHeart]);
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="absolute text-pink-400 text-xl animate-heart-float"
                    style={{
                        left: heart.left,
                        animationDuration: heart.duration,
                        opacity: heart.opacity,
                        bottom: '-50px'
                    }}
                >
                    ❤️
                </div>
            ))}
            <style jsx global>{`
                @keyframes heart-float {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
                }
                .animate-heart-float {
                    animation: heart-float linear forwards;
                }
            `}</style>
        </div>
    );
};

export default HeartBackground;
