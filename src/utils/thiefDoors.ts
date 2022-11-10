function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

//const minimist = require('minimist')

const AimToFreedom = (num: number) => {
  const shortTunnelLength = 7
  const longTunnelLength = 10

  let route = []

  let totalTime: number = 0
  let shortTunnels: number = 0
  let longTunnels: number = 0

  let onFreedom: boolean = false

  let averageRouteLength:number = 0

  for (let i = 0; i < num; ++i) {
    onFreedom = false
    while (!onFreedom) {
      const solution = getRandomInt(10);

      if (solution >= 0 && solution <= 2)
        onFreedom = true
      else if (solution >= 3 && solution <= 4) {
        route.push("shortTunnel")
        totalTime += shortTunnelLength
        ++shortTunnels
      }
      else {
        route.push("longTunnel")
        totalTime += longTunnelLength
        ++longTunnels
      }
    }
    averageRouteLength+=totalTime
  }
    averageRouteLength/=num
    console.log(`NUM = ${num}`)
    console.log(`Total time: ${totalTime}`)
    console.log(`Short tunnels: ${shortTunnels}, Long tunnels: ${longTunnels}`)
    console.log(`Average: ${averageRouteLength}`)
}

export {AimToFreedom}

