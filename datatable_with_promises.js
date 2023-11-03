debugger;

searchConfig = (typeof searchConfig === 'undefined') ? {} : searchConfig;

searchConfig.assetTable = {
resource: {/*not used*/},
    resultsContainer: '<table cellspacing="0", border="0", class="table table-striped table-bordered table-condensed dataTable">',
    data: [{
        title: 'Asset Id',
        name: 'Asset Id',
    },{
        title: 'Asset Name',
        name: 'Asset Name',
    }],
    resultsContainerId: 'ci-table',
    before: function(configObj) {},
    error: function(configObj) {},
    complete: function(configObj) {},
    removeOnClick: false,
    renderer: {
        type: DataViewer.Renderers.DataTables, // Passing a function here allows for better customization
        options: {
            // Options for Render
            processSingleResult: false,
            // responsive: OPTIONAL Default for "BridgeDataTable" is true but can be over written.
            responsive: false,
            dom: 'tip',
            /*order: [
               [3, 'asc']
            ],*/
            paging: false,
            scrollY: '60vh',
            scrollCollapse: true,
            select: {
                style: 'single',
                selector: 'td:first-child'
            },
            createdRow: function createdRow(row, data, dataIndex) {},
            deferRender: true,
        }
    }
};

(function() {
  (async function() {
    try {
      let data = await new Promise(function(resolve, reject) {
        K('bridgedResource[SNOW User Assets]').load({
          success: function(response) {
            resolve(response);
          },
          error: function(response) {alert(`There was an error with the ${response.name()} Bridged Resource.`);}
        });
      });

      data = await new Promise(function(resolve, reject) {
        K('bridgedResource[ARS User Assets]').load({
          success: function(response) {
            resolve([...response, ...data]);
          },
          error: function(response) {alert(`There was an error with the ${response.name()} Bridged Resource.`);}
        });
      });

      K('bridgedResource[Helix User Assets]').load({
        success: function(response) {
          let mergedResponse = [...response, ...data];
          searchConfig.assetTable.response = mergedResponse;
          DataViewer.renderResults($(K('section[CI Table Section]').element()), searchConfig.assetTable);
        },
        error: function(response) {alert(`There was an error with the ${response.name()} Bridged Resource.`);}
    });
    } catch (error) {
      alert(`There was an error with one of the Bridged Resources.`);
    }
  })();

})();
