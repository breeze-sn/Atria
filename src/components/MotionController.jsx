import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MotionController() {
  const location = useLocation()

  useLayoutEffect(() => {
    const root = document.querySelector(
      '.landing-page, .explore-page, .docs-page, .studio-page, .atria-builder'
    )
    if (!root) return undefined

    const media = gsap.matchMedia(root)
    const cleanups = []
    const context = gsap.context(() => {
      media.add(
        {
          reduce: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 900px)',
        },
        (conditions) => {
          if (conditions.reduce) return

          const isLanding = root.matches('.landing-page')
          const isDocs = root.matches('.docs-page')
          const isExplore = root.matches('.explore-page')
          const isBuilder = root.matches('.atria-builder')
          const isStudio = root.matches('.studio-page') || Boolean(root.querySelector('.studio-page'))
          const path = location.pathname

          // Landing: expressive typography and one composed identity graphic.
          if (isLanding) {
            const hero = gsap.timeline({ defaults: { ease: 'power4.out' } })
            hero.from('.home-hero-copy .eyebrow', { y: 18, autoAlpha: 0, duration: 0.65 })
              .from('.home-hero h1', { yPercent: 115, skewY: 3, duration: 1.1, transformOrigin: 'left bottom' }, '-=0.2')
              .from('.home-hero-copy > p', { y: 22, autoAlpha: 0, duration: 0.7 }, '-=0.5')
              .from('.home-hero-copy .hero-actions > *', { y: 14, autoAlpha: 0, stagger: 0.12, duration: 0.55 }, '-=0.35')
              .from('.home-hero-meta', { scaleX: 0, transformOrigin: 'left center', duration: 0.6 }, '-=0.2')

            gsap.from('.home-intro > div:last-child h2', {
              clipPath: 'inset(0 0 100% 0)', y: 28, duration: 0.95, ease: 'power4.out',
              scrollTrigger: { trigger: '.home-intro', start: 'top 76%', once: true }
            })
            gsap.from('.home-foundation-item', {
              y: 40, rotate: (index) => index % 2 ? 1.5 : -1.5, autoAlpha: 0,
              stagger: 0.12, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: '.home-foundation-grid', start: 'top 82%', once: true }
            })
            gsap.from('.home-playground', {
              x: 55, rotateY: -8, autoAlpha: 0, transformPerspective: 1000, duration: 0.95, ease: 'power3.out',
              scrollTrigger: { trigger: '.home-playground', start: 'top 82%', once: true }
            })
            gsap.from('.home-token-layout > div', {
              y: 32, autoAlpha: 0, stagger: 0.16, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: '.home-token-band', start: 'top 82%', once: true }
            })
            gsap.from('.home-contact-links a', {
              x: 35, autoAlpha: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
              scrollTrigger: { trigger: '.home-contact', start: 'top 82%', once: true }
            })


          }

          // Explore overview: dashboard data comes alive like a working
          // instrument panel; each data type has a different movement language.
          if (isExplore && path === '/explore') {
            gsap.from('.workspace-welcome', { x: -34, autoAlpha: 0, duration: 0.85, ease: 'power3.out' })
            gsap.from('.workspace-metrics article', {
              y: 35, scaleY: 0.82, transformOrigin: 'bottom', autoAlpha: 0,
              stagger: 0.13, duration: 0.8, delay: 0.18, ease: 'power3.out'
            })
            gsap.from('.workspace-swatch', {
              scaleX: 0, transformOrigin: 'left', stagger: 0.1, duration: 0.7, delay: 0.35, ease: 'expo.out',
              scrollTrigger: { trigger: '.workspace-palette', start: 'top 85%', once: true }
            })
            gsap.from('.workspace-module', {
              x: (index) => index % 2 ? 42 : -42,
              autoAlpha: 0, stagger: 0.14, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: '.workspace-modules', start: 'top 82%', once: true }
            })
          }

          // Foundations and tokens: rows are treated as editable material,
          // not as cards in a marketing grid.
          if (isStudio && path.includes('foundations')) {
            gsap.from('.studio-page > .section-index', { x: -24, autoAlpha: 0, duration: 0.65, ease: 'power3.out' })
            gsap.from('.studio-page-heading > *', { y: -22, autoAlpha: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
            gsap.from('.studio-page > p', { y: 16, autoAlpha: 0, duration: 0.65, delay: 0.16, ease: 'power3.out' })
            gsap.from('.studio-page section article', {
              y: 26, scale: 0.98, autoAlpha: 0, stagger: 0.075, duration: 0.65, ease: 'power3.out',
              scrollTrigger: { trigger: '.studio-page section', start: 'top 86%', once: true }
            })
            gsap.from('.foundation-type-row', {
              x: -28, autoAlpha: 0, stagger: 0.055, duration: 0.55, ease: 'power2.out',
              scrollTrigger: { trigger: '.foundation-type-row', start: 'top 86%', once: true }
            })
            gsap.from('.foundation-space-row', {
              scaleX: 0.92, transformOrigin: 'left', autoAlpha: 0, stagger: 0.045, duration: 0.5, ease: 'power2.out',
              scrollTrigger: { trigger: '.foundation-space-row', start: 'top 86%', once: true }
            })
          } else if (isStudio && path.includes('tokens')) {
            gsap.from('.studio-page-heading', { y: 32, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
            gsap.from('.studio-page > section', {
              y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: '.studio-page > section', start: 'top 88%', once: true }
            })
            gsap.from('.studio-page button', {
              scale: 0.94, autoAlpha: 0, stagger: 0.018, duration: 0.35, ease: 'back.out(1.4)',
              delay: 0.2
            })
          } else if (isStudio && path.includes('components')) {
            gsap.from('.studio-page-heading', { clipPath: 'inset(0 0 100% 0)', y: 25, duration: 0.9, ease: 'power4.out' })
            gsap.from('.component-inspector-grid > aside', { x: -45, autoAlpha: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })
            gsap.from('.component-inspector-grid > main', { x: 45, autoAlpha: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' })
          } else if (isExplore && path.includes('community')) {
            gsap.from('.community-heading', { y: 28, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
            gsap.from('.community-filter-row > *', { y: 15, autoAlpha: 0, stagger: 0.1, duration: 0.55, delay: 0.2 })
            gsap.from('.community-card', {
              y: 55, rotate: (index) => index % 2 ? 1.2 : -1.2, autoAlpha: 0,
              stagger: 0.12, duration: 0.85, ease: 'power3.out',
              scrollTrigger: { trigger: '.community-grid', start: 'top 82%', once: true }
            })
          }

          // The visual builder gets a spatial entrance and small, tactile
          // transitions for its artboard and inspector columns.
          if (isBuilder) {
            gsap.from('.builder-topbar', { y: -22, autoAlpha: 0, duration: 0.65, ease: 'power3.out' })
            gsap.from('.builder-left', { x: -55, autoAlpha: 0, duration: 0.8, delay: 0.12, ease: 'power3.out' })
            gsap.from('.builder-right', { x: 55, autoAlpha: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
            gsap.from('.builder-artboard', {
              y: 75, rotateX: 9, scale: 0.94, autoAlpha: 0, transformPerspective: 1200,
              duration: 1.1, delay: 0.18, ease: 'power3.out'
            })
            gsap.from('.builder-canvas-item', {
              y: 18, scale: 0.9, autoAlpha: 0, stagger: 0.09, duration: 0.55, delay: 0.75, ease: 'back.out(1.5)'
            })
          }

          // Docs: the index behaves like a navigation instrument, with
          // the large index panel and link rows entering on separate axes.
          if (isDocs) {
            gsap.from('.docs-hero-copy > *', { y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' })
            gsap.from('.docs-index-panel', {
              x: 75, rotateY: -12, autoAlpha: 0, transformPerspective: 1000,
              duration: 1.1, delay: 0.15, ease: 'power3.out'
            })
            gsap.from('.docs-group-heading', {
              x: -30, autoAlpha: 0, duration: 0.75, ease: 'power3.out',
              scrollTrigger: { trigger: '.docs-group-heading', start: 'top 84%', once: true }
            })
            gsap.from('.docs-card', {
              y: 35, rotateX: 7, transformPerspective: 900, autoAlpha: 0,
              stagger: { each: 0.08, grid: 'auto', from: 'start' }, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: '.docs-card-grid', start: 'top 82%', once: true }
            })
          }

          // Shared interaction polish: magnetic-feeling but restrained
          // pointer response, with no layout-affecting movement.
          if (conditions.desktop) {
            const hoverTargets = gsap.utils.toArray(
              '.foundation-card, .workspace-module, .docs-card, .community-card, .contact-link, .nav-cta',
              root
            )
            hoverTargets.forEach((element) => {
              const enter = () => gsap.to(element, { y: -5, duration: 0.32, ease: 'power3.out', overwrite: 'auto' })
              const leave = () => gsap.to(element, { y: 0, duration: 0.48, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' })
              element.addEventListener('pointerenter', enter)
              element.addEventListener('pointerleave', leave)
              cleanups.push(() => {
                element.removeEventListener('pointerenter', enter)
                element.removeEventListener('pointerleave', leave)
              })
            })
          }

          return () => cleanups.splice(0).forEach((cleanup) => cleanup())
        }
      )
    }, root)

    return () => {
      cleanups.splice(0).forEach((cleanup) => cleanup())
      media.revert()
      context.revert()
    }
  }, [location.pathname])

  return null
}
