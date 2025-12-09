function isBound(x,y){
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function validMoves([x,y]){
    const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
    const arr = [];

    for(const [dx, dy] of knightMoves){
        const nextX = x + dx;
        const nextY = y +dy;
        if(isBound(nextX, nextY)){
            arr.push([nextX, nextY]);
        }
    }
    return arr;
}

function knightMoves(start, end){
    if(start[0] === end[0] && start[1] === end[1]) return [start];

    const queue = [];
    const visited = new Set();
    const parent = new Map();

    const startKey = start.toString();
    const endKey = end.toString();

    queue.push(start);
    visited.add(startKey);

    while(queue.length > 0){
        const current = queue.shift();
        const currentKey = current.toString();

        if(currentKey === endKey){
            return constructPath(startKey, endKey, parent);
        }

        const possibleMoves = validMoves(current);

        for(const nextMove of possibleMoves){
            const nextKey = nextMove.toString();

            if(!visited.has(nextKey)){
                visited.add(nextKey);
                parent.set(nextKey, currentKey);
                queue.push(nextMove);
            }
        }
    }
}

function constructPath(startKey, endKey, parent){
    const path = [];
    let currentKey = endKey;

    while(currentKey !== startKey){
        const position = currentKey.split(",").map(Number);
        path.push(position);

        currentKey = parent.get(currentKey);
    }
    path.push(startKey.split(",").map(Number));

    return path.reverse();
}

console.log(knightMoves([0,0],[3,3]));