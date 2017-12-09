var marker = [];
var places = ["atm","bank","car_repair","doctor","fire_station","gas_station","hardware_store","restaurant","police","parking","hospital"];
var wikisuccess = "Some useful Wikipedia Links about the place.";
var wikiload = "Loading Wikipedia Data...";
var wikifail = "Failed to get Wiki Resources.";
var emergency = ["police","fire_station","hospital"];
var times = ["1 hour","2 hours","4 hours"];
viewModel = {
        WikiName: ko.observableArray(),
        WikiLinks: ko.observableArray(),
        markerList: ko.observableArray(),
        placesList: ko.observableArray(["atm","bank","car_repair","doctor","fire_station","gas_station","hardware_store","restaurant","police","parking","hospital"]),
        selectedPlaces: ko.observableArray(),
        showMultiple: ko.observable(false),
        showSingle: ko.observable(true),
        wikiPara:ko.observable(),
        /*Sudhi*/             
        Driver: [
            { firstName: 'Bert',Rating: 3 },
            { firstName: 'Charles',Rating: 4 },
            { firstName: 'Denise',Rating: 5 }
        ],
        toggleRating: function(){
            document.getElementById("Rating").classList.toggle("open");
        },
        /*Ends*/
        toggleNav: function(){
            document.getElementById("Nav").classList.toggle("open");
        },
        //Toggle the nav when clicked on map
        mapNav : function(){
            if ($("#Nav").hasClass("open")) {
                document.getElementById("Nav").classList.toggle("open");
            }
        },
        //handles click of places list
        listClickAdd : function(data, event) {
            viewModel.selectedPlaces([]);
            var name = event.target.innerHTML;
            var id;//get the id of marker
            var lengthofPlaces = places.length;
            for(var i=0;i < lengthofPlaces ;i++){
                if (name === places[i]){
                    id = i;
                    viewModel.selectedPlaces.push(places[i]);
                   // viewModel.placesList.remove(places[i]);
                    break;
                }
            }
            findPlaces(viewModel.selectedPlaces());
            document.getElementById("Nav").classList.toggle("open");
            },
        //handles click of emergency button 
        emergencyClick: function(){
            document.getElementById("Nav").classList.toggle("open");
            findPlaces(emergency);
        },
        //handles click of selected places list
        listClickRemove : function(data, event) {
                
            var name = event.target.innerHTML;
            var id;//get the id of marker
            var lengthofPlaces = places.length;
            
            for(var i=0;i < lengthofPlaces ;i++){
                if (name === places[i]){
                    id = i;
                    viewModel.selectedPlaces.remove(places[i]);
                    viewModel.placesList.push(places[i]);
                    break;
                }
            }
            findPlaces(viewModel.selectedPlaces());
            },
        showInfo:function(id){
            showInfoWindow(id);
        }
};
    ko.applyBindings(viewModel);

$(document).ready(function(){
    var now = new Date(Date.now());
    var formatted = now.getHours().toString() + now.getMinutes().toString();
    //alert(formatted);
    if (parseInt(formatted) > 1230 && parseInt(formatted) > 1230){

    }
});