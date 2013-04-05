
var masjidConfig = {url: window.location.origin+'/masjid/'};

var nextPrayerCounter = function(data){
  var newTimeLeft = data/60000;
  var seconds = false;
  if(newTimeLeft <= 0){
    seconds = true;
    newTimeLeft = data/1000;
  }
  newTimeLeft =  Math.floor(newTimeLeft) + (seconds ? ' seconds' : ' minutes') + ' until '+ masjidTimes.next;
  document.title = newTimeLeft;
  $('.nextprayercounter').html(newTimeLeft);
}


var nearestMosqueCallback = function(mosque){
  //Tell masjidTimes to use this mosque from now on.
  masjidTimes.useMosque(mosque);

  //Update any mosque name place holders.
  $('.mosque-name').html(mosque.name);

  //Populate today's times.
  masjidTimes.requestTodayPrayerTimes(function(data){
    times = data.response;
    //Go through each prayer and update its html.
    for(var i = 0; i<masjidTimes.prayers.length; i++){
      $('.'+masjidTimes.prayers[i]+'-time').html(times[masjidTimes.prayers[i]]);
    }

    // Check for next prayer periodically
    masjidTimes.nextPrayerInterval(nextPrayerCounter);
  });
}

var doButtonListeners = function(){
  $('#settings-clearcache').click(function(){
    //Clear the cache and reload.
    masjidTimes.clearLocalStorage();
    window.location.reload();
  });
}

$(document).ready(function(){
  // Button listeners
  doButtonListeners();
  masjidTimes = newMasjidTimes(masjidConfig);
  masjidTimes.getNearestMosque(nearestMosqueCallback);

});



