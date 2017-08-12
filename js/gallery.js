$(document).ready(function(){
    var showGaleryView = function(){
        $('.gallery-view').fadeIn(250);
        $('.img-container-view').append('<img class="img-view">');
        $('.button-close-view').on('click', function(){
            $('.gallery-view').fadeOut(250, function(){
                $('.img-view').remove();
                $('.button-next').off();
                $('.button-previous').off();
            });
            $(document).unbind('keydown');
        });
        $(document).on('keydown', function(event){
            if(event.which == 27){
                $('.gallery-view').fadeOut(250, function(){
                    $('.img-view').remove();
                    $('.button-next').off();
                    $('.button-previous').off();
                });
                $(document).unbind('keydown');
            }
        });
    }

    var setImageAttributes = function(image, imageIndex, allImagesLength){
        $('.img-view').fadeOut(250, function(){
            var bigImageSrc = image.attr('src').replace('_min.', '.');
            var bigImageAlt = image.attr('alt');
            $('.img-view').attr('src', bigImageSrc).attr('alt', bigImageAlt);
            $('.img-view').on('load', function(){
                $('.img-view').fadeIn(250);
            });
        });
        var thisImage = (imageIndex+1).toString();
        $('.img-number').text(thisImage+" / "+allImagesLength);
    }

    var setGalleryImage = function(allImages, smallImage){
        var currentImageIndex = allImages.index(smallImage);
        setImageAttributes(smallImage, currentImageIndex, allImages.length);
        var nextImage;
        $('.button-next').on('click', function(){
            currentImageIndex++;
            if(currentImageIndex >= allImages.length) currentImageIndex = 0;
            nextImage = allImages.eq(currentImageIndex);
            setImageAttributes(nextImage, currentImageIndex, allImages.length);
        })
        $('.button-previous').on('click', function(){
            currentImageIndex--;
            if(currentImageIndex < 0) currentImageIndex = allImages.length - 1;
            nextImage = allImages.eq(currentImageIndex);
            setImageAttributes(nextImage, currentImageIndex, allImages.length);
        })
        $(document).on('keydown', function(event){
            if(event.which == 39){
                $('.button-next').trigger('click');
            }
            else if(event.which == 37){
                $('.button-previous').trigger('click');
            }
        })
    }
    
    $('.gallery__img').on('click', function(){
        var smallImage = $(this);
        var parentList = $(this).parent().parent().attr('id');
        var allImages = $('#'+parentList +" .gallery__img");
        showGaleryView();
        setGalleryImage(allImages, smallImage);
    })
})
