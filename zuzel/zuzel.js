let canvas1 = document.getElementById("canvas1")
let border = canvas1.getContext("2d")
let innerpath1 = new Path2D()
let innerpath2 = new Path2D()

// Player
class Player {
    constructor(startX, startY) {
        console.log("LOADED::" + startX + startY)
        this.started = false

        this.x = startX
        this.y = startY
        this.speed = 5
        this.alpha = 0
        this.vector = {
            x: this.speed,
            y: 0
        }
        this.line = "down"
        this.laps = 0
        this.last50 = []

        this.skretnosc = 2
        this.rightkey = "ArrowDown"
        this.leftkey = "ArrowUp"

        this.turning = "straight"

        this.playerContext = canvas1.getContext("2d")
        this.playerContext.beginPath()

        document.onkeydown = (e) => {
            if (e.key == this.rightkey) {
                this.turning = "right"
            }

            if (e.key == this.leftkey) {
                this.turning = "left"
            }

            if (e.key == "Enter" && this.started == false) {
                this.start()
            }
        }

        document.onkeyup = (e) => {
            if (e.key == this.rightkey) {
                this.turning = "straight"
            }

            if (e.key == this.leftkey) {
                this.turning = "straight"
            }
        }
    }

    start() {
        if (this.started == false) {
            console.log("STARTING:")
            window.setInterval(() => {
                this.nextMove()
            }, 20);
            this.started = true
        }
    }

    drawBike() {
        let image = document.createElement("img")
        image.src = "motor1.png"

        this.playerContext.save()

        this.playerContext.translate(this.x, this.y)
        this.playerContext.rotate(this.alpha * Math.PI / 180)

        this.playerContext.drawImage(image, - 20, -10, 40, 20)

        this.playerContext.restore()

        let temp = 0
        for (let i = 0; i < this.last50.length - 3; i++) {
            this.playerContext.beginPath()
            this.playerContext.arc(this.last50[i].x, this.last50[i].y, 2 + temp, 0, 2 * Math.PI)
            this.playerContext.fillStyle = "rgba(0, 0, 0, 0.9)";
            this.playerContext.fill()
            temp = temp + 0.05
        }
    }

    colision() {
        // wewnetrzne okregi
        let p1c1 = Math.sqrt(Math.pow(this.x - 256, 2) + Math.pow(this.y - 256, 2))
        let p1c2 = Math.sqrt(Math.pow(this.x - (256 + 512), 2) + Math.pow(this.y - 256, 2))

        if (p1c1 < 128 || p1c2 < 128 || (this.x > 256 && this.x < 768 && this.y > 128 && this.y < 384)) {
            console.log("w bandzie");
            this.speed = 0
            this.skretnosc = 0
            alert("cos")
            location.reload()
        }

        if (!(p1c1 < 256 || p1c2 < 256 || (this.x > 256 && this.x < 768 && this.y > 0 && this.y < 512))) {
            console.log("w bandzie");
            this.speed = 0
            this.skretnosc = 0
            alert("cos")
            location.reload()
        }

        if (this.x > 500 && this.x < 530) {
            if (this.y > 256 && this.line == "up") {
                this.line = "down"
                this.laps = this.laps + 1
                document.getElementById("laps").innerHTML = "LAPS: " + this.laps
                console.log("LINE: ", this.line);
            }
            else if (this.y < 256 && this.line == "down") {
                this.line = "up"
                console.log("LINE: ", this.line);
            }
        }

    }

    drawBoard() {
        border.clearRect(0, 0, 1024, 512);

        // inner border
        border.fillStyle = "#b00b69"

        border.beginPath()
        border.arc(256, 256, 128, Math.PI * 1.5, Math.PI / 2, true)

        border.arc(256 + 512, 256, 128, Math.PI * 0.5, Math.PI * 1.5, true)
        border.closePath()
        border.fill()

        // outer border

        border.fillStyle = "#8a3406"

        border.beginPath()
        border.arc(256, 256, 256, Math.PI * 1.5, Math.PI / 2, true)
        border.lineTo(0, 512)
        border.lineTo(0, 0)
        border.lineTo(1024, 0)
        border.lineTo(1024, 512)

        border.arc(256 + 512, 256, 256, Math.PI * 0.5, Math.PI * 1.5, true)
        border.closePath()

        border.fill()

        border.stroke()
    }

    vectorCalc() {
        let x = Math.round(Math.cos(this.alpha * Math.PI / 180) * this.speed * 100) / 100
        let y = Math.round(Math.sin(this.alpha * Math.PI / 180) * this.speed * 100) / 100

        this.vector.x = x
        this.vector.y = y
    }

    nextMove() {
        this.playerContext.moveTo(this.x, this.y)

        this.x = this.x + this.vector.x
        this.y = this.y + this.vector.y

        this.playerContext.lineTo(this.x, this.y)
        this.playerContext.stroke()

        if (this.turning == "left") {
            this.alpha = this.alpha - this.skretnosc
            this.vectorCalc()
        }
        if (this.turning == "right") {
            this.alpha = this.alpha + this.skretnosc
            this.vectorCalc()

        }

        let obj = {
            x: this.x,
            y: this.y
        }

        if (this.last50.length > 50) {
            this.last50.splice(0, 1)
            for (let i = 0; i < this.last50.length; i++) {
                this.last50[i - 1] = this.last50[i]
            }
            this.last50.pop()
            this.last50.push(obj)
        }
        else {
            this.last50.push(obj)
        }

        console.log(this.last50);



        this.colision()
        this.drawBoard()
        this.drawBike()
    }
}

const motor1 = new Player(512, 256 + 128 + 64)