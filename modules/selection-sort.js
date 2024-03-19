
async function sort() {
    for (let i = 0; i < totalElement; i++) {
        highLightCellSelected(i)
        let min = i

        for (let j = i + 1; j < totalElement; j++) {
            highLightCellLoop(j)
            await new Promise(resolve => setTimeout(resolve, 500))
            if (arr[min] > arr[j]) {
                min = j
            }
            clearHighLightNode(j)
        }

        if (i === min) {
            clearHighLightNode(i)
            clearHighLightNode(min)
            continue
        }
        highLightCellSelected(min)
        const temp = arr[min]
        arr[min] = arr[i]
        arr[i] = temp
        await swapTwoElement(i, min)
        clearHighLightNode(i)
        clearHighLightNode(min)
        await new Promise(resolve => setTimeout(resolve, 500))
    }

    document.getElementById('message').style.display = 'block'
}

function draw() {
    const rootEl = document.getElementById('root')
    rootEl.innerHTML = ''

    for (let i = 0; i < totalElement; i++) {
        const el = createCell(i, arr[i])
        rootEl.appendChild(el)
    }
}

async function swapTwoElement(firstIndex, secondIndex) {
    console.log(firstIndex, secondIndex)
    const firstEl = document.getElementById(`item-${firstIndex}`)
    const secondEl = document.getElementById(`item-${secondIndex}`)

    firstEl.style.transform = `translate(0px, -50px)`
    secondEl.style.transform = `translate(0, 50px)`

    await new Promise(resolve => setTimeout(resolve, 1000))

    const step = secondIndex - firstIndex
    firstEl.style.transform = `translate(${step * 51}px, -50px)`
    secondEl.style.transform = `translate(${-step * 51}px, 50px)`

    await new Promise(resolve => setTimeout(resolve, 1500))
    firstEl.style.transform = `translate(${step * 51}px, 0)`
    secondEl.style.transform = `translate(${-step * 51}px, 0)`

    await new Promise(resolve => setTimeout(resolve, 1000))
    const parent = document.getElementById('root')
    const children = parent.children
    
    const newFristNode = createCell(firstIndex, secondEl.textContent)
    const newSecondNode = createCell(secondIndex, firstEl.textContent)

    parent.replaceChild(newFristNode, children[firstIndex])
    parent.replaceChild(newSecondNode, children[secondIndex])
}

function createCell(i, name) {
    const el = document.createElement('span')
    el.setAttribute('class', 'item')
    el.setAttribute('id', `item-${i}`)
    const text = document.createTextNode(name)
    el.appendChild(text)

    return el
}

function highLightCellLoop(index) {
    const el = document.getElementById(`item-${index}`)
    el.style.border = '1px dashed #e11111'
    el.style.color = '#e11111'
}

function highLightCellSelected(index) {
    const el = document.getElementById(`item-${index}`)
    el.style.border = '1px dashed green'
    el.style.backgroundColor = '#ff8100'
}

function clearHighLightNode(index) {
    const el = document.getElementById(`item-${index}`)
    el.style.border = '1px dashed aqua'
    el.style.backgroundColor = 'aqua'
    el.style.color = 'inherit'
}