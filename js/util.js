(function(orbium) {
	orbium.Util = {};

	orbium.Util.preventPanning = function(event) {
		event.preventDefault();
	};

	orbium.Util.withinRect = function(xcheck, ycheck, xpos, ypos, width, height) {
		if (xcheck >= xpos && xcheck <= xpos+width) {
			if (ycheck >= ypos && ycheck <= ypos+height) {
				return true;
			}
		}

		return false;
	};

	orbium.Util.addArrayElement = function(array, element) {
		array.push(element);
	};

	orbium.Util.setArrayElement = function(idx, array, element) {
		array[idx] = element;
	};

	orbium.Util.removeArrayElement = function(array, element) {
		for (var i=0; i<array.length; i++) {
			if (array[i] == element) {
				array.splice(i, 1);
			}
		}
	};

	orbium.Util.isPG = function() {
		if (typeof Media == "function") {
			return true;
		}

		return false;
	};

	orbium.Util.isUA = function(name) {
		if (navigator.userAgent.indexOf(name) != -1) {
			return true;
		}

		return false;
	};

	orbium.Util.getDevicePixelRatio = function() {
		if (window.devicePixelRatio == undefined) {
			return 1;
		}

		return window.devicePixelRatio;
	};

	orbium.Util.generateUniqeString = function() {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		var arr = [];

		for (var i=0; i<6; i++) {
			arr[i] = chars[0 | Math.random()*chars.length];
		}

		return arr.join("");
	};

	orbium.Util.getRequestParameter = function(name) {
		function getRequestParameters() {
			var result = {};
			var url = window.location.href;
			var parameters = url.slice(url.indexOf("?") + 1).split("&");

			for (var i=0; i<parameters.length; i++) {
				var parameter = parameters[i].split("=");

				result[parameter[0]] = parameter[1];
			}

			return result;
		}

		return getRequestParameters()[name];
	};

	orbium.Util.hasDrawImageScalingBug = function() {
		var iw = 1;
		var ih = 1;

		var img = document.createElement("canvas");
		img.width = iw;
		img.height = ih;

		var ictx = img.getContext("2d");
		ictx.fillStyle = "#ffffff";
		ictx.fillRect(0, 0, iw, ih);

		var bw = 100;
		var bh = 100;

		var buffer = document.createElement("canvas");
		buffer.width = bw;
		buffer.height = bh;

		var bctx = buffer.getContext("2d");
		bctx.clearRect(0, 0, bw, bh);
		bctx.drawImage(img, bw/2, bh/2);

		var imageData = bctx.getImageData(0, 0, bw, bh);
		var sample = imageData.data[bw/2*bw*4+bh/2*4];

		if (sample == 0) {
			return true;
		}

		return false;
	};
}(window.orbium = window.orbium || {}));