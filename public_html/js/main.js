		$('#trigger_bill').click(function() {
			$('#select_bill').trigger('click');
		});
		$('#select_bill').change(encodeImageFileAsURL(function(base64Img){
			$('.bill_input').val(base64Img.split(',')[1]).end();
			var ext = $('#select_bill').val().substr($('#select_bill').val().lastIndexOf('.') + 1);
			$('.bill_extension').val(ext);
		}));
		$(document).ready(function() {
	    	$('#datePicker')
	        .datepicker({
	            format: 'yyyy-mm-dd'
	        })
	        .on('changeDate', function(e) {
	            $('#registration').formValidation('revalidateField', 'purchase_date');
	        });
		    $('#registration').formValidation({
                        framework: 'bootstrap',
                        icon: {
                            valid: 'glyphicon glyphicon-ok',
                            invalid: 'glyphicon glyphicon-remove',
                            validating: 'glyphicon glyphicon-refresh'
                        },
		        fields: {
		            first_name: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
		            last_name: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
                    email: {
                        validators: {
                    	    notEmpty: {
		                        message: 'Polje je obavezno'
                            }
                        }
                    },
                    select_bill: {
                        validators: {
                    	    notEmpty: {
		                        message: 'Polje je obavezno'
                            },
							file: {
								maxSize: 5 * 1024 * 1024,
								message: 'Maksimalna veličina fajla 4MB'
                        	}
                        }
                    },
		            address: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
		            city: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
                    postal_code: {
                        validators: {
                            notEmpty: {
		                        message: 'Polje je obavezno'
                            	},
                            integer: {
                                message: ' '
                            }
                        }
                    },
                    phone: {
                    	validators: {
                        	notEmpty: {
		                        message: 'Polje je obavezno'
                                },
                            digits: {
                                message: ' '
                            }
                        }
                    },
		            purchase_place: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
		            imei: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    },
                            stringLength: {
                                max: 15,
                                min: 13,
                                message: 'IMEI mora da sadrži 15 karaktera'
                            }
		                }
		            },
				    emailConf: {
		                validators: {
		                    identical: {
		                        field: 'email',
		                        message: 'Email adrese se ne poklapaju'
		                    },
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
		            device: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
		            purchase_date: {
		                validators: {
		                    notEmpty: {
		                        message: 'Polje je obavezno'
		                    }
		                }
		            },
                    terms: {
                        validators: {
                            notEmpty: {
		                        message: ' '
                            }
                        }
                    }
		        }
		    })
			.on('err.field.fv', function (e, data) {
				$('.loader').fadeOut();
			})
        	.on('success.form.fv', function(e) {
				$('.loader').fadeIn('slow', function(){
				e.preventDefault();
				var $form    = $(e.target),
					formData = new FormData(),
					params   = $form.serializeArray();
					$.each(params, function(i, val) {
						formData.append(val.name, val.value);
					});
					$.ajax({
						url: $form.attr('action'),
						data: formData,
						cache: false,
						contentType: false,
						processData: false,
						async: false,
						type:'POST',
						crossDomain: true,
						dataType: 'json',
						success: function(result) {
							$('#registration').data('formValidation').resetForm();
							$('#registration')[0].reset();
							$('.loader').fadeOut();

							$("#thankModal").modal("show");
							console.log(result);
						}
					});
				 });
        	});
		});
