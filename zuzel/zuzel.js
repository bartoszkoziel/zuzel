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
        this.speed = 5
        this.alpha = 0
        this.vector = {
            x: this.speed,
            y: 0
        }
        this.skretnosc = 2

        this.playerContext = canvas1.getContext("2d")
        this.playerContext.beginPath()
        this.playerContext.lineWidth = 10;
        this.draw()

        document.onkeydown = (e) => {
            if (e.key == "ArrowDown") {
                this.alpha = this.alpha - this.skretnosc
                this.vectorCalc()
                console.log(this.alpha)
                console.log(this.vector)
            }
            if (e.key == "ArrowUp") {
                this.alpha = this.alpha + this.skretnosc
                this.vectorCalc()
                console.log(this.alpha)
                console.log(this.vector)
            }
        }
    }

    draw() {
        // this.playerContext.moveTo(this.x, this.y)
        // this.playerContext.lineTo(this.x + 5, this.y)
        this.playerContext.arc(this.x, this.y, 3, 0, 2 * Math.PI, true);
        this.playerContext.stroke()
    }

    vectorCalc() {
        let x = Math.round(Math.cos(this.alpha * Math.PI / 180) * this.speed * 100) / 100
        let y = Math.round(Math.sin(this.alpha * Math.PI / 180) * this.speed * 100) / 100

        this.vector.x = x
        this.vector.y = y
    }
}

const morot1 = new Player(50, 20)
