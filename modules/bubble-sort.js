export async function sort(input, inputLength, createCell) {
    for (let i = 0; i < inputLength; i++) {
        for (let j = 0; j < inputLength - 1; j++) {
            document.getElementById(`item-${j + 1}`).classList.add('loop')
            await new Promise(resolve => setTimeout(resolve, 300))
            
            if (input[j] > input[j + 1]) {
                const temp = input[j]
                input[j] = input[j + 1]
                input[j + 1] = temp

                document.getElementById(`item-${j + 1}`).classList.remove('loop')
                await swap(j, createCell)
            } else {
                document.getElementById(`item-${j + 1}`).classList.remove('loop')
            }
        }
    }

    document.getElementById('alert').style.visibility = 'visible'
}

async function swap(index, createCell) {
    const firstEl = document.getElementById(`item-${index}`)
    const secondEl = document.getElementById(`item-${index + 1}`)

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
    
    await new Promise(resolve => setTimeout(resolve, 500))
}