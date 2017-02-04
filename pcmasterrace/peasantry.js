var rep = 0;
var temp = 70;
var fps = 1;
var timeout = 30;
var powerdead = false;
var thermalthrottle = 0;
var overclocked = 0;
var moreheat = 0;
var mobo = {
    socket: 775
    , ramspeed: 2
    , m2: 0
    , pcie: 0
, }
var components = {
        //The different tiers for components
        ram: 0
        , cpu: 0
        , gpu: 0
        , cooling: 0
        , power: 0
        , mobo: 0
    , }
    //list the different gpus
var gpu1 = {
    cost: 0
    , pcie: 0
    , name: "GeForce 6600"
    , fps: -3
    , bought: true
, }
var gpu2 = {
    cost: 30
    , pcie: 0
    , name: "GeForce 7600 GT"
    , fps: -1
    , bought: false
, }
var gpu3 = {
        cost: 700
        , pcie: 1
        , name: "GeForce 8800 GTX"
        , fps: 0
        , bought: false
    , }
    //list the different cpus
var cpu1 = {
    cost: 0
    , socket: 775
    , heat: 1
    , name: "Core 2 Duo E6550"
    , fps: 4
    , bought: true
, }
var cpu2 = {
    cost: 200
    , socket: 775
    , heat: 2
    , name: "Core 2 Duo E6850"
    , fps: 6
    , bought: false
, }
var cpu3 = {
        cost: 700
        , socket: 775
        , heat: 3
        , name: "Core 2 Quad Q8300"
        , fps: 8
        , bought: false
    , }
    //list the power supplies
var power1 = {
    cost: 8
    , timeout: 30
    , name: "Whatever it is, it's gonna die soon"
, }
var power2 = {
    cost: 10
    , timeout: 680
    , name: "Better than before, but super sketchy"
, }
var power3 = {
        cost: 300
        , timeout: 10000
        , name: "eRecycling, anyone?"
    , }
    //list the cooling
var cooling1 = {
    cost: 0
    , cooling: 2
    , name: "Whiny Stock Fan"
    , bought: true
, }
var cooling2 = {
    cost: 500
    , cooling: 6
    , name: "Blowy-Blowy 9001"
    , bought: false
, }
var cooling3 = {
        cost: 70000
        , cooling: 15
        , name: "Overpowered Water-Cooling"
        , bought: false
    , }
    //list the motherboards
var mobo1 = {
    socket: 775
    , ramspeed: 2
    , m2: 0
    , pcie: 0
    , cost: 0
    , bought: true
, }
var mobo2 = {
    socket: 775
    , ramspeed: 2
    , m2: 0
    , pcie: 1
    , cost: 400
    , bought: false
, }
var mobo3 = {
        socket: 1156
        , ramspeed: 3
        , m2: 0
        , pcie: 1
        , cost: 2500
        , bought: false
    , }
    //list the ram types
var ram1 = {
    cost: 0
    , type: 2
    , bought: true
, }
var ram2 = {
    cost: 5000
    , type: 3
    , bought: false
, }
var ram3 = {
        cost: 60000
        , type: 4
        , bought: false
    , }
    //list the components into an array
var gpu = [gpu1, gpu2, gpu3, ]
var cpu = [cpu1, cpu2, cpu3, ]
var power = [power1, power2, power3, ]
var cooling = [cooling1, cooling2, cooling3, ]
var mobo = [mobo1, mobo2, mobo3, ]
var ram = [ram1, ram2, ram3];
//COME ON END THE VARIABLES ALREADY
//Main loop, runs every ms
function mainLoop() {
    update();
    checkIfWorking();
    if (!powerdead) {
        fps = cpu[components.cpu].fps + (gpu[components.gpu].fps + overclocked) - thermalthrottle;
        if (fps < 0) {
            fps = 0;
        }
    }
}
//Function for adding reputation every second and more
function fpscount() {
    if (!powerdead && ram[components.ram].type == mobo[components.mobo].ramspeed) {
        rep += fps;
        timeout -= overclocked + 1;
        temp -= (cooling[components.cooling].cooling - cpu[components.cpu].heat) - overclocked;
        if (temp < 70) {
            temp = 70;
        }
    }
}
//Updates the HTML elements
function update() {
    //FPS, REP and system temp
    document.getElementById("fps").innerHTML = fps;
    document.getElementById("rep").innerHTML = rep;
    document.getElementById("systemp").innerHTML = temp;
    //Motherboard features
    document.getElementById("pcie").innerHTML = mobo[components.mobo].pcie;
    document.getElementById("socket").innerHTML = mobo[components.mobo].socket;
    document.getElementById("ramspeed").innerHTML = mobo[components.mobo].ramspeed;
    //GPU
    document.getElementById("gpu").innerHTML = gpu[components.gpu].name;
    //CPU
    document.getElementById("cpu").innerHTML = cpu[components.cpu].name;
    //Memory
    document.getElementById("ram").innerHTML = ram[components.ram].type;
    //Cooling
    document.getElementById("cooling").innerHTML = cooling[components.cooling].name;
    //Power
    document.getElementById("power").innerHTML = power[components.power].name;
    //Overclocking
    document.getElementById("overclocking").innerHTML = overclocked;
}
//Checks if power supply is dead or if cpu is thermal throttling.
function checkIfWorking() {
    if (timeout <= 0) {
        document.getElementById("powerdead").style.display = "block";
        powerdead = true;
    }
    else {
        document.getElementById("powerdead").style.display = "none";
        powerdead = false;
    }
    if (temp - 71 >= 0) {
        thermalthrottle = temp - 71;
        document.getElementById("overheating").style.display = "block";
    }
    else {
        document.getElementById("overheating").style.display = "none";
        thermalthrottle = 0;
    }
}
//Enables overclocking.
function overclock() {
    
    var amount = parseInt(prompt("Key in a reasonable number:"));
    if(amount >= (Math.round(cpu[components.cpu].fps * 0.5))){
        overclocked = Math.round(cpu[components.cpu].fps * 0.5);
    }else{
        overclocked = amount;
    } 
    
}
//Updates items listed in shop.
function updateshop() {
    document.getElementById("gpushop").innerHTML = "";
    document.getElementById("powershop").innerHTML = "";
    document.getElementById("cpushop").innerHTML = "";
    document.getElementById("moboshop").innerHTML = "";
    document.getElementById("coolingshop").innerHTML = "";
    document.getElementById("ramshop").innerHTML = "";
    for (var i = 0; i < gpu.length; i++) {
        if (gpu[i].bought) {
            gpu[i].cost = 0;
        }
        if (gpu[i].pcie <= mobo[components.mobo].pcie) {
            document.getElementById("gpushop").innerHTML += "<li onclick=\"buy(" + i + ", 'gpu')\"; class='store'> Name: " + gpu[i].name + ", FPS gain: " + gpu[i].fps + " fps, cost: " + gpu[i].cost + ". Click this to buy! </li>";
        }
    }
    for (var i = 0; i < power.length; i++) {
        document.getElementById("powershop").innerHTML += "<li onclick=\"buy(" + i + ", 'power')\"; class='store'> Name: " + power[i].name + ", time until death: " + power[i].timeout + " seconds, cost: " + power[i].cost + ". Click this to buy! </li>";
    }
    for (var i = 0; i < cpu.length; i++) {
        if (cpu[i].bought) {
            cpu[i].cost = 0;
        }
        if (cpu[i].socket == mobo[components.mobo].socket) {
            document.getElementById("cpushop").innerHTML += "<li onclick=\"buy(" + i + ", 'cpu')\"; class='store'> Name: " + cpu[i].name + ", FPS gain: " + cpu[i].fps + " fps, heat output: " + cpu[i].heat + ", cost: " + cpu[i].cost + ". Click this to buy! </li>";
        }
    }
    for (var i = 0; i < mobo.length; i++) {
        if (mobo[i].bought) {
            mobo[i].cost = 0;
        }
        document.getElementById("moboshop").innerHTML += "<li onclick=\"buy(" + i + ", 'mobo')\"; class='store'> No# of PCI-Express slots: " + mobo[i].pcie + ", socket: LGA-" + mobo[i].socket + ", ram type: DDR" + mobo[i].ramspeed + ", cost: " + mobo[i].cost + ". Click this to buy! </li>";
    }
    for (var i = 0; i < cooling.length; i++) {
        if (cooling[i].bought) {
            cooling[i].cost = 0;
        }
        document.getElementById("coolingshop").innerHTML += "<li onclick=\"buy(" + i + ", 'cooling')\"; class='store'> Name: " + cooling[i].name + ", cooling: " + cooling[i].cooling + ", cost: " + cooling[i].cost + ". Click this to buy! </li>";
    }
    for (var i = 0; i < ram.length; i++) {
        if (ram[i].bought) {
            ram[i].cost = 0;
        }
        if (ram[i].type == mobo[components.mobo].ramspeed) {
            document.getElementById("ramshop").innerHTML += "<li onclick=\"buy(" + i + ", 'ram')\"; class='store'> Name: 8gb of DDR" + ram[i].type + ", cost: " + ram[i].cost + ". Click this to buy! </li>";
        }
    }
}
//Buys things.
function buy(tier, thing) {
    if (thing == "gpu") {
        if (gpu[tier].cost <= rep) {
            components.gpu = tier;
            gpu[tier].bought = true;
            rep -= gpu[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    else if (thing == "power") {
        if (power[tier].cost <= rep) {
            components.power = tier;
            timeout = power[components.power].timeout;
            rep -= power[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    else if (thing == "cpu") {
        if (cpu[tier].cost <= rep) {
            components.cpu = tier;
            overclocked = 0;
            cpu[tier - 1].heat
            cpu[tier].bought = true;
            rep -= cpu[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    else if (thing == "mobo") {
        if (mobo[tier].cost <= rep) {
            components.mobo = tier;
            mobo[tier].bought = true;
            rep -= mobo[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    else if (thing == "cooling") {
        if (cooling[tier].cost <= rep) {
            components.cooling = tier;
            cooling[tier].bought = true;
            rep -= cooling[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    else if (thing == "ram") {
        if (ram[tier].cost <= rep) {
            components.ram = tier;
            ram[tier].bought = true;
            rep -= ram[tier].cost;
        }
        else {
            alert("Your reputation isn't good enough for you to buy this.");
        }
    }
    updateshop();
}
//Opens shop.
function openshop(open) {
    if (open == 1) {
        document.getElementById("mainscreen").style.display = "none";
        document.getElementById("shop").style.display = "block";
    }
    else {
        document.getElementById("mainscreen").style.display = "block";
        document.getElementById("shop").style.display = "none";
    }
}
var interval1 = setInterval(fpscount, 1000);
var interval2 = setInterval(mainLoop, 30);
updateshop();