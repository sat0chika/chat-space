$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main_chat__message-list__all">
          <div class="main_chat__message-list__all__name-date">
            <div class="main_chat__message-list__all__name-date__name">
              ${message.user_name}
            </div>
            <div class="main_chat__message-list__all__name-date__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat__message-list__all__message">
            <p class="main_chat__message-list__all__message">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="main_chat__message-list__all">
        <div class="main_chat__message-list__all__name-date">
          <div class="main_chat__message-list__all__name-date__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message-list__all__name-date__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message-list__all__message">
          <p class="main_chat__message-list__all__message">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.message-form-1').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $(".btn").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".btn").prop("disabled", false);
    })
  })
});