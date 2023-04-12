autonCones = ["Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Close high", "Station low"]
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