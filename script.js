
var clickCounter = 0;

$.ajax({
    url: "https://fww-demo.herokuapp.com",
    method: "GET",
    dataType: 'json',
    
    success: function(data) {
        var html_to_append = '';
        var users = [];

        $.each(data, function(key, value) {
            let countryName = value.country;
    
        $.each(value.state , function(k , v ){
            
            let stateName = v.name;

            $.each(v.users , function(k, ve ){

                let fullName = ve.fullName;
                let balance =  ve.balance;
                let isActive = ve.isActive ;
                let registered = ve.registered ;

                users.push({ fullName: fullName, balance: balance, activity: isActive, registerDate: registered, state: stateName, country: countryName });
                html_to_append += '<tr>' + '<td id = "fullName">' + fullName + '</td>' + '<td>' + balance + '</td>' + '<td class = "activity" data-activity='+ isActive + '>' + isActive + '</td>' + '<td class = "registered" data-registered = '+ registered +'>' + registered + '</td>' + '<td>' + stateName + '</td>' + '<td>' + countryName + '</td>' + '</tr>';
            
            
            });

        }); 

        });



        $("#items-container").html(html_to_append);

        $('input').keyup(function (){
            filter_function();
        })
        

        $('.filter').change(function(){

            filter_function();
            
          });



        $('table tbody tr').show();

        function filter_function(){

            var getId = $(this).attr('id');
            var toObject = {};

            toObject[getId] = "value";

            var output = '';

            var fullNameFlag = 0;
            var fullNameValue = $('#name_search').val();
            var fullStateFlag = 0;
            var fullStateValue = $('#state_search').val();
            var countryFlag = 0;
            var countryNameValue = $('#country_search').val();
            var isActiveFlag = 0;
            var isActiveValue = $('#is_active').val();
            var balanceFlag = 0;
            var balanceValue = $('#balance').val();
            var registeredFlag = 0;
            var registeredValue = $('#registered').val();


            

            $.each (users, function (key, value) {


                if (fullNameValue == 0) {
                    fullNameFlag = 1;
                } else if (value.fullName.toLowerCase().indexOf(fullNameValue) !== -1) {    
                    fullNameFlag = 1;
                } else {
                    fullNameFlag = 0;
                }

                if (balanceValue == 0) {
                    balanceFlag = 1;
                } else if (value.balance.toLowerCase().indexOf(balanceValue) !== -1) {    
                    balanceFlag = 1;
                } else {
                    balanceFlag = 0;
                }

                if (fullStateValue == 0) {
                    fullStateFlag = 1;
                } else if (value.state.toLowerCase().indexOf(fullStateValue) !== -1) {
                    fullStateFlag = 1;
                } else {
                    fullStateFlag = 0;
                }

                if (countryNameValue == 0) {
                    countryFlag = 1;
                } else if (value.country.toLowerCase().indexOf(countryNameValue) !== -1) {
                    countryFlag = 1;
                } else {
                    countryFlag = 0;
                }

                if(isActiveValue == 0){
                    isActiveFlag = 1;
                } else if (isActiveValue == this.activity.toString()) {
                    isActiveFlag = 1;
                } else{
                    isActiveFlag = 0;
                }
                

                if(registeredValue == 0){
                    registeredFlag = 1;
                } else if(value.registerDate.indexOf(registeredValue) !== -1) {
                    registeredFlag = 1;
                    
                } else{
                    registeredFlag = 0;
                }

               



                if(fullNameFlag && fullStateFlag && countryFlag && isActiveFlag && balanceFlag && registeredFlag ){
                
                    output += '<tr><td>' + value.fullName + '</td>';
                    output += '<td>' + value.balance + '</td>';
                    output += '<td class = "activity" data-activity='+ value.activity + '>' + value.activity + '</td>';
                    output += '<td class = "registered" data-registered = '+ value.registerDate +'>' + value.registerDate + '</td>';
                    output += '<td>' + value.state + '</td>';
                    output += '<td>' + value.country + '</td> </tr>';
                }

            })


            $('#items-container').html(output);
        }



         $('th').click(function(){
            var getId = $(this).attr('id');
            var toObject = {};

            toObject[getId] = "value";

             clickCounter++;

                $("#items-container tr").remove();

                if(clickCounter % 2 !== 0) {
                    users.sort((a, b) => (a[getId] > b[getId]) ? 1 : -1);
                } else {
                    users.sort((a, b) => (a[getId] > b[getId] ? -1 : 1));
            }
            
                var trHTML = '';
                    
                $.each(users, function(i,item) {

                trHTML += '<tr> <td>' + item.fullName + '</td>';
                trHTML += '<td>' + item.balance + '</td>';
                trHTML += '<td>' + item.activity + '</td>';
                trHTML += '<td>' + item.registerDate + '</td>';
                trHTML += '<td>' + item.state + '</td>';
                trHTML += '<td>' + item.country + '</td> </tr>';

                })
                $('#items-container').append(trHTML);
    
            });


        },

    error: function() {
        //console.log(data);
    }
});





