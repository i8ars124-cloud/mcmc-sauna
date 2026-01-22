$(function () {
    // --- タブ切り替え機能 ---
    $('.tab-content').removeClass('active');
    $('#weekday-price').addClass('active');

    $('.tab-button').on('click', function () {
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
        const targetId = $(this).data('tab');
        $('.tab-content').removeClass('active');
        $('#' + targetId).addClass('active');
    });
    
});