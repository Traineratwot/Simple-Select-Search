# Simple-Select-Search
простой select с поиском

# setup установка
1) Jquery <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
2) мой скрипт в конец документа <script src="SSS.js"></script>

# setting настройка
// интервал на случай процедурной генерации select'тов
setInterval(() => {
// выбирает все select'ы которые еще не проходили
    $('select:not([data-SSScomplete])').each(function(index) {
        SSOarr.push(new SSO(this))
        $(this).attr('data-SSScomplete', '');
    });
}, 1000);
