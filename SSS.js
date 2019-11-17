// массив с обектами класса SSO
var SSOarr = []
class SSO {
	constructor(element) {
		var self = this;
		this.ELEMENT = element;
		this.separator = "<br>";
		// накладиваем новый select на старый
		var $style = {
			'width': $(element).width(),
			'height': $(element).height(),
		};
		if ($(element).attr('multiple')) {
			var val = $(element).val().join(self.separator);
			var $html = '<span class="SSO1">' + val + '</span>';
		} else {
			var $html = '<span class="SSO1">' + $(element).val() + '</span>';
		}
		var Search = $('<div>', {
			class: 'SSOd',
			html: $html
		}).appendTo('body');
		$(Search).offset({
			top: $(element).offset().top,
			left: $(element).offset().left
		});
		$(Search).css($style);
		$(Search).val($(element).val());
		this.Search = Search;
		var ul = $('<ul>', { class: 'SSL' }).appendTo(Search);
		this.ul = ul;
		// запускаем инициализацию событий
		this.seacer();
	}
	seacer() {
			var element = this.ELEMENT;
			var Search = this.Search;
			var ul;
			var self = this;
			var seacer = $(Search).find('.SSO1');
			// при клике очищем зоны поика, разрешаем редактирование, начинаем генерацию списка без фильтра
			$(Search).click(function(eeee) {
					if (eeee.target.tagName == 'SPAN') {
						seacer.attr('contenteditable', 'true').focus();
						seacer.text('');
						ul = self.SearchUL();
						$(ul).fadeIn();
					}
				})
				// при нажатии гененрируем список с фильром из строки поиска ps можно использовать регулярки :)
			$(Search).keyup(function(eeee) {
				if (eeee.target.tagName == 'SPAN') {
					var SearchWord = seacer.text();
					self.SearchWord = SearchWord;
					self.SearchUL(SearchWord);
				}
			});
			// скрваем блок при потере фокуса
			$(Search).focusout(function(eeee) {
				seacer.attr('contenteditable', 'false');
				var $$val = [];
				$(element).find('option:selected').each(function(index, ee) {
					$$val.push($(ee).text())
				})
				seacer.html($$val.join(self.separator));
				$(ul).fadeOut();
				self.SearchWord = '';
			});
		}
		// поискавик
	SearchUL(SearchWord = '') {
		var self = this;
		var SST = new Object();
		var SSV = new Object();
		var result = new Object();
		var ul = this.ul;
		var element = this.ELEMENT;
		var Search = this.Search;
		var seacer = $(Search).find('.SSO1');
		// шаблок регурярки для поиска
		var regexp = new RegExp('(.{0,})(' + SearchWord + ')(.{0,})');
		$(ul).html('');
		// генератор списка
		$(element).find('option,optgroup').each(function(index, e) {
				// искдючение для OPTGROUP
				if ($(e)[0].tagName == 'OPTGROUP') {
					if ($(e).attr('label')) {
						$(ul).append('<li class="SSotg">' + $(e).attr('label') + '</li>');
					}
				} else {
					// сам поиск
					if ($(e).text().search(regexp) !== -1) {
						$(e).attr('data-SSS', index);
						SST[index] = $(e).text();
						SSV[index] = $(e).attr('value');
						if ($(e).prop('selected') === true) {
							$(ul).append('<li data-SSS="' + index + '" class="SSS SSS-selected">' + $(e).text() + '</li>');
						} else {
							$(ul).append('<li data-SSS="' + index + '" class="SSS">' + $(e).text() + '</li>');
						}
					}
				}
			})
			// инициализатор события для выбора значения из списка
		$(ul).find('li').click(function(eeee) {
			seacer.attr('contenteditable', 'false').focus();
			$(ul).fadeOut();
			var index = $(eeee.target).attr('data-SSS');
			var option = $(element).find('option[data-SSS=' + index + ']');
			// console.log(option);
			if (option.prop('selected') === false) {
				option.prop('selected', true);
			} else {
				option.prop('selected', false);
			}
			var $$val = [];
			$(element).find('option:selected').each(function(index, ee) {
				$$val.push($(ee).text());
			})
			seacer.html($$val.join(self.separator));
		});
		return ul;
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