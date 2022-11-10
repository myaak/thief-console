
let currentBuildingStatus: Array<number> = []


function getRandomInt(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed());
}

function Init(fireStartFloor: number) {
  for (let i = 0; i < fireStartFloor; ++i)
    currentBuildingStatus.push(i + 1)
}

const getTimeToFloorAndCollect = (thiefFloor: number, destinationFloor: number,
  liftSpeed: number, collectionTime: number, burnTime: number) => {
  return ((Math.abs(thiefFloor - destinationFloor) * liftSpeed) + collectionTime <
    ((currentBuildingStatus.length + 1 - destinationFloor) * burnTime))
}

const red = '\x1b[31m'
const yellow = '\x1b[33m'
const green = '\x1b[32m'

function Play(lSpeed:number, fSpeed:number, cSpeed:number, fSFloor:number) {

  const liftSpeed: number = lSpeed
  const fireSpeed: number = fSpeed 
  const collectionSpeed: number = cSpeed
  const fireStartFloor: number = fSFloor 
  //const buildingHeight:number = Number(args.buildingHeight)

  const moneyFloors: number = getRandomInt(1, fireStartFloor)

  let money: any = []

  for (let i = 0; i < moneyFloors; ++i) {
    const floorNumber: number = getRandomInt(1, moneyFloors)
    if (money.filter((item: any) => item.floor === floorNumber).length === 0)
      money.push({ floor: floorNumber, money: getRandomInt(10, 150) })
  }
  money.sort((a: any, b: any) => b.money - a.money)


  let currentTimeBurn = new Date().getTime()
  let currentTimeThief = new Date().getTime()

  let moneyLength: number = money.length - 1
  let collectedMoney: number = 0

  let currentThiefGoal: number = 0
  let currentThiefFloor: number = 1

  Init(fireStartFloor)

  while (true) {
    try {
      if (new Date().getTime() - currentTimeBurn >= fireSpeed) {
        currentTimeBurn = new Date().getTime()
        console.log(red, `Burned ${currentBuildingStatus.pop()} floor`)
      }
      if (getTimeToFloorAndCollect(currentThiefFloor, money[moneyLength].floor, liftSpeed, collectionSpeed, fireSpeed)) {
        currentThiefGoal = money[moneyLength].floor
        if (currentThiefFloor === currentThiefGoal) {
          if (new Date().getTime() - currentTimeThief >= collectionSpeed) {
            collectedMoney += money[moneyLength].money
            console.log(green, `Collected money on ${money[moneyLength].floor}`)
            --moneyLength
            currentThiefGoal = money[moneyLength].floor
          }
        }
        else if (new Date().getTime() - currentTimeThief >= liftSpeed) {
          //console.log(currentThiefGoal)
          if (currentThiefGoal > currentThiefFloor) {
            ++currentThiefFloor
          }
          else {
            --currentThiefFloor
          }
          currentTimeThief = new Date().getTime()
          console.log(yellow, `Thief's floor: ${currentThiefFloor}, goal: ${currentThiefGoal}`)
        }
      } else {
        --moneyLength
      }
    }
    catch {
      console.log(green, `Total money collected: ${collectedMoney}`)
      return
    }
  }
}

export {Play}

