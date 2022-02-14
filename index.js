

const boardObj = {
    rows: 8,
    cols: 8,
    boardEle: document.querySelector("#board")
}

const getSquare = (id, color = "white") => {
    return `<div class="square ${'bg-' + color}" id="${id}" data-type="square"></div>`
}

const initBoard = ({ rows, cols, boardEle } = boardObj) => {
    boardEle.innerHTML = ``
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // console.log(row, col);
            let id = row + '-' + col
            let color = 'white'
            if ((row + col) % 2 === 0) {
                color = 'white'
            } else {
                color = 'black'
            }
            boardEle.innerHTML += getSquare(id, color)
            // if (col === 7) {
            //     boardEle.innerHTML += `</br>`
            // }
        }
    }
}

initBoard(boardObj)

const cleanBoard = ({ rows, cols } = boardObj) => {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let id = row + '-' + col
            let square = document.getElementById(id)
            square.classList.remove('bg-red')
        }
    }
}

boardObj.boardEle.addEventListener('click', (e) => {
    // console.log(e.target.dataset.type === 'square')
    if (e.target.dataset.type === 'square') {
        let element = e.target
        console.log(element.id);
        let destructure = element.id.split('-')
        let target = {
            row: Number(destructure[0]),
            col: Number(destructure[1])
        }
        paintDiagonals(target, boardObj)
    }
})

const paintDiagonals = ({ row, col }, { rows }) => {
    let rowsBelow = (rows - 1) - row
    let targetELement = document.getElementById(`${row + '-' + col}`)
    targetELement.classList.add('bg-red')
    console.log(row, col, rowsBelow);
    for (let index = row, in2 = col, in3 = col; index > 0; index--) {
        let element1 = document.getElementById(`${(index - 1) + '-' + (in2 - 1)}`)
        let element2 = document.getElementById(`${(index - 1) + '-' + (in3 + 1)}`)
        console.log("upper", index, in2, in3);
        // console.log(element1, element2, `${(index + 1) + '-' + (in3 + 1)}`)
        console.log(`${(index - 1) + '-' + (in2 - 1)}`, `${(index + 1) + '-' + (in3 - 1)}`);
        element1?.classList.add('bg-red')
        element2?.classList.add('bg-red')
        if (in2 > 0) (
            in2--
        )
        if (in3 < rows - 1) {
            in3++
        }
    }

    for (let index = row, in2 = col, in3 = col; index < rows; index++) {
        let element1 = document.getElementById(`${(index + 1) + '-' + (in2 - 1)}`)
        let element2 = document.getElementById(`${(index + 1) + '-' + (in3 + 1)}`)
        console.log("lower", index, in2, in3);
        // console.log(element1, element2, `${(index + 1) + '-' + (in3 + 1)}`)
        // console.log(`${(index - 1) + '-' + (in2 - 1)}`, `${(index + 1) + '-' + (in3 - 1)}`);
        element1?.classList.add('bg-red')
        element2?.classList.add('bg-red')
        if (in2 > 0) (
            in2--
        )
        if (in3 < rows - 1) {
            in3++
        }
    }

    setTimeout(() => {
        cleanBoard()
    }, 2000);
}
