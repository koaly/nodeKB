//- Natthapong Somboonphattarakit 5910501950 
$(document).ready(function(){
    $('.delete-article').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/articles/'+id,
            success: function(response){
                alert('กำลังลบบทความ');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});