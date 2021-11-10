//  q 1
let money = 1000000000 //1.000.000.000

const persen = 100
function cal(howMuch, portion){
  return howMuch/persen * portion
}

// portion
const depositoBank = cal(35,money)
const remainder = cal(65,money)

const stateBonds = cal(30,remainder)
const stockA = cal(35, remainder)
const stockB = cal(35, remainder)

// profit
const profitDepositoBank = cal(3.5, depositoBank)
const profitStateBonds = cal(13, stateBonds)
const profitStockA = cal(14.5,stockA)
const profitStockB = cal(12.5,stockB)

let year = 2
function totalProfit(){
  return profitDepositoBank + profitStateBonds + profitStockA + profitStockB
}

let profitAfterYears = totalProfit() * year
let moneyAfterYears = profitAfterYears + money

console.log(moneyAfterYears)