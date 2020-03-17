document
    .querySelector('.main')
    .addEventListener("click", function(){
        document
            .querySelector('.form-group')
            .classList.toggle('hide')
    })


    document
        .querySelector('.menu')
        .addEventListener('click', function(){
            document
            .querySelector('.sidebar')
            .classList.toggle('open')
        })
