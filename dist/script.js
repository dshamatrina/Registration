$(document).ready(function(){

    let $tooltip = $('.form_tip').children('.form_tooltip').clone();
    let msgErrorMinor = "You must be at least 18 years old";
    let today = new Date();
    let adult = today.getFullYear() - 18;

    $.fn.makeValid = function() {
        let $currentLine = $(this).closest('.form_line');
        $currentLine.removeClass('form_field__invalid');
        $currentLine.find('.form_tooltip').remove();
    }

    $.fn.makeInvalid = function() {
        let $currentLine = $(this).closest('.form_line');
        $currentLine.addClass('form_field__invalid');
        $tooltip.clone().appendTo($currentLine).addClass('form_tooltip__error');
    }


    $.fn.validate = function() {
        $.fn.validateEmail = function() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test($(this).val());
        }

        let msgErrorEmail = "Please include an '@' in the email address";
        let msgErrorEmpty = "This field can't be empty";
        let msgErrorEmailFormat = "Please enter your email address in the format someone@example.com";
        let input = $(this).val();
        let $isEmail = $(this).is($('.form_field[type="email"]'));
        let $isValid = $(this).validateEmail();
        let $isYear = $(this).is($('.form_select'));

        if ($isYear) {

            if ($('.form_select').text() > adult) {
                $(this).makeInvalid();
                $(this).closest('.form_line').find('.form_tooltip-text').text(msgErrorMinor);
            };

        } else {

            if ((input == '') || ($isEmail && !($isValid))) { 
                $(this).makeInvalid();
                $(this).closest('.form_line').find('.form_tooltip-text').text(msgErrorEmpty);

                if ((input !== '') && $isEmail) {
                    let $msgTooltip = $(this).closest('.form_line').find('.form_tooltip-text');

                    if ((input.indexOf("@")) == -1) {
                        $msgTooltip.text(msgErrorEmail);
                    } else $msgTooltip.text(msgErrorEmailFormat);
                };
            };
        };
    };

    $('.form_select').on('click', function() {
        $('.form_dropdown').toggleClass('form_dropdown__active');

        $('.form_option').on('click', function(event){
            let $target = $(event.target);
            let chosen = $target.text();
            $('.form_option').removeClass('form_option__selected');
            $(this).makeValid();
            $target.addClass('form_option__selected');
            $('.form_select').text(chosen);
            $('.form_select').validate();
        });
    });

    $(window).click(function(event){

        if (!($(event.target).is('._showDropdown'))) {
            $('.form_dropdown').removeClass('form_dropdown__active');
        };
    });

    $('.form_checkbox').on('click', function() {
        $('.form_checkbox').removeClass('form_checkbox__active');
        $(this).find('.form_checkbox-hidden').prop("checked", true).closest('.form_checkbox')
        .toggleClass('form_checkbox__active');
    });

    $('.form_field').on('blur', function() {
        $(this).validate();
    });

    $('.form_field').on('focus', function() {
        $(this).makeValid();
    });

    $('.form_button').on('click', function() {
        $('.form_line').children('.form_tooltip').remove();
        $('.form_select').validate();
        $('.form_field:invalid').validate();

        if (!($('.form_select').closest('.form_line').hasClass('form_field__invalid')))
            console.log('Form is valid!');

        return false;
    });
});