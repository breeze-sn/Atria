import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const revealGroups = [
  '.hero-copy > *',
  '.hero-art',
  '.intro-content',
  '.foundation-card',
  '.component-copy',
  '.component-preview',
  '.token-inner > *',
  '.contact-layout > *',
  '.workspace-welcome > *',
  '.workspace-metrics article',
  '.workspace-palette',
  '.workspace-module',
  '.workspace-overview-foot',
  '.docs-hero-copy > *',
  '.docs-index-panel',
  '.docs-group-heading',
  '.docs-card',
  '.builder-artboard',
  '.builder-left',
  '.builder-right',
]

export default function MotionController() {
  const location = useLocation()

  useLayoutEffect(() => {
    const root = document.querySelector(
      '.landing-page, .explore-page, .docs-page, .studio-page, .atria-builder'
    )
    if (!root) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (match) => {
          if (match.conditions.reduce) return

          const heroTargets = gsap.utils.toArray(
            '.hero-copy > *, .docs-hero-copy > *, .workspace-welcome > *',
            root
          )
          if (heroTargets.length) {
            gsap.fromTo(
              heroTargets,
              { autoAlpha: 0, y: 34, filter: 'blur(8px)' },
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.05,
                stagger: 0.105,
                ease: 'power3.out',
                clearProps: 'filter',
              }
            )
          }

          const heroVisual = root.querySelector('.hero-art, .docs-index-panel')
          if (heroVisual) {
            gsap.fromTo(
              heroVisual,
              { autoAlpha: 0, y: 48, scale: 0.94, rotateX: 5, transformOrigin: '50% 100%' },
              { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.35, delay: 0.18, ease: 'power3.out' }
            )
          }

          const scrollTargets = revealGroups
            .flatMap((selector) => gsap.utils.toArray(selector, root))
            .filter((element) => !element.closest('.hero-copy, .docs-hero-copy, .workspace-welcome'))

          scrollTargets.forEach((element, index) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 42, scale: 0.985, filter: 'blur(5px)' },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.95,
                delay: (index % 4) * 0.055,
                ease: 'power3.out',
                clearProps: 'filter',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                },
              }
            )
          })

          const cards = gsap.utils.toArray(
            '.foundation-card, .workspace-module, .docs-card',
            root
          )
          cards.forEach((card) => {
            const onEnter = () => gsap.to(card, { y: -7, duration: 0.35, ease: 'power2.out' })
            const onLeave = () => gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out' })
            card.addEventListener('pointerenter', onEnter)
            card.addEventListener('pointerleave', onLeave)
            context.add(() => {
              card.removeEventListener('pointerenter', onEnter)
              card.removeEventListener('pointerleave', onLeave)
            })
          })

          const parallax = root.querySelector('.hero-art')
          if (parallax && match.conditions.motion) {
            gsap.to(parallax, {
              yPercent: -9,
              ease: 'none',
              scrollTrigger: {
                trigger: parallax,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2,
              },
            })
          }

          return () => media.revert()
        }
      )
    }, root)

    return () => context.revert()
  }, [location.pathname])

  return null
}
