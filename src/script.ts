import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { easeOpts } from './scripts/ease-options'
import { SelectEl } from './scripts/select'
import './scripts/toggles'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)
import { splitText } from './scripts/split-text'

class Triggers {
    els: HTMLElement[]
    triggers: ScrollTrigger[] = []
    inView: HTMLElement | false = false

    constructor(els: HTMLElement[]) {
        this.els = els
        this.els.forEach((el) => {
            this.addTrigger(el)
        })
    }

    addTrigger(el: HTMLElement) {
        let trigger = new ScrollTrigger({
            trigger: el,
            start: '15% 50%',
            end: '100% 50%',
            onEnter: () => {
                el.classList.add('in-view')
                this.inView = el
            },
            onLeave: () => {
                el.classList.remove('in-view')
            },
            onLeaveBack: () => {
                el.classList.remove('in-view')
            },
            onEnterBack: () => {
                el.classList.add('in-view')
                this.inView = el
            },
            markers: false,
        })
        this.triggers.push(trigger)
        return trigger
    }

    switchOffAndOn = () => {
        if (!this.inView) return
        this.inView.classList.remove('in-view')
        setTimeout(() => {
            if (this.inView) {
                this.inView.classList.add('in-view')
            }
        })
    }
}

function init() {
    const effects = document.querySelectorAll<HTMLElement>('.effect')
    const triggers = new Triggers(Array.from(effects))

    const effectsContainer = document.querySelector('.effects')
    if (effectsContainer instanceof HTMLElement) {
        effectsContainer.addEventListener('click', () => {
            triggers.switchOffAndOn()
        })
    }

    effects.forEach((effect) => {
        let text = effect.querySelector('.animate-text')
        if (text instanceof HTMLElement) {
            splitText(text)
        }
    })

    // let selectEase = new SelectEl({
    //     options: easeOpts,
    //     prop: '--char_ease',
    //     currentStart: 'quad_in',
    //     onChange: () => {
    //         triggers.switchOffAndOn()
    //     },
    // })

    // let topBar = document.querySelector('.topbar')
    // if (topBar instanceof HTMLElement) topBar.appendChild(selectEase.container)
}

window.addEventListener('load', init)
