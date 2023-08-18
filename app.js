let clickUpgrades = [
  {
    name: 'brush',
    price: '50',
    quantity: '0',
    multiplier: 1,
  },
  {
    name: 'Catnip Brush',
    price: '200',
    quantity: '0',
    multiplier: 3,
  }
]

let automaticUpgrades = [
  {
    name: 'Sticky Lizard',
    price: '2500',
    quantity: '0',
    multiplier: 50,
  },
  {
    name: 'Roomba',
    price: '6000',
    quantity: '0',
    multiplier: 200,
  }
]





let totalHairballs = 0
let hairballModifier = 10000


// ok so I'm going to start writing what I need to do for every function:
// in this mine hairballs function, I want it to increase the amount of hairballs every time the user clicks on the cat✅
// I will have to refactor this later, but I also want this fxn to update the total hairballs in the dom for now.✅

function mineHairballs() {
  // TODO: for testing purposes, changing click interval from 1 hairball to 10 hairballs/ click. Change back later
  totalHairballs += hairballModifier

  // prints totalHairballs to DOM
  drawHairballs()
}


function buyCatnipBrush() {

  if (totalHairballs >= 50) {
    let catnipBrush = clickUpgrades.find(upgrade => upgrade.name == 'Catnip Brush')

    if (totalHairballs >= catnipBrush.price) {
      catnipBrush.quantity++
      totalHairballs -= 50
    }

    // updates DOM for brushes
    document.getElementById('catnipBrushCount').innerText = catnipBrush.quantity

    drawHairballs()

    // increases hairballModifier by one for increased click count
    hairballModifier += 3
  }
}

function buyBrush() {

  if (totalHairballs >= 200) {
    let brush = clickUpgrades.find(upgrade => upgrade.name == 'brush')

    if (totalHairballs >= brush.price) {
      brush.quantity++
      totalHairballs -= 50
    }

    // updates DOM for brushes
    document.getElementById('brushCount').innerText = brush.quantity

    drawHairballs()

    // increases hairballModifier by one for increased click count
    hairballModifier += 1
  }
}

function buyStickyLizard() {
  let stickyLizard = automaticUpgrades.find(upgrade => upgrade.name == 'Sticky Lizard')

  if (totalHairballs >= stickyLizard.price) {
    stickyLizard.quantity++

    totalHairballs -= 2500
  }

  drawHairballs()

  document.getElementById('stickyLizardCount').innerText = stickyLizard.quantity
}


// FIXME: roomba is only yielding 50HB, which is the same amount as sticky lizard, per interval. not sure why.
function buyRoomba() {
  let roomba = automaticUpgrades.find(upgrade => upgrade.name == 'Roomba')

  if (totalHairballs >= roomba.price) {
    roomba.quantity++

    totalHairballs -= 6000
  }

  drawHairballs()

  document.getElementById('roomba').innerText = roomba.quantity
}





function drawHairballs() {
  document.getElementById('hairballs').innerText = totalHairballs
}


// NOTE: HEY NOW, DONT FORGET TO DRAW STUFF TO THE DOM OR IT AINT GUNNA WORK

function collectAutoUpgrades() {
  automaticUpgrades.forEach(autoUpgrade => {
    if (autoUpgrade.quantity > 0) {

      console.log("here's a ", autoUpgrade.name, autoUpgrade.multiplier, autoUpgrade.quantity)

      //NOTE: from creating this log, I can see what's going on. It's treating a lizard and a roomba as the same thing. It's using the sticky lizard multiplier for both the lizard and the roomba

      // this increase the total hairballs + the amount each auto upgrade gives us
      totalHairballs = totalHairballs + (autoUpgrade.quantity * autoUpgrade.multiplier)

      drawHairballs()
    }
  })
}

setInterval(collectAutoUpgrades, 3000)