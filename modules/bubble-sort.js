export async function sort(input, inputLength, elRefs, createCell) {

    let swapped
    do {
        swapped = false

        for (let j = 0; j < inputLength - 1; j++) {
            elRefs.get(j + 1).classList.add('loop')
            await new Promise(resolve => setTimeout(resolve, 300))
            
            if (input[j] > input[j + 1]) {
                [input[j], input[j + 1]] = [input[j + 1], input[j]]

                elRefs.get(j + 1).classList.remove('loop')
                await swap(j, elRefs, createCell)
                swapped = true
            } else {
                elRefs.get(j + 1).classList.remove('loop')
            }
        }
    } while (swapped);

    document.getElementById('alert').style.visibility = 'visible'
}

async function swap(index, elRefs, createCell) {
    const firstEl = elRefs.get(index)
    const secondEl = elRefs.get(index + 1)

    firstEl.classList.add('selected')
    secondEl.classList.add('selected')
    
    firstEl.style.transform = `translate(0px, -50px)`
    secondEl.style.transform = `translate(0, 50px)`

    await new Promise(resolve => setTimeout(resolve, 500))

    firstEl.style.transform = `translate(60px, -50px)`
    secondEl.style.transform = `translate(-60px, 50px)`

    await new Promise(resolve => setTimeout(resolve, 1000))

    firstEl.style.transform = `translate(60px, 0)`
    secondEl.style.transform = `translate(-60px, 0)`

    await new Promise(resolve => setTimeout(resolve, 1000))

    const parent = document.getElementById('root')
    const children = parent.children
    
    const newFristNode = createCell(index, secondEl.textContent)
    const newSecondNode = createCell(index + 1, firstEl.textContent)

    parent.replaceChild(newFristNode, children[index])
    parent.replaceChild(newSecondNode, children[index + 1])

    elRefs.set(index, newFristNode)
    elRefs.set(index + 1, newSecondNode)
    
    await new Promise(resolve => setTimeout(resolve, 500))
}