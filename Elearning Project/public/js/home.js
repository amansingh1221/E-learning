$(document).ready(function(){
    $('#menuj').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar1').toggleClass('nav-toggle');
    });

    // LOGIN
    $('#login').click(function(){
        $('.login-form').addClass('popup');
    });
    $('.login-form form .fa-times').click(function(){
        $('.login-form').removeClass('popup');
    });


    // REGISTRATION
    $('.registration-form form .fa-times').click(function(){
        $('.registration-form').removeClass('popup');
    });

    // Change Password
    $('.change-password form .fa-times').click(function(){
        $('.change-password').removeClass('popup');
    });
    $('#login').click(function(){
        $('.login-form').addClass('popup');
    });
    $('.login-form form .fa-times').click(function(){
        $('.login-form').removeClass('popup');
    });



   




    $(window).on('load scroll',function(){
        $('#menuj').removeClass('fa-times');
        $('.navbar1').removeClass('nav-toggle');
        $('.login-form').removeClass('popup');
        $('.registration-form').removeClass('popup');
    });

    

});
function somefunction1() {
    $('.login-form').removeClass('popup');
    $('.registration-form').addClass('popup');
}
function somefunction2() {
    $('.login-form').removeClass('popup');
    $('.change-password').addClass('popup');
}
function somefunction3() {
    $('.registration-form').addClass('popup');
}
function validate() {
    var num = document.contact.value;
    if (isNaN(num)) {
        document.getElementById("numloc").innerHTML = "Enter Numeric value only";
        return false;
    } else {
        return true;
    }
}