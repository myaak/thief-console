import { Play } from './utils/thiefBank'
import { AimToFreedom } from './utils/thiefDoors'

const minimist = require('minimist')

let rawArguments = process.argv.slice(2)
let args = minimist(rawArguments, {
  default: {
    mode: 1,
    fireStart: 100,
    liftSpeed: 500,
    fireSpeed: 1500,
    collectionSpeed: 2000,
    num: 1
  }
})

const num = Number(args.num)
const mode = Number(args.mode)
const liftSpeed: number = Number(args.liftSpeed)
const fireSpeed: number = Number(args.fireSpeed)
const collectionSpeed: number = Number(args.collectionSpeed)
const fireStartFloor: number = Number(args.fireStart)

if (mode === 1)
  AimToFreedom(num)
else
  Play(liftSpeed, fireSpeed, collectionSpeed, fireStartFloor)
