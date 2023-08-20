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
let hairballsPerClick = 0


// ok so I'm going to start writing what I need to do for every function:
// in this mine hairballs function, I want it to increase the amount of hairballs every time the user clicks on the cat✅
// I will have to refactor this later, but I also want this fxn to update the total hairballs in the dom for now.✅

function mineHairballs() {
  // TODO: for testing purposes, changing click interval from 1 hairball to 10 hairballs/ click. Change back later
  totalHairballs += hairballModifier

  // prints totalHairballs to DOM
  drawHairballs()
}


// in this function I'm updating the hairballs per click, and calling them in each of my hairball click modifiers
function drawHairballsPerClick(modifier) {
  hairballsPerClick += modifier

  document.getElementById('hairballsPerClick').innerText = hairballsPerClick
}



function buyBrush() {

  if (totalHairballs >= 200) {
    let brush = clickUpgrades.find(upgrade => upgrade.name == 'brush')

    if (totalHairballs >= brush.price) {
      brush.quantity++
      totalHairballs -= 50
      // brush.price *= 4
    }

    // updates DOM for brushes
    document.getElementById('brushCount').innerText = brush.quantity

    document.getElementById('brushMultiplier').innerText = brush.multiplier * brush.quantity

    drawHairballs()

    // increases hairballModifier by one for increased click count
    hairballModifier += 1

    drawHairballsPerClick(1)

    brush.price = brush.price * 2

    drawBrushPrice()
  }
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

    document.getElementById('catnipBrushMultiplier').innerText = catnipBrush.multiplier * catnipBrush.quantity

    drawHairballs()

    // increases hairballModifier by one for increased click count
    hairballModifier += 3

    drawHairballsPerClick(3)

    catnipBrush.price = catnipBrush.price * 4

    drawCatnipBrushPrice()
  }
}



function buyStickyLizard() {
  let stickyLizard = automaticUpgrades.find(upgrade => upgrade.name == 'Sticky Lizard')

  if (totalHairballs >= stickyLizard.price) {
    stickyLizard.quantity++

    totalHairballs -= 2500

    drawHairballs()

    document.getElementById('stickyLizardCount').innerText = stickyLizard.quantity

    document.getElementById('stickyLizardMultiplier').innerText = stickyLizard.multiplier * stickyLizard.quantity

    stickyLizard.price = stickyLizard.price * 5

    drawStickyLizardPrice()
  }
}

// FIXME: number of roombas bought is not increasing, all other functions work

function buyRoomba() {
  let roomba = automaticUpgrades.find(upgrade => upgrade.name == 'Roomba')

  if (totalHairballs >= roomba.price) {
    roomba.quantity++

    totalHairballs -= 6000
    drawHairballs()

    document.getElementById('roomba').innerText = roomba.quantity

    document.getElementById('roombaMultiplier').innerText = roomba.multiplier * roomba.quantity

    roomba.price = roomba.price * 3

    drawRoombaPrice()
  }

}


// trying upgrade price first with our brush function. brush buy calls this function
// I think what I want to do is create a template and insert the HTML, that's probably the easiest way


// NOTE: on draw functions, we should not be passing in an argument to the function.

// This is working like a draw
function drawBrushPrice() {
  // go grab the upgrade (i.e. brush)
  let brush = clickUpgrades[0]


  // NOTE: I was able to fix my weird issue with having margin on the button transform by adding BG class m-0 into my template
  let upgradePriceTemplate = ''

  upgradePriceTemplate += `
  <p class="m-0"> Buy Brush: 
  <span>${brush.price}</span>HB
  </p>
  `

  document.getElementById('brush-price').innerHTML = upgradePriceTemplate
}

function drawCatnipBrushPrice() {
  let catnipBrush = clickUpgrades[1]

  let upgradePriceTemplate = ''

  upgradePriceTemplate += `
  <p class="m-0"> Buy Catnip Brush:
  <span>${catnipBrush.price}</span>HB
  </p>
  `

  document.getElementById('catnip-brush-price').innerHTML = upgradePriceTemplate
}


// TODO: finish these price functions
function drawStickyLizardPrice() {
  let stickyLizard = automaticUpgrades[0]

  let upgradePriceTemplate = `
  <p class="m-0"> Buy Sticky Lizard:
  <span>${stickyLizard.price}</span>HB
  </p>
  `

  document.getElementById('sticky-lizard').innerHTML = upgradePriceTemplate
}



function drawRoombaPrice() {
  let roomba = automaticUpgrades[1]

  let upgradePriceTemplate = ''

  upgradePriceTemplate += `
  <p class="m-0"> Buy Roomba:
  <span>${roomba.price}</span>HB
  </p>
  `

  document.getElementById('roomba').innerHTML = upgradePriceTemplate
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



// TODO: I want to display the sticky lizard and roomba on click, bringing them into the screen on a marquee with the cat. see assets folder for gifs I already found for the 2