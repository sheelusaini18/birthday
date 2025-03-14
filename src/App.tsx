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
    audioRef.current = new Audio('/happybirthday.mp3');
    
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
                setMessage('Happy Birthday, Sheelu! (Enable audio for full experience) 🎉');
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
      url: '1.jpg',
      caption: 'Tumhari awaaz hi tumhari pehchaan hai... aur yeh awaaz kitni khoobsurat hai.'
    },
    {
      url: '2.jpg',
      caption: 'Tum apni simplicity mein bhi kamaal ho.'
    },
    {
      url: '3.jpg',
      caption: 'Tumhari baaton mein woh taazgi hai jo baarish ke baad ki hawa mein hoti hai... thodi chill, thodi nayi, par har baar ek feeling deti hai.'
    },
    {
      url: '9.jpg',
      caption: 'Agar tum smile karti raho, toh duniya ki saari problems solve ho sakti hain!'
    },
    {
      url: '5.jpg',
      caption: 'Tumhari baatein sunke lagta hai... zindagi thodi si rangeen ho gayi hai.'
    },
    {
      url: '10.jpg',
      caption: 'Tumhari aankhein toh kisi shayari se kam nhi, har baar kuch naya likhti hain.'
    },
    {
      url: '4.jpg',
      caption: 'Tumhari aankhein itni haseen hain... ki unhe dekhte hi duniya ki saari khushiyan yaad aa jaati hain.'
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
            {[...Array(60)].map((_, i) => (
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
              <br />
              <p className={scrollPosition > 1300 ? 'fade-in visible' : 'fade-in'}>
              Okay, honestly, m tumhe kya likhu samajh nhi aa raha h, kyunki mere dimaag mein koi idea hi nhi aa rha, itni der ho gye sochte sochte. Toh socha ki seedha dil se likh deta hoon. Kyunki tum jaanti hi ho na, m waise bhi zyada sochta nhi hoon, jo dil mein aata hai bol deta hu 😄 
              </p>
              <br />
              <p className={scrollPosition > 1400 ? 'fade-in visible' : 'fade-in'}>
              Tumhare saath guzare huye har moment yaad aate hain. Woh random talks, woh late-night chats. Tumhare saath baat karna hamesha aisa lagta hai jaise koi tension hi nhi hai. Tumhare saath time spend karna hamesha relaxing aur fun dono hota hai.
              </p>
              <br />
              <p className={scrollPosition > 1500 ? 'fade-in visible' : 'fade-in'}>
              Tum itni caring, supportive, aur funny ho ki kabhi kabhi lagta hai ki m kitna lucky hoon jo tum meri life mein ho. Tumhare saath dosti mein hamesha ek alag sa comfort feel hota hai, aur m chahta hoon ki ye bond hamesha aisa hi rahe.
              </p>
              <br />
              <p className={scrollPosition > 1600 ? 'fade-in visible' : 'fade-in'}>
              Is saal ka tumhara birthday khushiyon se bhara ho. Chahe jo bhi ho, tum hamesha khush raho. Aur haan, cake zarur khana 😤
              </p>
              <br />
              <p className={scrollPosition > 1700 ? 'fade-in visible' : 'fade-in'}>
              Once again, Happy Birthday, Sheelu! May this year bring you all the happiness, success, and love you deserve.
              </p>
              <br />
              <p className={scrollPosition > 1800 ? 'fade-in visible' : 'fade-in'}>
              Take care, aur yaad rakhna, hum dono ka bond hamesha strong rehna chahiye. 😊 aur haan upar photos pe click karke dekhi ya nhi.
              </p>
              <br />
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
                  left: `${20 + (i * 10)}%`,
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