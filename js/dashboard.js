google.load("visualization", "1", {
	packages : ["corechart", "treemap"]
});
google.setOnLoadCallback(drawTreemap);
google.setOnLoadCallback(drawColumnChart);
function drawColumnChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'File System');
	data.addColumn('number', 'Excluded (GB)');
	data.addColumn('number', 'In use (GB)');
	data.addColumn('number', 'Available (GB)');
	data.addRows(["local://tmp/si_test_data/test1", 0, 10.3, 3.3], ["local://tmp/si_test_data/test2", 0, 10.3, 3.3]);
	var options = {
		title : 'Storage information',
		backgroundColor : '#e7e8dd',
		legend : {
			position : 'bottom'
		},
		colors : ['#F7D358', '#3EA99F', '#82CAFA'],
		isStacked : true
	};
	var chart = new google.visualization.ColumnChart(document.getElementById('storage_chart'));
	chart.draw(data, options);
}

function drawTreemap() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'FileSystem');
	data.addColumn('string', 'Parent');
	data.addColumn('number', 'Total storage GB (size)');
	data.addColumn('number', 'Status (color)');
	var tree = new google.visualization.TreeMap(document.getElementById('treemap'));
	function mySelectHandler(e) {
		var selection = tree.getSelection();
		st.selection = selection;
		if (st.rows_to_filesystems[st.selection[0].row] != undefined) {
			var querystring = (st.rows_to_filesystems[st.selection[0].row]);
			var url = "/admin/si/storagecrawl/";
			var newlocation = url + "?container=" + querystring;
			window.location = newlocation;
		}
	}


	google.visualization.events.addListener(tree, 'select', mySelectHandler);
	data.addRows(["local://tmp/si_test_data/test2 13.61 GB (Successful Scan)", "localhost", 13.605388288, 3], ["localhost", "all", 27.210776576, 3], ["all", null, 27.210776576, 3]);
	tree.draw(data, {
		maxDepth : 2,
		minColor : r['colors'][0],
		midColor : r['colors'][1],
		maxColor : r['colors'][2],
		headerHeight : 15,
		fontColor : 'black',
		showScale : false
	});

}

var st = {}; 