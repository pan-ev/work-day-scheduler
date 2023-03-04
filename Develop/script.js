// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {

  // Add listener on save buttons to save events to local storage so they can persist
  $('.saveBtn').each(function() {
    $(this).on('click', function () {
      var hrRef = $(this).parent().attr('id');
      var saveSchedulerEvent = $('#'+hrRef).children('textarea').val();
      console.log(hrRef);
      console.log(saveSchedulerEvent);
      localStorage.setItem(hrRef,saveSchedulerEvent);
    }
    );
  })

  // Toggle classes on each time-block for past, present, future, depending on 
  // the current hour
  
  var currentHr = dayjs().hour();
  $('.time-block').each(function() {
    var timeBlockHr = $(this).attr('id').slice(5);
    if (timeBlockHr > currentHr) {
      $(this).toggleClass("future");
    } else if (timeBlockHr < currentHr) {
      $(this).toggleClass("past");
    } else {
      $(this).toggleClass("present");
    }
  });

  // Loop through time-blocks and retrieve Events stored in localStorage and load
  // them to the textarea element

  $('.time-block').each(function() {
    var loadSchedulerEvent = localStorage.getItem($(this).attr('id'));
    console.log(loadSchedulerEvent);
    $(this).children('textarea').text(loadSchedulerEvent);
  })

  // Code to display the current data in the header of the page

  var currentDate = dayjs()
  $('#currentDay').text(currentDate.format('MMM D, YYYY'));
});
