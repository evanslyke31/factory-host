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

    const nTransform = (jIndex) => {
        let xOffset = (jIndex % 2 == 0) ? -1 : 1
        return [[-1,0],[0,-1],[0,1],[1,0],[xOffset, 1],[xOffset, -1]];
    };

    let newPointMaxDistance = 100;
    let lerpSmoothRate = .007;
    let dimension = {x:15, y:10};
    let displayFactor = {x: two.width / dimension.x, y: two.height / dimension.y};
    let nodes = [];
    let activeNode;
    let maxLevels = 4;

    class Node {
        constructor(index) {
            this.index = index || {x: 0, y: 0};
            this.level = 999;  //level relative to root
            this.hasLine = false;
            this.origin = {x: this.index.x * displayFactor.x + (this.index.y % 2 ? (displayFactor.x/2) : 0), y: this.index.y * displayFactor.y};

            this.neighbors = [];
            this.edges = [];
            this.isMoving = false;
            this.nextPoint = {};
            this.positionFactor = {x: 0, y: 0};

            let point = this.getNewPoint();
            this.node = two.makeCircle(point.x, point.y, 1);
            this.node.opacity = 0;
        }

        init() {
            this.neighbors = getNeighbors(this);
        }
    
        update() {
            if (!this.isMoving && Math.random() > .99) {
                //start lerping
                this.isMoving = true;
                let point = this.getNewPoint();
                this.nextPoint = {x: point.x, y: point.y};
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

            this.edges.forEach(e => e.update());
        }

        setLevel(level) {
            this.level = level;

            //Draw lines relative to level
            this.neighbors.forEach(n => {
                if (n.neighbors.some(m => m != this) && !n.hasLine) {
                    this.edges.push(new Edge(this, n));//two.makeLine(this.node.position.x, this.node.position.y, n.node.position.x, n.node.position.y));
                    this.hasLine = true;
                }
            });

            if (++level < maxLevels)
                this.neighbors.forEach(n => n.setLevel(level));
        }

        reset() {
            this.level = 9999;
            this.edges.forEach(e => e.edge.remove());
            this.edges = [];
            this.hasLine = false;
        }

        getNewPoint() {
            return {x: this.origin.x + (Math.random() * newPointMaxDistance * 2) - newPointMaxDistance, y: this.origin.y + (Math.random() * newPointMaxDistance * 2) - newPointMaxDistance};
        }
    }

    class Edge {
        constructor(node1, node2) {
            this.node1 = node1;
            this.node2 = node2;
            this.edge = two.makeLine(node1.node.position.x, node1.node.position.y, node2.node.position.x, node2.node.position.y);
            this.edge.stroke = 'rgb(0,0,0)';
            this.edge.opacity = 1/((maxLevels/node1.level) + 10)//1/(node1.level + 3);
        }

        update() {
            this.edge.vertices[0].set(this.node1.node.position.x, this.node1.node.position.y);
            this.edge.vertices[1].set(this.node2.node.position.x, this.node2.node.position.y);
        }
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

    console.log(elem);
    document.getElementById('triangles-container').addEventListener('mousemove', e => {
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
                closest.setLevel(1);
            }
            else if(activeNode != closest) {
                nodes.forEach(n => n.reset()); //TODO: we can probably optimize this
                activeNode = closest;
                closest.setLevel(1);
            }
        }
    });
};