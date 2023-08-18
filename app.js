let clickUpgrades = [
  {
    name: 'brush',
    price: '50',
    quantity: '0',
    multiplier: 1,
  },
  {
    name: 'catnipBrush',
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
    name: 'roomba',
    price: '6000',
    quantity: '0',
    multiplier: 200,
  }
]





let totalHairballs = 0
let hairballModifier = 100


// ok so I'm going to start writing what I need to do for every function:
// in this mine hairballs function, I want it to increase the amount of hairballs every time the user clicks on the cat✅
// I will have to refactor this later, but I also want this fxn to update the total hairballs in the dom for now.✅

function mineHairballs() {
  // TODO: for testing purposes, changing click interval from 1 hairball to 10 hairballs/ click. Change back later
  totalHairballs += hairballModifier

  // prints totalHairballs to DOM
  drawHairballs()
}


function buyBrush() {

  if (totalHairballs >= 50) {
    let brush = clickUpgrades.find(upgrade => upgrade.name = 'brush')

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
  let stickyLizard = automaticUpgrades.find(upgrade => upgrade.name = 'Sticky Lizard')

  if (totalHairballs >= stickyLizard.price) {
    stickyLizard.quantity++

    totalHairballs -= 2500
  }

  drawHairballs()

  document.getElementById('stickyLizardCount').innerText = stickyLizard.quantity
}



function drawHairballs() {
  document.getElementById('hairballs').innerText = totalHairballs
}


// NOTE: HEY NOW, DONT FORGET TO DRAW STUFF TO THE DOM OR IT AINT GUNNA WORK
// FIXME: so I get the hairball multiplier of one sticky lizard, but as I get more sticky lizards, it's still staying at a 50HB multiplier, instead of going up to 50, 100, 150 etc... FIXY

function collectAutoUpgrades() {
  automaticUpgrades.forEach(autoUpgrade => {
    if (autoUpgrade.quantity > 0) {
      // totalHairballs += autoUpgrade.multiplier

      hairballModifier = hairballModifier + (autoUpgrade.quantity * autoUpgrade.multiplier)

      drawHairballs()
    }
  })
}

setInterval(collectAutoUpgrades, 3000)