export async function sort(input, inputLength, elRefs, createCell) {

    for (let i = 0; i < inputLength - 1; i++) {
        elRefs.get(i).classList.add('loop')
        await new Promise(resolve => setTimeout(resolve, 300))
        
        let minIndex = i

        for (let j = i + 1; j < inputLength; j++) {
            elRefs.get(j).classList.add('loop')
            await new Promise(resolve => setTimeout(resolve, 300))
            if (input[j] < input[minIndex]) {
                minIndex = j
            }
            elRefs.get(j).classList.remove('loop')
        }

        if (minIndex !== i) {
            [input[minIndex], input[i]] = [input[i], input[minIndex]]
            await swap(i, minIndex, elRefs, createCell)
        }

        elRefs.get(minIndex).classList.remove('loop')
        elRefs.get(i).classList.remove('loop')
    }
    
    document.getElementById('alert').style.visibility = 'visible'
}

async function swap(firstIndex, secondIndex, elRefs, createCell) {
    const firstEl = elRefs.get(firstIndex)
    const secondEl = elRefs.get(secondIndex)
    const step = secondIndex - firstIndex

    firstEl.classList.add('selected')
    secondEl.classList.add('selected')
    
    firstEl.style.transform = `translate(0, -50px)`
    secondEl.style.transform = `translate(0, 50px)`

    await new Promise(resolve => setTimeout(resolve, 500))

    firstEl.style.transform = `translate(${step * 62}px, -50px)`
    secondEl.style.transform = `translate(${-step * 62}px, 50px)`

    await new Promise(resolve => setTimeout(resolve, 1500))

    firstEl.style.transform = `translate(${step * 62}px, 0)`
    secondEl.style.transform = `translate(${-step * 62}px, 0)`

    await new Promise(resolve => setTimeout(resolve, 1000))

    const parent = document.getElementById('root')
    const children = parent.children
    
    const newFristNode = createCell(firstIndex, secondEl.textContent)
    const newSecondNode = createCell(secondIndex, firstEl.textContent)

    parent.replaceChild(newFristNode, children[firstIndex])
    parent.replaceChild(newSecondNode, children[secondIndex])

    elRefs.set(firstIndex, newFristNode)
    elRefs.set(secondIndex, newSecondNode)
    
    await new Promise(resolve => setTimeout(resolve, 500))
}