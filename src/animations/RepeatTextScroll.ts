import getHeight from '@/utils/getHeight'
import { gsap } from 'gsap'

export default class RepeatTextScroll {
  el: HTMLElement
  fades: HTMLElement[] = []

  count = 9
  dY = 20
  dDelay = 0.1
  scrollTimeline: GSAPTimeline | null = null
  observer: IntersectionObserver | null = null
  direction: string
  paused: boolean
  paused_threshold: number

  progressTween: () => void = () => {}

  constructor(el: HTMLElement) {
    this.el = el
    this.direction = this.el.dataset.direction as string
    this.paused = 'paused' in this.el.dataset
    this.paused_threshold = parseFloat(this.el.dataset.paused_threshold as string) || 0
    this.createFades()
    this.setBoundaries()
    this.createScrollTimeline()
    this.createObserver()

    window.addEventListener('resize', () => this.setBoundaries())
  }

  createFades() {
    if (this.el) {
      const middle = Math.floor(this.count / 2)

      for (let i = 0; i < this.count; i++) {
        let ty = 0
        let delay = 0
        let className = 'faded'

        if (i == this.count - 1) {
          ty = 0
          delay = 0
          className = 'main'
        } else if (i < middle) {
          // positive stack
          ty = middle * this.dY - this.dY * i
          delay = this.dDelay * (middle - i) - this.dDelay
        } else {
          // negative stack
          ty = -1 * (middle * this.dY - (i - middle) * this.dY)
          delay = this.dDelay * (middle - (i - middle)) - this.dDelay
        }

        const span = document.createElement('span')
        span.textContent = this.el?.innerHTML
        span.classList.add(className)
        span.setAttribute('data-ty', ty.toString())
        span.setAttribute('data-delay', delay.toString())

        this.fades.push(span)
      }

      this.el.innerHTML = ''
      this.el.append(...this.fades)
    }
  }

  setBoundaries() {
    if (this.el) {
      // Set up the margin top and padding bottom values
      const paddingBottomMarginTop =
        (getHeight(this.el) * Math.floor(this.count / 2) * this.dY) / 100
      gsap.set(this.el, {
        marginTop: paddingBottomMarginTop,
        paddingBottom: paddingBottomMarginTop
      })
    }
  }

  createScrollTimeline() {
    if (this.direction == 'forward') {
      this.scrollTimeline = gsap
        .timeline({ paused: true })

        .to(this.fades, {
          duration: 1,
          ease: 'none',
          yPercent: (_, target) => target.dataset.ty,
          delay: (_, target) => target.dataset.delay
        })
    } else if (this.direction === 'backwards') {
      this.scrollTimeline = gsap
        .timeline({ paused: true })

        .from(this.fades, {
          duration: 1,
          ease: 'none',
          yPercent: (_, target) => target.dataset.ty,
          delay: (_, target) => target.dataset.delay
        })
        .to(this.fades, {
          duration: 1,
          ease: 'none',
          yPercent: 0,
          delay: (_, target) => target.dataset.delay
        })
    } else {
      this.scrollTimeline = gsap
        .timeline({ paused: true })

        .to(this.fades, {
          duration: 1,
          ease: 'none',
          yPercent: (_, target) => target.dataset.ty,
          delay: (_, target) => target.dataset.delay
        })
        .to(this.fades, {
          duration: 1,
          ease: 'none',
          yPercent: 0,
          delay: (_, target) => target.dataset.delay
        })
    }
  }

  createObserver() {
    if (this.paused) {
      this.scrollTimeline?.progress(this.paused_threshold)
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    }

    // credits: from https://medium.com/elegant-seagulls/parallax-and-scroll-triggered-animations-with-the-intersection-observer-api-and-gsap3-53b58c80b2fa
    this.observer = new IntersectionObserver((entry) => {
      if (entry[0].intersectionRatio > 0) {
        gsap.ticker.add(this.progressTween)
      } else {
        gsap.ticker.remove(this.progressTween)
      }
    }, observerOptions)

    this.progressTween = () => {
      if (this.el) {
        // Get scroll distance to bottom of viewport.
        const scrollPosition = window.scrollY + window.innerHeight
        // Get element's position relative to bottom of viewport.
        const elPosition = scrollPosition - this.el.offsetTop
        // Set desired duration.
        const durationDistance = window.innerHeight + this.el.offsetHeight
        // Calculate tween progresss.
        const currentProgress = elPosition / durationDistance

        // Set progress of gsap timeline.
        this.scrollTimeline?.progress(currentProgress)
      }
    }

    this.observer.observe(this.el)
  }
}
