$.validator.addMethod("lengthphone", function(value, element) {
  return value.replace(/\D+/g, '').length == 12;
});

$(function() {
  $("input[name='name']").inputmask({greedy: false, regex: '[a-zA-Zа-яА-ЯёЁ -]+'});
  $("input[name='phone']").inputmask("+38(999)9999999");

  function formValidate(field){
    field.closest('form').validate({
      rules: {
        name: {
          required: true,
          minlength: 4,
          maxlength: 32
        },
        phone: {
          required: true,
          lengthphone: 12
        },
        comment: {
          rangelength: [20, 256]
        },
        email: {
          email: true
        }
      },
      highlight: function(element, errorClass, validClass) {
        $(element).addClass("is-invalid").removeClass("is-valid");
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).addClass("is-valid").removeClass("is-invalid");
        $(element).parent(".form-group").removeClass("has-error");
      },
      tooltip_options: {
            name: { placement: 'top' },
            phone:{ placement: 'top' },
            email:{ placement: 'top' },
            comment:{ placement: 'top' }
          },
      validClass: "valid-tooltip",
      errorClass: "invalid-tooltip",
      errorElement: "div",
      messages: {
        name: {
          required: "Это поле обязательно для заполнения",
          minlength: "Имя должно содержать минимум 4 символа",
          maxlength: "Максимальное число символов - 32"
        },
        phone: {
          required: "Это поле обязательно для заполнения",
          lengthphone: "Проверте правильность ввода номера телефона"
        },
        comment: {
          required: "Вы не можете отправить пустое сообщение",
          rangelength: "Сообщение должно содержать от {0} до {1} символов!"
        }
      }
    });
  }

  $(':input').inputmask({
    'oncomplete': function() {
      formValidate($(this));
    },

    'onincomplete': function() {
      formValidate($(this));
    }
  });


  $('form').submit(function(e) {
    e.preventDefault();
    var self = $(this);
    var href = "./form.php";
    var post_data = getFormData(self);

    function getFormData($form) {
      var unindexed_array = $form.serializeArray();
      var indexed_array = {};

      $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
      });

      return indexed_array;
    }
    if(!self.find(".is-invalid").length){
      $.ajax({
        type: "POST",
        url: href,
        dataType: 'text',
        data: post_data,
        beforeSend: function(data) {
          // Loader
        },
        success: function(data) {
          // clean form
          // modalSuccess
        },
        error: function(response, textStatus) {
          // modalError
        }
      });
    }
  });
});
