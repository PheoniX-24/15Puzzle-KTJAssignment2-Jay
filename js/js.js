var deco,imageSel,cust_img,check=0,r,c,shuffled=0,startTime,timer,moves,paused=false,ptime=0,won=false,ic;
var arr_img = ['Images/bird.jpg','Images/scenary1.jpg','Images/sunflower.jpg','Images/celeb.jpg'];

function n_i_deco() {
    deco = document.getElementsByName('decoration');
    if(deco[0].checked){
        document.getElementById("deco-p1").remove();
        for(var j=1;j<=4;j++){
            document.getElementById("deco-inp"+j).remove();
            document.getElementById("deco-label"+j).remove();
            //document.getElementById("deco-label"+j).removeChild( document.getElementById("deco-img"+j));
            //document.getElementById("deco-img"+j).remove();
        }
        document.getElementById("deco-inp-cust").remove();
        document.getElementById("deco-label-cust").remove();
        document.getElementById("cust-image-sel").remove();
        document.getElementById("spaceBr").remove();
    }
    if(deco[1].checked){
        const deco_p1 = document.createElement('p');
        const deco_p1_txt = document.createTextNode("Select your Image");
        deco_p1.id="deco-p1";
        deco_p1.appendChild(deco_p1_txt);
        document.getElementById("image-sel").appendChild(deco_p1);
        for(var i=1;i<=4;i++){
            const deco_inp = document.createElement('input');
            deco_inp.type="radio";
            deco_inp.name="images";
            deco_inp.value="img"+i;
            deco_inp.id="deco-inp"+i;
            const deco_label = document.createElement('label');
            deco_label.for="img"+i;
            deco_label.id="deco-label"+i;
            const deco_img = document.createElement('img');
            deco_img.src=arr_img[i-1];
            deco_img.style="width:80px; margin-right:20px;";
            deco_img.id="deco-img"+i;
            deco_label.appendChild(deco_img);
            document.getElementById("image-sel").appendChild(deco_inp);
            document.getElementById("image-sel").appendChild(deco_label);
        }
    }
}

function classicBtn(){
    if (check==0){document.getElementById("first-sel").remove();}
    else if(check==1){
        document.getElementById("g-table").remove();
        document.getElementById("g-time").innerHTML="--";
        document.getElementById("g-moves").innerHTML="--";
        clearInterval(timer);
    }
    document.getElementById("g-btns").style="opacity:1;";
    shuffled=0;
    check=1;
    r=4;c=4;
    createNum(4,4);
}

function createBtn() {
    if (check==0){document.getElementById("first-sel").remove();}
    else if(check==1){
        document.getElementById("g-table").remove(); 
    }
    document.getElementById("g-time").innerHTML="--";
    document.getElementById("g-moves").innerHTML="--";
    clearInterval(timer);
    document.getElementById("g-btns").style="opacity:1;";
    shuffled=0;
    check=1;
    deco = document.getElementsByName('decoration');
    imageSel = document.getElementsByName('images');
    if (document.getElementById("dim1").value.length==0 || document.getElementById("dim2").value.length==0){
        alert("Please enter dimensions!");
        check=2;
        document.getElementById("g-btns").style="opacity:0;";
        clearInterval(timer);
    }
    else if(document.getElementById("dim1").value<2 || document.getElementById("dim1").value>10 || document.getElementById("dim2").value<2 || document.getElementById("dim2").value>10){
        alert("Enter dimensions between 2 and 10!");
        check=2;
        document.getElementById("g-btns").style="opacity:0;";
        clearInterval(timer);
    }
    else if(deco[0].checked==false && deco[1].checked==false){
        alert("Please select decoration, numbers or image!");
        check=2;
        document.getElementById("g-btns").style="opacity:0;";
        clearInterval(timer);
    }
    else if(deco[1].checked==true && (imageSel[0].checked==false && imageSel[1].checked==false && imageSel[2].checked==false && imageSel[3].checked==false)){
        alert("Please select an image or enter custom image!");
        check=2;
        document.getElementById("g-btns").style="opacity:0;";
        clearInterval(timer);
    }
    else{
        var rows = document.getElementById("dim1").value;
        var columns = document.getElementById("dim2").value;
        r=rows;
        c=columns;
        if(deco[0].checked==true){
            createNum(rows,columns);
        }
        else{
            for(var i=1;i<=4;i++){
                if(imageSel[i-1].checked==true){
                    createImage(rows,columns,arr_img[i-1]);
                }
            }
        }
    }
    
}

function createNum(rows, columns){
    var num=1;
    const table = document.createElement('table');
    table.id="g-table";
    table.style.borderCollapse="separate";
    var spacing=(40/(parseInt(columns)+1));
    table.style.borderSpacing= spacing+"px";
    document.getElementById("game-space").appendChild(table);
    for (var i=0;i<rows;i++){
        createRow((i+1));
        for (var j=0;j<columns;j++){
            if((rows*columns) > num){
                createNumCell((i+1),(j+1),rows,columns);
                styleNumCell((i+1),(j+1),num++);
            }
            else{
                createBlank(rows,columns);
            }
        }
    }
}

function createRow(row){
    const rows = document.createElement('tr');
    rows.id="row"+row;
    rows.class="rows";
    document.getElementById("g-table").appendChild(rows);
}

function createNumCell(row,column,rows,columns){
    const cell = document.createElement('td');
    cell.id="cell"+row+column;
    cell.class="tile"+row+column;
    cell.style="border:1px solid white;width:"+(480.0/columns)+"px;height:"+(480.0/rows)+"px;text-align:center;font-size:"+(480.0/(columns*2))+"px;border-radius:10px;background-image:linear-gradient(to right bottom,rgba(120, 0, 175, 0.712),rgba(169, 0, 175, 0.712));";
    cell.onclick= function() {moveTile(row,column)};
    cell.classList.add('HoverClass1') ;
    document.getElementById("row"+row).appendChild(cell);
}

function styleNumCell(row,column,num){
    const number = document.createTextNode(""+num);
    number.id="num"+num;    
    document.getElementById("cell"+row+column).appendChild(number);
}

function createBlank(rows,columns){
    const cell = document.createElement('td');
    cell.id="cell"+rows+columns;
    cell.class="tile"+rows+columns;
    cell.onclick= function() {moveTile(rows,columns)};
    cell.style="width:"+(480.0/columns)+"px;height:"+(480.0/rows)+"px;text-align:center;font-size:"+(480.0/(columns*2))+"px;border-radius:10px";
    document.getElementById("row"+rows).appendChild(cell);
}

function createImage(rows,columns,image){
    var num=1;
    const table = document.createElement('table');
    table.id="g-table";
    table.style.borderCollapse="separate";
    var spacing=(40/(parseInt(columns)+1));
    table.style.borderSpacing= spacing+"px";
    document.getElementById("game-space").appendChild(table);
    for (var i=0;i<rows;i++){
        createRow((i+1));
        for (var j=0;j<columns;j++){
            if((rows*columns) > num){
                createImgCell((i+1),(j+1),rows,columns,image);
                num++;
            }
            else{
                createBlank(rows,columns);
            }
        }
    }
}

function createImgCell(row,column,rows,columns,image){
    const cell = document.createElement('td');
    cell.id="cell"+row+column;
    cell.class="tile"+row+column;
    cell.style="border:1px solid white;width:"+(480.0/columns)+"px;height:"+(480.0/rows)+"px;text-align:center;font-size:"+(480.0/(columns*2))+"px;border-radius:10px;background-image:url("+image+");";
    cell.style.backgroundPosition = "-"+(((column-1)*480.0)/(columns))+"px -"+(((row-1)*480.0)/(rows))+"px";
    cell.onclick= function() {moveTile(row,column)};
    cell.classList.add('HoverClass1') ;
    document.getElementById("row"+row).appendChild(cell);
}

function startBtn(){
    clearInterval(timer);
    shuffle(r,c);
}

function shuffle(rows,columns){
    
    document.getElementById("g-time").innerHTML="--";
    document.getElementById("g-moves").innerHTML="--";
    clearInterval(timer);
    ptime=0;
    won=false;
    for (var i=1;i<=rows;i++){
        for(var j=1;j<=columns;j++){
            var cell1="cell"+i+j;
            var r1=Math.floor(Math.random()*rows + 1);
            var c1=Math.floor(Math.random()*columns + 1);
            var cell2="cell"+(r1)+(c1);
            swap(cell1,cell2);
        }
    }
    shuffled=1;
    moves=0;
    checkWin();
}

function swap(cell1, cell2){
    var temp = document.getElementById(cell1).innerText;
    document.getElementById(cell1).innerText = document.getElementById(cell2).innerText;
    document.getElementById(cell2).innerText = temp;

    temp = document.getElementById(cell1).class;
    document.getElementById(cell1).class = document.getElementById(cell2).class;
    document.getElementById(cell2).class = temp;

    temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;

    temp = document.getElementById(cell1).style.backgroundImage;
    document.getElementById(cell1).style.backgroundImage = document.getElementById(cell2).style.backgroundImage;
    document.getElementById(cell2).style.backgroundImage = temp;
    
    temp = document.getElementById(cell1).style.border;
    document.getElementById(cell1).style.border = document.getElementById(cell2).style.border;
    document.getElementById(cell2).style.border = temp;

    temp = document.getElementById(cell1).style.backgroundPosition;
    document.getElementById(cell1).style.backgroundPosition = document.getElementById(cell2).style.backgroundPosition;
    document.getElementById(cell2).style.backgroundPosition = temp;

}

function moveTile(row,column) {
    if(shuffled==0){
        alert("First start the game!");
        return;
    }
    if(won==true){
        alert("You have won the game, to play more start another one!");
        return;
    }
    if(paused==true){
        alert("First unpause the game!");
        return;
    }
    if(document.getElementById("cell"+row+column).class==("tile"+r+c)) return;

    var blankpresent=0,blankrow=-1,blankcolumn=-1;
    var cell = document.getElementById("cell"+row+column);
    for(var i=1;i<=r;i++){
        if(document.getElementById("cell"+i+column).class==("tile"+r+c)){
            blankpresent=1;
            blankrow=i;
            break;
        }
    }
    for(var i=1;i<=c;i++){
        if(document.getElementById("cell"+row+i).class==("tile"+r+c)){
            blankpresent=1;
            blankcolumn=i;
            break
        }
    }

    if (blankpresent==0) return;
        
    if(document.getElementById("g-time").innerHTML=="--"){
        startTime= new Date().getTime();
        timer= setInterval(function(){gTime()}, 1000);    
    }

    if(blankcolumn<0){//blank and tile in same row means up and down movement
        if(blankrow>row){//down movement
            for(var i=1; i<=(blankrow-row); i++){
                swap(("cell"+(blankrow-i)+column),("cell"+(blankrow-i+1)+column));
                moves++;
                document.getElementById("cell"+(blankrow-i+1)+column).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
            }
        }
        else{//up movement
            for(var i=1; i<=(row-blankrow); i++){
                swap(("cell"+(blankrow+i)+column),("cell"+(blankrow+i-1)+column));
                moves++;
                document.getElementById("cell"+(blankrow+i-1)+column).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
            }
        }
    }
    else{//blank and tile in same column means right and left movement
        if(blankcolumn>column){//right movement
            for(var i=1; i<=(blankcolumn-column); i++){
                swap(("cell"+row+(blankcolumn-i)),("cell"+row+(blankcolumn-i+1)));
                moves++;
                document.getElementById("cell"+row+(blankcolumn-i+1)).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
            }
        }
        else{//up movement
            for(var i=1; i<=(column-blankcolumn); i++){
                swap(("cell"+row+(blankcolumn+i)),("cell"+row+(blankcolumn+i-1)));
                moves++;
                document.getElementById("cell"+row+(blankcolumn+i-1)).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
            }
        }

    }
    
    document.getElementById("g-moves").innerHTML= moves;
    
    checkWin();
}

function gTime(){
    var now = new Date().getTime();
    var distance= now-startTime;
    document.getElementById("g-time").innerHTML=(ptime+(Math.floor(distance/1000)))+"s";
}

function checkWin(){
    var flagAll=true;
    for(var i=1; i<=r ;i++){
        for(var j=1; j<=c; j++){
            var cell=document.getElementById("cell"+i+j);
            if(flagAll==true){
                if(cell.class != ("tile"+i+j)){
                    flagAll=false;
                }
            }
            if(cell.class==("tile"+r+c)){
            }
            else if(cell.class == ("tile"+i+j)){ 
                cell.style.border= "1px solid gold";
                cell.style.color="gold";
            }
            else{
                cell.style.border= "1px solid white";
                cell.style.color="white";
            }
        }
    }

    if(flagAll==true){
        alert("Yayayayayay!!!");
        gameWon();
    }

}

window.addEventListener("keydown", function(event) {
    if(event.code === "ArrowDown" || event.code === "ArrowUp" || event.code === "ArrowLeft" || event.code === "ArrowRight"){
        if (event.defaultPrevented) {
        return; 
        }
        if(shuffled==0){
            alert("First start the game!");
            return;
        }
        if(won==true){
            alert("You have won the game, to play more start another one!");
            return;
        }
        if(paused==true){
            alert("First unpause the game!");
            return;
        }

            
        if(document.getElementById("g-time").innerHTML=="--"){
            startTime= new Date().getTime();
            timer= setInterval(function(){gTime()}, 1000);    
        }

        var blankrow,blankcolumn;
        for(var i=1;i<=parseInt(r);i++){
            for (var j=1;j<=parseInt(c);j++){
                if(document.getElementById("cell"+i+j).class==("tile"+r+c)){
                    blankrow=i;
                    blankcolumn=j;
                }
            }
        }

        if (event.code === "ArrowDown"){
            if(blankrow==1){return;}
            swap(("cell"+(blankrow-1)+blankcolumn),("cell"+blankrow+blankcolumn));
            moves++;
            document.getElementById("cell"+blankrow+blankcolumn).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
        } 
        else if (event.code === "ArrowUp"){
            if(blankrow==r){return;}
            swap(("cell"+(blankrow+1)+blankcolumn),("cell"+blankrow+blankcolumn));
            moves++;
            document.getElementById("cell"+blankrow+blankcolumn).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
        } 
        else if (event.code === "ArrowLeft"){
            if(blankcolumn==c){return;}
            swap(("cell"+blankrow+(blankcolumn+1)),("cell"+blankrow+blankcolumn));
            moves++;
            document.getElementById("cell"+blankrow+blankcolumn).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
        } 
        else if (event.code === "ArrowRight"){
            if(blankcolumn==1){return;}
            swap(("cell"+blankrow+(blankcolumn-1)),("cell"+blankrow+blankcolumn));
            moves++;
            document.getElementById("cell"+blankrow+blankcolumn).style.animation="moveAnimation 0.25s ease-out 0s 1 none";
        }
        event.preventDefault();
        
        document.getElementById("g-moves").innerHTML= moves;
        
        checkWin();
    }
  }, true);

function pauseBtn(){
    if(paused==false){
        if(document.getElementById("g-time").innerHTML=="--"){
            alert("Game can be paused only after first move is played!");
            return;
        }
        paused=true;
        ptime=parseInt(document.getElementById("g-time").innerHTML.slice(0,(document.getElementById("g-time").innerHTML).length-1));
        clearInterval(timer);
        return;
    }
    if(paused==true){
        paused=false;
        startTime= new Date().getTime();
        timer= setInterval(function(){gTime()}, 1000);
        return;
    }
}

function gameWon(){
    won=true;
    clearInterval(timer);
    updateLB()
}

function updateLB(){
    const n= parseInt(window.localStorage.getItem('n'))+1;
    const obj= {name: "username"+n, dim1: document.getElementById("dim1").value, dim2: document.getElementById("dim2").value, moves: parseInt(document.getElementById("g-moves").innerHTML), time: document.getElementById("g-time").innerHTML};
        window.localStorage.setItem(n,JSON.stringify(obj));
    window.localStorage.setItem('n',n);
}


if((window.localStorage.getItem('n'))==null){
    window.localStorage.setItem('n',0);
}
//window.localStorage.setItem('n',0);
//window.localStorage.clear();

    const no= parseInt(window.localStorage.getItem('n'));
    const data = [];
    for(var i=1;i<=no;i++){
        data[i]=JSON.parse(window.localStorage.getItem(i));
    }

    for(var d=4;d<=100;d++){
        var dd=[];
        var c=0;
        for(var i=1;i<=no;i++){
            if((data[i].dim1*data[i].dim2)==d){
                dd[c++]=JSON.parse(window.localStorage.getItem(i));
            }
        }
        dd.sort(function (a, b) {
            return a.moves - b.moves;
        });
        for(var i=0; i<c; i++){
            const dname=document.createElement("p");
            document.getElementById("lb-name").appendChild(dname);
            dname.style.fontSize="16px";
            dname.innerHTML=dd[i].name;
            const dmoves=document.createElement("p");
            document.getElementById("lb-moves").appendChild(dmoves);
            dmoves.style.fontSize="16px";
            dmoves.innerHTML=parseInt(dd[i].moves);
            const dtime=document.createElement("p");
            document.getElementById("lb-time").appendChild(dtime);
            dtime.style.fontSize="16px";
            dtime.innerHTML=(dd[i].time);
            const ddim=document.createElement("p");
            document.getElementById("lb-dim").appendChild(ddim);
            ddim.style.fontSize="16px";
            ddim.innerHTML=dd[i].dim1+"x"+dd[i].dim2;
        }
    }
