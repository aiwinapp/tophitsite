			$(form).submit(function(event) {
				event.preventDefault();
				if( $(form).find('input.error').length <= 0 ) {
					




					}
			});

					//var dataSend = $(this).serialize();
					//var action = $(this).attr('action');  // <--- Брать URL из формы
					var action = 'http://rogozhkin.com/bitrix24/addLeadTophit.php';
					var utm_source = '';
					var utm_campaign = '';
					var country = 'Россия';
					
					if(YMaps.location.country) country = YMaps.location.country;

					var thisForm = $(this),
						$form = $(this),
						name = $('input[name="name"]', $form).val(),
						phone = $('input[name="tel"]', $form).val(),
						city = $('input[name="city"]', $form).val(),
						ques = $('textarea[name="message"]', $form).val();
						
						if(ques==undefined) ques = '';
						
						//address = $('input[name="address"]', $form).val(),
						//var count = $(".product_count option:selected",$form).val();
						
						var price = '3380';
						
						//if( count==3 ) price = '4980';
						//else if( count==4 ) price = '5380';
						
						//console.log(count); return;

						//var formname = $('input[name="formname"]').val();						

						var utm_source = App.Func.get_url_param("utm_source");
						if(utm_source==null) utm_source = $.cookie('utm_source');

						var utm_campaign = App.Func.get_url_param("utm_campaign");
						if(utm_campaign==null) utm_campaign = $.cookie('utm_campaign');

						var dataSend =	"name="+name+
										"&phone="+phone+
										"&action=zakaz"+
										"&address="+
										"&city="+city+
										"&ques="+ques+
										"&code=islam"+
										"&price="+price+
										"&product_param2="+utm_source+
										"&utm_campaign="+utm_campaign+
										"&country="+country+
										"&ref=";


					$.ajax({
						type: "POST",
						url: action,
						data: dataSend,
						dataType: "json",
						crossDomain : true,
						beforeSend: function(){

							//Меняем надпись на кнопке при отправке сообщения
							thisForm.find('button').text('Подождите').attr('disabled','true');

						},
						complete: function(){

							thisForm.find('button').text('Отправлено').removeAttr('disabled');
							$('.feed_back_win').modal('hide');
														
							//Обработка целей Yandexa в зависимости от id формы
							//if(form_wrap === '#modal') {yaCounter24894563.reachGoal('bez-kred-callback1');}
						}
					}).done(function(rezult) {
							//Показываем соощение от сервера
							App.Func.load_info_win({'title' : 'Ваша заявка принята', 'desc' : 'В бижайщее время с Вами свяжется менеджер!'});

						})
						.always(function() {
							var yaParams = { price: 3380 };
						    yaCounter29185735.reachGoal('zakaz',yaParams);
						})
						.fail(function() {
							App.Func.load_info_win({'title' : 'Произошла ошибка', 'desc' : 'Повторите отправку позже или позвоните нам по телефону!'});
						});