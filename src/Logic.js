import { CreateTiles, objImage,Moves,Win, size,board } from "./Utilities";
function Check(props){
    if(board[props.k][props.col]!=-1){
        if(board[props.k][props.col]==board[parseInt(props.tile.id/10)][props.tile.id%10]){
            document.getElementById(props.k*10+props.col).remove();
            board[parseInt(props.tile.id/10)][props.tile.id%10]++;
            board[props.k][props.col]=-1;
            props.tile.src=objImage[board[parseInt(props.tile.id/10)][props.tile.id%10]];
        }
        else
            return false;
    }
    return true;
}
function UpdateBoard(e){
    if(e.code=='ArrowUp' ||e.code=='ArrowLeft' || e.code=='KeyW' || e.code=='KeyA'){
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                if(board[row][col]!=-1){
                    let rw=row,cw=col,tile=document.getElementById(row*10+col);
                    if(e.code=='KeyW' || e.code=='ArrowUp')
                        while(rw-1>-1 && Check({tile: tile,k: rw-1,col: col}))
                            rw--;
                    else
                        while(cw-1>-1 && Check({tile: tile,k: row,col: cw-1}))
                            cw--;
                    Moves({tile: tile,row: rw,col: cw});
                    if(board[rw][cw]>=objImage.length)
                        Win();
                }
            }
        }
    }
    else{
        for (let row = size-1; row > -1; row--) {
            for (let col = size-1; col > -1; col--) {
                if(board[row][col]!=-1){
                    let rw=row,cw=col,tile=document.getElementById(row*10+col);
                    if(e.code=='KeyS' || e.code=='ArrowDown')
                        while(rw+1<size && Check({tile: tile,k: rw+1,col: col}))
                            rw++;
                    else
                        while(cw+1<size && Check({tile: tile,k: row,col: cw+1}))
                                cw++;
                    Moves({tile: tile,row: rw,col: cw});
                    if(board[rw][cw]>=objImage.length-1)
                        Win();
                    }
            }
        }
    }
    CreateTiles();
}
export {UpdateBoard}