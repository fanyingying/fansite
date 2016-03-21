/* wedding2.js
 */

(function($) {
    $(document).ready(function() {
        mainContent = $('#main-content');
        wrapper = $('#wrapper');
        PAGE_HEIGHT = mainContent.height();
        maxPages = wrapper.find('div.page').size();
        currentList = 0;
        speed = 500;

        var bindEvents = {
            initSwipe: function() {

                wrapper.height(PAGE_HEIGHT * maxPages);
                wrapper.find('.page').css('height', PAGE_HEIGHT + 'px');

                wrapper.swipe({
                    triggerOnTouchEnd: true,
                    swipeStatus: swipeStatus,
                    allowPageScroll: "vertical",
                    threshold: 75,
                });

                /**
                 * Catch each phase of the swipe.
                 * move : we drag the div
                 * cancel : we animate back to where we were
                 * end : we animate to the next image
                 */
                function swipeStatus(event, phase, direction, distance) {
                    if (phase == "end") {
                        if (direction == "down") {
                            downPage();
                        } else if (direction == "up") {
                            upPage();
                        }
                    }
                } 
                function downPage() { 
                    currentList = Math.max(currentList - 1, 0);
                    bindEvents.scrollList(PAGE_HEIGHT * currentList, speed); 
                }

                function upPage() {
                    
                    currentList = Math.min(currentList + 1, maxPages - 1); 
                    bindEvents.scrollList(PAGE_HEIGHT * currentList, speed); 
                }

            },
            scrollList: function(distance, duration) {
                /**
                 * Manually update the position of the imgs on drag
                 */
                wrapper.css("transition-duration", (duration / 1000).toFixed(1) + "s");
                //inverse the number we set in the css
                var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
                /* if (value==0) {
                    alert('sss');
                 }*/

                wrapper.css("transform", "translate(0," + value + "px)");
            }
        }


        var onReady = function() {
            //去掉Loading动画
            $('body').css("background", "none");
            $('.loader').hide();
            //显示主体
            mainContent.show();
            //注册翻页事件
            bindEvents.initSwipe();
            /*$('#btnPageDown').click(OnPageDown);
            $('#btnPageUp').click(OnPageUp);

            $('#paneMain').vxcSlider({
                animateType: 'default',
                isVertical: true,
                preventDef: false,
                slideEvt: 0, //滑动
                duration: 0.5,
                OnSetIndex: OnSetMainSliderIndex,
                panes: ['paneCover', 'paneInvite', 'panePhoto', 'paneV', 'paneMap', 'paneReply', 'paneNav']
            });
            $('#panePhoto').vxcPhoto({
                width: paneMain.clientWidth,
                height: paneMain.clientHeight,
                animateType: 'tile',
                isVertical: false,
                preventDef: true,
                slideEvt: 1
            });
            $('#paneInvite').vxcInfo();
            $('#paneVideo').vxcVideo({
                btnPlay: 'btnVideoPlay',
                play_url: "http://v.youku.com/v_show/id_XNzQxNzUzMTE2.html"
            });
            $('#paneMusic').vxcAudio({
                btn: "btnAudio"
            });
            $("#paneReply").vxcReply({
                idReplyList: "replyList",
                btnReply: "btnReply"
            });
            infoEdit
                .main.cover = $('#paneCover')[0];
            infoEdit.main.photo = $('#panePhoto')[0];
            infoEdit.main.base = $('#paneInvite')[0];
            infoEdit.main.map = $('#paneMap')[0];
            infoEdit.main.video = $('#paneVideo')[0];
            infoEdit.main.music = $('#paneMusic')[0];
            infoEdit.main.paneMain = $('#paneMain')[0];
            infoEdit.main.reply = $("#paneReply")[0];
            infoEdit.main.win = window;
            //文档禁止 touchmove事件
            document.touchstart = function(e) {
                e.preventDefault();
            };*/
        }
        var SetPaneList = function(list) {
            var $imgUl = $('#paneMain ul#ulList');
            var $ulHide = $('#paneMain ul#ulHide');
            //  $imgUl.children().detach().appendTo($ulHide);
            if (typeof(list) == 'number' && list == 0)
                var names = ['paneCover', 'paneInvite', 'panePhoto', 'paneMap', 'paneReply'];
            else if (typeof(list) == 'number' && list == 1)
                var names = ['paneCover', 'paneInvite', 'panePhoto', 'paneNav', 'paneV', 'paneMap', 'paneReply'];
            else
                var names = list;
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                var $pane = $ulHide.find('#' + name);
                var $li = $pane.parent();
                $li.detach();
                $li.appendTo($imgUl);
            }
            //  $ulHide.children().css('visibility','hidden');
            infoEdit.main.paneMain.UpdateSlideNum();
            infoEdit.main.paneMain.SetIndex(0);
        }

        function OnPageDown(evt) {
            //  Out("OnPage y="+(infoEdit.main.paneMain.sliderIndex+1));
            $(this).text(''); //去掉"点击开启"
            infoEdit.main.paneMain.Slide(infoEdit.main.paneMain.sliderIndex + 1, 0, 1);
        }

        function OnPageUp(evt) {
            //  Out("OnPage y="+(infoEdit.main.paneMain.sliderIndex-1));
            infoEdit.main.paneMain.Slide(infoEdit.main.paneMain.sliderIndex - 1, 0, 1);
        }

        function PutPhoto($img, item, mode, h, w) {
            var rImg;
            if (h / item.imgHeight < w / item.imgWidth)
                rImg = mode == 'cover' ? w / item.imgWidth : h / item.imgHeight;
            else
                rImg = mode == 'cover' ? h / item.imgHeight : w / item.imgWidth;

            var x = (w - item.imgWidth * rImg) / 2;
            var y = (h - item.imgHeight * rImg) / 2;
            $img.css({
                height: item.imgHeight * rImg,
                width: item.imgWidth * rImg,
                left: x,
                top: y
            });

            if (item.x == undefined) item.x = 0;
            if (item.y == undefined) item.y = 0;
            if (item.deg == undefined) item.deg = 0;
            if (item.scale == undefined) item.scale = 1;
            $img[0].style.webkitTransform = $img[0].style.MozTransform = 'translateZ(0) translateX(' + (item.x * w)
                //  $img[0].style.webkitTransform=$img[0].style.MozTransform= 'translateX(' + (item.x*w) 
                + 'px)  translateY(' + (item.y * h) + 'px) rotateZ(' + item.deg + 'deg)  scale(' + item.scale + ')';
            $img[0].style.webkitTransition = $img[0].style.MozTransition = '0s ease-out';
        }




        onReady();
    }); // End document ready
})(this.jQuery);
