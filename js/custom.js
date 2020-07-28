(function(){

  // const iconOne = document.getElementById('iconOne')
  // const iconTwo = document.getElementById('iconTwo')
  // const iconThree = document.getElementById('iconThree')
  // const iconFour = document.getElementById('iconFour')
  // const iconFive = document.getElementById('iconFive')
  // const iconSix = document.getElementById('iconSix')
  // const iconSeven = document.getElementById('iconSeven')
  // const iconEight = document.getElementById('iconEight')

  // const iconArray = [iconOne, iconTwo, iconThree, iconFour, iconFive, iconSix, iconSeven, iconEight]

  let app = new Vue({
    el: '#app',
    data: {
      location: false,
      weather: false,
      dates: false,
      days: false,
      icons: false
    },
    created: function () {
      this.createDates()
    },
    methods: {
      createDates: function () {
        var daysCreated = [];
        var datesCreated = [];
        var daysRequired = 7
        for (var i = 0; i <= daysRequired; i++) {
          datesCreated.push( moment().add(i, 'days').format('MMM Do') )
          daysCreated.push( moment().add(i, 'days').format('dddd') )
        }
        this.dates = datesCreated
        this.days = daysCreated
      }
    }
  });

   function makeAjaxRequest () {
      // GET request for remote image in node.js
      function getLocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition)
        } else {
          console.log('not working')
        }
      }

      getLocation()

      function showPosition (position) {
        axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
        }).then(function (response) {
          app.weather = response
          function getIcons () {
            let icons = []

            for (var i = 0; i < 8; i++) {
              let iconCode = response.data.daily[i].weather[0].icon
              const iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
              icons.push(iconUrl)
            }
            app.icons = icons
          }
          getIcons()
        });
        axios({
          method: 'get',
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json?access_token=pk.eyJ1IjoiYmVuZWx3b29kcyIsImEiOiJja2I1b3J3NWwxNzJzMnRzN2J4cXV0cDZyIn0.NfLf39V4gp_PPtreLXVffQ'
        }).then(function (response) {
          app.location = response
        });
      }
    } // makeAjaxRequest ENDS

    makeAjaxRequest();



    // mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZWx3b29kcyIsImEiOiJja2Q2Z3oxdGExMnBuMnNvMnMyYWZ5MjJrIn0.qOaxngOcrWkS5gOQnpHn0A';
    //   var map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-79.4512, 43.6568],
    //   zoom: 13
    // });
    //
    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl
    //   })
    // );



    // function showPosition(position) {
    //   console.log(position.coords.latitude)
    //   console.log(position.coords.longitude)
    // }
    //
    // getLocation()

    // let testIcon = document.getElementById('iconTwo')
    // testIcon.classList.remove('wi-night-sleet')

    // function updateIcons (response) {
    // 	iconArray[0].
    // 	iconArray[0].classList.add('wi-day-rain')
    // 	console.log(iconArray[0].classList)
    // 	for (var i = 0; i < response.data.daily.length; i++) {
    // 		iconArray[i].classList.remove('wi-day-sunny')
    // 		iconArray[i].classList.add('wi-day-rain')
    // 		if (response.data.daily[i].weather[0].description.includes('rain')) {
    //
    // 		}
    // 	}
    // }

    // function showHideIcons (show, hideOne, hideTwo, hideThree) {
    // 	let tempArr = [show, hideOne, hideTwo, hideThree]
    // 	for (var i = 0; i < tempArr.length; i++) {
    // 		tempArr[i].classList.remove('show')
    // 		tempArr[i].classList.remove('hide')
    // 	}
    // 	show.classList.add('show')
    // 	hideOne.classList.add('hide')
    // 	hideTwo.classList.add('hide')
    // 	hideThree.classList.add('hide')
    // }


}()); // iffe function ENDS
