(function (window, undefined) {
  window.tracking = window.tracking || {};

  tracking.inherits = function (childCtor, parentCtor) {
    function TempCtor() {}
    TempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new TempCtor();
    childCtor.prototype.constructor = childCtor;

    childCtor.base = function (me, methodName) {
      var args = Array.prototype.slice.call(arguments, 2);
      return parentCtor.prototype[methodName].apply(me, args);
    };
  };

  tracking.initUserMedia_ = function (element, opt_options) {
    window.navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: opt_options && opt_options.audio ? true : false,
      })
      .then(function (stream) {
        element.srcObject = stream;
      })
      .catch(function (err) {
        throw Error('Cannot capture user camera.');
      });
  };

  tracking.isNode = function (o) {
    return o.nodeType || this.isWindow(o);
  };

  tracking.isWindow = function (o) {
    return !!(o && o.alert && o.document);
  };

  tracking.one = function (selector, opt_element) {
    if (this.isNode(selector)) {
      return selector;
    }
    return (opt_element || document).querySelector(selector);
  };

  tracking.track = function (element, tracker, opt_options) {
    element = tracking.one(element);
    if (!element) {
      throw new Error('Element not found, try a different element or selector.');
    }
    if (!tracker) {
      throw new Error('Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.');
    }

    switch (element.nodeName.toLowerCase()) {
      case 'canvas':
        return this.trackCanvas_(element, tracker, opt_options);
      case 'img':
        return this.trackImg_(element, tracker, opt_options);
      case 'video':
        if (opt_options) {
          if (opt_options.camera) {
            this.initUserMedia_(element, opt_options);
          }
        }
        return this.trackVideo_(element, tracker, opt_options);
      default:
        throw new Error('Element not supported, try in a canvas, img, or video.');
    }
  };

  tracking.trackCanvas_ = function (element, tracker) {
    var self = this;
    var task = new tracking.TrackerTask(tracker);
    task.on('run', function () {
      self.trackCanvasInternal_(element, tracker);
    });
    return task.run();
  };

  tracking.trackCanvasInternal_ = function (element, tracker) {
    var width = element.width;
    var height = element.height;
    var context = element.getContext('2d');
    var imageData = context.getImageData(0, 0, width, height);
    tracker.track(imageData.data, width, height);
  };

  tracking.trackImg_ = function (element, tracker) {
    var width = element.width;
    var height = element.height;
    var canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    var task = new tracking.TrackerTask(tracker);
    task.on('run', function () {
      tracking.Canvas.loadImage(canvas, element.src, 0, 0, width, height, function () {
        tracking.trackCanvasInternal_(canvas, tracker);
      });
    });
    return task.run();
  };

  tracking.limitFPS_ = function (fn, fps) {
    var requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / fps);
      };

    var then = new Date().getTime();

    fps = fps || 30;
    var interval = 1000 / fps;

    return (function loop(time) {
      var Af = requestAnimationFrame(loop);

      var now = new Date().getTime();
      var delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);

        fn();
      }

      return Af;
    })(0);
  };

  tracking.trackVideo_ = function (element, tracker) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width;
    var height;

    var resizeCanvas_ = function () {
      width = element.offsetWidth;
      height = element.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas_();
    element.addEventListener('resize', resizeCanvas_);

    var requestId;
    var draw_ = function () {
      if (element.readyState === element.HAVE_ENOUGH_DATA) {
        try {
          context.drawImage(element, 0, 0, width, height);
        } catch (err) {}
        tracking.trackCanvasInternal_(canvas, tracker);
      }
    };

    function requestAnimationFrame_() {
      requestId = tracking.limitFPS_(function () {
        draw_();
      }, tracker.videoFPS);
    }

    var task = new tracking.TrackerTask(tracker);
    task.on('stop', function () {
      window.cancelAnimationFrame(requestId);
    });
    task.on('run', function () {
      requestAnimationFrame_();
    });
    return task.run();
  };

  if (!window.URL) {
    window.URL = window.URL || window.webkitURL || window.msURL || window.oURL;
  }

  if (!navigator.getUserMedia) {
    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }
})(window);

(function () {
  tracking.EventEmitter = function () {};

  tracking.EventEmitter.prototype.events_ = null;

  tracking.EventEmitter.prototype.addListener = function (event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      this.events_ = {};
    }

    this.emit('newListener', event, listener);

    if (!this.events_[event]) {
      this.events_[event] = [];
    }

    this.events_[event].push(listener);

    return this;
  };

  tracking.EventEmitter.prototype.listeners = function (event) {
    return this.events_ && this.events_[event];
  };

  tracking.EventEmitter.prototype.emit = function (event) {
    var listeners = this.listeners(event);
    if (listeners) {
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]) {
          listeners[i].apply(this, args);
        }
      }
      return true;
    }
    return false;
  };

  tracking.EventEmitter.prototype.on = tracking.EventEmitter.prototype.addListener;

  tracking.EventEmitter.prototype.once = function (event, listener) {
    var self = this;
    self.on(event, function handlerInternal() {
      self.removeListener(event, handlerInternal);
      listener.apply(this, arguments);
    });
  };

  tracking.EventEmitter.prototype.removeAllListeners = function (opt_event) {
    if (!this.events_) {
      return this;
    }
    if (opt_event) {
      delete this.events_[opt_event];
    } else {
      delete this.events_;
    }
    return this;
  };

  tracking.EventEmitter.prototype.removeListener = function (event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      return this;
    }

    var listeners = this.listeners(event);
    if (Array.isArray(listeners)) {
      var i = listeners.indexOf(listener);
      if (i < 0) {
        return this;
      }
      listeners.splice(i, 1);
    }

    return this;
  };

  tracking.EventEmitter.prototype.setMaxListeners = function () {
    throw new Error('Not implemented');
  };
})();

(function () {
  tracking.Canvas = {};

  tracking.Canvas.loadImage = function (canvas, src, x, y, width, height, opt_callback) {
    var instance = this;
    var img = new window.Image();
    img.crossOrigin = '*';
    img.onload = function () {
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, x, y, width, height);
      if (opt_callback) {
        opt_callback.call(instance);
      }
      img = null;
    };
    img.src = src;
  };
})();

(function () {
  tracking.DisjointSet = function (length) {
    if (length === undefined) {
      throw new Error('DisjointSet length not specified.');
    }
    this.length = length;
    this.parent = new Uint32Array(length);
    for (var i = 0; i < length; i++) {
      this.parent[i] = i;
    }
  };

  tracking.DisjointSet.prototype.length = null;

  tracking.DisjointSet.prototype.parent = null;

  tracking.DisjointSet.prototype.find = function (i) {
    if (this.parent[i] === i) {
      return i;
    } else {
      return (this.parent[i] = this.find(this.parent[i]));
    }
  };

  tracking.DisjointSet.prototype.union = function (i, j) {
    var iRepresentative = this.find(i);
    var jRepresentative = this.find(j);
    this.parent[iRepresentative] = jRepresentative;
  };
})();

(function () {
  tracking.Image = {};

  tracking.Image.blur = function (pixels, width, height, diameter) {
    diameter = Math.abs(diameter);
    if (diameter <= 1) {
      throw new Error('Diameter should be greater than 1.');
    }
    var radius = diameter / 2;
    var len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2));
    var weights = new Float32Array(len);
    var rho = (radius + 0.5) / 3;
    var rhoSq = rho * rho;
    var gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rhoSq);
    var rhoFactor = -1 / (2 * rho * rho);
    var wsum = 0;
    var middle = Math.floor(len / 2);
    for (var i = 0; i < len; i++) {
      var x = i - middle;
      var gx = gaussianFactor * Math.exp(x * x * rhoFactor);
      weights[i] = gx;
      wsum += gx;
    }
    for (var j = 0; j < weights.length; j++) {
      weights[j] /= wsum;
    }
    return this.separableConvolve(pixels, width, height, weights, weights, false);
  };

  tracking.Image.computeIntegralImage = function (
    pixels,
    width,
    height,
    opt_integralImage,
    opt_integralImageSquare,
    opt_tiltedIntegralImage,
    opt_integralImageSobel,
  ) {
    if (arguments.length < 4) {
      throw new Error('You should specify at least one output array in the order: sum, square, tilted, sobel.');
    }
    var pixelsSobel;
    if (opt_integralImageSobel) {
      pixelsSobel = tracking.Image.sobel(pixels, width, height);
    }
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var w = i * width * 4 + j * 4;
        var pixel = ~~(pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114);
        if (opt_integralImage) {
          this.computePixelValueSAT_(opt_integralImage, width, i, j, pixel);
        }
        if (opt_integralImageSquare) {
          this.computePixelValueSAT_(opt_integralImageSquare, width, i, j, pixel * pixel);
        }
        if (opt_tiltedIntegralImage) {
          var w1 = w - width * 4;
          var pixelAbove = ~~(pixels[w1] * 0.299 + pixels[w1 + 1] * 0.587 + pixels[w1 + 2] * 0.114);
          this.computePixelValueRSAT_(opt_tiltedIntegralImage, width, i, j, pixel, pixelAbove || 0);
        }
        if (opt_integralImageSobel) {
          this.computePixelValueSAT_(opt_integralImageSobel, width, i, j, pixelsSobel[w]);
        }
      }
    }
  };

  tracking.Image.computePixelValueRSAT_ = function (RSAT, width, i, j, pixel, pixelAbove) {
    var w = i * width + j;
    RSAT[w] = (RSAT[w - width - 1] || 0) + (RSAT[w - width + 1] || 0) - (RSAT[w - width - width] || 0) + pixel + pixelAbove;
  };

  tracking.Image.computePixelValueSAT_ = function (SAT, width, i, j, pixel) {
    var w = i * width + j;
    SAT[w] = (SAT[w - width] || 0) + (SAT[w - 1] || 0) + pixel - (SAT[w - width - 1] || 0);
  };

  tracking.Image.grayscale = function (pixels, width, height, fillRGBA) {
    var gray = new Uint8ClampedArray(fillRGBA ? pixels.length : pixels.length >> 2);
    var p = 0;
    var w = 0;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var value = pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114;
        gray[p++] = value;

        if (fillRGBA) {
          gray[p++] = value;
          gray[p++] = value;
          gray[p++] = pixels[w + 3];
        }

        w += 4;
      }
    }
    return gray;
  };

  tracking.Image.horizontalConvolve = function (pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cx = 0; cx < side; cx++) {
          var scy = sy;
          var scx = Math.min(width - 1, Math.max(0, sx + cx - halfSide));
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cx];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  tracking.Image.verticalConvolve = function (pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          var scy = Math.min(height - 1, Math.max(0, sy + cy - halfSide));
          var scx = sx;
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cy];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  tracking.Image.separableConvolve = function (pixels, width, height, horizWeights, vertWeights, opaque) {
    var vertical = this.verticalConvolve(pixels, width, height, vertWeights, opaque);
    return this.horizontalConvolve(vertical, width, height, horizWeights, opaque);
  };

  tracking.Image.sobel = function (pixels, width, height) {
    pixels = this.grayscale(pixels, width, height, true);
    var output = new Float32Array(width * height * 4);
    var sobelSignVector = new Float32Array([-1, 0, 1]);
    var sobelScaleVector = new Float32Array([1, 2, 1]);
    var vertical = this.separableConvolve(pixels, width, height, sobelSignVector, sobelScaleVector);
    var horizontal = this.separableConvolve(pixels, width, height, sobelScaleVector, sobelSignVector);

    for (var i = 0; i < output.length; i += 4) {
      var v = vertical[i];
      var h = horizontal[i];
      var p = Math.sqrt(h * h + v * v);
      output[i] = p;
      output[i + 1] = p;
      output[i + 2] = p;
      output[i + 3] = 255;
    }

    return output;
  };

  tracking.Image.equalizeHist = function (pixels, width, height) {
    var equalized = new Uint8ClampedArray(pixels.length);

    var histogram = new Array(256);
    for (var i = 0; i < 256; i++) histogram[i] = 0;

    for (var i = 0; i < pixels.length; i++) {
      equalized[i] = pixels[i];
      histogram[pixels[i]]++;
    }

    var prev = histogram[0];
    for (var i = 0; i < 256; i++) {
      histogram[i] += prev;
      prev = histogram[i];
    }

    var norm = 255 / pixels.length;
    for (var i = 0; i < pixels.length; i++) equalized[i] = (histogram[pixels[i]] * norm + 0.5) | 0;

    return equalized;
  };
})();

(function () {
  tracking.ViolaJones = {};

  tracking.ViolaJones.REGIONS_OVERLAP = 0.5;

  tracking.ViolaJones.classifiers = {};

  tracking.ViolaJones.detect = function (pixels, width, height, initialScale, scaleFactor, stepSize, edgesDensity, data) {
    var total = 0;
    var rects = [];
    var integralImage = new Int32Array(width * height);
    var integralImageSquare = new Int32Array(width * height);
    var tiltedIntegralImage = new Int32Array(width * height);

    var integralImageSobel;
    if (edgesDensity > 0) {
      integralImageSobel = new Int32Array(width * height);
    }

    tracking.Image.computeIntegralImage(pixels, width, height, integralImage, integralImageSquare, tiltedIntegralImage, integralImageSobel);

    var minWidth = data[0];
    var minHeight = data[1];
    var scale = initialScale * scaleFactor;
    var blockWidth = (scale * minWidth) | 0;
    var blockHeight = (scale * minHeight) | 0;

    while (blockWidth < width && blockHeight < height) {
      var step = (scale * stepSize + 0.5) | 0;
      for (var i = 0; i < height - blockHeight; i += step) {
        for (var j = 0; j < width - blockWidth; j += step) {
          if (edgesDensity > 0) {
            if (this.isTriviallyExcluded(edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight)) {
              continue;
            }
          }

          if (
            this.evalStages_(data, integralImage, integralImageSquare, tiltedIntegralImage, i, j, width, blockWidth, blockHeight, scale)
          ) {
            rects[total++] = {
              width: blockWidth,
              height: blockHeight,
              x: j,
              y: i,
            };
          }
        }
      }

      scale *= scaleFactor;
      blockWidth = (scale * minWidth) | 0;
      blockHeight = (scale * minHeight) | 0;
    }
    return this.mergeRectangles_(rects);
  };

  tracking.ViolaJones.isTriviallyExcluded = function (edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight) {
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var blockEdgesDensity =
      (integralImageSobel[wbA] - integralImageSobel[wbB] - integralImageSobel[wbD] + integralImageSobel[wbC]) /
      (blockWidth * blockHeight * 255);
    if (blockEdgesDensity < edgesDensity) {
      return true;
    }
    return false;
  };

  tracking.ViolaJones.evalStages_ = function (
    data,
    integralImage,
    integralImageSquare,
    tiltedIntegralImage,
    i,
    j,
    width,
    blockWidth,
    blockHeight,
    scale,
  ) {
    var inverseArea = 1.0 / (blockWidth * blockHeight);
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var mean = (integralImage[wbA] - integralImage[wbB] - integralImage[wbD] + integralImage[wbC]) * inverseArea;
    var variance =
      (integralImageSquare[wbA] - integralImageSquare[wbB] - integralImageSquare[wbD] + integralImageSquare[wbC]) * inverseArea -
      mean * mean;

    var standardDeviation = 1;
    if (variance > 0) {
      standardDeviation = Math.sqrt(variance);
    }

    var length = data.length;

    for (var w = 2; w < length; ) {
      var stageSum = 0;
      var stageThreshold = data[w++];
      var nodeLength = data[w++];

      while (nodeLength--) {
        var rectsSum = 0;
        var tilted = data[w++];
        var rectsLength = data[w++];

        for (var r = 0; r < rectsLength; r++) {
          var rectLeft = (j + data[w++] * scale + 0.5) | 0;
          var rectTop = (i + data[w++] * scale + 0.5) | 0;
          var rectWidth = (data[w++] * scale + 0.5) | 0;
          var rectHeight = (data[w++] * scale + 0.5) | 0;
          var rectWeight = data[w++];

          var w1;
          var w2;
          var w3;
          var w4;
          if (tilted) {
            w1 = rectLeft - rectHeight + rectWidth + (rectTop + rectWidth + rectHeight - 1) * width;
            w2 = rectLeft + (rectTop - 1) * width;
            w3 = rectLeft - rectHeight + (rectTop + rectHeight - 1) * width;
            w4 = rectLeft + rectWidth + (rectTop + rectWidth - 1) * width;
            rectsSum +=
              (tiltedIntegralImage[w1] + tiltedIntegralImage[w2] - tiltedIntegralImage[w3] - tiltedIntegralImage[w4]) * rectWeight;
          } else {
            w1 = rectTop * width + rectLeft;
            w2 = w1 + rectWidth;
            w3 = w1 + rectHeight * width;
            w4 = w3 + rectWidth;
            rectsSum += (integralImage[w1] - integralImage[w2] - integralImage[w3] + integralImage[w4]) * rectWeight;
          }
        }

        var nodeThreshold = data[w++];
        var nodeLeft = data[w++];
        var nodeRight = data[w++];

        if (rectsSum * inverseArea < nodeThreshold * standardDeviation) {
          stageSum += nodeLeft;
        } else {
          stageSum += nodeRight;
        }
      }

      if (stageSum < stageThreshold) {
        return false;
      }
    }
    return true;
  };

  tracking.ViolaJones.mergeRectangles_ = function (rects) {
    var disjointSet = new tracking.DisjointSet(rects.length);

    for (var i = 0; i < rects.length; i++) {
      var r1 = rects[i];
      for (var j = 0; j < rects.length; j++) {
        var r2 = rects[j];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          var x1 = Math.max(r1.x, r2.x);
          var y1 = Math.max(r1.y, r2.y);
          var x2 = Math.min(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.min(r1.y + r1.height, r2.y + r2.height);
          var overlap = (x1 - x2) * (y1 - y2);
          var area1 = r1.width * r1.height;
          var area2 = r2.width * r2.height;

          if (overlap / (area1 * (area1 / area2)) >= this.REGIONS_OVERLAP && overlap / (area2 * (area1 / area2)) >= this.REGIONS_OVERLAP) {
            disjointSet.union(i, j);
          }
        }
      }
    }

    var map = {};
    for (var k = 0; k < disjointSet.length; k++) {
      var rep = disjointSet.find(k);
      if (!map[rep]) {
        map[rep] = {
          total: 1,
          width: rects[k].width,
          height: rects[k].height,
          x: rects[k].x,
          y: rects[k].y,
        };
        continue;
      }
      map[rep].total++;
      map[rep].width += rects[k].width;
      map[rep].height += rects[k].height;
      map[rep].x += rects[k].x;
      map[rep].y += rects[k].y;
    }

    var result = [];
    Object.keys(map).forEach(function (key) {
      var rect = map[key];
      result.push({
        total: rect.total,
        width: (rect.width / rect.total + 0.5) | 0,
        height: (rect.height / rect.total + 0.5) | 0,
        x: (rect.x / rect.total + 0.5) | 0,
        y: (rect.y / rect.total + 0.5) | 0,
      });
    });

    return result;
  };
})();

(function () {
  tracking.Brief = {};

  tracking.Brief.N = 512;

  tracking.Brief.randomImageOffsets_ = {};

  tracking.Brief.randomWindowOffsets_ = null;

  tracking.Brief.getDescriptors = function (pixels, width, keypoints) {
    var descriptors = new Int32Array((keypoints.length >> 1) * (this.N >> 5));
    var descriptorWord = 0;
    var offsets = this.getRandomOffsets_(width);
    var position = 0;

    for (var i = 0; i < keypoints.length; i += 2) {
      var w = width * keypoints[i + 1] + keypoints[i];

      var offsetsPosition = 0;
      for (var j = 0, n = this.N; j < n; j++) {
        if (pixels[offsets[offsetsPosition++] + w] < pixels[offsets[offsetsPosition++] + w]) {
          descriptorWord |= 1 << (j & 31);
        }

        if (!((j + 1) & 31)) {
          descriptors[position++] = descriptorWord;
          descriptorWord = 0;
        }
      }
    }

    return descriptors;
  };

  tracking.Brief.match = function (keypoints1, descriptors1, keypoints2, descriptors2) {
    var len1 = keypoints1.length >> 1;
    var len2 = keypoints2.length >> 1;
    var matches = new Array(len1);

    for (var i = 0; i < len1; i++) {
      var min = Infinity;
      var minj = 0;
      for (var j = 0; j < len2; j++) {
        var dist = 0;

        for (var k = 0, n = this.N >> 5; k < n; k++) {
          dist += tracking.Math.hammingWeight(descriptors1[i * n + k] ^ descriptors2[j * n + k]);
        }
        if (dist < min) {
          min = dist;
          minj = j;
        }
      }
      matches[i] = {
        index1: i,
        index2: minj,
        keypoint1: [keypoints1[2 * i], keypoints1[2 * i + 1]],
        keypoint2: [keypoints2[2 * minj], keypoints2[2 * minj + 1]],
        confidence: 1 - min / this.N,
      };
    }

    return matches;
  };

  tracking.Brief.reciprocalMatch = function (keypoints1, descriptors1, keypoints2, descriptors2) {
    var matches = [];
    if (keypoints1.length === 0 || keypoints2.length === 0) {
      return matches;
    }

    var matches1 = tracking.Brief.match(keypoints1, descriptors1, keypoints2, descriptors2);
    var matches2 = tracking.Brief.match(keypoints2, descriptors2, keypoints1, descriptors1);
    for (var i = 0; i < matches1.length; i++) {
      if (matches2[matches1[i].index2].index2 === i) {
        matches.push(matches1[i]);
      }
    }
    return matches;
  };

  tracking.Brief.getRandomOffsets_ = function (width) {
    if (!this.randomWindowOffsets_) {
      var windowPosition = 0;
      var windowOffsets = new Int32Array(4 * this.N);
      for (var i = 0; i < this.N; i++) {
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
      }
      this.randomWindowOffsets_ = windowOffsets;
    }

    if (!this.randomImageOffsets_[width]) {
      var imagePosition = 0;
      var imageOffsets = new Int32Array(2 * this.N);
      for (var j = 0; j < this.N; j++) {
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j] * width + this.randomWindowOffsets_[4 * j + 1];
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j + 2] * width + this.randomWindowOffsets_[4 * j + 3];
      }
      this.randomImageOffsets_[width] = imageOffsets;
    }

    return this.randomImageOffsets_[width];
  };
})();

(function () {
  tracking.Fast = {};

  tracking.Fast.THRESHOLD = 40;

  tracking.Fast.circles_ = {};

  tracking.Fast.findCorners = function (pixels, width, height, opt_threshold) {
    var circleOffsets = this.getCircleOffsets_(width);
    var circlePixels = new Int32Array(16);
    var corners = [];

    if (opt_threshold === undefined) {
      opt_threshold = this.THRESHOLD;
    }

    for (var i = 3; i < height - 3; i++) {
      for (var j = 3; j < width - 3; j++) {
        var w = i * width + j;
        var p = pixels[w];

        for (var k = 0; k < 16; k++) {
          circlePixels[k] = pixels[w + circleOffsets[k]];
        }

        if (this.isCorner(p, circlePixels, opt_threshold)) {
          corners.push(j, i);
          j += 3;
        }
      }
    }

    return corners;
  };

  tracking.Fast.isBrighter = function (circlePixel, p, threshold) {
    return circlePixel - p > threshold;
  };

  tracking.Fast.isCorner = function (p, circlePixels, threshold) {
    if (this.isTriviallyExcluded(circlePixels, p, threshold)) {
      return false;
    }

    for (var x = 0; x < 16; x++) {
      var darker = true;
      var brighter = true;

      for (var y = 0; y < 9; y++) {
        var circlePixel = circlePixels[(x + y) & 15];

        if (!this.isBrighter(p, circlePixel, threshold)) {
          brighter = false;
          if (darker === false) {
            break;
          }
        }

        if (!this.isDarker(p, circlePixel, threshold)) {
          darker = false;
          if (brighter === false) {
            break;
          }
        }
      }

      if (brighter || darker) {
        return true;
      }
    }

    return false;
  };

  tracking.Fast.isDarker = function (circlePixel, p, threshold) {
    return p - circlePixel > threshold;
  };

  tracking.Fast.isTriviallyExcluded = function (circlePixels, p, threshold) {
    var count = 0;
    var circleBottom = circlePixels[8];
    var circleLeft = circlePixels[12];
    var circleRight = circlePixels[4];
    var circleTop = circlePixels[0];

    if (this.isBrighter(circleTop, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleRight, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleBottom, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleLeft, p, threshold)) {
      count++;
    }

    if (count < 3) {
      count = 0;
      if (this.isDarker(circleTop, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleRight, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleBottom, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleLeft, p, threshold)) {
        count++;
      }
      if (count < 3) {
        return true;
      }
    }

    return false;
  };

  tracking.Fast.getCircleOffsets_ = function (width) {
    if (this.circles_[width]) {
      return this.circles_[width];
    }

    var circle = new Int32Array(16);

    circle[0] = -width - width - width;
    circle[1] = circle[0] + 1;
    circle[2] = circle[1] + width + 1;
    circle[3] = circle[2] + width + 1;
    circle[4] = circle[3] + width;
    circle[5] = circle[4] + width;
    circle[6] = circle[5] + width - 1;
    circle[7] = circle[6] + width - 1;
    circle[8] = circle[7] - 1;
    circle[9] = circle[8] - 1;
    circle[10] = circle[9] - width - 1;
    circle[11] = circle[10] - width - 1;
    circle[12] = circle[11] - width;
    circle[13] = circle[12] - width;
    circle[14] = circle[13] - width + 1;
    circle[15] = circle[14] - width + 1;

    this.circles_[width] = circle;
    return circle;
  };
})();

(function () {
  tracking.Math = {};

  tracking.Math.distance = function (x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  };

  tracking.Math.hammingWeight = function (i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);

    return (((i + (i >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
  };

  tracking.Math.uniformRandom = function (a, b) {
    return a + Math.random() * (b - a);
  };

  tracking.Math.intersectRect = function (x0, y0, x1, y1, x2, y2, x3, y3) {
    return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
  };
})();

(function () {
  tracking.Matrix = {};

  tracking.Matrix.forEach = function (pixels, width, height, fn, opt_jump) {
    opt_jump = opt_jump || 1;
    for (var i = 0; i < height; i += opt_jump) {
      for (var j = 0; j < width; j += opt_jump) {
        var w = i * width * 4 + j * 4;
        fn.call(this, pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3], w, i, j);
      }
    }
  };

  tracking.Matrix.sub = function (a, b) {
    var res = tracking.Matrix.clone(a);
    for (var i = 0; i < res.length; i++) {
      for (var j = 0; j < res[i].length; j++) {
        res[i][j] -= b[i][j];
      }
    }
    return res;
  };

  tracking.Matrix.add = function (a, b) {
    var res = tracking.Matrix.clone(a);
    for (var i = 0; i < res.length; i++) {
      for (var j = 0; j < res[i].length; j++) {
        res[i][j] += b[i][j];
      }
    }
    return res;
  };

  tracking.Matrix.clone = function (src, width, height) {
    width = width || src[0].length;
    height = height || src.length;
    var temp = new Array(height);
    var i = height;
    while (i--) {
      temp[i] = new Array(width);
      var j = width;
      while (j--) temp[i][j] = src[i][j];
    }
    return temp;
  };

  tracking.Matrix.mulScalar = function (scalar, src) {
    var res = tracking.Matrix.clone(src);
    for (var i = 0; i < src.length; i++) {
      for (var j = 0; j < src[i].length; j++) {
        res[i][j] *= scalar;
      }
    }
    return res;
  };

  tracking.Matrix.transpose = function (src) {
    var transpose = new Array(src[0].length);
    for (var i = 0; i < src[0].length; i++) {
      transpose[i] = new Array(src.length);
      for (var j = 0; j < src.length; j++) {
        transpose[i][j] = src[j][i];
      }
    }
    return transpose;
  };

  tracking.Matrix.mul = function (a, b) {
    var res = new Array(a.length);
    for (var i = 0; i < a.length; i++) {
      res[i] = new Array(b[0].length);
      for (var j = 0; j < b[0].length; j++) {
        res[i][j] = 0;
        for (var k = 0; k < a[0].length; k++) {
          res[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return res;
  };

  tracking.Matrix.norm = function (src) {
    var res = 0;
    for (var i = 0; i < src.length; i++) {
      for (var j = 0; j < src[i].length; j++) {
        res += src[i][j] * src[i][j];
      }
    }
    return Math.sqrt(res);
  };

  tracking.Matrix.calcCovarMatrix = function (src) {
    var mean = new Array(src.length);
    for (var i = 0; i < src.length; i++) {
      mean[i] = [0.0];
      for (var j = 0; j < src[i].length; j++) {
        mean[i][0] += src[i][j] / src[i].length;
      }
    }

    var deltaFull = tracking.Matrix.clone(mean);
    for (var i = 0; i < deltaFull.length; i++) {
      for (var j = 0; j < src[0].length - 1; j++) {
        deltaFull[i].push(deltaFull[i][0]);
      }
    }

    var a = tracking.Matrix.sub(src, deltaFull);
    var b = tracking.Matrix.transpose(a);
    var covar = tracking.Matrix.mul(b, a);
    return [covar, mean];
  };
})();
(function () {
  tracking.EPnP = {};

  tracking.EPnP.solve = function (objectPoints, imagePoints, cameraMatrix) {};
})();

(function () {
  tracking.Tracker = function () {
    tracking.Tracker.base(this, 'constructor');
  };

  tracking.inherits(tracking.Tracker, tracking.EventEmitter);

  tracking.Tracker.prototype.track = function () {};
})();

(function () {
  tracking.TrackerTask = function (tracker) {
    tracking.TrackerTask.base(this, 'constructor');

    if (!tracker) {
      throw new Error('Tracker instance not specified.');
    }

    this.setTracker(tracker);
  };

  tracking.inherits(tracking.TrackerTask, tracking.EventEmitter);

  tracking.TrackerTask.prototype.tracker_ = null;

  tracking.TrackerTask.prototype.running_ = false;

  tracking.TrackerTask.prototype.getTracker = function () {
    return this.tracker_;
  };

  tracking.TrackerTask.prototype.inRunning = function () {
    return this.running_;
  };

  tracking.TrackerTask.prototype.setRunning = function (running) {
    this.running_ = running;
  };

  tracking.TrackerTask.prototype.setTracker = function (tracker) {
    this.tracker_ = tracker;
  };

  tracking.TrackerTask.prototype.run = function () {
    var self = this;

    if (this.inRunning()) {
      return;
    }

    this.setRunning(true);
    this.reemitTrackEvent_ = function (event) {
      self.emit('track', event);
    };
    this.tracker_.on('track', this.reemitTrackEvent_);
    this.emit('run');
    return this;
  };

  tracking.TrackerTask.prototype.stop = function () {
    if (!this.inRunning()) {
      return;
    }

    this.setRunning(false);
    this.emit('stop');
    this.tracker_.removeListener('track', this.reemitTrackEvent_);
    return this;
  };
})();

(function () {
  tracking.ColorTracker = function (opt_colors) {
    tracking.ColorTracker.base(this, 'constructor');

    if (typeof opt_colors === 'string') {
      opt_colors = [opt_colors];
    }

    if (opt_colors) {
      opt_colors.forEach(function (color) {
        if (!tracking.ColorTracker.getColor(color)) {
          throw new Error('Color not valid, try `new tracking.ColorTracker("magenta")`.');
        }
      });
      this.setColors(opt_colors);
    }
  };

  tracking.inherits(tracking.ColorTracker, tracking.Tracker);

  tracking.ColorTracker.knownColors_ = {};

  tracking.ColorTracker.neighbours_ = {};

  tracking.ColorTracker.registerColor = function (name, fn) {
    tracking.ColorTracker.knownColors_[name] = fn;
  };

  tracking.ColorTracker.getColor = function (name) {
    return tracking.ColorTracker.knownColors_[name];
  };

  tracking.ColorTracker.prototype.colors = ['magenta'];

  tracking.ColorTracker.prototype.minDimension = 20;

  tracking.ColorTracker.prototype.maxDimension = Infinity;

  tracking.ColorTracker.prototype.minGroupSize = 30;

  tracking.ColorTracker.prototype.calculateDimensions_ = function (cloud, total) {
    var maxx = -1;
    var maxy = -1;
    var minx = Infinity;
    var miny = Infinity;

    for (var c = 0; c < total; c += 2) {
      var x = cloud[c];
      var y = cloud[c + 1];

      if (x < minx) {
        minx = x;
      }
      if (x > maxx) {
        maxx = x;
      }
      if (y < miny) {
        miny = y;
      }
      if (y > maxy) {
        maxy = y;
      }
    }

    return {
      width: maxx - minx,
      height: maxy - miny,
      x: minx,
      y: miny,
    };
  };

  tracking.ColorTracker.prototype.getColors = function () {
    return this.colors;
  };

  tracking.ColorTracker.prototype.getMinDimension = function () {
    return this.minDimension;
  };

  tracking.ColorTracker.prototype.getMaxDimension = function () {
    return this.maxDimension;
  };

  tracking.ColorTracker.prototype.getMinGroupSize = function () {
    return this.minGroupSize;
  };

  tracking.ColorTracker.prototype.getNeighboursForWidth_ = function (width) {
    if (tracking.ColorTracker.neighbours_[width]) {
      return tracking.ColorTracker.neighbours_[width];
    }

    var neighbours = new Int32Array(8);

    neighbours[0] = -width * 4;
    neighbours[1] = -width * 4 + 4;
    neighbours[2] = 4;
    neighbours[3] = width * 4 + 4;
    neighbours[4] = width * 4;
    neighbours[5] = width * 4 - 4;
    neighbours[6] = -4;
    neighbours[7] = -width * 4 - 4;

    tracking.ColorTracker.neighbours_[width] = neighbours;

    return neighbours;
  };

  tracking.ColorTracker.prototype.mergeRectangles_ = function (rects) {
    var intersects;
    var results = [];
    var minDimension = this.getMinDimension();
    var maxDimension = this.getMaxDimension();

    for (var r = 0; r < rects.length; r++) {
      var r1 = rects[r];
      intersects = true;
      for (var s = r + 1; s < rects.length; s++) {
        var r2 = rects[s];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          intersects = false;
          var x1 = Math.min(r1.x, r2.x);
          var y1 = Math.min(r1.y, r2.y);
          var x2 = Math.max(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.max(r1.y + r1.height, r2.y + r2.height);
          r2.height = y2 - y1;
          r2.width = x2 - x1;
          r2.x = x1;
          r2.y = y1;
          break;
        }
      }

      if (intersects) {
        if (r1.width >= minDimension && r1.height >= minDimension) {
          if (r1.width <= maxDimension && r1.height <= maxDimension) {
            results.push(r1);
          }
        }
      }
    }

    return results;
  };

  tracking.ColorTracker.prototype.setColors = function (colors) {
    this.colors = colors;
  };

  tracking.ColorTracker.prototype.setMinDimension = function (minDimension) {
    this.minDimension = minDimension;
  };

  tracking.ColorTracker.prototype.setMaxDimension = function (maxDimension) {
    this.maxDimension = maxDimension;
  };

  tracking.ColorTracker.prototype.setMinGroupSize = function (minGroupSize) {
    this.minGroupSize = minGroupSize;
  };

  tracking.ColorTracker.prototype.track = function (pixels, width, height) {
    var self = this;
    var colors = this.getColors();

    if (!colors) {
      throw new Error('Colors not specified, try `new tracking.ColorTracker("magenta")`.');
    }

    var results = [];

    colors.forEach(function (color) {
      results = results.concat(self.trackColor_(pixels, width, height, color));
    });

    this.emit('track', {
      data: results,
    });
  };

  tracking.ColorTracker.prototype.trackColor_ = function (pixels, width, height, color) {
    var colorFn = tracking.ColorTracker.knownColors_[color];
    var currGroup = new Int32Array(pixels.length >> 2);
    var currGroupSize;
    var currI;
    var currJ;
    var currW;
    var marked = new Int8Array(pixels.length);
    var minGroupSize = this.getMinGroupSize();
    var neighboursW = this.getNeighboursForWidth_(width);
    var queue = new Int32Array(pixels.length);
    var queuePosition;
    var results = [];
    var w = -4;

    if (!colorFn) {
      return results;
    }

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        w += 4;

        if (marked[w]) {
          continue;
        }

        currGroupSize = 0;

        queuePosition = -1;
        queue[++queuePosition] = w;
        queue[++queuePosition] = i;
        queue[++queuePosition] = j;

        marked[w] = 1;

        while (queuePosition >= 0) {
          currJ = queue[queuePosition--];
          currI = queue[queuePosition--];
          currW = queue[queuePosition--];

          if (colorFn(pixels[currW], pixels[currW + 1], pixels[currW + 2], pixels[currW + 3], currW, currI, currJ)) {
            currGroup[currGroupSize++] = currJ;
            currGroup[currGroupSize++] = currI;

            for (var k = 0; k < neighboursW.length; k++) {
              var otherW = currW + neighboursW[k];
              var otherI = currI + neighboursI[k];
              var otherJ = currJ + neighboursJ[k];
              if (!marked[otherW] && otherI >= 0 && otherI < height && otherJ >= 0 && otherJ < width) {
                queue[++queuePosition] = otherW;
                queue[++queuePosition] = otherI;
                queue[++queuePosition] = otherJ;

                marked[otherW] = 1;
              }
            }
          }
        }

        if (currGroupSize >= minGroupSize) {
          var data = this.calculateDimensions_(currGroup, currGroupSize);
          if (data) {
            data.color = color;
            results.push(data);
          }
        }
      }
    }

    return this.mergeRectangles_(results);
  };

  tracking.ColorTracker.registerColor('cyan', function (r, g, b) {
    var thresholdGreen = 50,
      thresholdBlue = 70,
      dx = r - 0,
      dy = g - 255,
      dz = b - 255;

    if (g - r >= thresholdGreen && b - r >= thresholdBlue) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 6400;
  });

  tracking.ColorTracker.registerColor('magenta', function (r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 0,
      dz = b - 255;

    if (r - g >= threshold && b - g >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 19600;
  });

  tracking.ColorTracker.registerColor('yellow', function (r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 255,
      dz = b - 0;

    if (r - b >= threshold && g - b >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 10000;
  });

  var neighboursI = new Int32Array([-1, -1, 0, 1, 1, 1, 0, -1]);
  var neighboursJ = new Int32Array([0, 1, 1, 1, 0, -1, -1, -1]);
})();

(function () {
  tracking.ObjectTracker = function (opt_classifiers) {
    tracking.ObjectTracker.base(this, 'constructor');

    if (opt_classifiers) {
      if (!Array.isArray(opt_classifiers)) {
        opt_classifiers = [opt_classifiers];
      }

      if (Array.isArray(opt_classifiers)) {
        opt_classifiers.forEach(function (classifier, i) {
          if (typeof classifier === 'string') {
            opt_classifiers[i] = tracking.ViolaJones.classifiers[classifier];
          }
          if (!opt_classifiers[i]) {
            throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.');
          }
        });
      }
    }

    this.setClassifiers(opt_classifiers);
  };

  tracking.inherits(tracking.ObjectTracker, tracking.Tracker);

  tracking.ObjectTracker.prototype.edgesDensity = 0.2;

  tracking.ObjectTracker.prototype.videoFPS = 1;

  tracking.ObjectTracker.prototype.initialScale = 1.0;

  tracking.ObjectTracker.prototype.scaleFactor = 1.25;

  tracking.ObjectTracker.prototype.stepSize = 1.5;

  tracking.ObjectTracker.prototype.getClassifiers = function () {
    return this.classifiers;
  };

  tracking.ObjectTracker.prototype.getEdgesDensity = function () {
    return this.edgesDensity;
  };

  tracking.ObjectTracker.prototype.getInitialScale = function () {
    return this.initialScale;
  };

  tracking.ObjectTracker.prototype.getVideoFPS = function () {
    return this.videoFPS;
  };

  tracking.ObjectTracker.prototype.getScaleFactor = function () {
    return this.scaleFactor;
  };

  tracking.ObjectTracker.prototype.getStepSize = function () {
    return this.stepSize;
  };

  tracking.ObjectTracker.prototype.track = function (pixels, width, height) {
    var self = this;
    var classifiers = this.getClassifiers();

    if (!classifiers) {
      throw new Error('Object classifier not specified, try `new tracking.ObjectTracker("face")`.');
    }

    var results = [];

    classifiers.forEach(function (classifier) {
      results = results.concat(
        tracking.ViolaJones.detect(
          pixels,
          width,
          height,
          self.getInitialScale(),
          self.getScaleFactor(),
          self.getStepSize(),
          self.getEdgesDensity(),
          classifier,
        ),
      );
    });

    this.emit('track', {
      data: results,
    });
  };

  tracking.ObjectTracker.prototype.setClassifiers = function (classifiers) {
    this.classifiers = classifiers;
  };

  tracking.ObjectTracker.prototype.setEdgesDensity = function (edgesDensity) {
    this.edgesDensity = edgesDensity;
  };

  tracking.ObjectTracker.prototype.setFPS = function (fps) {
    this.videoFPS = fps;
  };

  tracking.ObjectTracker.prototype.setInitialScale = function (initialScale) {
    this.initialScale = initialScale;
  };

  tracking.ObjectTracker.prototype.setScaleFactor = function (scaleFactor) {
    this.scaleFactor = scaleFactor;
  };

  tracking.ObjectTracker.prototype.setStepSize = function (stepSize) {
    this.stepSize = stepSize;
  };
})();

(function () {
  tracking.LandmarksTracker = function () {
    tracking.LandmarksTracker.base(this, 'constructor');
  };

  tracking.inherits(tracking.LandmarksTracker, tracking.ObjectTracker);

  tracking.LandmarksTracker.prototype.track = function (pixels, width, height) {
    var image = {
      data: pixels,
      width: width,
      height: height,
    };

    var classifier = tracking.ViolaJones.classifiers['face'];

    var faces = tracking.ViolaJones.detect(
      pixels,
      width,
      height,
      this.getInitialScale(),
      this.getScaleFactor(),
      this.getStepSize(),
      this.getEdgesDensity(),
      classifier,
    );

    var landmarks = tracking.LBF.align(pixels, width, height, faces);

    this.emit('track', {
      data: {
        faces: faces,
        landmarks: landmarks,
      },
    });
  };
})();

(function () {
  tracking.LBF = {};

  tracking.LBF.Regressor = function (maxNumStages) {
    this.maxNumStages = maxNumStages;

    this.rfs = new Array(maxNumStages);
    this.models = new Array(maxNumStages);
    for (var i = 0; i < maxNumStages; i++) {
      this.rfs[i] = new tracking.LBF.RandomForest(i);
      this.models[i] = tracking.LBF.RegressorData[i].models;
    }

    this.meanShape = tracking.LBF.LandmarksData;
  };

  tracking.LBF.Regressor.prototype.predict = function (pixels, width, height, boundingBox) {
    var images = [];
    var currentShapes = [];
    var boundingBoxes = [];

    var meanShapeClone = tracking.Matrix.clone(this.meanShape);

    images.push({
      data: pixels,
      width: width,
      height: height,
    });
    boundingBoxes.push(boundingBox);

    currentShapes.push(tracking.LBF.projectShapeToBoundingBox_(meanShapeClone, boundingBox));

    for (var stage = 0; stage < this.maxNumStages; stage++) {
      var binaryFeatures = tracking.LBF.Regressor.deriveBinaryFeat(this.rfs[stage], images, currentShapes, boundingBoxes, meanShapeClone);
      this.applyGlobalPrediction(binaryFeatures, this.models[stage], currentShapes, boundingBoxes);
    }

    return currentShapes[0];
  };

  tracking.LBF.Regressor.prototype.applyGlobalPrediction = function (binaryFeatures, models, currentShapes, boundingBoxes) {
    var residual = currentShapes[0].length * 2;

    var rotation = [];
    var deltashape = new Array(residual / 2);
    for (var i = 0; i < residual / 2; i++) {
      deltashape[i] = [0.0, 0.0];
    }

    for (var i = 0; i < currentShapes.length; i++) {
      for (var j = 0; j < residual; j++) {
        var tmp = 0;
        for (var lx = 0, idx = 0; (idx = binaryFeatures[i][lx].index) != -1; lx++) {
          if (idx <= models[j].nr_feature) {
            tmp += models[j].data[idx - 1] * binaryFeatures[i][lx].value;
          }
        }
        if (j < residual / 2) {
          deltashape[j][0] = tmp;
        } else {
          deltashape[j - residual / 2][1] = tmp;
        }
      }

      var res = tracking.LBF.similarityTransform_(
        tracking.LBF.unprojectShapeToBoundingBox_(currentShapes[i], boundingBoxes[i]),
        this.meanShape,
      );
      var rotation = tracking.Matrix.transpose(res[0]);

      var s = tracking.LBF.unprojectShapeToBoundingBox_(currentShapes[i], boundingBoxes[i]);
      s = tracking.Matrix.add(s, deltashape);

      currentShapes[i] = tracking.LBF.projectShapeToBoundingBox_(s, boundingBoxes[i]);
    }
  };

  tracking.LBF.Regressor.deriveBinaryFeat = function (forest, images, currentShapes, boundingBoxes, meanShape) {
    var binaryFeatures = new Array(images.length);
    for (var i = 0; i < images.length; i++) {
      var t = forest.maxNumTrees * forest.landmarkNum + 1;
      binaryFeatures[i] = new Array(t);
      for (var j = 0; j < t; j++) {
        binaryFeatures[i][j] = {};
      }
    }

    var leafnodesPerTree = 1 << (forest.maxDepth - 1);

    for (var i = 0; i < images.length; i++) {
      var projectedShape = tracking.LBF.unprojectShapeToBoundingBox_(currentShapes[i], boundingBoxes[i]);
      var transform = tracking.LBF.similarityTransform_(projectedShape, meanShape);

      for (var j = 0; j < forest.landmarkNum; j++) {
        for (var k = 0; k < forest.maxNumTrees; k++) {
          var binaryCode = tracking.LBF.Regressor.getCodeFromTree(
            forest.rfs[j][k],
            images[i],
            currentShapes[i],
            boundingBoxes[i],
            transform[0],
            transform[1],
          );

          var index = j * forest.maxNumTrees + k;
          binaryFeatures[i][index].index = leafnodesPerTree * index + binaryCode;
          binaryFeatures[i][index].value = 1;
        }
      }
      binaryFeatures[i][forest.landmarkNum * forest.maxNumTrees].index = -1;
      binaryFeatures[i][forest.landmarkNum * forest.maxNumTrees].value = -1;
    }
    return binaryFeatures;
  };

  tracking.LBF.Regressor.getCodeFromTree = function (tree, image, shape, boundingBox, rotation, scale) {
    var current = 0;
    var bincode = 0;

    while (true) {
      var x1 = Math.cos(tree.nodes[current].feats[0]) * tree.nodes[current].feats[2] * tree.maxRadioRadius * boundingBox.width;
      var y1 = Math.sin(tree.nodes[current].feats[0]) * tree.nodes[current].feats[2] * tree.maxRadioRadius * boundingBox.height;
      var x2 = Math.cos(tree.nodes[current].feats[1]) * tree.nodes[current].feats[3] * tree.maxRadioRadius * boundingBox.width;
      var y2 = Math.sin(tree.nodes[current].feats[1]) * tree.nodes[current].feats[3] * tree.maxRadioRadius * boundingBox.height;

      var project_x1 = rotation[0][0] * x1 + rotation[0][1] * y1;
      var project_y1 = rotation[1][0] * x1 + rotation[1][1] * y1;

      var real_x1 = Math.floor(project_x1 + shape[tree.landmarkID][0]);
      var real_y1 = Math.floor(project_y1 + shape[tree.landmarkID][1]);
      real_x1 = Math.max(0.0, Math.min(real_x1, image.height - 1.0));
      real_y1 = Math.max(0.0, Math.min(real_y1, image.width - 1.0));

      var project_x2 = rotation[0][0] * x2 + rotation[0][1] * y2;
      var project_y2 = rotation[1][0] * x2 + rotation[1][1] * y2;

      var real_x2 = Math.floor(project_x2 + shape[tree.landmarkID][0]);
      var real_y2 = Math.floor(project_y2 + shape[tree.landmarkID][1]);
      real_x2 = Math.max(0.0, Math.min(real_x2, image.height - 1.0));
      real_y2 = Math.max(0.0, Math.min(real_y2, image.width - 1.0));
      var pdf = Math.floor(image.data[real_y1 * image.width + real_x1]) - Math.floor(image.data[real_y2 * image.width + real_x2]);

      if (pdf < tree.nodes[current].thresh) {
        current = tree.nodes[current].cnodes[0];
      } else {
        current = tree.nodes[current].cnodes[1];
      }

      if (tree.nodes[current].is_leafnode == 1) {
        bincode = 1;
        for (var i = 0; i < tree.leafnodes.length; i++) {
          if (tree.leafnodes[i] == current) {
            return bincode;
          }
          bincode++;
        }
        return bincode;
      }
    }

    return bincode;
  };
})();
(function () {
  tracking.LBF.maxNumStages = 4;

  tracking.LBF.regressor_ = null;

  tracking.LBF.align = function (pixels, width, height, faces) {
    if (tracking.LBF.regressor_ == null) {
      tracking.LBF.regressor_ = new tracking.LBF.Regressor(tracking.LBF.maxNumStages);
    }

    pixels = tracking.Image.grayscale(pixels, width, height, false);

    pixels = tracking.Image.equalizeHist(pixels, width, height);

    var shapes = new Array(faces.length);

    for (var i in faces) {
      faces[i].height = faces[i].width;

      var boundingBox = {};
      boundingBox.startX = faces[i].x;
      boundingBox.startY = faces[i].y;
      boundingBox.width = faces[i].width;
      boundingBox.height = faces[i].height;

      shapes[i] = tracking.LBF.regressor_.predict(pixels, width, height, boundingBox);
    }

    return shapes;
  };

  tracking.LBF.unprojectShapeToBoundingBox_ = function (shape, boundingBox) {
    var temp = new Array(shape.length);
    for (var i = 0; i < shape.length; i++) {
      temp[i] = [(shape[i][0] - boundingBox.startX) / boundingBox.width, (shape[i][1] - boundingBox.startY) / boundingBox.height];
    }
    return temp;
  };

  tracking.LBF.projectShapeToBoundingBox_ = function (shape, boundingBox) {
    var temp = new Array(shape.length);
    for (var i = 0; i < shape.length; i++) {
      temp[i] = [shape[i][0] * boundingBox.width + boundingBox.startX, shape[i][1] * boundingBox.height + boundingBox.startY];
    }
    return temp;
  };

  tracking.LBF.similarityTransform_ = function (shape1, shape2) {
    var center1 = [0, 0];
    var center2 = [0, 0];
    for (var i = 0; i < shape1.length; i++) {
      center1[0] += shape1[i][0];
      center1[1] += shape1[i][1];
      center2[0] += shape2[i][0];
      center2[1] += shape2[i][1];
    }
    center1[0] /= shape1.length;
    center1[1] /= shape1.length;
    center2[0] /= shape2.length;
    center2[1] /= shape2.length;

    var temp1 = tracking.Matrix.clone(shape1);
    var temp2 = tracking.Matrix.clone(shape2);
    for (var i = 0; i < shape1.length; i++) {
      temp1[i][0] -= center1[0];
      temp1[i][1] -= center1[1];
      temp2[i][0] -= center2[0];
      temp2[i][1] -= center2[1];
    }

    var covariance1, covariance2;
    var mean1, mean2;

    var t = tracking.Matrix.calcCovarMatrix(temp1);
    covariance1 = t[0];
    mean1 = t[1];

    t = tracking.Matrix.calcCovarMatrix(temp2);
    covariance2 = t[0];
    mean2 = t[1];

    var s1 = Math.sqrt(tracking.Matrix.norm(covariance1));
    var s2 = Math.sqrt(tracking.Matrix.norm(covariance2));

    var scale = s1 / s2;
    temp1 = tracking.Matrix.mulScalar(1.0 / s1, temp1);
    temp2 = tracking.Matrix.mulScalar(1.0 / s2, temp2);

    var num = 0,
      den = 0;
    for (var i = 0; i < shape1.length; i++) {
      num = num + temp1[i][1] * temp2[i][0] - temp1[i][0] * temp2[i][1];
      den = den + temp1[i][0] * temp2[i][0] + temp1[i][1] * temp2[i][1];
    }

    var norm = Math.sqrt(num * num + den * den);
    var sin_theta = num / norm;
    var cos_theta = den / norm;
    var rotation = [
      [cos_theta, -sin_theta],
      [sin_theta, cos_theta],
    ];

    return [rotation, scale];
  };

  tracking.LBF.RandomForest = function (forestIndex) {
    this.maxNumTrees = tracking.LBF.RegressorData[forestIndex].max_numtrees;
    this.landmarkNum = tracking.LBF.RegressorData[forestIndex].num_landmark;
    this.maxDepth = tracking.LBF.RegressorData[forestIndex].max_depth;
    this.stages = tracking.LBF.RegressorData[forestIndex].stages;

    this.rfs = new Array(this.landmarkNum);
    for (var i = 0; i < this.landmarkNum; i++) {
      this.rfs[i] = new Array(this.maxNumTrees);
      for (var j = 0; j < this.maxNumTrees; j++) {
        this.rfs[i][j] = new tracking.LBF.Tree(forestIndex, i, j);
      }
    }
  };

  tracking.LBF.Tree = function (forestIndex, landmarkIndex, treeIndex) {
    var data = tracking.LBF.RegressorData[forestIndex].landmarks[landmarkIndex][treeIndex];
    this.maxDepth = data.max_depth;
    this.maxNumNodes = data.max_numnodes;
    this.nodes = data.nodes;
    this.landmarkID = data.landmark_id;
    this.numLeafnodes = data.num_leafnodes;
    this.numNodes = data.num_nodes;
    this.maxNumFeats = data.max_numfeats;
    this.maxRadioRadius = data.max_radio_radius;
    this.leafnodes = data.id_leafnodes;
  };
})();
