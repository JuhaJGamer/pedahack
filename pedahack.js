var elements = document.getElementsByName("form_string"); //Get all form_string elements of peda.net forms
var forms = []; //Initialize a variable to store form info

var regex_main = /\[\[(?:[ox]:|_:v=|h=)[^\]]+\]\]/gi;    //main regex to catch inputs
var regex_h = /\[\[(h=)[^\]]+\]\]/i;                     //empty write field regex
var regex_v = /\[\[(_:v=)[^\]]+\]\]/i;                   //write field regex
var regex_va = /_:v=([^|:]+)/i;                          //catch answer regex
var regex_ox = /\[\[[ox]:s=(\d)[^\]]*\]\]/i;             //catch points regex


elements.forEach((x,i) => { //Loop trough all peda.net forms
	forms[i] = {
		node: x.parentNode,                     //get main form node
		string: x.value,                        //get form string 
		matches: x.value.match(regex_main),     //get field definitions
		inputs: x.parentNode.getElementsByTagName("input") //get all input fields
	}; //Set form object
});

browser.runtime.onMessage.addListener((msg) => { //Listener for browserAction click message from bg.js

	forms.forEach((y) => {                   //Loop trough each form
		y.matches.forEach((x,i) => {     //Loop trough each recognised input of each form

			//console.log(x); //DBG
			if(x.match(regex_h) == null) //skip over free write fields
			{                            //everything that is not a free writing field

				//console.log(x) //DBG
				if(x.match(regex_v) != null) //check if input is a write field
				{                            //everything that is a write field
					//console.log(x);
					//console.log(x.match(regex_va));
					y.inputs[i].value = x.match(regex_va)[1]; //set input value as answer caught by regex
				}

				//radio and check buttons
				else
				{
					if(x.match(regex_ox)[1] != "0")      //if checking this gives you points
					{
						y.inputs[i].checked = true;  //check it
					}
					else
					{
						y.inputs[i].checked = false; //otherwise don't check it
					}
				}
			}
		});
	});
});
