'use client';

import { useEffect, useState } from 'react';

const stages = [
  { name: 'Nature', title: 'It begins with the plant.' },
  { name: 'Cherry', title: 'Beauty before the bean.' },
  { name: 'Bean', title: 'Inside every cherry.' },
  { name: 'Process', title: 'Crafted with care.' },
  { name: 'Roast', title: 'Where character develops.' },
  { name: 'Grind', title: 'Aroma comes alive.' },
  { name: 'Brew', title: 'Crafted for the moment.' },
  { name: 'Cup', title: 'The journey ends here.' },
];

/**
 * A deliberately DOM/CSS-first experience. It avoids creating WebGL contexts
 * during initial page load, which keeps the site reliable on mobile browsers
 * and devices that suspend or limit WebGL contexts.
 */
export default function JourneyExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const stageIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
  const stage = stages[stageIndex];

  return (
    <div className={`cinematic-scene cinematic-stage-${stageIndex}`} role="img" aria-label={`Coffee journey: ${stage.name}`}>
      <div className="scene-mist scene-mist-one" />
      <div className="scene-mist scene-mist-two" />
      <div className="scene-sun" />
      <div className="scene-plant scene-plant-back" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="scene-plant scene-plant-front" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="scene-beans" aria-hidden="true"><b /><b /><b /><b /><b /><b /></div>
      <div className="scene-cup" aria-hidden="true"><span /></div>
      <div className="scene-vignette" />
      <div className="journey-overlay"><p>{stage.name} · 0{stageIndex + 1}</p><span>{stage.title}</span></div>
    </div>
  );
}
