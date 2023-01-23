let canvas1 = document.getElementById("canvas1")

let outerBorder = canvas1.getContext("2d")
let innerBorder = canvas1.getContext("2d")


// Outer border
{
    outerBorder.fillStyle = "#8a3406"

    outerBorder.beginPath()
    outerBorder.arc(256, 256, 256, Math.PI * 1.5, Math.PI / 2, true)

    outerBorder.arc(256 + 512, 256, 256, Math.PI * 0.5, Math.PI * 1.5, true)
    outerBorder.closePath()
    outerBorder.fill()

    outerBorder.stroke()

}

// Inner border
{
    innerBorder.fillStyle = "#ffffff"

    innerBorder.beginPath()
    innerBorder.arc(256, 256, 128, Math.PI * 1.5, Math.PI / 2, true)

    innerBorder.arc(256 + 512, 256, 128, Math.PI * 0.5, Math.PI * 1.5, true)
    innerBorder.closePath()
    innerBorder.fill()

    innerBorder.stroke()
}

// Player
class Player {
    constructor(startX, startY) {
        this.x = startX
        this.y = startY
        this.facing = 0

        this.playerContext = canvas1.getContext("2d")
        this.playerContext.beginPath()
        this.playerContext.lineWidth = 10;
        this.draw()
    }

    draw() {
        this.playerContext.moveTo(this.x, this.y)
        this.playerContext.lineTo(this.x + 5, this.y)
        this.playerContext.stroke()
    }

}

const morot1 = new Player(0, 0)
