export const createEl = <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    atts?: { [key: string]: string },
    innerText?: string
) => {
    const el = document.createElement<K>(tagName)
    if (innerText) el.innerText = innerText
    if (atts) setAttributes(el, atts)

    return el
}

export const setAttributes = (
    el: HTMLElement,
    atts: { [key: string]: string }
) => {
    for (const key in atts) {
        el.setAttribute(key, atts[key])
    }

    return el
}
