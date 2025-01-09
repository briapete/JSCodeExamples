*/
This example iterates through an array of data to execute another bridge Reqeust for each array. 
The results are appended to an array and displayed in a table.
*/

// Initialize response array
searchConfig.calendarEventsTableConfig.response = [];

// Call Bridged Resource to retrieve Schedules with the same Opportunity
K('bridgedResource[Related Schedules]').load({
  values: {'Opportunity Id': K('field[Opportunity Id]').value()},
  success: function(opportunities) {
    // Track API call completion
    let callsComplete = 0;
    for (let i = 0; i < opportunities.length; i++) {
      // Load Calendar Events for each Schedule
      K('bridgedResource[Calendar Events]').load({
        values: {"Schedule Id": opportunities[i]['Schedule Id']},
        success: function(events) {
          callsComplete++;
          // Filter out the current event
          let filteredEvents = events.filter(function(event) {
            return event['Event Id'] != K('field[Event Id]').value();
          });
          // Append filtered events to the response array
          searchConfig.calendarEventsTableConfig.response.push(...filteredEvents);
          // Render results when all API calls are complete
          if (callsComplete === opportunities.length) {
            DataViewer.renderResults($(K('content[Calendar Events Table Container]').element()), searchConfig.calendarEventsTableConfig);
          }
        }
      })
    }
  }
})
