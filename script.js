let shipyardContainer = document.querySelector('.shipyardContainer');
let startGameBtn = document.querySelector('.startGameBtn');
let gameStartedContainer = document.querySelector('.gameStartedContainer');
let shipyard = document.querySelector('.shipyard');
let selectShips = document.querySelectorAll('.selectShips');
let gameBox = document.querySelectorAll('.gameBox');
let rotateBtn = document.querySelector('.rotate');
let hoverBoards = document.querySelectorAll('.hoverBoard');
let gameBox2 = document.querySelectorAll('.gameBox2');
let winnerStatus = document.querySelector('.winnerStatus');
let playerWon = document.querySelector('.playerWon');
let computerWon = document.querySelector('.computerWon');
let playAgainBtn = document.querySelector('.playAgainBtn');
let computerShipStatus = document.querySelectorAll('.computerShipStatus');
let playerShipStatus = document.querySelectorAll('.playerShipStatus');
let ComputerShipyardContainer = document.querySelector('.ComputerShipyardContainer');
let playerShipyardContainer = document.querySelector('.playerShipyardContainer');

class ship {
    constructor(size) {
        this.length = size;
        this.hits = 0;
        this.sunk = false;
        this.takenCoordinates = [];
    }
    hit() {
        this.hits++;
    }
    isSunk() {
        if (this.length === this.hits) {
            this.sunk = true;
            return true;
        }
        else {
            return false;
        }
    }
}
class gameBoard {
    constructor() {
        this.availableChoiceArray = [];
        this.pickedArr = [];
        this.playerChosenCoordinate = [];
        this.computerChosenCoordinate = [];
        this.size = 0;
        this.currentAxis = 'X';
        this.invalidPositionsArray = [];
        this.gameStarted = false;
        this.selectedShip = true;
        this.placedShip = false;
        this.shipPlaceMentCount = 0;
        this.playerShips = this.getShips();
        this.computerShips = this.getShips();
        this.shipCount = 0;
        this.shipIndex = null;
        this.targetCoordinates = '';
        this.invalidComputerPositionsArray = [];
    }
    getShips() {
        let ships = [];
        let cruiser = new ship(2);
        let submarine = new ship(3);
        let destroyer = new ship(3);
        let battleship = new ship(4);
        let carrier = new ship(5);
        ships.push(cruiser, submarine, destroyer, battleship, carrier);
        return ships;
    }
    coordinateGeneratorX() {
        let coordinateArray = [];
        let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let i = 0; i <= columns.length - 1; i++) {
            for (let j = 0; j <= rows.length - 1; j++) {
                coordinateArray.push(rows[i] + columns[j]);
            }
        }
        return coordinateArray;
    }
    coordinateGeneratorY() {
        let coordinateArray = []
        let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        let rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let i = 0; i <= columns.length - 1; i++) {
            for (let j = 0; j <= rows.length - 1; j++) {
                coordinateArray.push(rows[j] + columns[i]);
            }
        }
        return coordinateArray;
    }
    updateInvalidPositionArraay() {
        let invalidEnteriesx = this.invalidEnteriesX(this.setShipX(this.size, this.targetCoordinates));
        let invalidEnteriesy = this.invalidEnteriesY(this.setShipY(this.size, this.targetCoordinates));
        if (this.currentAxis === 'X') {
            for (let i = 0; i <= invalidEnteriesx.length - 1; i++) {
                this.invalidPositionsArray.push(invalidEnteriesx[i]);
            }
        }
        else {
            for (let i = 0; i <= invalidEnteriesy.length - 1; i++) {
                this.invalidPositionsArray.push(invalidEnteriesy[i]);
            }
        }
    }
    updatePlayerChosenCoordinateArray() {
        let arr1 = (this.setShipX(this.size, this.targetCoordinates));
        let arr2 = (this.setShipY(this.size, this.targetCoordinates));
        if (this.currentAxis === 'X') {
            for (let i = 0; i <= arr1.length - 1; i++) {
                this.playerChosenCoordinate.push(arr1[i])
            }
        }
        else {
            for (let i = 0; i <= arr2.length - 1; i++) {
                this.playerChosenCoordinate.push(arr2[i])
            }
        }
    }
    updateComputerChosenCoordinateArrayX(shipIndex) {
        shipIndex = this.shipIndex;
        let arr1 = this.computerShips[shipIndex].takenCoordinates[0]
        for (let i = 0; i <= arr1.length - 1; i++) {
            this.computerChosenCoordinate.push(arr1[i])
        }
    }
    invalidEnteriesX(currentCoordinates) {
        if (this.currentAxis === 'X') {
            let invalidPositions = [];
            let coordinateArray = this.coordinateGeneratorX();
            let head = currentCoordinates[0];
            let tail = currentCoordinates[currentCoordinates.length - 1];
            let headIndex = coordinateArray.indexOf(head);
            let tailIndex = coordinateArray.indexOf(tail);
            for (let i = 0; i <= currentCoordinates.length - 1; i++) {
                let currentIndex = coordinateArray.indexOf(currentCoordinates[i]);
                invalidPositions.push(currentCoordinates[i])
                if (head.includes('a')) {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 1]);
                    invalidPositions.push(coordinateArray[tailIndex + 11]);
                    invalidPositions.push(coordinateArray[tailIndex - 9]);

                }
                else if (tail.includes('j')) {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex - 1]);
                    invalidPositions.push(coordinateArray[headIndex + 9]);
                    invalidPositions.push(coordinateArray[headIndex - 11]);
                }
                else {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex - 1]);
                    invalidPositions.push(coordinateArray[currentIndex + 1]);
                    invalidPositions.push(coordinateArray[currentIndex - 11]);
                    invalidPositions.push(coordinateArray[currentIndex + 11]);
                    invalidPositions.push(coordinateArray[currentIndex + 9]);
                    invalidPositions.push(coordinateArray[currentIndex - 9]);
                }
            }
            let unique = [...new Set(invalidPositions)];
            unique = unique.filter(function (element) {
                return element !== undefined;
            })
            return unique;
        }
        else {
            return;
        }
    }
    invalidEnteriesY(currentCoordinates) {
        if (this.currentAxis === 'Y') {
            let invalidPositions = [];
            let coordinateArray = this.coordinateGeneratorY();
            let head = currentCoordinates[0];
            let tail = currentCoordinates[currentCoordinates.length - 1];
            let headIndex = coordinateArray.indexOf(head);
            let tailIndex = coordinateArray.indexOf(tail);
            for (let i = 0; i <= currentCoordinates.length - 1; i++) {
                let currentIndex = coordinateArray.indexOf(currentCoordinates[i]);
                invalidPositions.push(currentCoordinates[i]);
                if (head.includes('1')) {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 1]);
                    invalidPositions.push(coordinateArray[tailIndex + 11]);
                    invalidPositions.push(coordinateArray[tailIndex - 9]);

                }
                else if (tail.includes('10')) {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex - 1]);
                    invalidPositions.push(coordinateArray[headIndex + 9]);
                    invalidPositions.push(coordinateArray[headIndex - 11]);
                }
                else {
                    invalidPositions.push(coordinateArray[currentIndex - 10]);
                    invalidPositions.push(coordinateArray[currentIndex + 10]);
                    invalidPositions.push(coordinateArray[currentIndex - 1]);
                    invalidPositions.push(coordinateArray[currentIndex + 1]);
                    invalidPositions.push(coordinateArray[currentIndex - 11]);
                    invalidPositions.push(coordinateArray[currentIndex + 11]);
                    invalidPositions.push(coordinateArray[currentIndex + 9]);
                    invalidPositions.push(coordinateArray[currentIndex - 9]);
                }
            }
            let unique = [...new Set(invalidPositions)];
            unique = unique.filter(function (element) {
                return element !== undefined;
            })
            return unique;
        }
        else {
            return
        }
    }
    setShipX(size, targetCoordinates) {
        size = this.size;
        targetCoordinates = this.targetCoordinates;
        let gameBoardCoordinates = this.coordinateGeneratorX();
        let coordinateArray = [];
        if (this.currentAxis === 'X') {
            let head = gameBoardCoordinates.indexOf(targetCoordinates);
            for (let i = head; i < (head + size); i++) {
                coordinateArray.push(gameBoardCoordinates[i]);
            }
            let coordinateHead = coordinateArray[0];
            let coordinateTail = coordinateArray[coordinateArray.length - 1];
            if (coordinateHead.slice(0, 1) === coordinateTail.slice(0, 1)) {
                return coordinateArray;
            }
            else {
                return 'not possible';
            }
        }
        else {
            return 'not possible';
        }
    }
    setShipY(size, targetCoordinates) {
        size = this.size;
        targetCoordinates = this.targetCoordinates;
        let gameBoardCoordinates = this.coordinateGeneratorY();
        let coordinateArray = [];
        if (this.currentAxis === 'Y') {
            let head = gameBoardCoordinates.indexOf(targetCoordinates);
            for (let i = head; i < (head + size); i++) {
                coordinateArray.push(gameBoardCoordinates[i]);
            }
            let coordinateHead = coordinateArray[0];
            let coordinateTail = coordinateArray[coordinateArray.length - 1];
            if (coordinateHead.slice(coordinateHead.length - 1) === coordinateTail.slice(coordinateTail.length - 1)) {
                return coordinateArray;
            }
            else return 'not possible';
        }
        else {
            return;
        }
    }

    designShipX(size, targetCoordinates) {
        size = this.size;
        targetCoordinates = this.targetCoordinates;
        if (this.currentAxis === 'X') {
            let requiredCoordinates = this.setShipX(size, targetCoordinates);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.classList.add('redShip');
                }
            }
        }
    }
    designShipY(size, targetCoordinates) {
        size = this.size;
        targetCoordinates = this.targetCoordinates;
        if (this.currentAxis === 'Y') {
            let requiredCoordinates = this.setShipY(size, targetCoordinates);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.classList.add('redShip');
                }
            }
        }
    }
    popStartGameBtn() {
        if (this.shipCount === 5 && this.selectedShip === false) {
            startGameBtn.style.display = 'block';
            rotateBtn.style.opacity = '0';
        }
    }
    hoverX() {
        if (this.currentAxis === 'X') {
            let requiredCoordinates = this.setShipX(this.size, this.targetCoordinates);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.classList.add('hover');
                }
            }
        }
        else if (this.currentAxis === 'Y') {
            let requiredCoordinates = this.setShipY(this.size, this.targetCoordinates);
            for (let i = 0; i <= requiredCoordinates.length; i++) {
                let element = document.getElementById(requiredCoordinates[i]);
                if (element !== null) {
                    element.classList.add('hover');
                }
            }
        }
        else {
            return;
        }
    }
    removeHoverX() {
        if (this.currentAxis === 'X') {
            let coordinate = this.setShipX(this.size, this.targetCoordinates);
            for (let i = 0; i <= coordinate.length - 1; i++) {
                let elem = document.getElementById(coordinate[i]);
                elem.classList.remove('hover');
            }
        }
        else if (this.currentAxis === 'Y') {
            let coordinate = this.setShipY(this.size, this.targetCoordinates);
            for (let i = 0; i <= coordinate.length - 1; i++) {
                let elem = document.getElementById(coordinate[i])
                elem.classList.remove('hover');
            }
        }
    }
    setCoordinates() {
        for (let i = 0; i <= gameBox.length - 1; i++) {
            let coordinate = this.coordinateGeneratorX()
            gameBox[i].setAttribute('id', coordinate[i]);
        }
    }
    updateInvalidComputerPositionArray(arr) {
        for (let i = 0; i <= arr.length - 1; i++) {
            this.invalidComputerPositionsArray.push(arr[i]);
        }
    }
    getComputerChoicesX(size) {
        size = this.size
        let chosenCoordinates = [];
        let coordinate1 = this.coordinateGeneratorX();
        while (chosenCoordinates.length < size) {
            let randomNumber = Math.floor(Math.random() * 100);
            this.targetCoordinates = coordinate1[randomNumber];
            let setX = this.setShipX(size, this.targetCoordinates);
            for (let i = 0; i <= setX.length - 1; i++) {
                chosenCoordinates.push(setX[i]);
            }
            if (chosenCoordinates[0] === 'n' || setX[0] === undefined || this.invalidComputerPositionsArray.some(x => setX.includes(x))) {
                chosenCoordinates = [];
            }
            else {
                let arr = this.invalidEnteriesX(chosenCoordinates);
                this.updateInvalidComputerPositionArray(arr);
            }
        }
        return chosenCoordinates;
    }
    getComputerChoicesY(size) {
        let chosenCoordinates = [];
        let coordinate1 = this.coordinateGeneratorY();
        while (chosenCoordinates.length < size) {
            let randomNumber = Math.floor(Math.random() * 100);
            this.targetCoordinates = coordinate1[randomNumber];
            let setY = this.setShipY(size, this.targetCoordinates);
            for (let i = 0; i <= setY.length - 1; i++) {
                chosenCoordinates.push(setY[i]);
            }
            if (chosenCoordinates[0] === 'n' || this.invalidComputerPositionsArray.some(y => setY.includes(y))) {
                chosenCoordinates = [];
            }
            else {
                let arr = this.invalidEnteriesY(chosenCoordinates);
                this.updateInvalidComputerPositionArray(arr);
            }
        }
        return chosenCoordinates;
    }

    removeShipDesigns() {
        let arr = this.playerChosenCoordinate;
        for (let i = 0; i <= arr.length - 1; i++) {
            let element = document.getElementById(arr[i]);
            element.classList.remove('redShip', 'hover');
        }
    }
    setCoordinates2() {
        for (let i = 0; i <= gameBox2.length - 1; i++) {
            let coordinate = this.coordinateGeneratorX();
            gameBox2[i].setAttribute('id', coordinate[i]);
            this.availableChoiceArray.push(coordinate[i]);
        }
    }
    computerPlay() {
        let picked = '';
        while (picked.length < 1) {
            let randomNumber = Math.floor(Math.random() * this.availableChoiceArray.length);
            let humanChoice = this.playerChosenCoordinate;
            let randomChoice = this.availableChoiceArray[randomNumber];
            let element = gameBox[randomNumber];
            if (this.pickedArr.includes(randomChoice)) {
                picked = ''
            }
            else {
                picked = randomChoice;
                this.pickedArr.push(randomChoice);
                if (humanChoice.includes(randomChoice)) {
                    element.classList.add('redShip');
                    this.updateHitPlayer(randomChoice);
                    this.sunkShipPlayer();
                }
                else {
                    element.classList.add('blackShip');
                }
            }
        }
    }
    fillShips() {
        for (let i = 0; i <= 4; i++) {
            while (this.computerShips[i].takenCoordinates.length < 1) {
                selectShips[i].click()
            }
        }
    }
    updateHitPlayer(value) {
        for (let i = 0; i <= 4; i++) {
            if (this.playerShips[i].takenCoordinates[0].includes(value)) {
                this.playerShips[i].hit();
            }
        }
    }
    updateHitComputer(value) {
        for (let i = 0; i <= 4; i++) {
            if (this.computerShips[i].takenCoordinates[0].includes(value)) {
                this.computerShips[i].hit();
            }
        }
    }
    updateWinner() {
        if (this.computerShips[0].sunk === true && this.computerShips[1].sunk === true && this.computerShips[2].sunk === true && this.computerShips[3].sunk === true && this.computerShips[4].sunk === true) {
            winnerStatus.style.display = 'flex';
            playerWon.style.display = 'flex';
            endGame()
        }
        else if (this.playerShips[0].sunk === true && this.playerShips[1].sunk === true && this.playerShips[2].sunk === true && this.playerShips[3].sunk === true && this.playerShips[4].sunk === true) {
            winnerStatus.style.display = 'flex';
            computerWon.style.display = 'flex';
            endGame()
        }
    }
    updateHitPlayer(value) {
        for (let i = 0; i <= 4; i++) {
            if (this.playerShips[i].takenCoordinates[0].includes(value)) {
                this.playerShips[i].hit();
                this.playerShips[i].isSunk();
            }
        }
    }
    updateHitComputer(value) {
        for (let i = 0; i <= 4; i++) {
            if (this.computerShips[i].takenCoordinates[0].includes(value)) {
                this.computerShips[i].hit();
                this.computerShips[i].isSunk();
            }
        }
    }
    sunkShipComputer() {
        for (let i = 0; i <= 4; i++) {
            if (this.computerShips[i].sunk === true) {
                computerShipStatus[i].classList.add('sunk');
            }
        }
        this.updateWinner();
    }
    sunkShipPlayer() {
        for (let i = 0; i <= 4; i++) {
            if (this.playerShips[i].sunk === true) {
                playerShipStatus[i].classList.add('sunk');
            }
        }
        this.updateWinner();
    }
}
let board = new gameBoard();
board.setCoordinates();
function endGame() {
    gameBox.forEach(element => {
        element.style.pointerEvents = 'none'
    });
    gameBox2.forEach(element => {
        element.style.pointerEvents = 'none'
    });
}
function disableClicksOnShips() {
    if (board.selectedShip === true) {
        for (let i = 0; i <= 4; i++) {
            selectShips[i].style.pointerEvents = 'none';
        }
    }
}
function enableClicksOnShips() {
    if (board.selectedShip === false) {
        for (let i = 0; i <= 4; i++) {
            selectShips[i].style.pointerEvents = 'all';
        }
    }
}

gameBox.forEach(element => {
    element.addEventListener('click', () => {
        if (board.currentAxis === 'X') {
            board.targetCoordinates = element.getAttribute('id');
            let enteriesX = board.setShipX(board.size, board.targetCoordinates);
            if (enteriesX[0] === 'n') return;
            if (board.invalidPositionsArray.some(x => enteriesX.includes(x))) return;
            board.updateInvalidPositionArraay();
            board.updatePlayerChosenCoordinateArray();
            board.selectedShip = false;
            board.popStartGameBtn();
            board.playerShips[board.shipIndex].takenCoordinates.push(board.setShipX(board.size, board.targetCoordinates));
            if (board.currentAxis === 'X') {
                board.designShipX(board.size, board.targetCoordinates);
                board.size = 0;
            }
        }
        enableClicksOnShips();
        element.click();
    })
});
gameBox.forEach(element => {
    element.addEventListener('click', () => {
        enableClicksOnShips();
        if (board.currentAxis === 'Y') {
            board.targetCoordinates = element.getAttribute('id');
            let enteriesY = board.setShipY(board.size, board.targetCoordinates);
            if (enteriesY[0] === 'n') return;
            if (board.invalidPositionsArray.some(y => enteriesY.includes(y))) return;
            board.updateInvalidPositionArraay();
            board.updatePlayerChosenCoordinateArray();
            board.selectedShip = false;
            board.popStartGameBtn()
            board.playerShips[board.shipIndex].takenCoordinates.push(board.setShipY(board.size, board.targetCoordinates));
            if (board.currentAxis === 'Y') {
                board.designShipY(board.size, board.targetCoordinates);
                board.size = 0;
            }
        }
        else {
            return;
        }
    })
});
startGameBtn.addEventListener('click', () => {
    playerShipyardContainer.style.display = 'block';
    ComputerShipyardContainer.style.opacity = '1';
    shipyardContainer.remove();
    board.removeShipDesigns();
    board.gameStarted = true;
    board.setCoordinates2();
    startGameBtn.remove();
    board.fillShips();
    board.size = 0;
});
let setShipSizes = (function () {
    selectShips[0].size = 2
    selectShips[1].size = 3
    selectShips[2].size = 3
    selectShips[3].size = 4
    selectShips[4].size = 5
})()
selectShips.forEach(ship => {
    ship.addEventListener('click', () => {
        board.selectedShip = true;
        disableClicksOnShips();
        board.selectedShip = true;
        board.shipCount++;
        board.size = ship.size;
        board.shipIndex = ship.id;
        ship.classList.add('reduce');
        if (board.currentAxis === 'X') {
            board.computerShips[ship.id].takenCoordinates.push(board.getComputerChoicesX(board.size));
        }
        else {
            board.computerShips[ship.id].takenCoordinates.push(board.getComputerChoicesY(board.size));
        }
        board.updateComputerChosenCoordinateArrayX(board.shipIndex);
    })
});
rotateBtn.addEventListener('click', () => {
    if (board.currentAxis === 'X') {
        board.currentAxis = 'Y';
    }
    else {
        board.currentAxis = 'X';
    }
})
gameBox.forEach(element => {
    element.addEventListener('mouseenter', () => {
        board.targetCoordinates = element.getAttribute('id');
        board.hoverX();
    })
    element.addEventListener('mouseleave', () => {
        board.targetCoordinates = element.getAttribute('id');
        board.removeHoverX();
    })
});
gameBox2.forEach(element => {
    element.addEventListener('click', () => {
        if (board.gameStarted === true) {
            element.style.pointerEvents = 'none';
            let arr = board.computerChosenCoordinate;
            if (arr.includes(element.id)) {
                element.classList.add('redShip');
                board.updateHitComputer(element.id)
                board.sunkShipComputer()
            }
            else element.classList.add('blackShip');
            board.computerPlay();
        }
    })
});
playAgainBtn.addEventListener('click', () => {
    location.reload();
});