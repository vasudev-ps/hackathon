var marker = [];
var places = ["atm","bank","car_repair","doctor","fire_station","gas_station","hardware_store","restaurant","police","parking","hospital"];
var wikisuccess = "Some useful Wikipedia Links about the place.";
var wikiload = "Loading Wikipedia Data...";
var wikifail = "Failed to get Wiki Resources.";
viewModel = {
        WikiName: ko.observableArray(),
        WikiLinks: ko.observableArray(),
        markerList: ko.observableArray(),
        placesList: ko.observableArray(["atm","bank","car_repair","doctor","fire_station","gas_station","hardware_store","restaurant","police","parking","hospital"]),
        selectedPlaces: ko.observableArray(), 
        wikiPara:ko.observable(),
        toggleNav: function(){
            document.getElementById("Nav").classList.toggle("open");
            marker = markerName.slice();
            if(!viewModel.query())
            viewModel.markerList(marker);
        },
        //Toggle the nav when clicked on map
        mapNav : function(){
            if ($("#Nav").hasClass("open")) {
                document.getElementById("Nav").classList.toggle("open");
            }
        },
        //handles click of places list
        listClickAdd : function(data, event) {
            var name = event.target.innerHTML;
            var id;//get the id of marker
            var lengthofPlaces = places.length;
            for(var i=0;i < lengthofPlaces ;i++){
                if (name === places[i]){
                    id = i;
                    viewModel.selectedPlaces.push(places[i]);
                    viewModel.placesList.remove(places[i]);
                    break;
                }
            }
            findPlaces(viewModel.selectedPlaces());
            //findplaces()
            //viewModel.addItem(name);
            //viewModel.showInfo(id);
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
            //viewModel.addItem(name);
            //viewModel.showInfo(id);
            },
            //add wikipedia links to the nav bar
        addItem : function(address) {
            var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + address + "&format=json&callback=wikiCallback";
            var wikiTimeout = setTimeout(function() {
                    viewModel.wikiPara(wikifail);
                    }, 8000);
            viewModel.wikiPara(wikiload);
            $.ajax(wikiUrl, {
                dataType: 'jsonp',
                success: function(data) {
                    viewModel.asignWikilinks(data);
                    clearTimeout(wikiTimeout);
                }
            });
        },
        asignWikilinks : function(data){
            //check if data is present about  the search.
            //else give useful data about mangalore
            if(data[1].length === 0){
                viewModel.addItem(placeName);
            }
            else{
                viewModel.wikiPara(wikisuccess);
                viewModel.WikiName(data[1]);
                viewModel.WikiLinks(data[3]);
            }
        },
        showInfo:function(id){
            showInfoWindow(id);
        },
        query:ko.observable(''),

        search: function(value) {
            // remove all the current markerList, which removes them from the view
            //reffered below site
            //http://opensoul.org/2011/06/23/live-search-with-knockoutjs/
            viewModel.markerList.removeAll();
            for(var x in markerName) {
              if(markerName[x].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                viewModel.markerList.push(markerName[x]);
                //set the visibility of mached marker to true
                placeMarkers[x].setVisible(true);
              }
              else{
                //unmached markers visibility false
                //cannot use setmap(null). looses all data of map
                    placeMarkers[x].setVisible(false);
              }
            }
          }
};
//for filtering input from user using subscribe
    viewModel.query.subscribe(viewModel.search);
    ko.applyBindings(viewModel);
