//数值积分模拟方法，浮点误差
class Point {
    constructor(data) {
        Object.assign(this, data);
    }

    move(timeSpeed) {
        // 根据时间流速调整速度
        this.x += this.dx * timeSpeed;
        this.y += this.dy * timeSpeed;
    }

    effect(p, g, timeSpeed) {
        const r = this.distance(p);
        const distanceX = p.x - this.x;
        const distanceY = p.y - this.y;

        // 引力常数，适当增大，增加吸引力
        const k = g * p.m / (r * r * r);
        const ax = k * distanceX;
        const ay = k * distanceY;

        // 根据引力加速度调整速度，并乘以时间流速
        this.dx += ax * timeSpeed;
        this.dy += ay * timeSpeed;
    }

    distance(p1) {
        const y = this.y - p1.y;
        const x = this.x - p1.x;
        const yy = y * y;
        const xx = x * x;
        const rr = yy + xx;
        const min = 100;  // 最小距离，避免除零
        if (rr <= (min * min)) return 100;
        const r = Math.sqrt(rr);
        return r;
    }

    getPointRadius() {
        const r = Math.sqrt(this.m);
        if (r <= 4) return 2;
        if (r >= 24) return 12;
        return r / 2;
    }
}

class Gravity {
    constructor(opts) {
        const { points, g, timeSpeed } = opts;
        this.g = g || 1; // 引力常数
        this.timeSpeed = timeSpeed || 1; // 时间流速
        this.points = points.map(p => new Point(p));
        this.timer = null;
        this.drawLine = false;
    }

    addPoint(p) {
        this.points.push(new Point(p));
    }

    setDom($dom) {
        this.$dom = $dom;
        this.c2d = $dom.getContext('2d');
        if (!this.c2d) throw new Error('no 2d context');
    }

    updatePointsInfo() {
        this.points.forEach(p => {
            this.points.forEach(otherP => {
                if (otherP === p) return;
                p.effect(otherP, this.g, this.timeSpeed);
            });
        });

        this.points.forEach(p => {
            p.move(this.timeSpeed);
        });
    }

    drawPoints() {
        this.c2d.clearRect(0, 0, this.$dom.width, this.$dom.height);
        this.c2d.fillStyle = 'rgba(77, 77, 77, 1)';
        this.points.forEach(p => {
            this.c2d.beginPath();
            const r = p.getPointRadius();
            this.c2d.arc(p.x, p.y, r, 0, Math.PI * 2);
            this.c2d.fill();
        });

        if (this.drawLine) {
            this.points.forEach((p, idx) => {
                this.c2d.lineTo(p.x, p.y);
            });

            this.c2d.lineTo(this.points[0].x, this.points[0].y);
            this.c2d.fillStyle = 'rgba(77, 77, 77, 0.3)';
            this.c2d.fill();
        }
    }

    toggleDrawLine() {
        this.drawLine = !this.drawLine;
    }

    start() {
        if (this.timer) return;
        this.render();
    }

    stop() {
        if (!this.timer) return;
        cancelAnimationFrame(this.timer);
        this.timer = null;
    }

    render() {
        this.updatePointsInfo();
        this.drawPoints();
        this.timer = requestAnimationFrame(this.render.bind(this));
    }
}

// 在页面加载后启动模拟
window.onload = () => {
    const canvas = document.getElementById('gravityCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 获取画布中心位置
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 使用提供的三体数据，调整质量，初始速度为0
    const points = [
        { x: centerX - 100, y: centerY - 80, dx: 0, dy: 0, m: 150 }, // 初始速度为0
        { x: centerX + 150, y: centerY + 50, dx: 0, dy: 0, m: 155 }, // 更大的质量
        { x: centerX + 200, y: centerY - 100, dx: 0, dy: 0, m: 150 } // 不同质量的小球
    ];

    const gravity = new Gravity({ points: points, g: 1, timeSpeed: 5 }); // 引力常数为1，时间流速设置为5
    gravity.setDom(canvas);
    gravity.start();
};
