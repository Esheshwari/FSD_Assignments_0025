import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import './Achievements.css';

// Animated Counter sub-component
const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;

    const duration = 2000; // 2 seconds
    const frameTime = 1000 / 60;
    const totalFrames = Math.round(duration / frameTime);
    const increment = end / totalFrames;

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      start += increment;
      if (currentFrame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(counter);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, frameTime);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

const Achievements = ({ achievements }) => {
  return (
    <section id="achievements">
      <h2 className="section-title">Achievements</h2>

      <div className="achievements-grid">
        {achievements && achievements.map((item, index) => (
          <motion.div 
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-card achievement-card"
          >
            <div className="trophy-icon"><FaTrophy /></div>
            <div className="counter-value">
              <AnimatedNumber 
                value={item.count} 
                prefix={item.prefix} 
                suffix={item.suffix} 
              />
            </div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;