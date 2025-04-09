class CasinoGame {
    constructor() {
        this.balance = 1000;
        this.luck = 0;
        this.creditDebt = 0;
        this.luckCost = 1000;
        this.range = 'None';
        this.bonus = 0;
        this.updateUI();
    }

    spin() {
        if (this.balance < 100) {
            this.showMessage("Not enough balance to spin.");
            return;
        }
        this.balance -= 100;
        const winChance = Math.random() * (1 + this.luck / 100);
        if (winChance > 0.5) {
            const winnings = Math.floor(Math.random() * 901) + 100 + this.bonus;
            this.balance += winnings;
            this.showMessage(`You won $${winnings}!`);
        } else {
            this.showMessage("You lost this spin.");
        }
        this.updateUI();
    }

    buyLuck() {
        if (this.balance < this.luckCost) {
            this.showMessage("Not enough balance to buy luck.");
            return;
        }
        this.balance -= this.luckCost;
        this.luck += 1;
        this.luckCost *= 2;
        this.showMessage(`Luck increased! New luck: ${this.luck}%`);
        this.updateUI();
    }

    takeCredit() {
        const amount = parseInt(prompt("Enter credit amount (100 - 10000):"), 10);
        if (isNaN(amount) || amount < 100 || amount > 10000) {
            this.showMessage("Invalid credit amount.");
            return;
        }
        this.balance += amount;
        this.creditDebt += amount * 3;
        this.showMessage(`Credit taken: $${amount}. You owe: $${this.creditDebt}`);
        this.updateUI();
    }

    repayCredit() {
        const amount = parseInt(prompt("Enter amount to repay:"), 10);
        if (isNaN(amount) || this.balance < amount) {
            this.showMessage("Invalid repayment amount.");
            return;
        }
        this.balance -= amount;
        this.creditDebt -= amount;
        this.showMessage(`Credit repaid: $${amount}. Remaining debt: $${this.creditDebt}`);
        this.updateUI();
    }

    buyItem(item) {
        const items = {
            car: { price: 5000, range: 'Small Rich', bonus: 200 },
            jewelry: { price: 50000, range: 'Big Rich', bonus: 2000 },
            house: { price: 1000000, range: 'Millionaire', bonus: 25000 }
        };
        if (!items[item]) {
            this.showMessage("Invalid item.");
            return;
        }
        if (this.balance < items[item].price) {
            this.showMessage("Not enough balance to buy item.");
            return;
        }
        this.balance -= items[item].price;
        this.range = items[item].range;
        this.bonus = items[item].bonus;
        this.showMessage(`You bought a ${item} for $${items[item].price}.`);
        this.updateUI();
    }

    saveGame() {
        const gameState = {
            balance: this.balance,
            luck: this.luck,
            creditDebt: this.creditDebt,
            luckCost: this.luckCost,
            range: this.range,
            bonus: this.bonus
        };
        localStorage.setItem('casinoGameState', JSON.stringify(gameState));
        this.showMessage("Game saved.");
    }

    loadGame() {
        const gameState = JSON.parse(localStorage.getItem('casinoGameState'));
        if (gameState) {
            this.balance = gameState.balance;
            this.luck = gameState.luck;
            this.creditDebt = gameState.creditDebt;
            this.luckCost = gameState.luckCost;
            this.range = gameState.range;
            this.bonus = gameState.bonus;
            this.showMessage("Game loaded.");
            this.updateUI();
        } else {
            this.showMessage("No saved game found.");
        }
    }

    updateUI() {
        document.getElementById("balance").innerText = `Balance: $${this.balance}`;
        document.getElementById("debt").innerText = `Debt: $${this.creditDebt}`;
        document.getElementById("luck-cost").innerText = `Luck Cost: $${this.luckCost}`;
        document.getElementById("luck-cost-display").innerText = `$${this.luckCost}`;
        document.getElementById("range").innerText = `Range: ${this.range}`;
    }

    showMessage(message) {
        const messageDiv = document.getElementById("message");
        messageDiv.innerText = message;
        setTimeout(() => {
            messageDiv.innerText = "";
        }, 3000);
    }
}

const game = new CasinoGame();

function spin() {
    game.spin();
}

function buyLuck() {
    game.buyLuck();
}

function takeCredit() {
    game.takeCredit();
}

function repayCredit() {
    game.repayCredit();
}

function buyItem(item) {
    game.buyItem(item);
}

function saveGame() {
    game.saveGame();
}

function loadGame() {
    game.loadGame();
}
