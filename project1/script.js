var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

button.addEventListener("click", function (){
    if (input.value.length > 0){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
    }   
})

input.addEventListener("keypress", function(event) {
    if (input.value.length > 0 && event.keyCode === 13){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
    }   
})

let input2 = document.getElementById("input2");
let button2 = document.getElementById("button2");
let h1 = document.querySelector("h1");

button2.addEventListener("click", function (){
    if(input2.value.length > 0){
        h1.innerText = (`Hello ${input2.value}, get ready to create your own shopping list!`);
    }
})

input2.addEventListener("keypress", function(event) {
        if (input2.value.length > 0 && event.keyCode === 13) {
			h1.innerText = (`Hello ${input2.value}, get ready to create your own shopping list!`);
        }
    })

    var contin = new Array(); //each cell will hold an array of all the countries in a continent
var numincont = new Array(0,51,2,47,15,42,27,15); //number of countries in each continent
//prepare the continent arrays
for( var z = 1; z < numincont.length; z++ ) { contin[z] = new Array(); }
//tell it to set up the select menu when the page loads
window.onload = myprep;

function myprep() {
	//Because Netscape 4 will act strangely on reloading . . .
	if( document.mainform.Country.options.length < 60 ) { self.location.reload(); }
	//now that the document has fully loaded, take out all of the countries and put them into
	//an array representing that continent (the continent arrays)
	var y = 1; //y = number of options to bypass at the start - 1
	for( var z = 1; z < numincont.length; z++ ) {
		//each continent in turn. start at 1 because options[0] is 'Please select one'
		for( x = 1; x <= numincont[z]; x++ ) {
			//insert countries into arrays
			contin[z][x] = new Option(document.mainform.Country.options[x+y].text,document.mainform.Country.options[x+y].value);
		}
		//offset by the number we have already done
		y += numincont[z] + 1; //the 1 allows for the '       ------ Continent name ------' options
	}
	refillme();
}

function refillme() {
	//erase the select menu then refill it with all countries from the selected continent
	//the reason I deconstruct then reconstruct is to allow non JavaScript browsers to work
	while( document.mainform.Country.options.length ) { document.mainform.Country.options[0] = null; }
	if( document.mainform.Continent.selectedIndex ) {
		//they have selected a continent. insert a 'Please select one' option
		document.mainform.Country.options[0] = new Option("Please select one","");
		for( var z = 1; z < contin[document.mainform.Continent.selectedIndex].length; z++ ) {
			//for the selected continent, put in each country
			document.mainform.Country.options[z] = contin[document.mainform.Continent.selectedIndex][z];
		}
		//give them an 'Other' option and enable the select menu (if it was disabled)
		document.mainform.Country.options[z] = new Option("Other (please use the box below)","Other");
		document.mainform.Country.disabled = false;
	} else {
		//wait for them to select a continent
		document.mainform.Country.options[0] = new Option("Please select an area above","");
		document.mainform.Country.disabled = true;
	}
	document.mainform.Country.options[0].selected = true;
	document.mainform.other.disabled = true;
}

function ableother() {
	//If they have selected "other", enable the "other" box
	if( document.mainform.Country.options.length > 1 && document.mainform.Country.selectedIndex == document.mainform.Country.options.length - 1 ) {
		document.mainform.other.disabled = false;
	} else {
		document.mainform.other.disabled = true;
	}
}
