'use client'
import React, { useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react';
import styles from './embla.module.css'
import Image from 'next/image';

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className={styles.embla}>
    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <Image src={'/beekeeper.svg'} width={260} height={320} alt='' className={styles.embla__slide__number}/>
            </div>
          ))}
        </div>
      </div>
    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </section>
  )
}

export default EmblaCarousel
