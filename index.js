/* #region Declare Variables */
    // Init
    var matchNum = document.getElementById("matchNum.value");
    var teamNum = document.getElementById("teamNum.value");
    var startPos;
    var randomPos;

    // Auton
    var autonCones = [];
    var parkingPos;

    // Driver
    var strategy

/* #endregion */

/* #region Init */
    // Set robot starting position
    function setStartPos(position) {
        startPos = position;
        if (position[0] == 'B') {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="bTxt">${position}</i>`;
        } else {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="rTxt">${position}</i>`;
        }
    }

    function setRandomPos(position) {
        randomPos = position;
        document.getElementById("randomPosDisp").innerHTML = `Randomization: <i class="sTxt">${position}</i>`;
        calcAutonScore();
    }
/* #endregion */

/* #region Auton */
    // Calculate auton score
    function calcAutonScore() {
        var autonScore = 0;
        autonHeader = document.getElementById("autonHeader");
        
        for (i in autonCones) {
            curCone = autonCones[i]
            if      (curCone.includes("high"))  {autonScore += 5;}
            else if (curCone.includes("Mid"))   {autonScore += 4;}
            else if (curCone.includes("low"))   {autonScore += 3;}
        }

        if (parkingPos == randomPos && parkingPos && randomPos) {
            autonScore += 20;
        }

        outputStr = `Auton: ${autonScore}`;
        autonHeader.innerHTML = outputStr;
    }

    // Add an auton cone
    function genAutonCones() {
        var curCount = 1;
        var outputStr = `Auton Cones: <i>${autonCones[0]} x1 |`;
        
        for (let i = 1; i < autonCones.length; i++) {
            if (autonCones[i] == autonCones[i-1]) {
                curCount += 1;
                if (curCount < 11) {
                    outputStr = `${outputStr.slice(0, -3)}${curCount} |`;
                } else {
                    outputStr = `${outputStr.slice(0, -4)}${curCount} |`;
                }
            } else {
                curCount = 1;
                outputStr += ` ${autonCones[i]} x1 |`;
            }
        }
        outputStr = outputStr.slice(0, -2) + "</i>";
        outputStr = outputStr.replace(/high/g, "</i>&#129001<i>");
        outputStr = outputStr.replace(/height/g, "</i>&#128999<i>");
        outputStr = outputStr.replace(/low/g, "</i>&#128997<i>");

        return outputStr;
    }

    function addAutonCone(curCone) {
        var displayDiv = document.getElementById("autonConesDisp");

        // If there are 12 cones already, exit
        if (autonCones.length >= 12) return;
        
        // Add the cone to the list
        autonCones.push(curCone);

        /* Logic written in Python
        -----------------------------------------------------------
        curCount = 1
        outputStr = f"Auton Cones: <i>{autonCones[0]} x1 |"

        for i in range(1, len(autonCones)):
            if autonCones[i] == autonCones[i-1]:
                curCount += 1
                if curCount < 11:
                    outputStr = f"{outputStr[:-3]}{curCount} |"
                else:
                    outputStr = f"{outputStr[:-4]}{curCount} |"
            else:
                curCount = 1
                outputStr += f" {autonCones[i]} x1 |"

        outputStr = outputStr[:-2] + "</i>"
        print(outputStr)
        */
        displayDiv.innerHTML = genAutonCones();
        
        calcAutonScore();
        console.log(autonCones);
    }

    // Removes the last auton cone
    function undoAutonCones() {
        var displayDiv = document.getElementById("autonConesDisp");

        autonCones.pop();
        if (autonCones.length) {
            displayDiv.innerHTML = genAutonCones();
        } else {
            displayDiv.innerHTML = "Auton Cones"
        }

        calcAutonScore();
        console.log(autonCones);
    }

    // Clear the auton cones
    function clearAutonCones() {
        var displayDiv = document.getElementById("autonConesDisp");
        autonCones = [];
        displayDiv.innerHTML = "Auton Cones";

        calcAutonScore();
    }

    // Set the robot's parking position at the end of auton
    function setParkingPos(position) {
        parkingPos = position;
        document.getElementById("parkingPosDisp").innerHTML = `Auton Parking: <i class="sTxt">${position}</i>`;
        calcAutonScore();
    }

/* #endregion Auton */

// Gets the form link
function generateFormLink() {
    var link = `https://docs.google.com/forms/d/e/1FAIpQLSdoE9_KP5t3vmmbo-SqEgLw-YWyYcqDCbgHjO3L_gt_VivVYg/formResponse?usp=pp_url`;
    
    // #region get form values
    matchNum = document.getElementById("matchNum").value;
    teamNum = document.getElementById("teamNum").value;
    startPos = document.querySelector('input[name="Starting Position"]:checked').value.replace(/ /g,"+");
    autonTarget = document.querySelector('input[name="Auton Target"]:checked').value.replace(/ /g,"+");
    autonCones = document.getElementById("AutonConesNum").innerHTML;
    autonPark = document.querySelector('input[name="Auton Park"]:checked').value.replace(/ /g,"+");
    groundCones = document.getElementById("groundConesNum").innerHTML;
    lowCones = document.getElementById("lowConesNum").innerHTML;
    midCones = document.getElementById("midConesNum").innerHTML;
    highCones = document.getElementById("highConesNum").innerHTML;
    beaconPos = document.querySelector('input[name="fieldGridButtons"]:checked').value;
    interferes = document.querySelector('input[name="interferes"]:checked').value.replace(/ /g,"+");
    circuit = document.querySelector('input[name="circuit"]:checked').value.replace(/ /g,"+");
    // #endregion get form values

    // #region add form values to link
    link += `&entry.1111773089=${matchNum}`;
    link += `&entry.1127567054=${teamNum}`;
    link += `&entry.1007884815=${startPos}`;
    link += `&entry.1164051351=${autonTarget}`;
    link += `&entry.443075517=${autonCones}`;
    link += `&entry.328230530=${autonPark}`;
    link += `&entry.1777121679=${groundCones}`;
    link += `&entry.44730825=${lowCones}`;
    link += `&entry.971732476=${midCones}`;
    link += `&entry.2039092675=${highCones}`;
    link += `&entry.324063643=${beaconPos}`;
    link += `&entry.1907658295=${interferes}`;
    link += `&entry.166044511=${circuit}`;
    link += `&submit=Submit`;
    // #endregion add form values to link
    
    console.log(link);
    open(link)
}