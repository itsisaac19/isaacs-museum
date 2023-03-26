import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Image from 'next/image';
import cameraHero from '../public/camera-hero.png';
import React from 'react';

class TextSplitter {
  constructor(element) {
    this.element = element;
    this.originalHTML = element.innerHTML;
  }

  split({
    target: e = ".splt",
    reveal: t = !1
  }) {
    const textElement = this.element;
    textElement.setAttribute('original', this.originalHTML)
    const i = textElement.innerHTML.split("");
    for (let l = 0; l < i.length; l++) {
        const r = document.createElement("span");
        if (textElement.appendChild(r), r.setAttribute("id", "c" + [l + 1]), " " == i[l]) r.classList.add("whtSpc");
        else {
            r.classList.add("char");
            const e = document.querySelectorAll(".char");
            for (let t = 0; t < e.length; t++) e[t].style.display = "inline-block", e[t].style.overflow = "hidden", e[t].style.verticalAlign = "top"
        }
        if (1 == t) {
            const e = document.createElement("span");
            e.innerHTML = i[l], r.appendChild(e), e.setAttribute("id", "r"), e.classList.add("reveal");
            const t = document.querySelectorAll(".reveal");
            for (let e = 0; e < t.length; e++) t[e].style.display = "inherit", t[e].style.overflow = "inherit", t[e].style.verticalAlign = "inherit"
        } else r.innerHTML = i[l]
    }
    textElement.removeChild(textElement.childNodes[0])
  }

  revert() {
    this.element.removeAttribute("id");
    this.element.innerHTML = this.originalHTML;
  }
}


import anime from 'animejs';

import { useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';


import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

/* import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom'; */
import { NavigationList } from '../components/navigation';

export default function Home() {

	const captionClickHandler = (e) => {
		const imageElement = e.currentTarget.previousElementSibling;
	}

  useEffect(() => {
    //butter.init();
    document.querySelectorAll(`.splt`).forEach(textElement => {
      const splitter = new TextSplitter(textElement);
      splitter.split({});

    })
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            if (entry.target.classList.contains(styles.animate)) return;
            entry.target.classList.remove('waiting')
            let animateDelay = entry.target.dataset.animationDelay ?? 0;

            setTimeout(() => {
              entry.target.classList.add(styles.animate);
              entry.target.classList.add('animate');
            }, animateDelay)

            const text = entry.target;
            let customDelay = text.dataset?.delay ?? 0;
            if (text.getAttribute('stagger')) {
              customDelay = anime.stagger(text.dataset?.delay);
            } else {
              console.log('using normal delay', text.dataset?.delay)
            }
            //console.log(text.className, customDelay)

            if (text.dataset.animationType == 'slideup') {
              anime({
                targets: text.querySelectorAll('.char'),
                translateY: ['100%', 0],
                opacity: [0, 1],
                direction: 'normal',
                duration: 1300,
                loop: 1,
                delay: customDelay,
                easing: 'easeOutQuad',
                complete: () => {
                  entry.target.classList.remove('animate');
                  entry.target.classList.add('done');
                  entry.target.classList.add(styles.done);
                }
              });
            }

            if (text.dataset.animationType == 'slideright') {
              anime({
                targets: text.querySelectorAll('.char'),
                translateX: ['-50px', 0],
                opacity: [0, 1],
                direction: 'normal',
                duration: 1300,
                loop: 1,
                delay: customDelay,
                easing: 'easeOutQuad',
                complete: () => {
                  entry.target.classList.remove('animate');
                  entry.target.classList.add('done');
                  entry.target.classList.add(styles.done);
                }
              });

            }
          } else {
            //entry.target.classList.add('out-of-viewport');
          }
        })
    })

    const elementsToAnimate = document.querySelectorAll(`.splt`);
    elementsToAnimate.forEach(el => textObserver.observe(el));


    const SVGObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
			const svg = entry.target;
            if (svg.classList.contains(styles.animate)) return;

			let animateDelay = svg.dataset.animationDelay ?? 0;

            setTimeout(() => {
				svg.classList.add(styles.animate);
				svg.classList.add('animate');
            }, animateDelay)

			let customDelay = svg.getAttribute('delay') ?? 0;
			let options = {
				targets: svg,
				opacity: [0, 1],
				direction: 'normal',
				duration: 1300,
				loop: 1,
				delay: customDelay,
				easing: 'easeOutQuad',
				complete: () => {
				  svg.classList.remove('animate');
                  svg.classList.add('done');
                  svg.classList.add(styles.done);
				}
			}

			if (entry.target.dataset.animationType == 'slideup') {
				options.translateY = ['50px', 0];
			} else {
				options.translateX = ['-50px', 0];
			}
			anime(options);
		  }
		})
	})
    document.querySelectorAll('svg[data-animate="true"]').forEach(svg => {
		SVGObserver.observe(svg)
    })

	const gridLineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
			const gridLine = entry.target;
            if (gridLine.classList.contains(styles.animate)) return;

			let animateDelay = gridLine.dataset.animationDelay ?? 0;

            setTimeout(() => {
				gridLine.classList.add(styles.animate);
				gridLine.classList.add('animate');
            }, animateDelay)

			let customDelay = gridLine.getAttribute('delay') ?? 0;
			let options = {
				targets: gridLine,
				opacity: [0, 1],
				direction: 'normal',
				duration: 1300,
				loop: 1,
				delay: customDelay,
				easing: 'easeInOutQuad',
				complete: () => {
				  gridLine.classList.remove('animate');
                  gridLine.classList.add('done');
                  gridLine.classList.add(styles.done);
				}
			}

			if (entry.target.dataset.animationType == 'vertical') {
				options.height = [0, '100%'];
			} else {
				options.width = [0, '100%'];
			}
			anime(options);
		  }
		})
	})

	document.querySelectorAll(`.gridline[data-animate="true"]`).forEach(line => {
		gridLineObserver.observe(line)
    })

    return () => {
      document.querySelectorAll('[original]').forEach(text => {
        text.innerHTML = text.getAttribute('original');
      })
    }
  }, []) 

  return (
    <div className={styles.container}>
      <Head>
        <title>Isaac Tsai</title>
        <meta name="description" content="Explore my museum, showcasing the evolution of my skills in web development through a collection of projects, skills, and achievements over time."></meta>

        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://isaacs-museum.vercel.app/"/>
        <meta property="og:title" content="Isaac Tsai"/>
        <meta property="og:description" content="Explore my museum, showcasing the evolution of my skills in web development through a collection of projects, skills, and achievements over time."/>
        <meta property="og:image" content="https://thumbsnap.com/s/PFWcjSL9.png?0326"/>


        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://isaacs-museum.vercel.app/"/>
        <meta property="twitter:title" content="Isaac Tsai"/>
        <meta property="twitter:description" content="Explore my museum, showcasing the evolution of my skills in web development through a collection of projects, skills, and achievements over time."/>
        <meta property="twitter:image" content="https://thumbsnap.com/s/PFWcjSL9.png?0326"/>
      </Head>

      <section className={`page-section ${styles.one}`}>
		<div 
		className={`gridline ${styles['gridline']} ${styles['gridline-1']}`}
		data-animate="true"
		data-animation-type="vertical"
		></div>

        <div className={`${styles['name-hero']}`}>
          <h1 data-animation-type="slideup" data-delay={150} stagger={"true"} className={`${styles['name-text']} ${styles.text} splt`}>ISAAC</h1>
          <h1 data-animation-type="slideup" data-delay={150} stagger={"true"} className={`${styles['name-text']} ${styles.text} splt`}>TSAI</h1>
          <p 
            className={`${styles['name-caption']} ${styles.text} splt`} 
            data-delay={500}
            data-animation-type="slideup"
          >My own little museum</p>
        </div>

        <div className={`${styles['scroll-hint-wrapper']}`}>
          <div className={`${styles['scroll-hint']} ${styles.waiting}`}>
            <svg data-animate="true" delay={500} className={`${styles['scroll-arrow']}`} width="59" height="184" viewBox="0 0 59 184" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50.2929 183.207C50.6834 183.598 51.3166 183.598 51.7071 183.207L58.0711 176.843C58.4616 176.453 58.4616 175.819 58.0711 175.429C57.6805 175.038 57.0474 175.038 56.6569 175.429L51 181.086L45.3431 175.429C44.9526 175.038 44.3195 175.038 43.9289 175.429C43.5384 175.819 43.5384 176.453 43.9289 176.843L50.2929 183.207ZM-11.2762 2.46111C9.96297 8.56431 25.3186 30.4972 35.3579 62.6729C45.3786 94.7888 50 136.802 50 182.5H52C52 136.698 47.3714 94.4612 37.2671 62.0771C27.1814 29.7528 11.537 6.93569 -10.7238 0.538894L-11.2762 2.46111Z" fill="#2D2D2D"/>
            </svg>
            <p 
            className={`${styles['scroll-text']} splt ${styles.text}`}
            data-animation-type="slideright"
            data-delay={700}
            >scroll</p>
          </div>

			<div className={`${styles['continued-scroll-hinters']}`}>
				<svg data-animate="true" delay={500} width="16" height="615" viewBox="0 0 16 615" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.29292 614.707C7.68344 615.098 8.31661 615.098 8.70713 614.707L15.0711 608.343C15.4616 607.953 15.4616 607.319 15.0711 606.929C14.6806 606.538 14.0474 606.538 13.6569 606.929L8.00003 612.586L2.34317 606.929C1.95265 606.538 1.31948 606.538 0.928959 606.929C0.538434 607.319 0.538434 607.953 0.928959 608.343L7.29292 614.707ZM7 4.37114e-08L7.00003 614L9.00003 614L9 -4.37114e-08L7 4.37114e-08Z" fill="#BDA941"/>
				</svg>

			</div>
        </div>



        <Parallax data-animation-delay={500} className={`${styles['image-block']} ${styles['image-01']} ${styles.waiting}`} speed={20}>
          <div data-image="01" className={`${styles['image-wrap']}`}>
		  	<LightGallery
			download={false}
			>
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
			</LightGallery>
          </div>
          <figcaption gallery="ITALY 2023" onClick={captionClickHandler} data-animation-type="slideup" data-delay={800} className={`${styles.text} splt`}>
          01  —  PANTHEON
          </figcaption>
        </Parallax>

        <div className={`${styles['scary-jump']}`}>
			<div className={`${styles['jump-circle-wrap']}`}>
				<div className={`${styles['jump-circle']}`}>
					<div className={`${styles['circle-scroll-text']} ${styles.waiting} text splt`}
					data-animation-type="slideup"
					data-delay={500}
					>scroll</div>
					<div className={`${styles['circle-scroll-hint-arrow-wrap']}`}>
						<svg className={`${styles['circle-scroll-hint-arrow']}`} data-animate="true" data-animation-type="slideup" delay={500} width="16" height="89" viewBox="0 0 16 89" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.2929 88.7071C7.68342 89.0976 8.31659 89.0976 8.70711 88.7071L15.0711 82.3431C15.4616 81.9526 15.4616 81.3195 15.0711 80.9289C14.6805 80.5384 14.0474 80.5384 13.6569 80.9289L8 86.5858L2.34315 80.9289C1.95262 80.5384 1.31946 80.5384 0.928936 80.9289C0.538411 81.3195 0.538411 81.9526 0.928936 82.3431L7.2929 88.7071ZM7 4.37114e-08L7 88L9 88L9 -4.37114e-08L7 4.37114e-08Z" fill="black"/>
						</svg>
					</div>
				</div>
			</div>

			<h1 className={`${styles['when-text']} ${styles.waiting} text splt`}
			data-animation-type="slideup"
			data-delay={10}
			stagger={"true"}
			>When it feels scary to jump in, that is exactly when you</h1>
				
			<h1 className={`${styles['jump-text']} ${styles.waiting} text splt`}
			data-animation-type="slideup"
			data-delay={50}
			stagger={"true"}
			>JUMP</h1>
        </div>

		<p className={`${styles['calling-action-text']} ${styles.waiting} text splt`}
		data-animation-type="slideup"
		data-delay={30}
		stagger={"true"}
		>CALLING CREATIVITY TO ACTION</p>
      </section>
      
      <section className={`page-section ${styles.two}`}>
		<div className={`${styles['twenty-twenty-text-wrap']}`}>
			<span className={`${styles['twenty-twenty-text']} ${styles.waiting} text splt`}
				data-animation-type="slideup"
				data-delay={50}
				stagger={"true"}
			>2020:</span>
			<span>&nbsp;</span>
			<span className={`${styles['opp-text']} ${styles.waiting} text splt`}
				data-animation-type="slideup"
				data-delay={50}
				stagger={"true"}
			>A year of opportunity</span>
		</div>


		<div className={`${styles['outliers-quote-wrap']}`}>
			<span className={`${styles['outliers-quote']} ${styles.waiting} text splt`}
				data-animation-type="slideup"
				data-delay={0}
				stagger={"true"}
			>“Extraordinary achievement is less </span>
			<br/>
			<span className={`${styles['outliers-quote']} ${styles.waiting} text und splt`}
				data-animation-type="slideup"
				data-delay={0}
				stagger={"true"}
			>about talent </span>
			<span className={`${styles['outliers-quote']} ${styles.waiting} text splt`}
				data-animation-type="slideup"
				data-delay={0}
				stagger={"true"}
			>than it is about </span>
			<span className={`${styles['outliers-quote']} ${styles.waiting} text und splt`}
				data-animation-type="slideup"
				data-delay={0}
				stagger={"true"}
			>opportunity.”</span>

			<br/>
			<br/>

			<span className={`${styles['outliers-author']} ${styles.waiting} text splt`}
				data-animation-type="slideup"
				data-delay={30}
				stagger={"true"}
			>-  Malcom Gladwell</span>
		</div>
      </section>

      <section className={`page-section ${styles.three}`}>
          
      </section>

		<NavigationList/>
    </div>
  )
}


