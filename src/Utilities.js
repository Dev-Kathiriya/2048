import { UpdateBoard } from './Logic';
import './Style.css';
const root=document.getElementById('root'),StyleImages=[require('./StyleImages/game-over.gif'),require('./StyleImages/win.gif')],objImage=[require('./images/2.gif'),require('./images/4.gif'),require('./images/8.gif'),require('./images/16.gif'),require('./images/32.gif'),require('./images/64.gif'),require('./images/128.gif'),require('./images/256.gif'),require('./images/512.gif'),require('./images/1024.gif'),require('./images/2048.gif')];
var size=4,board;
OnStart();
function SelectGrid(){
  let Grid3=document.getElementById('Grid3'),Grid4=document.getElementById('Grid4')
  function StartGame(){
    Grid3.remove();
    Grid4.remove();
    board= Array(size).fill(-1).map(()=>Array(size).fill(-1));
    CreateTiles();
    root.hidden=false;
    window.addEventListener('keydown',(e)=>{
      console.log(e.code)
      if(e.code=='ArrowDown'||e.code=='ArrowUp'||e.code=='ArrowLeft'||e.code=='ArrowRight'|| e.code=='KeyW' || e.code=='KeyS' || e.code=='KeyA' || e.code=='KeyD')
        UpdateBoard(e)});
  }
  Grid3.style.visibility='visible';
  Grid4.style.visibility='visible';
  Grid3.addEventListener('click',()=>{
    root.style.width='173.66666666px';
    size=3;
    let box=document.getElementsByClassName('box');
    for (let i = 0; i < 7; i++)
        box[i].remove();
    StartGame();
  })
  Grid4.addEventListener('click',()=>StartGame());
}
function OnStart(){
    let start=document.getElementById('start');
    start.addEventListener('click',()=>{
    start.remove();
    SelectGrid();
    });
}
function CreateGrid(){
  let element=[];
  for(let i=0;i<16;i++)
    element.push(<span className='box'></span>);
  return element
}
function CreateTiles(){
  let tile=document.createElement('img'),n=Math.floor(Math.random()*2);
  tile.src=objImage[n];
  tile.className='tiles';
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      if(board[r][c]==-1){
        tile.id=(r*10+c);
        board[r][c]=n;
        root.appendChild(tile);
        Moves({tile: tile,row: r,col: c});
        return;
      }
    }
  }
  GameOver();
}
function Moves(props){
  let tp=parseInt(props.tile.id);
  if(props.row*10+props.col!=tp){
    board[props.row][props.col]=board[parseInt(tp/10)][tp%10];
    board[parseInt(tp/10)][tp%10]=-1;
  }
  props.tile.style.setProperty('--row',props.row);
  props.tile.style.setProperty('--col',props.col);
  props.tile.id=props.row*10+props.col;
}
function GameOver(){
  ReStart(false);
}
function Win(){
  ReStart(true);
}
function ReStart(props){
  let game=document.createElement('img'),tile=document.getElementsByClassName('tiles');
  root.style.visibility='hidden';
  props?game.src=StyleImages[1]:game.src=StyleImages[0];
  document.body.appendChild(game);
}
export {CreateTiles,CreateGrid,Moves,objImage,Win,size,board}