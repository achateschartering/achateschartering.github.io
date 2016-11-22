angular
  .module('app',['flexcalendar', 'pascalprecht.translate'])
  .controller('MainController', ['$scope', '$http', '$interval', '$window', function($scope, $http, $interval, $window) {

    $scope.show_book_btn = false;
    var now = new Date();
    var minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    var maxDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());

    $scope.options = {
      defaultDate: now,
      minDate: minDate,
      maxDate: maxDate,
      dayNamesLength: 1, // 1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names. Default is 1.
      mondayIsFirstDay: true,//set monday as first day of week. Default is false

      eventClick: function(date) {
      },
      dateClick: function(date) {
        $scope.bookDate = date.day + '/' + date._month + '/' + date.year;
        if(date._month < 10){
          var monthForm = '0' + date._month;
        }else{
          var monthForm = date._month;
        }

        if(date.day < 10){
          var dayForm = '0' + date.day;
        }else{
          var dayForm = date.day;
        }
        $scope.book_btn_href = "https://docs.google.com/forms/d/e/1FAIpQLSf8qVlO3RmcDCp-Zwew5iCm8GkAZf2f6tjGo-ow4BHlY_a82w/viewform?entry.789089950=" + date.year + "-" + monthForm + "-" + dayForm;
        $scope.show_book_btn = true;
      },
      changeMonth: function(month, year) {
      }
    };

    $scope.book = function(bookDate){
      $window.open($scope.book_btn_href, "_blank");
    };

    var updateCalendar = function(){
      $http.jsonp(
        'https://script.google.com/macros/s/AKfycbz6p_PJVAY-8gH1RfsKI-edn0lUDejiTDkc9rj-saOYwShx4Cdq/exec?'
        + 'minDate=' + minDate.getTime()
        + '&maxDate=' + maxDate.getTime()
        + '&callback=JSON_CALLBACK')
      .success(function(disabledDates) {
        $scope.options.disabledDates = disabledDates;
      });
    };

    updateCalendar();
    $interval(function() {
      updateCalendar();
    }, 10000);

  }])
