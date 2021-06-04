var properties = {carA : 3, carB : 3.5, carC : 4 }
var selection = document.getElementById("cars");
var buttonCount = document.getElementById("count");
var distance = document.getElementById("dist");
var speed1 = document.getElementById("speed1");
var speed2 = document.getElementById("speed2");
var resultDiv = document.getElementById("resultdiv");
buttonCount.onclick = inputClick;

function inputClick(e){
    resultDiv.hidden = true;
    let key = selection.value;
    let firstSpeed = speed1.value;
    let secondSpeed = speed2.value;
    let currDist= dist.value;
    let usage1 = properties[key];
    handleClick(currDist, firstSpeed, secondSpeed, usage1);

   

}

/**
 * Calculates gas consumption related stuff based on user input
 * @param {*} usage1 usage based on what car option is chosen
 * @param {*} currDist user distance input
 * @param {*} firstSpeed user input for first speed
 * @param {*} secondSpeed user input for second speed
 * @return object containing difference between gas consumption, consumption at first speed, consumption at second speed
 */
function getGasStuff(usage1, currDist, firstSpeed, secondSpeed){
    let usage2 = usage1;
    for(let i = 1; i < firstSpeed; i++){
        usage1 *= 1.009;
    }
    for(let i = 1; i < secondSpeed; i++){
        usage2 *= 1.009;
    }

    var gasUsed1 = currDist/100*usage1;
    var gasUsed2 = currDist/100*usage2;
    
    var gasDiff = gasUsed1 > gasUsed2 ? gasUsed1 -gasUsed2 :  gasUsed2 -gasUsed1;
    gasUsed1 = gasUsed1.toFixed(4);
    gasUsed2 = gasUsed2.toFixed(4);
    gasDiff = gasDiff.toFixed(4);
    return {diff: gasDiff, gas1 : gasUsed1, gas2 : gasUsed2};
}

/**
 * Calculates time related stuff based on user input
 * @param {*} first user input for first speed
 * @param {*} second user input for second speed
 * @param {*} dist user input for distance
 * @return object containing difference between times spent and time spent with first and second speed
 */
function getTimeStuff(first, second, dist){
   
    //Calculate time spent for first speed
    let totalTimeFirst = dist/first;
    let roundedFirstHour = Math.floor(totalTimeFirst);
    let totalMinuteFirst = (totalTimeFirst-roundedFirstHour)*60;
    let roundedFirstMin = Math.floor(totalMinuteFirst);
    console.log("ilman pyöristystä " + totalMinuteFirst);
    console.log("pyöristetty " + roundedFirstMin);
    let roundedFirstSec =  Math.round((totalMinuteFirst-roundedFirstMin)*60);
    if(roundedFirstSec === 60){
        roundedFirstMin +=1;
        roundedFirstSec = 0;
    }

    //Calculate time spent for second speed  
    let totalTimeSecond = dist/second;
    let roundedSecondHour = Math.floor(totalTimeSecond);
    let totalMinuteSecond = (totalTimeSecond-roundedSecondHour)*60;
    let roundedSecondMin = Math.floor(totalMinuteSecond);
    let roundedSecondSec =  Math.round((totalMinuteSecond-roundedSecondMin)*60);
    if(roundedSecondSec === 60){
        roundedSecondMin +=1;
        roundedSecondSec = 0;
    }
    //Calculate difference between times
    let totalDiff = totalTimeFirst > totalTimeSecond ? totalTimeFirst - totalTimeSecond : totalTimeSecond-totalTimeFirst;
    let totalSeconds = totalDiff*3600;

    let finalHourDiff = totalDiff;
    let roundedFinalHour = Math.floor(finalHourDiff);
    let finalMinDiff = (finalHourDiff-roundedFinalHour)*60;
    let roundedFinalMin = Math.floor(finalMinDiff);
    let finalSecDiff =  Math.round((finalMinDiff-roundedFinalMin)*60);
    if(finalSecDiff === 60){
        roundedFinalMin +=1;
        finalSecDiff = 0;
    }

    //Return object containing hours, minutes and seconds for how much the trip will take time with inputted speeds and the difference between those times
    return {diff :{hour : roundedFinalHour, minute : roundedFinalMin, second : finalSecDiff}, 
        first :{ hour : roundedFirstHour, minute : roundedFirstMin, second : roundedFirstSec}, 
        second :{ hour : roundedSecondHour, minute : roundedSecondMin, second : roundedSecondSec}
    };
}

/**
 * Validates user input, checks if all required fields have values
 * @param {*} dist possible user input for distance
 * @param {*} speed1 possible user input for first speed
 * @param {*} speed2 possible user input for second speed
 * @return true if all fields have appropriate values, false otherwise
 */
function validate(dist, speed1, speed2){
    //Speed has to be below 509, based on {@link https://www.themanual.com/auto/fastest-cars-in-the-world/#no1}
    //Distance below 40000 km, whole ~circumfere of earth should be sufficient even if you take scenic route
    return (dist > 0 && dist < 40000) && (speed1 > 0 && speed1 < 509) && (speed2 > 0 && speed2 < 509);
}

/**
 * Adds the result to the document
 * @param {*} timeResult object containing results for time related stuff
 * @param {*} gasResult object containing results for gas consumption 
 */
function addResult(timeResult, gasResult){
    let cleanedResult = cleanResult(timeResult);
    document.getElementById("resulttime1").innerHTML = cleanedResult.first;
    document.getElementById("resulttime2").innerHTML = cleanedResult.second;
    document.getElementById("resultgas1").innerHTML ="Käytetty polttoaine vaihtoehdossa yksi: " + gasResult.gas1 + " litraa";
    document.getElementById("resultgas2").innerHTML = "Käytetty polttoaine vaihtoehdossa kaksi: " + gasResult.gas2 + " litraa";
    document.getElementById("resultdifftime").innerHTML = "Polttoainetta kului " + gasResult.diff + " litraa enemmän";
    document.getElementById("resultdiffgas").innerHTML = cleanedResult.total;
    resultDiv.hidden = false;
}

function cleanResult(timeResult){
    let timeDiffHour = timeResult.diff.hour > 0 ? timeResult.diff.hour + " h " : "";
    let timeDiffMinutes = timeResult.diff.minute > 0 ? timeResult.diff.minute + " min " : "";
    let timeDiffResult = "Ero matka-ajassa " + timeDiffHour + timeDiffMinutes + timeResult.diff.second + " s";

    let speed1TimeHour = timeResult.first.hour > 0 ? timeResult.first.hour + " h " : "";
    let speed1TimeMinute = timeResult.first.minute > 0 ? timeResult.first.minute + " min " : "";
    let speed1TotalTime = "Käytetty aika ensimmäisellä nopeudella: " + speed1TimeHour + speed1TimeMinute + timeResult.first.second + " s";

    let speed2TimeHour = timeResult.second.hour > 0 ? timeResult.second.hour + " h " : "";
    let speed2TimeMinute = timeResult.second.minute > 0 ? timeResult.second.minute + " min " : "";
    let speed2TotalTime = "Käytetty aika ensimmäisellä nopeudella: " + speed2TimeHour + speed2TimeMinute + timeResult.second.second + " s";

return {total : timeDiffResult, first : speed1TotalTime, second: speed2TotalTime};
}

async function handleClick(currDist, firstSpeed, secondSpeed, usage1) {

    let promise = new Promise((resolve, reject) => {
        
      setTimeout(() => resolve(validate(currDist, firstSpeed, secondSpeed)), 100)
    });

    let result = await promise; 

    if(!result){
        alert("Syötä käypä arvo kaikkiin kenttiin");
        return;
    }
    
    let gasResult = getGasStuff(usage1, currDist, firstSpeed, secondSpeed);
    let converted = getTimeStuff(firstSpeed, secondSpeed, currDist);
    addResult(converted, gasResult);
  }
  
 
