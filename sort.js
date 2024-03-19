import { sort as bubbleSort } from './modules/bubble-sort.js'

const input = [65, 11, 34, 42, 91, 56, 3, 2, 7]
const inputLength = input.length
let algorithm = 'bubble'

window.onload = () => {
    render()

    document.getElementById(algorithm).setAttribute('checked', true)
}

export function render() {
    const rootEl = document.getElementById('root')
    rootEl.innerHTML = ''

    for (let i = 0; i < inputLength; i++) {
        const el = createCell(i, input[i])
        rootEl.appendChild(el)
    }
}

export function shuffle() {
    input.sort(() => (Math.random() > 0.5) ? 1 : - 1)
    render()
}

export function sort() {
    switch (algorithm) {
        case 'bubble':
            bubbleSort(input, inputLength, createCell)
            break
        default: 
            alert('Algorithm undefined')
    }
}

export function changeAlgorithm(e) {
    algorithm = e.target.value
}

function createCell(index, label, classes = undefined) {
    const el = document.createElement('span')
    el.setAttribute('id', `item-${index}`)

    if (classes) {
        el.classList.add(classes)
    }

    const elText = document.createTextNode(label)
    el.appendChild(elText)

    return el
}