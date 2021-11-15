let gfxLib = document.createElement('script')
gfxLib.src = './two.min.js';
document.head.appendChild(gfxLib);

let linLib = document.createElement('script');
linLib.src = './modules/index.min.js';
document.head.appendChild(linLib);

loadCount = 2;

//Initialize graphics once all scripts are loaded...
gfxLib.onload = () => {
    loadCount--;
    if(!loadCount)
        triangles();
}

linLib.onload = () => {
    loadCount--;
    if(!loadCount)
        triangles();
}

let triangles = () => {
    let elem = document.getElementById('triangles');
    let params = { width: elem.clientWidth, height: elem.clientHeight, autostart: true };
    let two = new Two(params).appendTo(elem);
    let navbarHeight = document.getElementById('navbar').clientHeight;

    const nTransform = (jIndex) => [
        [-1,0],[0,-1],[0,1],[1,0],[1 * (jIndex % 2 == 0) ? -1 : 1, 1],
    ];

    let newPointMaxDistance = 20;
    let lerpSmoothRate = .007;
    let dimension = {x:15, y:10};
    let displayFactor = {x: two.width / dimension.x, y: two.height / dimension.y};
    let nodes = [];
    let activeNode;

    class Node {
        constructor(index) {
            this.index = index || {x: 0, y: 0};
            this.origin = {x: this.index.x * displayFactor.x + (this.index.y % 2 ? (displayFactor.x/2) : 0), y: this.index.y * displayFactor.y};
            this.node = two.makeCircle(this.origin.x, this.origin.y, 3);
            this.neighbors = [];
            this.edges = [];
            this.isMoving = false;
            this.nextPoint = {};
            this.positionFactor = {x: 0, y: 0};
        }

        init() {
            this.neighbors = getNeighbors(this);
            this.neighbors.forEach(n => {
                //this.edges.push(two.makeLine(this.node.position.x, this.node.position.y, n.node.position.x, n.node.position.y));
            });
        }
    
        update() {
            if (!this.isMoving && Math.random() > .99) {
                //start lerping
                this.isMoving = true;
                this.nextPoint = {x: this.origin.x + (Math.random() * newPointMaxDistance * 2) - newPointMaxDistance, y: this.origin.y + (Math.random() * newPointMaxDistance * 2) - newPointMaxDistance};
            }
            
            if (this.isMoving && (this.positionFactor.x > .99 || this.positionFactor.y > .99)) {
                //stop lerping
                this.isMoving = false;
                this.positionFactor = {x: 0, y: 0};

            } else if (this.isMoving) {
                //do lerp
                [this.node.position.x, this.positionFactor.x] = LerpSmooth1D(this.node.position.x, this.nextPoint.x, this.positionFactor.x, lerpSmoothRate, false, false);
                [this.node.position.y, this.positionFactor.y] = LerpSmooth1D(this.node.position.y, this.nextPoint.y, this.positionFactor.y, lerpSmoothRate, false, false);

            }
        }

        drawLines() {
            this.neighbors.forEach(n => {
                this.edges.push(two.makeLine(this.node.position.x, this.node.position.y, n.node.position.x, n.node.position.y));
            });
        }

        clearLines() {
            this.edges.forEach(e => e.remove());
        }
    }

    class Edge {

    }

    const getNeighbors = (node) => {
        let neighbors = [];

        nTransform(node.index.y).forEach(t => {
            let x = node.index.x + t[0];
            let y = node.index.y + t[1];
            
            if(x >= 0 && x < dimension.x && y >= 0 && y < dimension.y) {
                let neighbor = nodes.find(n => n.index.x === x && n.index.y === y);
                
                if (neighbor)// && !neighbor.neighbors.some(m => m === node))
                    neighbors.push(neighbor);
            }
        });

        return neighbors;
    }

    for (let i = 0; i < dimension.x; i++)
        for (let j = 0; j < dimension.y; j++)
            nodes.push(new Node({x: i, y: j}));
    
    nodes.forEach(n => n.init());

    two.bind('update', function (frameCount) {
        nodes.forEach(node => node.update());
    }).play();

    document.addEventListener('mousemove', e => {
        if(nodes.length) {
            let closest;
            let closestDistance = Math.min();
            nodes.forEach(n => {
                let distance = euclideanDistance({x: n.node.position.x, y: n.node.position.y}, {x: e.clientX, y: e.clientY - navbarHeight});
                if (distance < closestDistance) {
                    closest = n;
                    closestDistance = distance;
                }
            });

            if (!activeNode) {
                activeNode = closest;
                closest.drawLines();
            }
            else if(activeNode != closest) {
                activeNode.clearLines();
                activeNode = closest;
                closest.drawLines();
            }
        }
    });
};