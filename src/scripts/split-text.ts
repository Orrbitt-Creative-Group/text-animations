import { SplitText } from 'gsap/SplitText'

const easeInSine = (x: number) => 1 - Math.cos((x * Math.PI) / 2)
const easeOutSine = (x: number) => Math.sin((x * Math.PI) / 2)
const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2))

export function splitText(el: HTMLElement) {
    let content = el.innerHTML
    content = content.replace(/(<([^>]+)>)/gi, '')
    el.setAttribute('aria-label', content)

    let splitBy = el.dataset.splitBy || 'chars,words,lines'
    let charEase = el.dataset.charEase

    const title = new SplitText(el, {
        type: splitBy,
        lineThreshold: 0.3,
        charsClass: 'char',
        wordsClass: 'word',
        linesClass: 'line',
    })

    if (splitBy.includes('lines')) {
        linesSetProps(title, charEase)
    } else if (splitBy.includes('words')) {
        wordsSetProps(title.words as HTMLElement[])
    } else if (title.chars) {
        charsSetProps(title.chars as HTMLElement[], charEase)
    }

    if (title.chars) {
        title.chars.forEach((char) => {
            let letter = char.innerHTML
            char.setAttribute('data-char', letter)
        })
    }

    if (charEase) {
        let charStep = el.dataset.charStep ? Number(el.dataset.charStep) : undefined
        setCharEase(title, charStep)
    }

    el.style.setProperty('--chars_count', `${title.chars.length}`)
    el.style.setProperty('--words_count', `${title.words.length}`)

    el.classList.add('split')
}

export function charsSetProps(chars: HTMLElement[], charEase?: string) {
    chars.forEach((char, char_index) => {
        char.style.setProperty('--char_index', `${char_index}`)
    })
}

export function wordsSetProps(words: HTMLElement[]) {
    let char_index = 0
    words.forEach((word, word_index) => {
        word.style.setProperty('--word_index', `${word_index}`)

        let chars = word.querySelectorAll<HTMLElement>('.char')
        chars.forEach((char, char_index_word) => {
            char.style.setProperty('--char_index_word', `${char_index_word}`)
            char.style.setProperty('--char_index', `${char_index}`)
            char_index++
        })
    })
}

export function linesSetProps(title: SplitText, charEase?: string) {
    let lines = title.lines as HTMLElement[]
    let chars = title.chars as HTMLElement[]
    let word_index = 0
    let char_index = 0

    lines.forEach((line, line_index) => {
        line.style.setProperty('--line_index', `${line_index}`)

        let words = line.querySelectorAll<HTMLElement>('.word')
        let chars = line.querySelectorAll<HTMLElement>('.char')

        words.forEach((word, word_index_line) => {
            word.style.setProperty('--word_index_line', `${word_index_line}`)
            word.style.setProperty('--word_index', `${word_index}`)
            word_index++
        })

        chars.forEach((char, char_index_line) => {
            char.style.setProperty('--char_index_line', `${char_index_line}`)
            char.style.setProperty('--char_index', `${char_index}`)
            char_index++
        })
    })
}

function setCharEase(title: SplitText, charStep = 0.015) {
    console.log(charStep)
    let charsCount = title.chars.length
    let linesCount = title.lines.length

    let chars = title.chars as HTMLElement[]

    chars.forEach((char) => {
        let line = char.closest('.line')
        if (!(line instanceof HTMLElement)) return

        let lineIndex = line.style.getPropertyValue('--line_index')
        let charIndexLine = char.style.getPropertyValue('--char_index_line')
        let totalCharsLine = line.querySelectorAll('.char').length

        let lineProgress = Number(lineIndex) / linesCount
        let charProgress = Number(charIndexLine) / totalCharsLine

        let charEased = easeOutSine(charProgress)
        let lineEased = easeOutSine(lineProgress)

        let lineDelay = lineEased * linesCount * charStep * 20
        let charDelay = charEased * totalCharsLine * charStep + lineDelay
        char.style.setProperty('--char_delay', `${charDelay.toFixed(3)}s`)
        line.style.setProperty('--line_eased', `${lineEased.toFixed(3)}`)
    })
}
