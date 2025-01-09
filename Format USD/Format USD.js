/*
 Page Load Event
*/

formatUSD = function(value) {
    // Remove any non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    
    // Convert to number and format with 2 decimal places
    const amount = Number(cleanValue);
    
    // Return formatted string with $ symbol and commas
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }


/*
 Field onChange Event
*/

// Set the value to value formatted for dollars using the 'formatUSD' function.
element.value(formatUSD(element.value()));