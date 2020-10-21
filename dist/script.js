// ========== Set the image ==========
// Take the url paste in the input field and append it to the src of #image-pub in the iframe
var imageInput = document.getElementById('ads__image');
imageInput.addEventListener("change", setImage);

function setImage(){
	var iframe = document.querySelectorAll('.ads__item');
	for (var i = 0; i < iframe.length; i++) {
		innerIframe = iframe[i].contentDocument || iframe[i].contentWindow.document;
		(function(){
			var image = innerIframe.getElementById('image-pub-' + iframe[i].id);
			var imageFile = imageInput.files[0],
			reader = new FileReader();
			reader.onloadend = function () {
				image.src = reader.result;
			};
			reader.readAsDataURL(imageFile);
		})();
	}
}

// ========== Set the content ==========
// Take the text typed in the title, text and button input field and append in the iframes
var titleInput = document.getElementById('ads__title');
titleInput.addEventListener("keyup", setTitle);

function setTitle(){
	var iframe = document.querySelectorAll('.ads__item');
	for (var i = 0; i < iframe.length; i++) {
		innerIframe = iframe[i].contentDocument || iframe[i].contentWindow.document;
		var titlePub = innerIframe.getElementById('titre-pub-' + iframe[i].id);
		if (titlePub){
			var titleInputValue = titleInput.value;
			titlePub.innerHTML = titleInputValue;
		}
	}
}
var textInput = document.getElementById('ads__text');
textInput.addEventListener("keyup", setText);

function setText(){
	var iframe = document.querySelectorAll('.ads__item');
	for (var i = 0; i < iframe.length; i++) {
		innerIframe = iframe[i].contentDocument || iframe[i].contentWindow.document;
		var textPub = innerIframe.getElementById('text-pub-' + iframe[i].id);
		if (textPub){
			var textInputValue = textInput.value;
			textPub.innerHTML = textInputValue;
		}
	}
}
var btnTextInput = document.getElementById('ads__cta');
btnTextInput.addEventListener("keyup", setBtnText);

function setBtnText(){
	var iframe = document.querySelectorAll('.ads__item');
	for (var i = 0; i < iframe.length; i++) {
		innerIframe = iframe[i].contentDocument || iframe[i].contentWindow.document;
		var boutonPub = innerIframe.getElementById('bouton-pub-' + iframe[i].id);
		if (boutonPub){
			var btnTextInputValue = btnTextInput.value;
			boutonPub.innerHTML = btnTextInputValue;
		}
	}
}

// ========== Campaign name & Download functions ==========

// Create image from the iframe and download it as .png https://www.npmjs.com/package/dom-to-image
var dwlImage = document.getElementById('btn-Convert-Html2Image');
dwlImage.addEventListener("click", createImage);

function convertToImg(format, node){
	domtoimage.toPng(node)
	.then(function (dataUrl) {
		var filename = document.getElementById("campaign__name").value + '-' + format;
		var link = document.createElement('a');
		link.download = filename + '.png';
		link.href = dataUrl;
		link.click();
	})
	.catch(function (error) {
		console.error('oops, something went wrong!', error);
	});
}

function createImage(){
	var iframe = document.querySelectorAll('.ads__item');
	for (var i = 0; i < iframe.length; i++) {
		innerIframe = iframe[i].contentDocument || iframe[i].contentWindow.document;
		var node = innerIframe.getElementById('content-holder');
		var format = node.className;
		convertToImg(format, node);
	}
}
