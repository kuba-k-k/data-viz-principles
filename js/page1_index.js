// init state
$("#index-slide-content").hide();
$("#climate-change-action-button").hide();
$("#good-example-container").hide();


// functions
function typing_effect(text, identifier, callback) {
  const words = text.split(" ");
  let i = 0;

  const typeWord = () => {
    if (i < words.length) {
      $('<span>' + words[i] + ' </span>').insertBefore(identifier + ' > span.typing-cursor');
      i++;
      setTimeout(typeWord, 50); // Adjust typing speed here
    } else {
      $(identifier + ' > span.typing-cursor').remove();
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
  typeWord();
}

function closePopover(element) {
  $(element).parents('.popover').popover('hide');
}

// click paths
$(document).ready(function() {
  $("#title-quote-change").click(function() {
    var $quote = $("#title-quote");
    $quote.fadeTo('slow', 0.001, function() {
      $quote.html('<p>Największą wartością obrazu jest to, że zmusza nas do zauważenia tego, czego nigdy nie spodziewaliśmy się <a id="title-quote-change" class="pointer lang-en"><em>zobaczyć</em></a>.</p>');
      $quote.fadeTo('slow', 1, function() {
        setTimeout(function() {
          $("#quote-figure").fadeTo('slow', 0, function() {
            $("#quote-container").remove();
            $("#index-slide-content").fadeIn("fast", function() {
              var text = "W ciągu ostatniego stulecia Ziemia była świadkiem znacznego wzrostu globalnych temperatur, przy średnim wzroście o około 1,1°C (2,0°F) od końca XIX wieku. Ten trend ocieplenia jest szczególnie wyraźny w ostatnich dziesięcioleciach, a lata 2001–2020 należą do najcieplejszych od ponad 2000 lat. Antropogeniczne emisje gazów cieplarnianych, wynikające z takich działań, jak spalanie paliw kopalnych, wylesianie i różne procesy przemysłowe, gwałtownie wzrosły, co prowadzi do nasilenia efektu cieplarnianego, który zatrzymuje więcej ciepła w atmosferze. Konsekwencje tego ocieplenia obejmują częstsze i intensywniejsze fale upałów, utratę przez lodowce średnio 267 miliardów ton lodu rocznie, wzrost poziomu mórz w średnim tempie 3,3 milimetra rocznie od początku lat 90. XX wieku oraz zmieniające się warunki pogodowe. Ta tendencja do ocieplenia odzwierciedla znaczący wpływ działalności człowieka na globalną temperaturę i podkreśla pilną potrzebę podjęcia kompleksowych działań klimatycznych w celu złagodzenia przyszłych zagrożeń i dostosowania się do zachodzących zmian.";
              typing_effect(text, "#climate-change-bad-example", function() {
                setTimeout(function() {
                  $("#climate-change-action-button").fadeIn("slow");
                }, 1000);
              });
            });
          });
        }, 2000);
      });
    });
  });

  $("#climate-change-action-button").click(function() {
    $("#bad-example-container").fadeOut("slow", function() {
      $("#good-example-container").slideDown();
    });
  });

});
