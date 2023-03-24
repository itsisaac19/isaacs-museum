import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Image from 'next/image';
import cameraHero from '../public/camera-hero.png';
import splt from 'spltjs';
import anime from 'animejs';

import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    splt({});
 
    
    console.log(document.querySelectorAll(`.splt`))
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            entry.target.classList.add(styles.animate);

            let textElements = entry.target.querySelectorAll(`.${styles.text}`)
            if (textElements) {
              textElements.forEach(text => {
                let customDelay = text.dataset?.delay || 100
                console.log(text, customDelay)

                if (text.dataset.animationType == 'slideup') {
                  anime({
                    targets: text.querySelectorAll('.char'),
                    translateY: ['100%', 0],
                    opacity: [0, 1],
                    direction: 'normal',
                    duration: 1300,
                    loop: 1,
                    delay: anime.stagger(customDelay, {direction: 'reverse'}),
                    easing: 'easeOutSine'
                  });
                }
              })
            }
          } else {
            entry.target.classList.remove(styles.animate);
          }
        })
    })

    const elementsToAnimate = document.querySelectorAll(`.${styles.waiting}`);
    elementsToAnimate.forEach(el => observer.observe(el));
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>ISAAC TSAI</title>
      </Head>

      <section className={styles.one}>
        <div className={`${styles['name-hero']} ${styles.waiting}`}>
          <h1 data-animation-type="slideup" data-delay={150} className={`${styles['name-text']} ${styles.text} splt`}>ISAAC</h1>
          <h1 data-animation-type="slideup" data-delay={150} className={`${styles['name-text']} ${styles.text} splt`}>TSAI</h1>
          <p 
            className={`${styles['name-caption']} ${styles.text} splt`} 
            data-delay={0}
            data-animation-type="slideup"
          >My own little museum</p>
        </div>

        <div className={`${styles['scroll-hint-wrapper']}`}>
          <div className={`${styles['scroll-hint']}`}>
            <svg className={`${styles['scroll-arrow']}`} width="59" height="184" viewBox="0 0 59 184" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50.2929 183.207C50.6834 183.598 51.3166 183.598 51.7071 183.207L58.0711 176.843C58.4616 176.453 58.4616 175.819 58.0711 175.429C57.6805 175.038 57.0474 175.038 56.6569 175.429L51 181.086L45.3431 175.429C44.9526 175.038 44.3195 175.038 43.9289 175.429C43.5384 175.819 43.5384 176.453 43.9289 176.843L50.2929 183.207ZM-11.2762 2.46111C9.96297 8.56431 25.3186 30.4972 35.3579 62.6729C45.3786 94.7888 50 136.802 50 182.5H52C52 136.698 47.3714 94.4612 37.2671 62.0771C27.1814 29.7528 11.537 6.93569 -10.7238 0.538894L-11.2762 2.46111Z" fill="#2D2D2D"/>
            </svg>
            <p className={`${styles['scroll-text']}`}>scroll</p>
          </div>
        </div>

        <div className={`${styles['image-block']} ${styles['image-01']} ${styles.waiting}`}>
          <div data-image="01" className={`${styles['image-wrap']}`}>
            <Image
              src={cameraHero}
              fill
              sizes='
              (max-width: 768px) 100vw,
              55vw'
              priority
              placeholder='blur'
              alt={'Isaac Tsai taking picture a of the Pantheon with an iPhone'}
            ></Image>
          </div>
          <figcaption data-animation-type="slideup" data-delay={0} className={`${styles.text} splt`}>
          01  —  PANTHEON
          </figcaption>
        </div>
      </section>
      
      <section className={styles.two}>
          <div className={`${styles.waiting}`}>HELOOOO</div>
      </section>

    </div>
  )
}


