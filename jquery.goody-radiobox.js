(function ($) {

    var methods = {
        init: function (options) {

            return this.each(function () {
                var jThis = jQuery(this);
                if ((jThis).hasClass("processed")) {
                    return;
                }
                if(jThis.attr('type') == 'checkbox') {
                    var jTParent = jThis.parent();
                    var jLabel = jThis.next('label');
                    var jLabelTxt = jLabel.html();
                    var jChangeLbl = (jLabel.data("change") || "false") == "true"
                    var jCheckedTxt = jLabel.data("checked") || "Will do"
                    checked = jThis.is(":checked")
                    var grb = jQuery('<span class="goodyCheckbox'+(checked ? ' checked' : '')+'"/>');

                    grb.bind({
                        mouseenter: function(e) {
                            grb.addClass('hover');
                        },
                        mouseleave: function(e) {
                            grb.removeClass('hover');
                        },
                        click: function(e) {
                            if(jThis.is(':checked')) {
                                grb.removeClass('checked');
                                if(jChangeLbl) {
                                    jLabel.html(jLabelTxt);    
                                }
                                jThis.removeAttr('checked');
                            } else {
                                jThis.attr('checked', 'checked');
                                grb.addClass('checked');
                                if(jChangeLbl) {                                
                                    jLabel.html(jCheckedTxt);
                                }
                            }
                        }
                    });

                    jLabel.bind('click', function(e) {
                        e.preventDefault();
                        grb.trigger('click');
                    });

                    jThis.addClass("processed").hide();
                    grb.insertBefore(jThis);
                }

            });

        },

        destroy:function () {

            return this.each(function () {
                $(window).unbind('.goodyRadiobox');
            })

        }
    };

    $.fn.goodyRadiobox = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.goody-radiobox');
        }

    };

})(jQuery);