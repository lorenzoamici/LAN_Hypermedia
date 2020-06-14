const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const eventId = urlParams.get('id')
console.log(eventId);
console.log("/v1/events/".concat(eventId));
function getEvent() {
    fetch("/v1/events/".concat(eventId)).then(function(response) {
        return response.json();
    }).then(function(event) {
        document.querySelector("title").innerHTML = event.title.split(";")[0];
        document.querySelector(".breadcrumb .active").innerHTML = event.title.split(";")[0];
        document.querySelector("#eventPar h1").innerHTML = event.title.split(";")[1];
        document.querySelector("#eventPar p.normal").innerHTML = event.description;
        document.querySelector(".CERFlevelPar").innerHTML = event.courses[0].cerf_level;
        document.querySelector("#courseLevelPar").innerHTML = event.courses[0].level.concat(" course");
        const eventDateTime = new Date(event.date);
        let dateOptions = { day: 'numeric', month: 'long', year: 'numeric'};
        let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false};
        document.querySelector("#eventPar h6").innerHTML = eventDateTime.toLocaleDateString('default', dateOptions).concat(", ".concat(eventDateTime.toLocaleTimeString('default', timeOptions)));
        document.querySelector("#eventImage img").src = event.photos;
        document.querySelector("#eventCourseLink").href = "./course.html?id=".concat(event.courses[0].id);
        document.querySelector("#coordinatorPhoto").src = event.coordinator.photo.split(";")[0];
        document.querySelector("#coordinatorName").innerHTML = event.coordinator.name;
        document.querySelector("#coordinatorLink").href = "./person.html?id=".concat(event.coordinator.id);
        document.querySelector("#eventLocation").innerHTML = event.location.split(";")[1];
        let monthNumeric = parseInt(eventDateTime.toLocaleDateString('default', { month: 'numeric'}))-1;
        let monthTextual = eventDateTime.toLocaleDateString('default', { month: 'long'});
        document.querySelector("#eventsMonthButton").href = "./events-month.html?month=".concat(monthNumeric);
        document.querySelector("#breadcrumbEventsMonth a").innerHTML = "Events in ".concat(monthTextual);
        document.querySelector("#breadcrumbEventsMonth a").href = "./events-month.html?month=".concat(monthNumeric);
        document.querySelector("#eventContact a").href = "./event-location.html?id=".concat(eventId);
        if(event.previousID == null){
            document.querySelector("#previuosEvent").style.display = "none";
            document.querySelector("#nextEvent").href = "./event.html?id=".concat(event.nextID);
        }
        else if(event.nextID == null){
            document.querySelector("#nextEvent").style.display = "none";
            document.querySelector("#previuosEvent").href = "./event.html?id=".concat(event.previousID);
        }
        else{
            document.querySelector("#previuosEvent").href = "./event.html?id=".concat(event.previousID);
            document.querySelector("#nextEvent").href = "./event.html?id=".concat(event.nextID);
        }
    })
}

/*function getCoordinator() {
    fetch("/v1/events/".concat(eventId)).then(function(response) {
        return response.json();
    }).then(function(event) {
        fetch("/v1/person/".concat(event.coordinator.id)).then(function(response){
            return response.json();
        }).then(function(coordinator){
            document.querySelector("#coordinatorPhoto").src = coordinator.photo.split(";")[0];
            document.querySelector("#coordinatorName").innerHTML = coordinator.name;
            document.querySelector("#coordinatorLink").href = "./person.html?id=".concat(coordinator.id);
        })
    })
}*/

/*function populateButtons(){
    var nextId = parseInt(eventId, 10) + 1;
    var previousId = parseInt(eventId, 10) - 1;
    if(eventId==1){
        document.querySelector("#previuosEvent").style.display = "none";
    }
    else if(eventId==14){
        document.querySelector("#nextEvent").style.display = "none";
    }
    document.querySelector("#previuosEvent").href = "./event.html?id=".concat(previousId);
    document.querySelector("#nextEvent").href = "./event.html?id=".concat(nextId);
}*/
        

window.onload = function() {
    this.getEvent();
    //this.getCoordinator();
    //this.populateButtons();
}