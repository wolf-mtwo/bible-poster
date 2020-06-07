class Utils {
  static getlines(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var count = 0;
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ++count;
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    return count;
  }

  static wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      }
      else {
      line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  static getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = { Utils };