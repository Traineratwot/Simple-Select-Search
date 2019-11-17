// массив с обектами класса SSO
var SSOarr = [] 
class SSO {
    constructor(element) {
        this.ELEMENT = element
        // накладиваем новый select на старый
        var $style = {
            'width': $(element).width(),
            'height': $(element).height(),
        }
        var Search = $('<div>', {
            class: 'SSOd',
            html: '<span class="SSO1">' + $(element).val() + '</span>'
        }).appendTo('body')
        $(Search).offset({
            top: $(element).offset().top,
            left: $(element).offset().left
        })
        $(Search).css($style);
        $(Search).val($(element).val());
        this.Search = Search;
        var ul = $('<ul>', { class: 'SSL' }).appendTo(Search);
        this.ul = ul
        // запускаем инициализацию событий
        this.seacer()
    }
    seacer() {
        var e = this.ELEMENT
        var Search = this.Search
        var ul
        var self = this
        var seacer = $(Search).find('.SSO1')

        // при клике очищем зоны поика, разрешаем редактирование, начинаем генерацию списка без фильтра
        $(Search).click(function(eeee) {
            if (eeee.target.tagName == 'SPAN') {
                seacer.attr('contenteditable', 'true').focus()
				seacer.text('')
                ul = self.SearchUL()
                $(ul).fadeIn();
            }
        })
        // при нажатии гененрируем список с фильром из строки поиска ps можно использовать регулярки :)
        $(Search).keyup(function(eeee) {
            if (eeee.target.tagName == 'SPAN') {
                var SearchWord = seacer.text()
                self.SearchWord = SearchWord
                self.SearchUL(SearchWord)
            }
        })
        // скрваем блок при потере фокуса
        $(Search).focusout(function(eeee) {
            seacer.attr('contenteditable', 'false')
            seacer.text($(e).find('option:selected').text())
            $(ul).fadeOut();
            self.SearchWord = ''
        });
    }
    // поискавик
    SearchUL(SearchWord='') {
        var SST = new Object()
        var SSV = new Object()
        var result = new Object();
		var ul = this.ul
		var element = this.ELEMENT
		var Search = this.Search
        var seacer = $(Search).find('.SSO1')
        // шаблок регурярки для поиска
        var regexp = new RegExp('(.{0,})(' + SearchWord + ')(.{0,})');
		$(ul).html('')
        // генератор списка
        $(element).find('option,optgroup').each(function(index, e) {
            // искдючение для OPTGROUP
            if ($(e)[0].tagName == 'OPTGROUP') {
                if ($(e).attr('label')) {
                    $(ul).append('<li class="SSotg">' + $(e).attr('label') + '</li>')
                }
            } else {
                // сам поиск
                if ($(e).text().search(regexp) !== -1) {
                    $(e).attr('data-SSS', index);
                    SST[index] = $(e).text()
                    SSV[index] = $(e).attr('value')
                    $(ul).append('<li data-SSS="' + index + '" class="SSS">' + $(e).text() + '</li>')
                }
            }
        })
        // инициализатор события для выбора значения из списка
        $(ul).find('li').click(function(eeee) {

            seacer.attr('contenteditable', 'false').focus()
            $(ul).fadeOut();
            var index = $(eeee.target).attr('data-SSS')
            var option = $(element).find('option[data-SSS=' + index + ']')
                // console.log(option);
            option.prop('selected', true)
            option.attr("selected", "selected")
            seacer.text(option.text())

		});
		return ul
    }

}
// интервал на случай процедурной генерации select'тов
setInterval(() => {
// выбирает все select'ы которые еще не проходили
    $('select:not([data-SSScomplete])').each(function(index) {
        SSOarr.push(new SSO(this))
        $(this).attr('data-SSScomplete', '');
    });
}, 1000);
