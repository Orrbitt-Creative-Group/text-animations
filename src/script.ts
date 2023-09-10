import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

function darkModeInput(input: HTMLInputElement) {
    input.addEventListener('change', () => {
        if (input.checked) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    })
}

let input = document.querySelector('input#dark-mode')
if (input instanceof HTMLInputElement) {
    darkModeInput(input)
}

function animateIn(el: HTMLElement, text: HTMLElement) {
    new ScrollTrigger({
        trigger: el,
        start: '50% 40%',
        onEnter: () => {
            el.classList.add('animate-in')
            text.classList.add('animate-in')
        },
        markers: true,
    })
}

function animateText(el: HTMLElement) {
    let content = el.innerHTML
    content = content.replace(/(<([^>]+)>)/gi, '')
    el.setAttribute('aria-label', content)

    const title = new SplitText(el, {
        type: 'chars,words',
        charsClass: 'char',
        wordsClass: 'word',
    })

    let char_index = 0
    let word_index = 0
    title.words.forEach((word, i) => {
        word.querySelectorAll<HTMLElement>('.char').forEach((char, i) => {
            char.style.setProperty('--char_index', `${++char_index}`)
            char.setAttribute('data-char', char.innerHTML)
        })
        ;(word as HTMLElement).style.setProperty(
            '--word-index',
            `${++word_index}`
        )
    })

    el.style.setProperty('--chars_count', `${title.chars.length}`)
    el.style.setProperty('--words_count', `${title.words.length}`)
}

let effects = document.querySelectorAll('.effect')
effects.forEach((effect) => {
    let text = effect.querySelector('.animate-text')
    if (effect instanceof HTMLElement && text instanceof HTMLElement) {
        animateIn(effect, text)
        animateText(text)
    }
})

document.body.addEventListener('click', (e) => {
    let target = e.target
    if (!(target instanceof HTMLElement)) return

    let text = target.closest('.animate-text')

    if (text instanceof HTMLElement) {
        text.classList.remove('animate-in')
        setTimeout(() => text?.classList.add('animate-in'), 100)
    }
})
