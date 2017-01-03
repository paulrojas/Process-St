// Code goes here

angular.module("myApp", [])
  .component("wistiaUploader",{
      templateUrl: "upload.template.html",
      controller: function(){
        $(function () {
            'use strict';
            var api_password = "6ed3a77b8aafa79278d1ca8527a73222271b41c92174ddd536db7da034c8d665";
            var requestData = jQuery.param({
              api_password: api_password,
            });

            var url = 'https://upload.wistia.com?access_token=' + api_password;
            $('#fileupload').fileupload({
                url: url,
                dataType: 'iframe',
                postMessage: false,
                data: requestData,
                done: function (e, data) {
                    $.each(data.result.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo('#files');
                    });
                },
                fail: function(e, data) {
                  $('<p/>').text("An error has occurred.").appendTo('#files');
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
                        'width',
                        progress + '%'
                    );
                }
            }).prop('disabled', !$.support.fileInput)
                .parent().addClass($.support.fileInput ? undefined : 'disabled');
        });
      }
  });