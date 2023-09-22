import { easeOpts } from './ease-options'
import { SelectEl } from './select'

class Toggle {
    input: HTMLInputElement
    checked: boolean = false
    onToggle: (checked: boolean) => void

    constructor(input: HTMLInputElement, onToggle: (checked: boolean) => void) {
        this.input = input
        this.onToggle = onToggle
        this.input.addEventListener('change', () => {
            this.checked = this.input.checked
            this.onToggle(this.checked)
        })
    }
}

class ClassToggle extends Toggle {
    element: Element

    constructor(
        input: HTMLInputElement,
        className: string,
        element: Element = document.body
    ) {
        super(input, () => {
            if (this.checked) {
                this.element.classList.add(className)
            } else {
                this.element.classList.remove(className)
            }
        })

        this.element = element
    }
}

let inputDarkMode = document.querySelector('input#dark-mode')
if (inputDarkMode instanceof HTMLInputElement)
    new ClassToggle(inputDarkMode, 'dark-mode')
