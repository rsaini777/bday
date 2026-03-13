"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

const Heart = ({ left, duration, opacity }: { left: string; duration: string; opacity: number }) => (
  <div
    className="heart pointer-events-none"
    style={{
      left,
      animationDuration: duration,
      opacity,
      bottom: '-50px',
    }}
  >
    ❤️
  </div>
);

export default function BirthdayPage() {
  const [started, setStarted] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; opacity: number }[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favQuizStep, setFavQuizStep] = useState(1);
  const [isFavUnlocked, setIsFavUnlocked] = useState(false);
  const [currentFavSlide, setCurrentFavSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isQuizRewardShown, setIsQuizRewardShown] = useState(false);
  const [secretWord, setSecretWord] = useState('');
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLetterShown, setIsLetterShown] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const videoId = 'Jov7W06z_3M';
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Constants from index.html
  const journeyImages = [
    "/Rose/4DAA8943-68C7-4959-A944-DE05ACE5F225.JPG",
    "/Rose/IMG_6330.JPG",
    "/Rose/IMG_6635.JPG",
    "/Rose/e325a6cb-6e2f-4f8a-a1fd-fa83a3b3d928.JPG",
    "/Rose/966c08ef-8d41-4cd6-a28b-2412d7613481.JPG",
    "/Rose/IMG_6336.JPG",
    "/Rose/549598ca-8b2a-42ed-8bff-85e3f31db72a.JPG",
    "/Rose/66D03799-E138-4C9A-9C4F-8FF78502B373.JPG",
    "/Rose/IMG_5861.jpg",
    "/Rose/94fa7b23-973e-48f5-baa7-25eb2731db2e.JPG"
  ];

  const favImages = [
    { src: "/Rose/a92a31e3-a0f4-4672-a5d7-38a0b2d2262b.JPG", title: "Devotee of Krishna 🙏", desc: "Her heart belongs to the divine" },
    { src: "/Rose/8b8ea73a-8871-4846-bf14-48b2f1b9762d.JPG", title: "Born to Fly 🕊️", desc: "Her wings are her own" },
    { src: "/Rose/1691084f-2de1-4661-8b48-534f414a7c14.JPG", title: "Her Favourite Flower 🌷", desc: "As vibrant and graceful as her" },
    { src: "/Rose/c9406389-4a1c-4058-8d19-d5a68f821dfa.JPG", title: "Her Favourite Flower 🌷", desc: "As vibrant and graceful as her" },
    { src: "/Rose/IMG_6853.PNG", title: "Her Favourite Flower 🌷", desc: "As vibrant and graceful as her" }
  ];

  const galleryImages = [
    { src: "/Rose/IMG_6446.JPG", caption: "That Smile 😊" },
    { src: "/Rose/523d85e2-3fef-4012-92f8-41c0bc7e2ac3.JPG", caption: "Adventure Time 🌟" },
    { src: "/Rose/IMG_5493.jpg", caption: "Simply You 💕" },
    { src: "/Rose/67750693-6BEA-44C4-ADFF-70E46E1E3B34.JPG", caption: "Golden Hour 🌅" },
    { src: "/Rose/5b88b9b8-e5c5-4526-9416-a190d15160dd.JPG", caption: "Laughing Together 😄" },
    { src: "/Rose/90388090-FF95-4C53-99F4-95F89CF04AFD.JPG", caption: "My Favorite Person 🎀" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts(prev => [...prev.slice(-20), {
        id,
        left: Math.random() * 100 + 'vw',
        duration: (Math.random() * 3 + 3) + 's',
        opacity: Math.random()
      }]);
    }, 300);

    const scrollHandler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', scrollHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % journeyImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [started, journeyImages.length]);

  useEffect(() => {
    if (isFavUnlocked) {
      const interval = setInterval(() => {
        setCurrentFavSlide(prev => (prev + 1) % favImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isFavUnlocked, favImages.length]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#00b894']
    });
  };

  const startExperience = () => {
    setStarted(true);
    triggerConfetti();
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  const checkFavAnswer = (correct: boolean) => {
    if (correct) {
      triggerConfetti();
      if (favQuizStep < 3) {
        setFavQuizStep(favQuizStep + 1);
      } else {
        setIsFavUnlocked(true);
      }
    } else {
      alert("Try again! ❤️");
    }
  };

  const checkMainQuizAnswer = (correct: boolean) => {
    if (correct) {
      if (currentQuestion < 4) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsQuizRewardShown(true);
        triggerConfetti();
      }
    } else {
      alert("Try again! ❤️");
    }
  };

  const checkSecretWord = () => {
    const correctWords = ['forever', 'love', 'us', 'everything', 'you', 'soulmate'];
    if (correctWords.includes(secretWord.toLowerCase().trim())) {
      setIsSecretUnlocked(true);
      triggerConfetti();
      playKissEffect();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const playKissEffect = () => {
    const kissContainer = document.getElementById('kiss-container');
    if (!kissContainer) return;
    
    kissContainer.style.display = 'block';
    const kissEmojis = ['💋', '❤️', '😘', '💖', '🥰'];

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const kiss = document.createElement('div');
        kiss.className = 'kiss-3d';
        kiss.innerHTML = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
        kiss.style.left = Math.random() * 80 + 10 + '%';
        kiss.style.top = Math.random() * 80 + 10 + '%';
        kissContainer.appendChild(kiss);
        setTimeout(() => kiss.remove(), 1500);
      }, i * 200);
    }
    setTimeout(() => {
      if(kissContainer) kissContainer.style.display = 'none';
    }, 5000);
  };

  const openGift = () => {
    setIsLetterShown(true);
    triggerConfetti();
    playKissEffect();
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Start Overlay */}
      {!started && (
        <div id="start-overlay" className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 bg-pink-50 opacity-50"></div>
          <div className="relative z-10 scale-up">
            <h2 className="script-font text-6xl text-pink-600 mb-4">Are You Ready?</h2>
            <p className="text-gray-500 font-medium tracking-widest uppercase mb-12">To Enter Her Magical World</p>
            <button
              onClick={startExperience}
              className="w-48 h-48 rounded-full bg-pink-500 text-white font-bold flex flex-col items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white animate-[pulse_2s_infinite]"
            >
              <span className="text-xl">TAP TO</span>
              <span className="text-3xl">ENTER</span>
              <span className="text-3xl mt-2">🎂</span>
            </button>
          </div>
        </div>
      )}

      {/* Hearts Container */}
      <div id="hearts-container" className="fixed inset-0 pointer-events-none z-0">
        {hearts.map(h => (
          <Heart key={h.id} left={h.left} duration={h.duration} opacity={h.opacity} />
        ))}
      </div>

      {/* Music Player */}
      <div className="music-player">
        <button id="music-toggle" onClick={toggleMusic} className="text-2xl hover:scale-110 transition">
          {isMusicPlaying ? '⏸️' : '🎵'}
        </button>
        <div id="visualizer" className={`visualizer transition-opacity duration-500 ${isMusicPlaying ? 'opacity-100' : 'opacity-30'}`}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`bar ${isMusicPlaying ? 'animate-pulse-bar' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
        <span id="music-status" className={`text-xs font-bold text-pink-600 ${isMusicPlaying ? 'animate-pulse' : ''}`}>
          {isMusicPlaying ? 'PLAYING 🎶' : 'PAUSED'}
        </span>
        <iframe
          ref={iframeRef}
          id="youtube-player-frame"
          className="hidden"
          src={isMusicPlaying ? `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=0&loop=1&playlist=${videoId}` : undefined}
          allow="autoplay"
        ></iframe>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 px-4 py-3" style={{ borderBottom: '2px solid #fce7f3' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <h1 className="script-font text-2xl text-pink-600 font-bold whitespace-nowrap flex-shrink-0">Our Memories 💕</h1>
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar flex-1 justify-center">
            <a href="#home" className="nav-link">🏠 Home</a>
            <a href="#carousel" className="nav-link">🎞️ Moments</a>
            <a href="#divine" className="nav-link">🙏 Faith</a>
            <a href="#quiz" className="nav-link">🎯 Quiz</a>
            <a href="#gallery" className="nav-link">📸 Gallery</a>
            <a href="#special-key" className="nav-link">🗝️ Key</a>
            <a href="#secret-letter" className="nav-link">💌 Letter</a>
          </div>
          <button onClick={() => { triggerConfetti(); playKissEffect(); }} 
            className="hidden md:flex flex-shrink-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full hover:shadow-lg transition btn-shine text-sm font-bold whitespace-nowrap">
            🎉 Celebrate!
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 md:pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <div className="inline-block px-4 py-1 bg-pink-100 rounded-full text-pink-600 text-xs md:text-sm font-bold animate-bounce">🎂 OUR SPECIAL DAY</div>
          <h1 className="script-font responsive-title font-bold gradient-text leading-tight">Happy Birthday<br />My Love!</h1>
          <p className="text-gray-600 responsive-p max-w-lg leading-relaxed mx-auto md:mx-0">
            To the most beautiful person in my world. Every moment with you is a gift, and today we celebrate the incredible sunshine you bring into my life. ❤️
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition btn-shine">
              View Our Memories 📸
            </button>
            <button onClick={() => document.getElementById('secret-letter')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-white text-pink-600 border-2 border-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition">
              Read My Secret Letter 💌
            </button>
          </div>
        </div>
        <div className="md:w-1/2 relative group w-full">
          <div className="polaroid max-w-md mx-auto relative z-10 group-hover:rotate-0 transition-transform duration-500">
            <div className="relative h-[350px] md:h-[550px] w-full bg-gray-100 overflow-hidden">
              <Image src="/Rose/45ce391f-b11c-4b2f-b820-cc77636622cd.JPG" alt="Main Portrait" fill className="object-cover" priority />
            </div>
            <p className="script-font text-2xl md:text-3xl text-center py-6 text-gray-800">My Everything ✨</p>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-10 rounded-[3rem] bg-white shadow-2xl border-2 border-pink-50 transform hover:scale-105 transition-all duration-500">
            <h3 className="text-pink-500 font-bold tracking-widest uppercase mb-2">Days of Togetherness</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">277</span>
              <span className="text-5xl">❤️</span>
            </div>
            <p className="script-font text-4xl text-gray-700 mt-4">...and counting every second!</p>
          </div>
        </div>
      </section>

      {/* Journey Carousel */}
      <section id="carousel" className="py-24 px-6 bg-pink-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="script-font text-6xl text-center text-gray-800 mb-16">Our Journey in Motion 🎞️</h2>
          <div className="relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl ring-[0.5rem] md:ring-[1rem] ring-white">
            <div className="flex transition-transform duration-1000 cubic-bezier(0.65, 0, 0.35, 1)" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {journeyImages.map((src, i) => (
                <div key={i} className="min-w-full h-[350px] md:h-[650px] relative bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110" style={{ backgroundImage: `url(${src})` }}></div>
                  <div className="relative h-full w-full">
                    <Image src={src} alt={`Slide ${i}`} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentSlide((currentSlide - 1 + journeyImages.length) % journeyImages.length)} className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white text-2xl hover:bg-white/40 transition opacity-0 group-hover:opacity-100">❮</button>
            <button onClick={() => setCurrentSlide((currentSlide + 1) % journeyImages.length)} className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md text-white text-2xl hover:bg-white/40 transition opacity-0 group-hover:opacity-100">❯</button>
          </div>
        </div>
      </section>

      {/* Divine Section */}
      <section id="divine" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/2 divine-glow w-full">
            <div className="rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-yellow-100 relative group">
              <Image src="/Rose/IMG_6240.JPG" alt="Divine Krishna" width={600} height={800} className="w-full h-[400px] md:h-[750px] object-cover group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 p-8 text-center">
                <p className="text-white text-2xl script-font italic">"Radhe Radhe"</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left space-y-8">
            <h2 className="script-font text-8xl text-pink-600">Heart Full of Faith</h2>
            <h3 className="text-4xl font-semibold text-gray-800 italic">A Devotee of Shri Krishna Ji ✨</h3>
            <div className="h-1.5 w-32 bg-yellow-400 mx-auto md:mx-0"></div>
            <p className="text-2xl text-gray-700 leading-relaxed font-light">
              Her soul resonates with the divine melodies of the flute. In every prayer and every lotus, she finds a connection to the supreme.
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-600 bg-clip-text text-transparent italic">
              "Hare Krishna, Hare Rama"
            </p>
          </div>
        </div>
      </section>

      {/* Wings Section */}
      <section id="wings" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
            <span className="text-[400px] blur-md text-blue-200">🕊️</span>
          </div>
          <h2 className="script-font text-7xl text-blue-600 mb-8 z-10 relative">Wings to Soar</h2>
          <p className="text-3xl text-gray-600 mb-16 max-w-3xl mx-auto italic font-light">
            "She didn't wait for a plane; she grew her own wings to fly where her heart desired."
          </p>
          <div className="animate-float-wings mb-12 relative inline-block w-full px-4 md:px-0">
            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl max-w-4xl border-[0.5rem] md:border-[1rem] border-white mx-auto">
              <Image src="/Rose/Gemini_Generated_Image_k97rpqk97rpqk97r.png" alt="Wings" width={800} height={500} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 -right-4 md:-right-10 bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl ring-[0.25rem] md:ring-[0.5rem] ring-blue-50 flex items-center gap-4 md:gap-6">
              <div className="text-4xl md:text-6xl">🌤️</div>
              <div className="text-left">
                <p className="text-lg md:text-2xl font-bold text-blue-600">Boundless</p>
                <p className="text-xs md:text-sm text-gray-400">Limits don't exist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tulips Section */}
      <section id="tulips" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-pink-50/40 -z-10"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <span className="text-pink-500 font-bold tracking-[0.2em] uppercase block">Her Favorite Bloom</span>
            <h2 className="script-font text-7xl text-gray-800">The Beauty of Tulips</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light">
              Like a tulip after a long winter, she brings color and hope to everything she touches. Vibrant, graceful, and perfectly unique—just like her favorite flower.
            </p>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-3xl shadow-lg ring-4 ring-white">🌷</div>
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg ring-4 ring-white">🌸</div>
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-lg ring-4 ring-white">🌼</div>
            </div>
          </div>
          <div className="order-1 md:order-2 group">
            <div className="polaroid rotate-3 group-hover:rotate-0 transition-all duration-700 p-8">
              <div className="relative h-[600px] w-full rounded-sm overflow-hidden pb-12">
                <Image src="/Rose/pexels-souvenirpixels-1487010.jpg" alt="Tulips" fill className="object-cover" />
              </div>
              <p className="text-center script-font text-4xl text-gray-800 italic">Pure Grace 🌷</p>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-purple-50 via-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="script-font text-6xl text-gray-800 mb-4">Her World of Joy 💖</h2>
            <div className="h-1.5 w-24 bg-pink-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-500 text-xl font-light">Answer to unlock her favourite things... 🌟</p>
          </div>

          {!isFavUnlocked ? (
            <div className="space-y-10">
              {favQuizStep === 1 && (
                <div className="quiz-card animate-slide-in-up">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-14 h-14 rounded-full bg-pink-500 text-white font-bold text-2xl flex items-center justify-center">1</span>
                    <h3 className="text-2xl font-bold text-gray-800">Which god does she love and worship? 🙏</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button onClick={() => checkFavAnswer(false)} className="quiz-option-btn">A) Lord Shiva</button>
                    <button onClick={() => checkFavAnswer(true)} className="quiz-option-btn border-pink-400 bg-pink-50">B) Lord Krishna 🎶</button>
                  </div>
                </div>
              )}
              {favQuizStep === 2 && (
                <div className="quiz-card animate-slide-in-up">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-14 h-14 rounded-full bg-purple-500 text-white font-bold text-2xl flex items-center justify-center">2</span>
                    <h3 className="text-2xl font-bold text-gray-800">What is her dream? 🕊️</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button onClick={() => checkFavAnswer(true)} className="quiz-option-btn border-purple-400 bg-purple-50">A) Fly with her own wings 🦅</button>
                    <button onClick={() => checkFavAnswer(false)} className="quiz-option-btn">B) Sail the sea</button>
                  </div>
                </div>
              )}
              {favQuizStep === 3 && (
                <div className="quiz-card animate-slide-in-up">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-14 h-14 rounded-full bg-rose-500 text-white font-bold text-2xl flex items-center justify-center">3</span>
                    <h3 className="text-2xl font-bold text-gray-800">What is her favourite flower? 🌷</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button onClick={() => checkFavAnswer(false)} className="quiz-option-btn">A) Roses 🌹</button>
                    <button onClick={() => checkFavAnswer(true)} className="quiz-option-btn border-rose-400 bg-rose-50">B) Tulips 🌷</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-slide-in-up space-y-12">
              <div className="text-center">
                <p className="script-font text-4xl md:text-5xl text-pink-600">You know her perfectly! 💫</p>
              </div>
              <div className="relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl ring-[0.5rem] md:ring-[1rem] ring-white h-[450px] md:h-[650px] w-full">
                <div className="flex h-full transition-transform duration-1000 cubic-bezier(0.65, 0, 0.35, 1)" style={{ transform: `translateX(-${currentFavSlide * 100}%)` }}>
                  {favImages.map((fav, i) => (
                    <div key={i} className="min-w-full h-full relative">
                      <Image src={fav.src} alt={fav.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-end pb-16 px-10 text-center">
                        <h3 className="text-white text-6xl script-font mb-4">{fav.title}</h3>
                        <p className="text-white/80 text-xl uppercase tracking-widest">{fav.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
                  {favImages.map((_, i) => (
                    <button key={i} onClick={() => setCurrentFavSlide(i)} className={`w-3 h-3 rounded-full transition-all ${currentFavSlide === i ? 'bg-white w-8' : 'bg-white/40'}`}></button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-pink-50 border-2 border-pink-100 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-4xl md:text-5xl mb-4">💖</div>
            <div className="text-3xl md:text-4xl font-bold text-pink-600">277</div>
            <div className="text-gray-500 font-medium mt-2 text-sm md:text-base">Days of Love</div>
          </div>
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-purple-50 border-2 border-purple-100 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-4xl md:text-5xl mb-4">📸</div>
            <div className="text-3xl md:text-4xl font-bold text-purple-600">∞</div>
            <div className="text-gray-500 font-medium mt-2 text-sm md:text-base">Memories</div>
          </div>
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-rose-50 border-2 border-rose-100 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-4xl md:text-5xl mb-4">🏆</div>
            <div className="text-2xl md:text-3xl font-bold text-rose-600">My Queen</div>
            <div className="text-gray-500 font-medium mt-2 text-sm md:text-base">Number 1</div>
          </div>
          <div className="p-8 md:p-10 rounded-[2.5rem] bg-blue-50 border-2 border-blue-100 transform hover:-translate-y-2 transition-all duration-500 shadow-xl">
            <div className="text-4xl md:text-5xl mb-4">🌍</div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">Forever</div>
            <div className="text-gray-500 font-medium mt-2 text-sm md:text-base">To Go</div>
          </div>
        </div>
      </section>

      {/* Special Key Section */}
      <section id="special-key" className="py-32 px-6 bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="script-font text-5xl md:text-7xl text-gray-800 mb-4">The One Secret Key 🗝️</h2>
            <div className="h-1.5 w-24 bg-pink-300 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-500 font-light italic">Only one word can unlock my most precious secret...</p>
          </div>

          <div className="bg-white p-12 md:p-24 rounded-[4rem] shadow-2xl border-t-[0.75rem] border-pink-500 relative min-h-[400px] flex flex-col justify-center">
            {!isSecretUnlocked ? (
              <div className={`text-center transition-all duration-500`}>
                <p className="text-pink-700 font-bold mb-10 text-3xl">What is the one thing that defines "Us"?</p>
                <div className="max-w-md mx-auto space-y-8">
                  <input
                    type="text"
                    value={secretWord}
                    onChange={(e) => setSecretWord(e.target.value)}
                    placeholder="Type the magic word..."
                    className={`w-full px-6 py-4 md:px-8 md:py-6 rounded-full border-4 border-pink-100 focus:border-pink-500 text-center text-2xl md:text-4xl font-bold text-pink-600 outline-none transition-all placeholder:text-pink-100 ${showError ? 'animate-shake border-red-400' : ''}`}
                  />
                  <button onClick={checkSecretWord} className="w-full bg-pink-600 text-white py-6 rounded-full text-2xl font-bold hover:bg-pink-700 shadow-2xl btn-shine transform hover:-translate-y-1 transition">
                    Unlock the Truth ✨
                  </button>
                  {showError && <p className="text-red-400 font-bold animate-pulse">Try "Forever" or another word you love... ❤️</p>}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-10 animate-slide-in-up">
                <div className="text-9xl animate-bounce">💖</div>
                <h3 className="script-font text-7xl text-pink-600">You Found It!</h3>
                <p className="text-3xl text-gray-700 leading-relaxed italic font-light max-w-2xl mx-auto">
                  "You are my one and only. The missing piece to my puzzle, the beat to my heart, and the magic in my every day."
                </p>
                <div className="pt-8">
                   <span className="px-8 py-3 bg-pink-100 text-pink-600 rounded-full font-bold uppercase tracking-widest text-lg">Solved: Forever</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="script-font text-7xl text-gray-800">Our Beautiful Moments</h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">Every picture tells a story of us. Click on any photo to see it come alive! ✨</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {galleryImages.map((img, i) => (
              <div key={i} onClick={() => setLightbox(img)} className={`group relative h-[350px] md:h-[500px] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl cursor-pointer hover:-translate-y-4 transition-all duration-500 ${i % 2 === 1 ? 'lg:mt-16' : ''}`}>
                <Image src={img.src} alt={img.caption} fill className="object-cover transform group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-10">
                  <p className="text-white font-bold text-3xl script-font">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-32 px-6 bg-rose-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="script-font text-7xl text-center text-gray-800 mb-4">How Much Do You Know Us?</h2>
          <p className="text-center text-2xl text-gray-500 mb-20 font-light italic">Answer these correctly for a special 3D surprise! ❤️</p>

          <div className="space-y-12">
            {!isQuizRewardShown ? (
              <div className="quiz-card animate-slide-in-up">
                {currentQuestion === 1 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-gray-800">1. Where did we first meet? 📍</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button onClick={() => checkMainQuizAnswer(false)} className="quiz-option-btn text-xl p-6">A) In a Coffee Shop</button>
                      <button onClick={() => checkMainQuizAnswer(true)} className="quiz-option-btn text-xl p-6 border-pink-400 bg-pink-50 font-bold">B) At Instagram</button>
                    </div>
                  </div>
                )}
                {currentQuestion === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-gray-800">2. What is our "Comfort"? 🎵</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button onClick={() => checkMainQuizAnswer(true)} className="quiz-option-btn text-xl p-6 border-pink-400 bg-pink-50 font-bold">A) Sleep together</button>
                      <button onClick={() => checkMainQuizAnswer(false)} className="quiz-option-btn text-xl p-6">B) Wait for each other</button>
                    </div>
                  </div>
                )}
                {currentQuestion === 3 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-gray-800">3. How much do I love you? 💖</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button onClick={() => checkMainQuizAnswer(true)} className="quiz-option-btn text-xl p-6">A) To the moon and back</button>
                      <button onClick={() => checkMainQuizAnswer(true)} className="quiz-option-btn text-xl p-6 border-pink-400 bg-pink-50 font-bold">B) Infinity and beyond</button>
                    </div>
                  </div>
                )}
                {currentQuestion === 4 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">4. Which flower does she love most? 🌷</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <button onClick={() => checkMainQuizAnswer(false)} className="quiz-option-btn text-xl p-6">A) Red Roses</button>
                      <button onClick={() => checkMainQuizAnswer(true)} className="quiz-option-btn text-xl p-6 border-pink-400 bg-pink-50 font-bold">B) Vibrant Tulips</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 space-y-12 animate-slide-in-up">
                <h4 className="script-font text-4xl md:text-5xl text-pink-600">Correct! You know us perfectly!</h4>
                <div className="flex flex-col sm:flex-row gap-6 md:gap-12 justify-center items-center">
                  <div onClick={openGift} className="gift-container cursor-pointer group scale-75 md:scale-100">
                    <div className={`gift-lid ${isLetterShown ? 'hidden' : 'group-hover:-translate-y-4'}`} style={{ transition: 'all 0.5s', transform: isLetterShown ? 'translateY(-100px) rotate(-20deg)' : '' }}></div>
                    <div className={`gift-box ${isLetterShown ? 'scale-0' : 'animate-gift-shake'}`}></div>
                    {!isLetterShown && <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-xl md:text-2xl font-bold text-pink-500 animate-bounce w-max">Click to Open! 🎁</div>}
                  </div>
                  <button onClick={playKissEffect} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 md:px-12 md:py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:scale-110 transition btn-shine">
                    Get More Kisses! 💋
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Secret Letter Section */}
      <section id="secret-letter" className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="script-font text-8xl text-pink-600 mb-6">A Secret Letter</h2>
            <div className="h-1.5 w-32 bg-pink-200 mx-auto"></div>
          </div>
          
          <div className={`relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-white to-pink-50 shadow-2xl border border-pink-50 transition-all duration-1000 ${isLetterShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-12 text-center">
              <p className="text-2xl md:text-5xl text-gray-800 leading-tight font-light italic script-font">
                "Since the day we met, my life has been a beautiful dream."
              </p>
              <p className="text-xl md:text-4xl font-bold text-pink-500 tracking-[0.1em] uppercase">
                "You are my today and all of my tomorrows."
              </p>
              <div className="space-y-8 text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
                <p>Every single day, I discover new reasons why I'm the luckiest person to have you.</p>
                <p>Your kindness, your beauty, and your incredible spirit make every moment magical.</p>
                <p>I have a special surprise waiting for you in the real world too... but for now, please hold this message close to your heart.</p>
              </div>
              <div className="pt-12 border-t border-pink-100">
                <p className="script-font text-7xl text-pink-600 mb-2">I love you always,</p>
                <p className="text-gray-400 font-bold tracking-[0.3em] uppercase text-sm">Forever Yours ❤️</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Message Section */}
      <section id="message" className="py-32 px-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[4rem] shadow-2xl p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -ml-48 -mb-48"></div>
            <div className="relative z-10 text-center space-y-12">
              <div className="text-8xl scale-up">💌</div>
              <h2 className="script-font text-6xl md:text-7xl text-gray-800">My Birthday Wishes For You</h2>
              <div className="space-y-10 text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
                <p className="text-2xl md:text-3xl font-medium text-pink-600">"On this special day, I want you to know that you are the best thing that ever happened to me."</p>
                <p>Happy Birthday to the girl who stole my heart and made it her home. Every day with you feels like a celebration, but today is extra special because the world got you on this day.</p>
                <p>May this year bring you as much joy as you bring to everyone around you. May all your dreams come true, and may we create countless more memories together.</p>
                <p className="font-bold text-pink-500 text-3xl not-italic pt-10">
                  I love you to the moon and back! 🌙❤️<br />
                  <span className="text-lg uppercase tracking-[0.2em] text-gray-400">Forever Yours</span>
                </p>
              </div>
              <button 
                onClick={() => { triggerConfetti(); triggerConfetti(); playKissEffect(); }}
                className="bg-pink-500 text-white px-12 py-5 rounded-full hover:bg-pink-600 transition transform hover:scale-110 shadow-2xl text-2xl font-bold btn-shine"
              >
                Send My Love ❤️
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="script-font text-5xl text-pink-400">Made with All My Love</div>
          <p className="text-2xl text-gray-400 font-light italic">"Happy Birthday to my favorite person in the whole wide world..."</p>
          <div className="flex justify-center gap-10 text-5xl">
            {['❤️', '🎂', '🎁', '🎈', '🌹'].map((e, idx) => (
              <span key={idx} className="hover:scale-125 transition cursor-default grayscale hover:grayscale-0">{e}</span>
            ))}
          </div>
          <div className="pt-16 border-t border-gray-800 text-gray-600 uppercase tracking-[0.5em] text-xs">
            © 2026 Forever Yours • All Rights Reserved
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center p-8 transition-all duration-300" onClick={() => setLightbox(null)}>
          <button className="absolute top-10 right-10 text-white text-6xl hover:text-pink-500 transition-all">&times;</button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center gap-8" onClick={e => e.stopPropagation()}>
            <div className="relative w-full h-full">
               <Image src={lightbox.src} alt={lightbox.caption} fill className="object-contain animate-zoom-in" />
            </div>
            <p className="text-white text-3xl script-font text-center font-bold tracking-wide transition-all translate-y-4">{lightbox.caption}</p>
          </div>
        </div>
      )}

      {/* Kiss Effect Container */}
      <div id="kiss-container" className="fixed inset-0 pointer-events-none z-[5000] perspective-[1000px] hidden"></div>
    </main>
  );
}
