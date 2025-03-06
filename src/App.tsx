import React, { useState, useEffect, useRef } from 'react';
import { Cake, Sparkles, Heart, ChevronDown, Gift } from 'lucide-react';
import './BirthdayWebsite.css';

function App() {
  const [cakeState, setCakeState] = useState('initial');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [message, setMessage] = useState('Click the knife to cut your cake! 🎂');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [lanternActive, setLanternActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);


  // Initialize audio safely
  useEffect(() => {
    // Use public URL path directly
    audioRef.current = new Audio('/birthday/happybirthday.mp3');
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Updated handleCakeCut with error handling
  const handleCakeCut = () => {
    if (cakeState === 'initial') {
      setCakeState('jitter');
      setMessage('Wait... almost there!');
      setTimeout(() => {
        setCakeState('jitter-more');
        setMessage('One more try!');
        setTimeout(() => {
          setCakeState('cut');
          setMessage('Happy Birthday, Sheelu! 🎉');
          setShowConfetti(true);
          
          try {
            if (audioRef.current) {
              audioRef.current.play().catch(error => {
                console.error('Audio playback failed:', error);
                // Fallback: Show message if audio can't play
                setMessage('Happy Birthday! (Enable audio for full experience) 🎉');
              });
            }
          } catch (error) {
            console.error('Audio error:', error);
          }
          
          setTimeout(() => setShowConfetti(false), 5000);
        }, 1000);
      }, 1000);
    }
  };

  // Handle photo click
  const handlePhotoClick = (index) => {
    setActivePhoto(activePhoto === index ? null : index);
  };

  // Handle lantern animation
  const handleLanternClick = () => {
    setLanternActive(true);
    setTimeout(() => setLanternActive(false), 8000);
  };

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Photo gallery data
  const photos = [
    {
      url: '/birthday/1.jpg',
      caption: 'Our first trip together, 2020 🌟'
    },
    {
      url: '/birthday/2.jpg',
      caption: 'Remember that sunset picnic? Magical! ✨'
    },
    {
      url: '/birthday/3.jpg',
      caption: 'Beach day shenanigans 🏖️'
    },
    {
      url: '/birthday/9.jpg',
      caption: 'That time we got lost and found the best coffee shop ever ☕'
    },
    {
      url: '/birthday/5.jpg',
      caption: 'Concert night! Your favorite band 🎵'
    },
    {
      url: '/birthday/10.jpg',
      caption: 'such a warm/kind look in your eyes 😊'
    },
    {
      url: '/birthday/4.jpg',
      caption: 'Remember this hike? Worth every step! 🏔️'
    }
  ];

  return (
    <div className="birthday-container">
      {/* Header */}
      <header className="birthday-header">
        <div className="birthday-title">
          <Sparkles className="sparkle-icon" />
          <h1>Happy Birthday, Sheelu!</h1>
          <Sparkles className="sparkle-icon" />
        </div>
        <div className="scroll-indicator">
          <p>Scroll for your surprise</p>
          <ChevronDown className="bounce" />
        </div>
      </header>

      {/* Cake Cutting Section */}
      <section id="cake-section" className="section">
        <h2 className="section-title"><Cake className="section-icon" /> Virtual Cake Ceremony</h2>
        <div className="cake-container">
          <div className={`cake ${cakeState}`}>
            <div className="cake-top">
              <div className="candle">
                <div className="flame"></div>
              </div>
              <div className="candle">
                <div className="flame"></div>
              </div>
              <div className="candle">
                <div className="flame"></div>
              </div>
            </div>
            <div className="cake-middle"></div>
            <div className="cake-bottom"></div>
          </div>
          <button 
            className={`knife-btn ${cakeState}`} 
            onClick={handleCakeCut}
            disabled={cakeState === 'cut'}
          >
            🔪 Cut the Cake!
          </button>
          <p className="cake-message">{message}</p>
        </div>
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="confetti" 
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
                }}
              ></div>
            ))}
          </div>
        )}
      </section>

      {/* Memory Lane Gallery */}
      <section id="gallery-section" className="section">
        <h2 className="section-title"><Heart className="section-icon" /> Birthday Pyaari</h2>
        <div className="gallery-container">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className={`photo-card ${activePhoto === index ? 'expanded' : ''}`}
              onClick={() => handlePhotoClick(index)}
            >
              <div className="photo-inner">
                <div className="photo-front">
                  <img src={photo.url} alt={`Memory ${index + 1}`} />
                </div>
                <div className="photo-back">
                  <p>{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heartfelt Message */}
      <section id="message-section" className="section">
        <h2 className="section-title"><Gift className="section-icon" /> A Letter For You</h2>
        <div className="message-container">
          <div className="paper">
            <h3 className="message-heading">To My Wonderful Friend,</h3>
            <div className="message-content">
              <p className={scrollPosition > 1200 ? 'fade-in visible' : 'fade-in'}>
                Sheelu, On this special day, m ye likhne to baith gya lekin mujhe smjh nhi aa rha kya likhna h...😅 but try krta hu.
              </p>
              <p className={scrollPosition > 1300 ? 'fade-in visible' : 'fade-in'}>
                Your kindness, laughter, and friendship have been such a gift in my life. You have this incredible ability to light up any room you enter.
              </p>
              <p className={scrollPosition > 1400 ? 'fade-in visible' : 'fade-in'}>
                Remember all those adventures we've shared? From late-night talks to spontaneous road trips, each memory with you is a treasure I hold dear.
              </p>
              <p className={scrollPosition > 1500 ? 'fade-in visible' : 'fade-in'}>
                As you begin another trip around the sun, I hope this year brings you everything your heart desires - success, love, health, and countless moments of happiness.
              </p>
              <p className={scrollPosition > 1600 ? 'fade-in visible' : 'fade-in'}>
                Thank you for being exactly who you are - a truly amazing person who makes this world a better place.
              </p>
              <p className={scrollPosition > 1700 ? 'fade-in visible' : 'fade-in'}>
                Wishing you the happiest of birthdays!
              </p>
              <p className={scrollPosition > 1800 ? 'fade-in visible' : 'fade-in'}>
                With love and celebration,
              </p>
              <p className={scrollPosition > 1900 ? 'fade-in visible signature' : 'fade-in signature'}>
                Your Friend
              </p>
            </div>
            <button 
              className="lantern-btn" 
              onClick={handleLanternClick}
              disabled={lanternActive}
            >
              🎇 Light a Wish
            </button>
          </div>
        </div>
        {lanternActive && (
          <div className="lanterns-container">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="lantern" 
                style={{
                  left: `${20 + (i * 15)}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                <div className="lantern-top"></div>
                <div className="lantern-body"></div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="birthday-footer">
        <p>Made with ❤️ for your special day, Sheelu</p>
      </footer>
    </div>
  );
}

export default App;
