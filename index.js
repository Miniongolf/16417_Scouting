// #region Declare Variables
    // Init
    var matchNum = document.getElementById("matchNum.value");
    var teamNum = document.getElementById("teamNum.value");
    var startPos;
    var startSide;
    var randomPos;

    // Auton
    var autonCones = [];
    var parkingPos;
    var autonScore = 0;

    // TeleOp
    var stratsStr = "";
    var stratsDict = {"Cycle": false, "Ownership": false, "Circuit": false};
    var doesCycle, doesOwnership, doesCircuit;

// #endregion

// #region colours
    function toColour(string, colour) {
        return `<i class="${colour}">${string}</i>`;
    }
// #endregion

// #region Init
    // Set robot starting position
    function setStartPos(position) {
        startPos = position;
        if (position[0] == 'B') {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="bTxt">${position}</i>`;
        } else {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="rTxt">${position}</i>`;
        }
        
        if (startPos == "Blue far" || startPos == "Red close") {
            startSide = "Left";
        } else if (startPos == "Blue close" || startPos == "Red far") {
            startSide = "Right";
        } else {
            console.log("Siding error");
        }
        console.log(startSide);
    }

    function setRandomPos(position) {
        randomPos = position;
        document.getElementById("randomPosDisp").innerHTML = `Randomization: <i class="sTxt">${position}</i>`;
        calcAutonScore();
    }
// #endregion

// #region Auton
    // Calculate auton score
    function calcAutonScore() {
        autonScore = 0;
        disAuton = document.getElementById("disAuton");
        
        for (i in autonCones) {
            curCone = autonCones[i]
            if      (curCone.includes("high"))  {autonScore += 5;}
            else if (curCone.includes("Mid"))   {autonScore += 4;}
            else if (curCone.includes("low"))   {autonScore += 3;}
        }

        if (parkingPos == randomPos && parkingPos && randomPos) {
            autonScore += 20;
        }

        outputStr = `Auton Score: ${autonScore}`;
        disAuton.innerHTML = outputStr;
    }

    // Add an auton cone
    function genAutonCones() {
        var curCount = 1;
        var outputStr = `<i>${autonCones[0]}x1 `;
        
        for (let i = 1; i < autonCones.length; i++) {
            if (autonCones[i] == autonCones[i-1]) {
                curCount += 1;
                if (curCount < 11) {
                    outputStr = `${outputStr.slice(0, -2)}${curCount} `;
                } else {
                    outputStr = `${outputStr.slice(0, -3)}${curCount} `;
                }
            } else {
                curCount = 1;
                outputStr += `${autonCones[i]}x1 `;
            }
        }
        
        outputStr = outputStr.replace(/Station high/g, toColour("S", "gTxt"));
        outputStr = outputStr.replace(/Close high/g,   toColour("C", "gTxt"));
        outputStr = outputStr.replace(/Opp high/g,     toColour("O", "gTxt"));
        outputStr = outputStr.replace(/Mid/g,          toColour("M", "oTxt"));
        outputStr = outputStr.replace(/Station low/g,  toColour("S", "rTxt"));
        outputStr = outputStr.replace(/Close low/g,    toColour("L", "rTxt"));
        outputStr = outputStr.replace(/\*Miss\*/g,     toColour("X", "bTxt"));
        outputStr = outputStr.replace(/\*Inter\*/g,     toColour("In", "bTxt"));
        outputStr = outputStr.slice(0, -1) + "</i>";

        return outputStr;
    }

    function addAutonCone(curCone) {
        var displayTxt = document.getElementById("autonConesDisp");

        // If there are 12 cones already, exit
        if (autonCones.length >= 12) return;
        
        // Add the cone to the list
        autonCones.push(curCone);

        displayTxt.innerHTML = genAutonCones();
        
        calcAutonScore();
    }

    // Removes the last auton cone
    function undoAutonCones() {
        var displayTxt = document.getElementById("autonConesDisp");

        autonCones.pop();
        if (autonCones.length) {
            displayTxt.innerHTML = genAutonCones();
        } else {
            displayTxt.innerHTML = "--";
        }

        calcAutonScore();
    }

    // Clear the auton cones
    function clearAutonCones() {
        var displayTxt = document.getElementById("autonConesDisp");
        autonCones = [];
        displayTxt.innerHTML = "--";

        calcAutonScore();
    }

    // Set the robot's parking position at the end of auton
    function setParkingPos(position) {
        parkingPos = position;
        document.getElementById("parkingPosDisp").innerHTML = `Auton Parking: <i class="sTxt">${position}</i>`;
        calcAutonScore();
    }

// #endregion Auton

// #region TeleOp
    function genStrategy() {
        const stratsList = ["Cycle", "Ownership", "Circuit"];
        var outputStr = "Strategy: ";
        stratsStr = "";
        for (var i = 0; i < 3; i++) {
            if (stratsDict[stratsList[i]]) {
                stratsStr += `${stratsList[i]} `;
            }
        }
        stratsStr = stratsStr.slice(0, -1);
        stratsStr = stratsStr.replace(/ /, " + ");

        outputStr += stratsStr;

        return outputStr;
    }

    function genStratButtons() {
        var cycleColour = stratsDict["Cycle"] ? "green":"sys";
        var ownerColour = stratsDict["Ownership"] ? "green":"sys";
        var circuitColour = stratsDict["Circuit"] ? "green":"sys";

        outputStr = `<button class="${cycleColour}" onclick="toggleStrat('Cycle')">Cycle</button>
                     <button class="invis" style="padding:0px;">+</button>
                     <button class="${ownerColour}" onclick="toggleStrat('Ownership')">Ownership</button>
                     <button class="${circuitColour}" onclick="toggleStrat('Circuit')">Circuit</button>`

        return(outputStr);
    }

    function toggleStrat(strat) {
        stratsDict[strat] = !stratsDict[strat]

        if (strat == "Ownership") {
            stratsDict["Circuit"] = false;
        } else if (strat == "Circuit") {
            stratsDict["Ownership"] = false;
        }

        document.getElementById("stratDisp").innerHTML = genStrategy();
        document.getElementById("stratSelectorDiv").innerHTML = genStratButtons();
    }

// #endregion TeleOp

// Gets the form link
function genFormLink() {
    matchNum = document.getElementById("matchNum").value;
    teamNum = document.getElementById("teamNum").value;

    conesUsed = autonCones.length;
    
    var autonConesStr = "";
    for (i in autonCones) {
        autonConesStr += `${autonCones[i]} `;
    }

    if (autonConesStr == "") {
        autonConesStr = "None";
    }

    var formURL = `https://docs.google.com/forms/d/e/1FAIpQLScfip4xqA6_sHUVIx5n9OQWzKGp4TLn_0gSyL_qSBb4_KVV0A/formResponse?usp=pp_url&entry.2069581590=${matchNum}&entry.844732376=${teamNum}&entry.1470326169=${startPos}&entry.1186107460=${startSide}&entry.1017313550=${randomPos}&entry.980911135=${autonConesStr}&entry.1049932560=${conesUsed}&entry.2006005073=${autonScore}&entry.436157894=${parkingPos}&entry.230575694=${stratsStr}&submit=Submit`.replace(/ /g, '+');

    console.log(formURL);
    open(formURL);
}