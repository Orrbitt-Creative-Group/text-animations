import { createEl } from './elements'

export class SelectEl {
    options: string[]
    prop: string
    current: string
    select: HTMLSelectElement
    label: HTMLLabelElement
    container: HTMLElement
    onChange?: (newVal: string) => any

    constructor({
        options,
        prop,
        currentStart = options[0],
        onChange,
    }: {
        options: string[]
        prop: string
        currentStart: string
        onChange?: (newVal: string) => any
    }) {
        this.options = options
        this.prop = prop
        this.current = currentStart

        this.select = createEl('select', { id: prop })
        this.label = createEl('label', { for: prop }, prop)
        this.options.forEach((option) => {
            this.select.appendChild(
                createEl('option', { value: option }, option)
            )
        })

        this.select.value = this.current

        this.container = createEl('div', { class: 'select-container' })
        this.container.appendChild(this.label)
        this.container.appendChild(this.select)

        if (onChange) {
            this.onChange = onChange
        }
        this.addListener()
    }

    setCurrent = (newCurrent: string) => {
        this.current = newCurrent
        this.select.value = this.current
        document.documentElement.style.setProperty(
            this.prop,
            `var(--${this.current})`
        )
    }

    addListener = () => {
        this.select.addEventListener('change', () => {
            this.setCurrent(this.select.value)
            if (this.onChange) this.onChange(this.select.value)
        })
    }
}
