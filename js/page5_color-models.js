// init state


// clicks
$(document).ready(function() {
  function cmykToRgb(c, m, y, k) {
    let r = 255 * (1 - c / 100) * (1 - k / 100);
    let g = 255 * (1 - m / 100) * (1 - k / 100);
    let b = 255 * (1 - y / 100) * (1 - k / 100);
    return [Math.floor(r), Math.floor(g), Math.floor(b)];
  }

  function hsvToRgb(h, s, v) {
      s /= 100;
      v /= 100;

      let c = v * s;
      let x = c * (1 - Math.abs((h / 60) % 2 - 1));
      let m = v - c;
      let r = 0, g = 0, b = 0;

      if (h >= 0 && h < 60) {
          r = c; g = x; b = 0;
      } else if (h >= 60 && h < 120) {
          r = x; g = c; b = 0;
      } else if (h >= 120 && h < 180) {
          r = 0; g = c; b = x;
      } else if (h >= 180 && h < 240) {
          r = 0; g = x; b = c;
      } else if (h >= 240 && h < 300) {
          r = x; g = 0; b = c;
      } else if (h >= 300 && h < 360) {
          r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return [r, g, b];
  }

  function rgbToHsv(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;

      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, v = max;
      let d = max - min;
      s = max == 0 ? 0 : d / max;

      if (max == min) {
          h = 0;
      } else {
          switch (max) {
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
      }

      h = Math.round(h * 360);
      s = Math.round(s * 100);
      v = Math.round(v * 100);

      return [h, s, v];
  }

  function rgbToHex(r, g, b) {
      const toHex = c => ("0" + parseInt(c).toString(16)).slice(-2);
      return "#" + toHex(r) + toHex(g) + toHex(b);
  }


  function updateCMYKColor() {
    const c = $('#c-range').val();
    const m = $('#m-range').val();
    const y = $('#y-range').val();
    const k = $('#k-range').val();
    const rgb = cmykToRgb(c, m, y, k);
    const hsv = rgbToHsv(rgb[0], rgb[1], rgb[2]);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2])
    var rgbVal = `RGB (${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    var hsvVal = `HSV (${hsv[0]}, ${hsv[1]}, ${hsv[2]})`;
    var hexCode = `Hex ${hex}`;

    $("#cmyk-rgb-value").html(rgbVal);
    $("#cmyk-hsv-value").html(hsvVal);
    $("#cmyk-hex-value").html(hexCode);
    $('#cmyk-color-display').css('background-color', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  }

  function updateHSVColor() {
    const h = $('#h-range').val();
    const s = $('#s-range').val();
    const v = $('#v-range').val();
    const rgb = hsvToRgb(h, s, v);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2])
    var rgbVal = `RGB (${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    var hsvVal = `HSV (${h}, ${s}, ${v})`;
    var hexCode = `Hex ${hex}`;

    $("#hsv-rgb-value").html(rgbVal);
    $("#hsv-hsv-value").html(hsvVal);
    $("#hsv-hex-value").html(hexCode);
    $('#hsv-color-display').css('background-color', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  }

  function updateRGBColor() {
    const r = $('#r-range').val();
    const g = $('#g-range').val();
    const b = $('#b-range').val();
    const hsv = rgbToHsv(r, g, b);
    const hex = rgbToHex(r, g, b)
    var rgbVal = `RGB (${r}, ${g}, ${b})`;
    var hsvVal = `HSV (${r}, ${g}, ${b})`;
    var hexCode = `Hex ${hex}`;

    $("#rgb-rgb-value").html(rgbVal);
    $("#rgb-hsv-value").html(hsvVal);
    $("#rgb-hex-value").html(hexCode);
    $('#rgb-color-display').css('background-color', `rgb(${r}, ${g}, ${b})`);
  }

  $('.open-modal').click(function() {
    var src = $(this).attr('data-href');
    var title = $(this).attr('data-title');
    var footer_text = $(this).attr('data-footer');
    $('#popupImage').attr('src', src);
    $('#imageModalLabel').html(title);
    $('#imageModalFooter').html(footer_text);
    var modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
  });

  $('#r-range, #g-range, #b-range').on('input', updateRGBColor);
  $('#h-range, #s-range, #v-range').on('input', updateHSVColor);
  $('#c-range, #m-range, #y-range, #k-range').on('input', updateCMYKColor);

  updateRGBColor();
  updateHSVColor();
  updateCMYKColor();
});
