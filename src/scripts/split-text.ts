import { SplitText } from 'gsap/SplitText'

export function splitText(el: HTMLElement) {
    let content = el.innerHTML
    content = content.replace(/(<([^>]+)>)/gi, '')
    el.setAttribute('aria-label', content)

    let splitBy = el.dataset.splitBy || 'chars,words,lines'

    const title = new SplitText(el, {
        type: splitBy,
        lineThreshold: 0.3,
        charsClass: 'char',
        wordsClass: 'word',
        linesClass: 'line',
    })

    if (splitBy.includes('lines')) {
        linesSetProps(title.lines as HTMLElement[])
    } else if (splitBy.includes('words')) {
        wordsSetProps(title.words as HTMLElement[])
    } else if (title.chars) {
        charsSetProps(title.chars as HTMLElement[])
    }

    if (title.chars) {
        title.chars.forEach((char) => {
            let letter = char.innerHTML
            char.setAttribute('data-char', letter)
        })
    }

    el.style.setProperty('--chars_count', `${title.chars.length}`)
    el.style.setProperty('--words_count', `${title.words.length}`)

    el.classList.add('split')
}

export function charsSetProps(chars: HTMLElement[]) {
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

export function linesSetProps(lines: HTMLElement[]) {
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
