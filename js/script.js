$(document).ready(function(){

    $("#btnData").click(function(){
       
       var n = $("#tbInput").val();
	   var min = $("#tbMin").val();
	   var max = $("#tbMax").val();

       var data = {
					"jsonrpc": "2.0",
					"format": "jsonp",
					"method": "generateIntegers",
					"id": 42,
					"params": {
						"apiKey": "ee2e3598-0f62-43ef-98c2-5aea611edd3d",
						"n": n,
						"min": min,
						"max": max,
						"replacement": true,
					}
				}

		$.ajax({
				method: "POST",
				url: "https://api.random.org/json-rpc/1/invoke",
				data: JSON.stringify(data),
				success: function(data,status){

					var randomArray = data.result.random.data;
					console.log(randomArray);
					var dataPoints = [];
					var counter = {};
					var $increment;

					$.each(randomArray, function(index, value){
					 var $randomNo = value;
						
					 if (!counter.hasOwnProperty(value)) {
					    counter[value] = 1;
					  } else {
					    counter[value]++;
					  }
					 $increment = counter[value]; 

 					dataPoints.push({x:$randomNo, y:$increment}); 
				    });


				        var chart = new CanvasJS.Chart("chartContainer",{
				            title:{
				                text:"Rendering Chart"
				            },
				            data: [{
				            type: "column",
				                dataPoints : dataPoints,
				            }]
				        });
				        chart.render();
				},
				error:function(data,status){
					alert("No data received!");
					console.log(data)
				}
  			});
		});
	
})();

 