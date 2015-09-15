App = {

	//
	// Запуск функций
	// --------------------------------------------------
	Init : function() {
		$(document).ready(function() {
			
			//App.Func.country_ya_detect();
			
			//Таймер
			App.Func.timer();	

			//Дата над формой
			App.Func.share_to();

			//animate
			//App.Func.animate();

			//анимация блоков "почему мы?"
			//App.Func.animate_why();
			
			//Прилипающее меню
			//App.Func.menu();
			
			//Смена количества
			//App.Func.change_product();
			
			//Активация пунктов меню
			//sApp.Func.scrollspynav();

			//Плавная прокрутка
			//App.Func.smoothscroll();

			//Открытие формы заявки
			//App.Func.open_feedback();
			
			// В галерее
			//App.Func.open_feedback_gallery();
			
			//Добавляем правило валидации
			App.Func.validExtend();

			//Инициализируем валидацию
			App.Func.formValid();

			//Отправляем лид в аналитикс
			//App.Func.addLeadAnalytics();

			//Отправка форм
			//var feedback_modal = new App.Func.feedback_send('#form-modal');
			//var feedback1 = new App.Func.feedback_send('#feedback1');

			//Fancybox
			App.Func.fancy();

			//Определяем город
			App.Func.city_ya_detect();

		})
	},



	//
	// Константы
	// --------------------------------------------------
	Const : {
		MODAL : {
			quest : {
				title : "Задать вопрос",
				desc : "Заполните форму, и мы с вами обязательно свяжемся"
			},
			order : {
				title : "Оставить заявку",
				desc : "Заполните форму, и мы с вам перезвоним в ближайшее время."
			},
			feedcall : {
				title : "заказать звонок",
				desc : "Заполните форму, и мы с вам перезвоним в ближайшее время."
			}
		}
	},



	//
	// Все функций
	// --------------------------------------------------
	Func : {


		//
		// Таймер
		// --------------------------------------------------
		timer : function() {

			//Получаем текущую дату
			var time_real = new Date;

			//Считаем время отсчета
			var time_future = time_real.getHours()+3;
				time_future = time_real.setHours(time_future);

			//Запускаем таймер
			var timerId =
				countdown(
					time_future,
					function(ts) {

						var hours = App.Func.timerNorm(ts.hours);
						var minutes = App.Func.timerNorm(ts.minutes);
						var seconds = App.Func.timerNorm(ts.seconds);
						
						if( hours.match(/0\-/) ) hours = hours.replace(/0\-/, '');
						
						$('#hours').text(hours);
						$('#minutes').text(minutes);
						$('#seconds').text(seconds);

						$('#tophead-LI_6').text(hours);
						$('#tophead-LI_7').text(minutes);
						$('#tophead-LI_8').text(seconds);

					}, countdown.HOURS|countdown.MINUTES|countdown.SECONDS);
		},



		//
		// Нормализация значений таймера
		// --------------------------------------------------
		timerNorm : function(num) {

			return  num<10 ? '0'+num : num;

		},



		//
		// Определяем дату завтрашнего дня
		// --------------------------------------------------
		share_to : function() {

			var qwmonth = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря' ];

			//Получаем дату
			var time_real = new Date;

			//Получаем завтранюю дату
			var time_future = new Date(time_real.getFullYear(), time_real.getMonth(), time_real.getDate()+1);

			//Устанавливаем
			$('.share_to').text(time_future.getDate() + ' ' + qwmonth[time_future.getMonth()]);

		},



		//
		// Анимация 
		// --------------------------------------------------
		animate : function() {

			/* Mobile & Animation */
			var Android = navigator.userAgent.search(/Android/i);
			var iPhone = navigator.userAgent.search(/iPhone/i);
			var iPad = navigator.userAgent.search(/iPad/i); 

			if(Android != -1 || iPhone != -1 || iPad != -1) { 
				// Если смарфон
				$(window).resize(function(event) {
					$('html').css('width', window.innerWidth + 'px'); 
				});
				
				
			} else { 
				// Если десктоп
				$(".scroll").each(function() {
					var block = $(this);
					$(window).scroll(function() {
						var top = block.offset().top;
						var bottom = block.height() + top;
						top = top - $(window).height();
						var scroll_top = $(this).scrollTop();
						if ((scroll_top > top) && (scroll_top < bottom)) {
							if (!block.hasClass("animated")) {
								block.addClass("animated");
								block.trigger('animateIn');
							}
						} else {
								block.removeClass("animated");
								block.trigger('animateOut');
						}
					});
				}); 
			}
		},



		//
		// Анимация блоков почему мы
		// --------------------------------------------------
		animate_why : function() {
			$(".steps em").each(function() {
				$(this).attr("data-number", parseInt($(this).text()));
			});
			$(".steps").on("animateIn", function() {
				var inter = 1;
				$(this).find("em").each(function() {
					var count = parseInt(	$(this).attr("data-number")), 
											block = $(this), 
											timeout = null, 
											step = 1; 
											timeout = setInterval(function() {
												if (step == 25) {
													block.text(count.toString());clearInterval(timeout);
												} else {
													block.text((Math.floor(count*step/25)).toString());
													step++;
												}
											}, 60);
										});
			}).on('animateOut', function() {
				$(this).find('.anim').each(function() {
					$(this).css('opacity', 0.01);
					$(this).css({
						'-webkit-transform': 'scale(0.7, 0.7)', 
						'-moz-transform': 'scale(0.7, 0.7)'});
				});
			});	
		},



		//
		// Прилипание главного меню
		// --------------------------------------------------
		menu : function() {
			var nav = $('.navbar');

			// Прилипание
			function newWinSize() {
				var navheight = nav.height();
				$('body').css('padding-top', navheight+'px');
			}

			$(window).resize(function(event) {
				newWinSize();
			});

			newWinSize();	

			// Скрываем popup при клике в мобильной версии	
			$('.navbar-collapse').click(function(event) {
				$(this).removeClass('in');
			});




		},



		//
		// Активация пунктов меню при прохождении соответствующего блока
		// --------------------------------------------------
		scrollspynav : function() {
			$('body').scrollspy({ 
				target: '.navbar-theme',
				offset: 65
			});
		},




		//
		// Плавная прокрутка
		// --------------------------------------------------
		smoothscroll : function() {
			$('.navbar-theme a').smoothScroll({
				speed: 1000,
				offset: -61,
			});
		},



		//
		// Открытие формы обратной связи
		// --------------------------------------------------
		open_feedback : function() {
			$('.open-feedback').click(function(){
				var product = '';
				var alkursi = $(this).data("tovar");

				if( alkursi==undefined ) { 
					var alkursi = '';				
					var product = $(this).parent().parent().find('h3:first').text();			
				}

				var type = $(this).data('type');
				$('.feed_back_win').find('h3').text(App.Const.MODAL[type].title);
				$('.feed_back_win').find('.desc').text(App.Const.MODAL[type].desc);
				$('.feed_back_win').find('textarea.form-control').val(product+alkursi);

				$('.feed_back_win').modal('show');

				return false;
			});

			$('#close').click(function() {
				$('.feed_back_win').modal('hide');
			});
		},


		//
		// Заказ по кнопке в галерее
		// --------------------------------------------------
		open_feedback_gallery : function() {
			var product = '';
			var alkursi = $(this).data("tovar");

			if( alkursi==undefined ) { 
				var alkursi = '';				
				var product = $(this).parent().parent().find('h3:first').text();			
			}			
	
				var type = 'order';
				//$('.feed_back_win').find('h3').text(App.Const.MODAL[type].title);
				//$('.feed_back_win').find('.desc').text(App.Const.MODAL[type].desc);
				//$('.feed_back_win').find('textarea.form-control').val(product+alkursi);

				$('.feed_back_win').modal('show');

				return false;

			$('#close').click(function() {
				$('.feed_back_win').modal('hide');
			});
		},




		//
		// Открытие формы обратной связи
		// --------------------------------------------------
		change_product : function() {
			$('.product_count').change(function(){
				var count = $(".product_count option:selected").val();

				if(count==3) 
					$(".zakaz").html("4590 руб. <s>6690 руб</s>.");
				else if(count==4)
					$(".zakaz").html("4990 руб. <s>7990 руб</s>.");
				else $(".zakaz").html("2990 руб. <s>4990 руб</s>."); 
				
				return false;
			});
		},



		//
		// Уведомление об успешной отправке
		// --------------------------------------------------
		load_info_win : function(rezult) {

			$('.info_win').find('h3').text(rezult['title']);
			$('.info_win').find('p').text(rezult['desc']);

			$('.info_win').modal('show');
			$('.info_win').on('click', '#close', function(){
				$('.info_win').modal('hide');
			});			
		},



		//
		// Добавляем правило валидации
		// --------------------------------------------------
		validExtend : function() {
			jQuery.validator.addMethod("phone", function(value, element) {
				return this.optional(element) || /^.+$/.test(value) 
				},	"Только цифры и пробелы");
		},



		//
		// Валидация форм
		// --------------------------------------------------
		formValid : function() {
			//$('#form-modal').validate(App.Func.validParam);
			
			$('#feedback1').validate(App.Func.validParam);
			$('#feedback2').validate(App.Func.validParam);
			$('#feedback3').validate(App.Func.validParam);
			$('#feedback4').validate(App.Func.validParam);
			$('#feedback5').validate(App.Func.validParam);
			$('#feedback6').validate(App.Func.validParam);
			$('#feedback7').validate(App.Func.validParam);
			$('#feedback8').validate(App.Func.validParam);
			$('#feedback9').validate(App.Func.validParam);
			$('#feedback10').validate(App.Func.validParam);
			$('#feedback11').validate(App.Func.validParam);
			$('#feedback12').validate(App.Func.validParam);
			$('#feedback13').validate(App.Func.validParam);
			$('#feedback14').validate(App.Func.validParam);
		},	// <--- Close: Валидация форм



		//
		// Параметры валидации
		// --------------------------------------------------
		validParam : {
				rules: {
					tel: {
						required: true,
						minlength: 10,
						phone: true
					}
				},
				messages: {
					tel: {
						required: 'Укажите ваш мобильный телефон.',
						minlength: 'Номер слишком короткий.'
					}
				},
				errorElement : 'div',
				errorClass : 'error red'
		},	// <--- Close: Параметры валидации



		//
		// Получаем URL
		// --------------------------------------------------
		get_url_param : function(name) {
			//Код получени UTM
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
		},
		
		addLeadAnalytics : function(product) {
/*
			ga('ec:addProduct', {
			    'id': product.id,
			    'name': product.name,
			    'category': product.category,
			    'brand': product.brand,
				'variant': product.variant,
				'price': product.price,
				'quantity': product.qty
			});
			ga('set', '&cu', 'RUB');
			ga('ec:setAction', 'purchase', {
				'id': product.dealid,
				'tax': '',
				'shipping': '400',
			});
*/
		},


		//
		// Отправка формы обратной связи
		// --------------------------------------------------
		feedback_send : function(form) {

			//$(form).submit(function(event) {
			//	event.preventDefault();
				//if( $(form).find('input.error').length <= 0 ) { }
			//});

		},	// <--- Close: Отправка формы обратной связи



		//
		// Галерея на fancybox
		// --------------------------------------------------
		fancy : function() {
			
			$(".various").fancybox({
				fitToView	: true,
				width		: '90%',
				height		: '90%',
				autoSize	: true,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none'
			});
			
/*
			$(".fancybox").fancybox({
				openEffect : 'none',
				closeEffect : 'none',
				speedIn : 100,
				speedOut : 100,
				margin: 70,
				titleFormat: formatTitle,
				tpl: {
					image : '<div style="background-color:#000"><img class="fancybox-image" src="{href}" alt="" /><center><button onclick="App.Func.open_feedback_gallery();" class="open-feedback-gallery btn btn-theme btn-block" data-type="quest" type="submit" style="font-size: 21px;margin:10px">Заказать эти часы!</button></center></div>',
				},
				
				helpers : {
					title : {
						type : 'outside'
					},
					overlay: {
						locked: false
					},
					thumbs	: {
						width	: 50,
						height	: 50
					}
				}
			});	
*/
			
			function formatTitle(title, currentArray, currentIndex, currentOpts) {
			    return '<input type="text"><div id="tip7-title"><span><a href="javascript:;" onclick="$.fancybox.close();"><img src="/data/closelabel.gif" /></a></span>' + (title && title.length ? '<b>' + title + '</b>' : '' ) + 'Image ' + (currentIndex + 1) + ' of ' + currentArray.length + '</div>';
			}
			
		},	// <--- Close: Галерея на fancybox



		//
		// Определение города
		// --------------------------------------------------
		city_ya_detect : function() {

			var utm_source = App.Func.get_url_param("utm_source");
			if(utm_source) $.cookie('utm_source', utm_source, { expires: 365, path: '/' });

			var utm_campaign = App.Func.get_url_param("utm_campaign");
			if(utm_campaign) $.cookie('utm_campaign', utm_campaign, utm_source, { expires: 365, path: '/' });

			var utm_content = App.Func.get_url_param("utm_content");
			if( utm_content ) $.cookie('utm_content', utm_content, utm_source, { expires: 365, path: '/' });

			var utm_term = App.Func.get_url_param("utm_term");
			if( utm_term ) $.cookie('utm_term', utm_term, utm_source, { expires: 365, path: '/' });

		},	// <--- Close: Определение города



		//
		// Определение города
		// --------------------------------------------------
		country_ya_detect : function() {

			return;
		}	// <--- Close: Определение города
	} // <--- Close: Func object
} // <--- Close: App object 

App.Init();