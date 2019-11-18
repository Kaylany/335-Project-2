/*
Author: Kayla Nguyen
Contact: knguyen1170@csu.fullerton.edu
*/

// Create cave system during traversal

function cave(context) {
    var checkedRooms = [];
    var adjacentRooms = [];

    var roomId = [16, 0, 0];
    var currentRoom = {id: roomId};    
    console.log("Starting room: " + currentRoom.id);
    //recursive function
    checkCave(currentRoom, adjacentRooms, checkedRooms, context);
}

function checkCave(currentRoom, adjacentRooms, checkedRooms, context) {
    checkedRooms.push(currentRoom);
    drawRoom(currentRoom, context);

    adjacentRooms = adjacentRooms.concat(checkAdjacentRooms(currentRoom, adjacentRooms, checkedRooms));        //concat fucntion to add arrays together
    
    setTimeout(function(){
        if(adjacentRooms && adjacentRooms.length > 0){
            var nextRoom = adjacentRooms.pop();      // Changes room to next on list to be checked
            console.log("Checking room: " + nextRoom.id);
            
            // Draw path to new room & new room
            drawPath(currentRoom, nextRoom, context);            
            checkCave(nextRoom, adjacentRooms, checkedRooms, context);   // Continue checking cave
        }else{
            // parse list of rooms, find closest to center room
            console.log("FINISHED");
            return;
        } 
    }, 750);
    
       
    //drawRoom(currentRoom, nextRoom, context);

    
    
}   

function checkAdjacentRooms(currentRoom, adjacentRooms, checkedRooms){        // or maybe pass in currentRoom object
    var newAdjacentRooms = [];
    var roomId = [16, 0, 0];
    var roomIterator = 0;

    // ID LIMITS RULE CHECK
    
    for(i = 0; i <= 16; i++){    
        for (j = 0; j <= 8; j++){    // Iterates through possible Ids using ID LIMITS RULE
            for(k = 0; k <= 7; k++){     

                // SUM RULE CHECK
                if(i + j + k != 16){  
                    continue;
                }

                if(i == currentRoom.id[0] && j != currentRoom.id[1] && k != currentRoom.id[2]){      //SINGLE-SAME RULE CHECK
                    if((j == 0 || k == 0) || (j == 8 || k == 7)){                   // ZERO MAX RULE CHECK
                        roomId = [i, j, k];
                        
                        if(checkListforRoom(roomId, checkedRooms) && checkListforRoom(roomId, adjacentRooms)){
                            newAdjacentRooms[roomIterator] = {id: roomId}
                            roomIterator++;
                            continue;
                        }else{
                            continue;
                        }
                    }

                }else if(i != currentRoom.id[0] && j == currentRoom.id[1] && k != currentRoom.id[2]){
                    if((i == 0 || k == 0) || (i == 16 || k == 7)){
                        roomId = [i, j, k];
                        
                        if(checkListforRoom(roomId, checkedRooms) && checkListforRoom(roomId, adjacentRooms)){
                            newAdjacentRooms[roomIterator] = {id: roomId}
                            roomIterator++;
                            continue;
                        }else{
                            continue;
                        }
                    }

                }else if(i != currentRoom.id[0] && j != currentRoom.id[1] && k == currentRoom.id[2]){
                    if((i == 0 || j == 0) || (i == 16 || j == 8)){
                        roomId = [i, j, k];
                        
                        if(checkListforRoom(roomId, checkedRooms) && checkListforRoom(roomId, adjacentRooms)){
                            newAdjacentRooms[roomIterator] = {id: roomId}
                            roomIterator++;
                            continue;
                        }else{
                            continue;
                        }
                    }

                }else{
                    continue;
                }
            }      
        }
    } 
    return newAdjacentRooms;
}


function checkListforRoom(id, list){        // Checks if a room is already inside an array
    var roomUnique = false;     // flag marking if a room is not currently in list

    if (list === undefined || list.length == 0) {
        // array empty or does not exist
        roomUnique = true;
        return roomUnique;
        
    }

    for(l = 0; l < list.length; l++){
        // check room to make sure it is not in list
        for(m = 0; m < 3; m++){
            roomUnique = false;
            if(list[l].id[m] != id[m]){
                // not equal
                roomUnique = true;
                break;
            }

        }
        if(roomUnique == false){
            // ID was matched
            break;
        }
    }
    return roomUnique;
}

function drawRoom(currentRoom, ctx){
    ctx.beginPath();
    ctx.lineWidth = "2"; 
    ctx.strokeStyle = "blue";
    ctx.rect(currentRoom.id[0] * 60, currentRoom.id[1] * 60, 50, 50);
    ctx.stroke();
}

function drawPath(currentRoom, nextRoom, ctx){
    ctx.beginPath();
    ctx.moveTo(currentRoom.id[0] * 60 + 25, currentRoom.id[1] * 60 + 25);
    ctx.lineTo(nextRoom.id[0] * 60 + 25, nextRoom.id[1] * 60 + 25);
    ctx.stroke();
}
