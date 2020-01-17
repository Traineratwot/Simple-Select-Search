// массив с обектами класса SSO
var SSOarr = []
class SSO {
    constructor(ELEMENT) {
        var SELF = this;
        this.ELEMENT = ELEMENT;
        this.separator = "<br>";
        // накладиваем новый select на старый
        var $style = {
            width: $(ELEMENT).width(),
            height: $(ELEMENT).height(),
            position:'absolute',
        };
        if ($(ELEMENT).attr('multiple')) {
            var val = $(ELEMENT).val().join(SELF.separator);
            var $html = '<span class="SSO1">' + val + '</span>';
        } else {
            var $html = '<span class="SSO1">' + $(ELEMENT).val() + '</span>';
        }
        var MAINSPAN = $('<div>', {
            class: 'SSOd',
            html: $html
        }).appendTo('body');

        $(MAINSPAN).css($style);
        $(MAINSPAN).offset({
            top: $(ELEMENT).offset().top,
            left: $(ELEMENT).offset().left
        });
        $(MAINSPAN).val($(ELEMENT).val());
        var PANEL = $('<div>', {
            css: { 'width': $(ELEMENT).width() },
            class: 'SSL'
        }).appendTo(MAINSPAN);
        var SEARCHSPAN = $('<span>', {
            class: 'SSS_input',
        }).appendTo(PANEL);
        SEARCHSPAN.attr('contenteditable', '')

        var UL = $('<ul>').appendTo(PANEL);

        this.SEARCHSPAN = SEARCHSPAN;
        this.MAINSPAN = MAINSPAN;
        this.PANEL = PANEL;
        this.UL = UL;
        // запускаем инициализацию событий
        this.seacer();
    }
    seacer() {
            var ELEMENT = this.ELEMENT;
            var MAINSPAN = this.MAINSPAN;
            var PANEL = this.PANEL;
            var SEARCHSPAN = this.SEARCHSPAN;
            var UL;
            var SELF = this;
            var MAINSPAN = $(MAINSPAN).find('.SSO1');
            // при клике очищем зоны поика, разрешаем редактирование, начинаем генерацию списка без фильтра
            $(MAINSPAN).click(function(eeee) {
                    if (eeee.target.tagName == 'SPAN') {
                        UL = SELF.SearchUL();
                        $(PANEL).fadeIn();
                        $(SEARCHSPAN).focus();
                    }
                })
                // при нажатии гененрируем список с фильром из строки поиска ps можно использовать регулярки :)
            $(SEARCHSPAN).keyup(function(eeee) {
                if (eeee.target.tagName == 'SPAN') {
                    var SearchWord = SEARCHSPAN.text();
                    SELF.SearchUL(SearchWord);
                }
            });
            // скрваем блок при потере фокуса
            $(PANEL).focusout(function(eeee) {
                MAINSPAN.attr('contenteditable', 'false');
                var $$val = [];
                $(ELEMENT).find('option:selected').each(function(index, ee) {
                    $$val.push($(ee).text())
                })
                MAINSPAN.html($$val.join(SELF.separator));
                $(PANEL).fadeOut();
            });
        }
        // поискавик
    SearchUL(SearchWord = '') {
        var MAINSPAN = this.MAINSPAN;
        var SEARCHSPAN = this.SEARCHSPAN;
        var UL = this.UL;
        var SELF = this;
        var SST = new Object();
        var SSV = new Object();
        var result = new Object();

        var ELEMENT = this.ELEMENT;
        var MAINSPAN = $(MAINSPAN).find('.SSO1');
        // шаблок регурярки для поиска
        var regexp = new RegExp('(.{0,})(' + SearchWord + ')(.{0,})');
        $(UL).html('');
        // генератор списка
        $(ELEMENT).find('option,optgroup').each(function(index, e) {
                // искдючение для OPTGROUP
                if ($(e)[0].tagName == 'OPTGROUP') {
                    if ($(e).attr('label')) {
                        $(UL).append('<li class="SSotg">' + $(e).attr('label') + '</li>');
                    }
                } else {
                    // сам поиск
                    if ($(e).text().search(regexp) !== -1) {
                        $(e).attr('data-SSS', index);
                        SST[index] = $(e).text();
                        SSV[index] = $(e).attr('value');
                        if ($(e).prop('selected') === true) {
                            $(UL).append('<li data-SSS="' + index + '" class="SSS SSS-selected">' + $(e).text() + '</li><hr>');
                        } else {
                            $(UL).append('<li data-SSS="' + index + '" class="SSS">' + $(e).text() + '</li><hr>');
                        }
                    }
                }
            })
            // инициализатор события для выбора значения из списка
        $(UL).find('li').click(function(eeee) {
            var index = $(eeee.target).attr('data-SSS');
            var option = $(ELEMENT).find('option[data-SSS=' + index + ']');
            $(SEARCHSPAN).focus();
            // console.log(option);
            if (option.prop('selected') === false) {
                option.prop('selected', true);
            } else {
                option.prop('selected', false);
            }
            var $$val = [];
            $(ELEMENT).find('option:selected').each(function(index, ee) {
                $$val.push($(ee).text());
            })
            MAINSPAN.html($$val.join(SELF.separator));
            $(ELEMENT).trigger("change");
        });
        return UL;
    }
}
SSSstart();
// интервал на случай процедурной генерации select'тов
setInterval(() => {
    SSSstart();
}, 100);

function SSSstart() {
    // выбирает все select'ы которые еще не проходили
    $('select:not([data-SSScomplete])').each(function(index) {
        SSOarr.push(new SSO(this));
        $(this).attr('data-SSScomplete', '');
    });
}