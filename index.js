/* #region Declare Variables */
    // Init
    var matchNum = document.getElementById("matchNum.value");
    var teamNum = document.getElementById("teamNum.value");
    var startPos;
    var randomize;

    // Auton
    var autonCones = [];
    var robotPos;

    // Driver
    var strategy
/* #endregion */

/* #region Init */
    // Set robot starting position
    function setStartPos(position) {
        startPos = position;
        if (startPos[0] == 'B') {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="bTxt">${startPos}</i>`;
        } else {
            document.getElementById("startPosDisp").innerHTML = `Starting Position: <i class="rTxt">${startPos}</i>`;
        }
    }
/* #endregion */

// Add an auton cone
function addAutonCone(curCone) {
    autonCones.push(curCone);
}

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