var upyun="http://invite.b0.upaiyun.com";
//var themeDir='/theme/01/';
var bHttps = window.location.href.substr(0,5)=='https';
var themeDir=(bHttps?'https':'http')+'://invite.b0.upaiyun.com/theme/01/';

(function($) { 
function Ani(param)
{
 	this._animateFunc(param);	
}

function aDefault(_li,_offset,_duration) 
{
	if(!_li)
		return ;
	_li.style.webkitTransform = _li.style.MozTransform ='translateZ(0) translate' + this.axis + '(' + (_offset) + 'px)';
	_li.style.webkitTransition = _li.style.MozTransition = _duration +'s ease-out';
}
function AniDefault(_p) 
{
	//Ani
	if(_p.dir > 0)
	{//右
		if(_p.bSwitchPage)
		{
			this.Show(_p.idxPrev,true);
 			this.aDefault(_p.liPrev,-this.scale,0);
			this.aDefault(_p.li,_p.offsetNew,_p.duration);	
			this.aDefault(_p.liNext,_p.offsetNew + this.scale,_p.duration);	
		}
		else
		{
			this.aDefault(_p.li,_p.offsetNew,_p.duration);	
			this.aDefault(_p.liPrev,_p.offsetNew - this.scale,_p.duration);	
		}
	}
	else if(_p.dir < 0)
	{//左
		if(_p.bSwitchPage)
		{
			this.Show(_p.idxNext,true);
			this.aDefault(_p.liPrev, _p.offsetNew - this.scale,_p.duration);	
			this.aDefault(_p.li, _p.offsetNew,_p.duration);	
 			this.aDefault(_p.liNext,this.scale,0);
		}
		else
		{
			this.aDefault(_p.li,_p.offsetNew,_p.duration);	
			this.aDefault(_p.liNext,_p.offsetNew + this.scale,_p.duration);	
		}
	}
	else
	{
		this.aDefault(_p.liPrev,_p.offsetNew - this.scale,_p.duration);	
		this.aDefault(_p.li,_p.offsetNew,_p.duration);	
		this.aDefault(_p.liNext,_p.offsetNew + this.scale,_p.duration);	
	}
	
}
function aTile(_li,_offset,_deg,_zIndex,_duration) 
{
	var s=0.95-Math.abs(_offset/this.scale)*0.2;
	_li.style.webkitTransform = _li.style.MozTransform = 'translateZ(0) translateX(' + (_offset) + 'px) scale('+s+') rotateZ('+_deg+'deg)';
	_li.style.webkitTransition = _li.style.MozTransition =_duration +'s ease-out';
	_li.style.zIndex=_zIndex;
}
function AniTile(_p) 
{
//	return ;
	if(!_p.bSwitchPage)
	{
		this.aTile(_p.liPrev,0,0,1,_p.duration);	
		this.aTile(_p.li,_p.offsetNew,1.6-(_p.offsetNew/this.scale)*15,3,_p.duration);	
		this.aTile(_p.liNext,0,3.2,2,_p.duration);	
	}
	else
	{
			var off = _p.offsetNew + _p.dir* this.scale;
			_p.liPrev.style.webkitTransition = _p.liPrev.style.MozTransition =_p.duration +'s ease-out';
			_p.liPrev.style.webkitTransform = _p.liPrev.style.MozTransform = 'translateZ(0) scale(0.95) translateX(' + off + 'px) rotateZ('+(1.6-(off/this.scale)*15)+'deg)';
			_p.liPrev.style.zIndex=1;
			_p.liPrev.style.visibility='hidden';
			_p.li.style.webkitTransition = _p.li.style.MozTransition = '0.3s ease-out '+_p.duration+'s';
			_p.li.style.webkitTransform = _p.li.style.MozTransform = 'translateZ(0) scale(0.95) translateX(0px) rotateZ(1.6deg)';
			_p.li.style.zIndex=3;
			_p.liNext.style.webkitTransition = _p.liNext.style.MozTransition = '0.3s ease-out '+_p.duration+'s';
			_p.liNext.style.webkitTransform = _p.liNext.style.MozTransform = 'translateZ(0) scale(0.95) translateX(' + (0) + 'px) rotateZ(0deg)';
			_p.liNext.style.visibility='visible';
			_p.liNext.style.zIndex=2;
	}
}
function AniTileInit(enter)
{
	var imgUl = this.imgUl;
	var idxPrev = (this.sliderIndex - 1 + this.numSlide) % this.numSlide;
	var idxNext = (this.sliderIndex + 1 + this.numSlide) % this.numSlide;
	var li = imgUl.children[this.sliderIndex];
	var liPrev = imgUl.children[idxPrev];
	var liNext = imgUl.children[idxNext];
	if(this.numSlide < 3) liPrev=undefined;
	if(this.numSlide < 2) liNext=undefined;
	if(this.numSlide < 1) li=undefined;
	if(!enter)
	{
		if(liPrev)
		{
			liPrev.style.webkitTransform=liPrev.style.MozTransform="rotateZ(30deg) scale(3) translate(180%,70%)";
			liPrev.style.webkitTransition =liPrev.style.MozTransition = '0s ease-out';
		}
		if(li)
		{
			li.style.webkitTransform=li.style.MozTransform="rotateZ(30deg) scale(3) translate(180%,70%)";
			li.style.webkitTransition =li.style.MozTransition = '0s ease-out';
		}
		if(liNext)
		{
			liNext.style.webkitTransform=liNext.style.MozTransform="rotateZ(30deg) scale(3) translate(180%,70%)";
			liNext.style.webkitTransition=liNext.style.MozTransition = '0s ease-out';
		}
	}
	else
	{
		if(liPrev)
		{
			liPrev.style.webkitTransition=liPrev.style.MozTransition= '0.6s ease-out 0.5s';
			liPrev.style.webkitTransform=liPrev.style.MozTransform="translateZ(0) translate(0,0) scale(0.95) rotateZ(0deg)";
			liPrev.style.zIndex=1;
			liPrev.style.visibility='visible';
		}
		if(liNext)
		{
			liNext.style.webkitTransform=liNext.style.MozTransform="translateZ(0) translate(0,0) scale(0.95) rotateZ(3.2deg)";
			liNext.style.webkitTransition=liNext.style.MozTransition= '0.6s ease-out 1s';
			liNext.style.zIndex=2;
			liNext.style.visibility='visible';
		}
		if(li)
		{
			li.style.webkitTransform=li.style.MozTransform="translateZ(0) translate(0,0) scale(0.95) rotateZ(1.6deg)";
			li.style.webkitTransition=li.style.MozTransition= '0.6s ease-out 1.5s';
			li.style.zIndex=3;
			li.style.visibility='visible';
		}
	}

}
function aRotate(dom, axis, scale, i, offset) 
{
	var rotateDirect = (axis == "X") ? "Y" : "X";
	var absoluteOffset = Math.abs(offset);
	var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
	if (this.isVertical){ offset = -offset; }
	
	this.wrap.style.webkitPerspective = scale * 4;
	
	if (i == 1) 
	{
		dom.style.zIndex = scale - absoluteOffset;
	} 
	else 
	{
		dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
	}
	
	dom.style.backgroundColor = bdColor || '#333';
	dom.style.position = 'absolute';
	dom.style.webkitBackfaceVisibility = 'hidden';
	dom.style.webkitTransformStyle=dom.style.MozTransformStyle= 'preserve-3d'; 
	dom.style.webkitTransform=dom.style.MozTransform= 'rotate' + rotateDirect + '(' + 90 * (offset/scale + i - 1)+ 'deg) translateZ(' + (0.888 * scale/2) + 'px) scale(0.888)';
}

function aFlip(dom, axis, scale, i, offset) 
{
	var offset = this.offset;
	var idx = this.sliderIndex;
	var idxPrev = (idx - 1 + this.numSlide) % this.numSlide;
	var idxNext = (idx + 1 + this.numSlide) % this.numSlide;
	var imgUl = this.imgUl;
	var $li = $(imgUl.children[idx]);
	var $liPrev = $(imgUl.children[idxPrev]);
	var $liNext = $(imgUl.children[idxNext]);
	
	var rotateDirect = this.isVertical ? "X" : "Y";
	var $liRotate = $li;
	if(offset < -this.scale/2)
	{
		$liPrev.hide();
		$liNext.show();
		$li.hide();
		var deg = offset/this.scale*180+180;
		$liNext[0].style.webkitTransform=$liNext[0].style.MozTransform= 'translateZ('+ (this.scale/2)+'px) rotate' + rotateDirect + '(' + deg+ 'deg) scale(0.875)';
		$liNext[0].style.webkitBackfaceVisibility=$liNext[0].style.MozBackfaceVisibility= 'hidden';
	}
	else if(offset > this.scale/2)
	{
		$liPrev.show();
		$liNext.hide();
		$li.hide();
		var deg = offset/this.scale*180+180;
		$liPrev[0].style.webkitTransform = 'translateZ('+ (this.scale/2)+'px) rotate' + rotateDirect + '(' + deg+ 'deg) scale(0.875)';
		$liPrev[0].style.webkitBackfaceVisibility = 'hidden';
	}
	else
	{
		$liPrev.hide();
		$liNext.hide();
		$li.show();
		var deg = (offset/this.scale*180);
		$li[0].style.webkitTransform = 'translateZ('+ (this.scale/2)+'px) rotate' + rotateDirect + '(' + deg+ 'deg) scale(0.875)';
		$li[0].style.webkitBackfaceVisibility = 'hidden';
	}
	$li[0].style.transitionDuration= this.dur +'s';
	$liNext[0].style.transitionDuration= this.dur +'s';
	$liPrev[0].style.transitionDuration= this.dur +'s';
}

function aDepth(dom, axis, scale, i, offset) 
{
	var rotateDirect = (axis == "X") ? "Y" : "X";
	var zoomScale = (4 - Math.abs(i - 1)) * 0.15;
	
	this.wrap.style.webkitPerspective = scale * 4;
	
	if (i == 1) 
	{
		dom.style.zIndex = 100;
	} 
	else 
	{
		dom.style.zIndex = (offset > 0) ? (1 - i) : (i - 1);
	}
	
	dom.style.webkitTransform=dom.style.MozTransform= 'scale('+ zoomScale + ', '+ zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
}

function aTear(dom, axis, scale, i, offset) 
{
	var rotateDirect = (axis == "X") ? "Y" : "X";
	var zoomScale = 1 - (Math.abs(i - 1) * 0.2);
	
	this.wrap.style.webkitPerspective = scale * 4;
	
	if (i == 1) 
	{
	   dom.style.zIndex = 100;
	} 
	else 
	{
	   dom.style.zIndex = (offset > 0) ? (1 - i) : (i - 1);
	}
	
	dom.style.webkitTransform=dom.style.MozTransform= 'scale('+ zoomScale + ', '+ zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
}

//enable damping when slider meet the edge
function _setUpDamping() 
{
/*    var oneIn2 = this.scale >> 1;
    var oneIn4 = oneIn2 >> 1;
    var oneIn16 = oneIn4 >> 2;

    this._damping = function (distance) 
    {
        var dis = Math.abs(distance);
        var result;

        if (dis < oneIn2) {
            result = dis >> 1;
        } else if (dis < oneIn2 + oneIn4) {
            result = oneIn4 + ((dis - oneIn2) >> 2);
        } else {
            result = oneIn4 + oneIn16 + ((dis - oneIn2 - oneIn4) >> 3);
        }

        return distance > 0 ? result : -result;
    };
*/    
};
function AddPage(html)
{
	var $li = $('<li idx='+(this.numSlide+1)+'>');
	$li.append($(html));
	var $this = $(this);
	this.imgUl.appendChild($li[0]);
	this.UpdateSlideNum();
	this.OnSize();
}

function DelPage(name)
{
	var $content =$(this.imgUl).find('li #'+name);
	var $li=$content.parent();
	$li.remove();
	this.UpdateSlideNum();
	this.SetIndex(0);
}
function Slide(_idx,_offsetNew,_duration) 
{
	if(this.numSlide <= 1)
		return ;
	_idx = (_idx + this.numSlide)%this.numSlide;
	
	//隐藏页面
	var imgUl = this.imgUl;
	var idxOld = this.sliderIndex;
	var dir = 0;
	if(this.offset != 0)	//this.offset在mouse中记录
		dir = this.offset > 0 ? 1 : -1;
	if(_idx != idxOld && this.offset == 0) //直接调用Slide翻页时offset=0，要这样判断方向
		dir = (_idx -idxOld + this.numSlide) % this.numSlide < this.numSlide/2 ? -1 : 1; //方向
	var bSwitchPage = idxOld != _idx; //是否翻到新的一页
	var idxPrevOld = (_idx - 1 + this.numSlide) % this.numSlide;
	var idxNextOld = (_idx + 1 + this.numSlide) % this.numSlide;

	//参数
	var type = this.animateType;
	var li = imgUl.children[_idx];
	var idxPrev = (_idx - 1 + this.numSlide) % this.numSlide;
	var idxNext = (_idx + 1 + this.numSlide) % this.numSlide;
	var liPrev = imgUl.children[idxPrev];
	var liNext = imgUl.children[idxNext];
	var namePos = this.isVertical ? "top":"left";
	var left = $(imgUl).offset().left;
	var top = $(imgUl).offset().top;
	var w = this.scale;
	var axis = this.axis;
	this.sliderIndex = _idx;

	//bSwitchPage=true为不翻页
	this.Ani({li:li,liPrev:liPrev,liNext:liNext,
		idxPrev:idxPrev,idx:_idx,idxNext:idxNext
		,duration:_duration,offsetNew:_offsetNew
		,dir:dir,bSwitchPage:bSwitchPage});
	if(bSwitchPage)
		this.OnSetIndex && this.OnSetIndex();

};

function UpdateSlideNum()
{
	var imgUl=this.imgUl;
	this.numSlide = imgUl.children.length;	
}
//如果有loader，则调用loader.OnLazyLoad
function LazyLoad(_idxPage)
{
	if(!this.loader)
		return ;
	var imgUl=this.imgUl;
	this.numSlide = imgUl.children.length;
	var idxPage = (_idxPage + this.numSlide)% this.numSlide;
	var li = imgUl.children[idxPage];
	if(!li)
		return ;
	var div =li.firstElementChild; 
	if(div.firstElementChild)
	{
		var tagName=div.firstElementChild.tagName;
		if(tagName != 'img' && tagName != 'IMG')
			return; //预先填充的东西
	} 
	var bLazyLoad = $(div).attr('lazyLoaded'); //lazyLoaded图片是否完成加载
	if(bLazyLoad)
		return ;
	var bLoad = this.loader.OnLazyLoad(idxPage,div); //调用外部的OnLazyLoad填充url地址
	if(bLoad)
		$(div).attr('lazyLoaded','true');
	
}
function Show(idx,bShow)
{
	var i = (idx + this.numSlide)%this.numSlide;
	var li = this.imgUl.children[i];
	if(bShow)
		li.style.visibility='visible';
	else
		li.style.visibility='hidden';
}

function OnSize()
{
	var imgUl = this.imgUl;
	this.numSlide = imgUl.children.length;
	imgUl.style.width = this.width + 'px';
	imgUl.style.height = this.height + 'px';

	for(var i = 0; i <this.numSlide;i++)
	{
		var li = imgUl.children[i];
		li.style.width = this.width + 'px';
		li.style.height = this.height + 'px';
		var cont = li.firstElementChild;
		if(cont==undefined)
			i = i;
		cont.style.width = this.width + 'px';
		cont.style.height = this.height + 'px';
	}
	this.SetIndex(this.sliderIndex);
}

function SetIndex(_idx)
{
	if(this.numSlide == 0)
		return ;
	//lazy load三张图片
	if(this.loader)
	{
		this.LazyLoad(_idx);
		this.LazyLoad(_idx-1);
		this.LazyLoad(_idx+1);
		this.LazyLoad(_idx-2);
		this.LazyLoad(_idx+2);
	}
	
	this.sliderIndex=_idx;
	var imgUl = this.imgUl;
	var type = this.animateType;
	var idxPrev = (this.sliderIndex - 1 + this.numSlide) % this.numSlide;
	var idxNext = (this.sliderIndex + 1 + this.numSlide) % this.numSlide;
	var li = imgUl.children[this.sliderIndex];
	var liPrev = imgUl.children[idxPrev];
	var liNext = imgUl.children[idxNext];
	var namePos = this.isVertical ? "top":"left";
	var left = $(imgUl).offset().left;
	var top = $(imgUl).offset().top;
	var w = this.scale;
	var axis = this.axis;

	//不能用display:none这样会使里面大小为0，没法计算布局
	for(var i = 0; i <this.numSlide;i++)
	{
		var liCur = imgUl.children[i];
		liCur.style.webkitTransform=liCur.style.MozTransform= 'translateZ(0) translate' + this.axis + '(' + (this.scale) + 'px)';
		liCur.style.webkitTransition=liCur.style.MozTransition= '0s ease-out';
		if(i == _idx || i== idxPrev || i == idxNext)
			liCur.style.visibility='visible';
		else
			liCur.style.visibility='hidden';
	}
	
	this.Ani({li:li,liPrev:liPrev,liNext:liNext,
		idxPrev:idxPrev,idx:this.sliderIndex,idxNext:idxNext
		,duration:0,offsetNew:0
		,dir:0,bSwitchPage:1});
}

//pause autoplay
function Pause() 
{
 //   clearInterval(this.autoPlayTimer);
};

function OnMouseDown(evt) 
{
 	var self = evt.data;
 	self.numMv = 0;
	var bInput = evt.target.tagName=='INPUT' ||evt.target.tagName=='TEXTAREA';
	if(bInput)
		return;
		
 	self.bDrag = true;
	self.Pause();
	self.onslidestart && self.onslidestart();
	
	self.startTime = new Date().getTime();
	self.startX = evt.clientX;
	self.startY = evt.clientY;
	self.offset = 0;
	if(self.preventDef)
		evt.preventDefault();
};

function OnMouseMv(evt) 
{
	var self = evt.data;
 	self.numMv ++;
	var numSlide = self.numSlide;
	if (!self.bDrag)
		return; 
   	
	if(self.preventDef)
		evt.preventDefault();
	//回调函数
	self.onslide && self.onslide();
	
//	var offset = evt['client' + axis] - self['start' + axis];
	var axis = self.axis;
	var start = axis=='X'?self.startX : self.startY;
	var offset = evt['client' + axis] - start;
	if (!self.isLooping) 
	{
		if (offset > 0 && self.sliderIndex === 0 || offset < 0 && self.sliderIndex === numSlide - 1) 
			offset = self._damping(offset);
	}
	self.offset = offset;
//	console.log('touchMv offset='+offset);
	self.Slide(self.sliderIndex,self.offset,0);
//	evt.stopPropagation();	
	
};

function OnMouseUp(evt) 
{
	var self = evt.data;
	if(self.preventDef)
		evt.preventDefault();

   self.bDrag = false;
   var boundary = self.scale / 3; //多少产生翻页
   var metric = self.offset;
   var endTime = new Date().getTime();

   //a quick slide time must under 300ms
   //a quick slide should also slide at least 14 px
   boundary = endTime - self.startTime > 300 ? boundary : 14;

	var idxNew = self.sliderIndex;
	if (metric >= boundary) 
		idxNew = self.sliderIndex - 1;
	else if (metric < -boundary) 
		idxNew = self.sliderIndex + 1;
	if(self.animateType=='tile' && (metric >= boundary || metric < -boundary))
		idxNew = self.sliderIndex + 1;
	idxNew = (idxNew + self.numSlide) % self.numSlide;
 	var dur = self.duration*(self.scale - Math.abs(self.offset))/self.scale;
	self.Slide(idxNew,0,dur);
	
	//lazy load三张图片
	if(self.loader)
	{
		var idx = self.sliderIndex;
		self.LazyLoad(idx);
		self.LazyLoad(idx-1);
		self.LazyLoad(idx+1);
		self.LazyLoad(idx-2);
		self.LazyLoad(idx+2);
	}
	
};

function OnTouchStart(evt) 
{
 	var self = evt.data;
 	self.numMv = 0;
	var bInput = evt.target.tagName=='INPUT' ||evt.target.tagName=='TEXTAREA';
	if(bInput)
		return true;
		
 	self.bDrag = true;
	self.Pause();
	self.onslidestart && self.onslidestart();
	
	self.startTime = new Date().getTime();
	self.startX = evt.clientX;
	self.startY = evt.clientY;
	self.startX = evt.originalEvent.targetTouches[0].pageX;
	self.startY = evt.originalEvent.targetTouches[0].pageY;
	self.offset = 0;
//	console.log('touch start');
	if(self.preventDef)
		evt.preventDefault();
};

function OnTouchMove(evt) 
{
 	var self = evt.data;
 	self.numMv ++;
//	console.log('mvNum'+self.numMv);
	evt.preventDefault();
	var numSlide = self.numSlide;
	if (!self.bDrag)
		return; 
  	
	//回调函数
	self.onslide && self.onslide();
	
	var axis = self.axis;
	var offset = evt.originalEvent.targetTouches[0]['page' + axis] - self['start' + axis];
//	console.log('touchMv:'+offset);
	if (!self.isLooping) 
	{
		if (offset > 0 && self.sliderIndex === 0 || offset < 0 && self.sliderIndex === numSlide - 1) 
			offset = self._damping(offset);
	}
	self.offset = offset;
	self.Slide(self.sliderIndex,self.offset,0);
};

function OnTouchEnd(evt) 
{
	var self = evt.data;
	Out('End'+self.numMv);
	var bInput = evt.target.tagName=='INPUT' ||evt.target.tagName=='TEXTAREA';
	if(bInput)
		return true;
	evt.preventDefault();

   self.bDrag = false;
   var boundary = self.scale / 3; //多少产生翻页
   var metric = self.offset;
   var endTime = new Date().getTime();

   //a quick slide time must under 300ms
   //a quick slide should also slide at least 14 px
   boundary = endTime - self.startTime > 300 ? boundary : 14;

	var idxNew = self.sliderIndex;
	if (metric >= boundary) 
		idxNew = self.sliderIndex - 1;
	else if (metric < -boundary) 
		idxNew = self.sliderIndex + 1;
	if(self.animateType=='tile' && (metric >= boundary || metric < -boundary))
		idxNew = self.sliderIndex + 1;
	idxNew = (idxNew + self.numSlide) % self.numSlide;
 	var dur = self.duration*(self.scale - Math.abs(self.offset))/self.scale;
	self.Slide(idxNew,0,dur);
	
	//lazy load三张图片
	if(self.loader)
	{
		var idx = self.sliderIndex;
		self.LazyLoad(idx);
		self.LazyLoad(idx-1);
		self.LazyLoad(idx+1);
		self.LazyLoad(idx-2);
		self.LazyLoad(idx+2);
	}
//	console.log('idx='+self.sliderIndex);
	
};

function OnOrientationChange(evt) 
{
	setTimeout(function() 
	{
	self.reset();
	self.log('Event: orientationchange');
	},100);
};

function Create(_opts)
{
	$.extend(this,_opts);
	$this = $(this);
	this.axis = this.isVertical ? 'Y' : 'X';
	if(!this.width) //当this为hide时需要显式指定
		this.width = this.clientWidth;
	if(!this.height)
		this.height = this.clientHeight;
	this.ratio = this.height / this.width;
	this.scale = this.isVertical ? this.height : this.width;
	this.imgUl=this.firstElementChild;
	this.imgUl.bDrag=false;
	this.offset = 0;
	this.sliderIndex = 0;
	
	var _animateFuncs = {
		'default':this.AniDefault
		,'tile':this.AniTile
		};	
	this._animateFunc = (this.animateType in _animateFuncs) 
		? _animateFuncs[this.animateType]: _animateFuncs['default'];
	
	//加入pane
	if(this.panes)
		for(var i =0;i< this.panes.length;i++)
		{
			var name = this.panes[i];
			var $pane = $('#'+name);
			var $li = $('<li idx='+i+'>');
			$li.append($pane);
			var $this = $(this);
			this.imgUl.appendChild($li[0]);
		}
	this.dur = 0;
		
	//event
	var imgUl = this.imgUl;
	if(this.slideEvt)
	{
		$(imgUl).bind('touchstart',this,this.OnTouchStart);
		$(imgUl).bind('touchmove',this,this.OnTouchMove);
		$(imgUl).bind('touchend',this,this.OnTouchEnd);
//		$(imgUl).bind('orientationchange',this,this.OnOrientationChange);
		$(imgUl).bind('mousedown',this,this.OnMouseDown);
		$(imgUl).bind('mousemove',this,this.OnMouseMv);
		$(imgUl).bind('mouseup',this,this.OnMouseUp);
	}
	
	this.OnSize();
};

$.fn.vxcSlider= function(_opts,showDrop)
{
	var defaults ={duration:0.3,preventDef:false,isVertical:false,sliderIndex:-1,isLooping:true
		,OnSize:OnSize,Ani:Ani,Show:Show,UpdateSlideNum:UpdateSlideNum,DelPage:DelPage,AddPage:AddPage
		,aDefault:aDefault,aRotate:aRotate,aFlip:aFlip,aDepth:aDepth,aTear:aTear
		,AniDefault:AniDefault,AniTile:AniTile,aTile:aTile,AniTileInit:AniTileInit
		,SetIndex:SetIndex,Pause:Pause,Slide:Slide,LazyLoad:LazyLoad
		,OnTouchStart:OnTouchStart,OnTouchMove:OnTouchMove,OnTouchEnd:OnTouchEnd,OnOrientationChange:OnOrientationChange
		,OnMouseDown:OnMouseDown,OnMouseMv:OnMouseMv,OnMouseUp:OnMouseUp};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.Create = Create;
		this.Create(opts,showDrop);
	});	
};   
})(jQuery);	
function Out(msg) {$('#msg').text(msg);}
//mainInfo-------------------------------------------------------------------------------------------------->
function Info_______________________(){};
(function($) { 
function Create(_opts,showDrop)
{
	$.extend(this,_opts);
	$this = $(this);
	
	var $thisPane = $this;
}

//mon:月 mday:月的哪一天 wday:星期几 
//time:10:10
//ctime:上午10点10分
//date:2015年10月10日
//dateS:2015-10-10
//
function Update()
{
	var base = infoEdit.baseInfo;
	var $this = $(this);
	$('.groomName').text(base.groomName);
	$('.brideName').text(base.brideName);
	if(base.weddingTitle)
		$('#weddingTitle').text(base.weddingTitle);
	if(base.weddingText)
		$('.weddingText').text(base.weddingText);
	var d = new Date(infoEdit.baseInfo.weddingDate.replace(/-/g, "/"));
	var m = d.getMonth()+1;
//	var year = 1900+d.getYear();  ////////////////
	var year = d.getFullYear();
	if(year > 3000)
		year-= 1900;
	$('.year').text(year);
	$('.mon').text(m);
	var mday = d.getDate();
	$('.mday').text(mday);
	var wday = d.getDay();
	var s=['日','一','二','三','四','五','六','日',''];
	$('.wday').text('星期'+s[wday]);
	var min=d.getMinutes();
	if(min < 10) min = '0'+min;
	var t = d.getHours()+':'+min;
	$('.time').text(t);
	var hour=d.getHours();
	var ct = (hour>12? '下午':'上午')+(hour>12?hour-12:hour)+'点'+min+'分';
	if(hour==18 && min==18)
		ct='18点18分';
	$('.ctime').text(ct);
	var da = (1900+d.getYear())+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
	$('.date').text(da);
	var da = (1900+d.getYear())+'-'+(d.getMonth()+1)+'-'+d.getDate();
	$('.dateS').text(da);
	var cdate = (d.getMonth()+1)+'月'+d.getDate()+'日';
	$('.cdate').text(cdate);
	$('.cday').text('农历'+GetLunarDay(1900+d.getYear(),m,mday));
	$this.find('#weddingText').text(base.weddingText);
	$this.find('.hotelName').text(base.hotelName);
	$this.find('.address').text(base.address);
	$('.phoneGroom').text(base.phoneGroom);
	$('.phoneBride').text(base.phoneBride);
	$('#phoneGroom').attr("href","tel:"+base.phoneGroom);
	$('#phoneBride').attr("href","tel:"+base.phoneBride);
	
	//插入logo 
	$('#campName').remove();
	if(base.campName)
	{
		var html=unescape(base.campName);
		var $logo;
		if(html.substr(0,1)=='<')
			$logo =$(html);
		else
			$logo =$('<div id="campName">'+html+'</div>');
		$('#paneInvite').append($logo);
	}
}
var   lunarInfo=new   Array(   
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,   
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,   
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,   
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,   
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,   
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,   
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,   
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,   
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,   
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,   
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,   
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,   
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,   
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,   
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0) ;  
  
var   solarMonth=new   Array(31,28,31,30,31,30,31,31,30,31,30,31);   
var   Gan=new   Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");   
var   Zhi=new   Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");   
var   Animals=new   Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");   
var   solarTerm   =   new   Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至") ;  
var   sTermInfo   =   new   Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);   
var   nStr1   =   new   Array('日','一','二','三','四','五','六','七','八','九','十');  
var   nStr2   =   new   Array('初','十','廿','卅','　');   
var   monthName   =   new   Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");   
function   lYearDays(y)   {   
      var   i,   sum   =   348;   
      for(i=0x8000;   i>0x8;   i>>=1)   sum   +=   (lunarInfo[y-1900]   &   i)?   1:   0;   
      return(sum+leapDays(y));   
}   
function   leapDays(y)   {   
      if(leapMonth(y))     
      	return((lunarInfo[y-1900]   &   0x10000)?   30:   29);   
      else   return(0);   
}   
function   leapMonth(y)   {   
      return(lunarInfo[y-1900]   &   0xf);   
}   
function   monthDays(y,m)   {   
      return(   (lunarInfo[y-1900]   &   (0x10000>>m))?   30:   29   );   
}   
function   Lunar(objDate)   {   
  
      var   i,   leap=0,   temp=0;   
      var   baseDate   =   new   Date(1900,0,31);   
      var   offset       =   (objDate   -   baseDate)/86400000;   
  
      this.dayCyl   =   offset   +   40;   
      this.monCyl   =   14;   
  
      for(i=1900;   i<2050   &&   offset>0;   i++)   {   
            temp   =   lYearDays(i);   
            offset   -=   temp;   
            this.monCyl   +=   12;   
      }   
  
      if(offset<0)   {   
            offset   +=   temp;   
            i--;   
            this.monCyl   -=   12;   
      }   
  
      this.year   =   i;   
      this.yearCyl   =   i-1864;   
  
      leap   =   leapMonth(i);   //闰哪个月   
      this.isLeap   =   false;   
  
      for(i=1;   i<13   &&   offset>0;   i++)   {   
            //闰月   
            if(leap>0   &&   i==(leap+1)   &&   this.isLeap==false)   
                  {   --i;   this.isLeap   =   true;   temp   =   leapDays(this.year);   }   
            else   
                  {   temp   =   monthDays(this.year,   i);   }   
  
            //解除闰月   
            if(this.isLeap==true   &&   i==(leap+1))   this.isLeap   =   false;   
  
            offset   -=   temp;   
            if(this.isLeap   ==   false)   this.monCyl   ++;   
      }   
  
      if(offset==0   &&   leap>0   &&   i==leap+1)   
            if(this.isLeap)   
                  {   this.isLeap   =   false;   }   
            else   
                  {   this.isLeap   =   true;   --i;   --this.monCyl;}   
  
      if(offset<0){   offset   +=   temp;   --i;   --this.monCyl;   }   
  
      this.month   =   i;   
      this.day   =   offset   +   1;   
}   
function   solarDays(y,m)   {   
      if(m==1)   
            return(((y%4   ==   0)   &&   (y%100   !=   0)   ||   (y%400   ==   0))?   29:   28);   
      else   
            return(solarMonth[m]);   
}   
function   cyclical(num)   {   
      return(Gan[num%10]+Zhi[num%12]);   
}   
  
function   cDay(d){   
      var   s;   
      switch   (d)   {   
            case   10:   
                  s   =   '初十';   break;   
            case   20:   
                  s   =   '二十';   break;   
                  break;   
            case   30:   
                  s   =   '三十';   break;   
                  break;   
            default   :   
                  s   =   nStr2[Math.floor(d/10)];   
                  s   +=   nStr1[d%10];   
      }   
      return(s);   
}   
function   cMonth(m){   
      var   s;   
  
      switch   (m)   {   
            case   1:   
                  s   =   '正月';   break;   
            case   2:   
                  s   =   '二月';   break;   
            case   3:   
                  s   =   '三月';   break;   
            case   4:   
                  s   =   '四月';   break;   
            case   5:   
                  s   =   '五月';   break;   
            case   6:   
                  s   =   '六月';   break;   
            case   7:   
                  s   =   '七月';   break;   
            case   8:   
                  s   =   '八月';   break;   
            case   9:   
                  s   =   '九月';   break;   
            case   10:   
                  s   =   '十月';   break;   
            case   11:   
                  s   =   '十一月';   break;   
            case   12:   
                  s   =   '十二月';   break;   
            default   :   
                  break;   
      }   
      return(s);   
}   
  
function   GetLunarDay(YearStr,MonthStr,DayStr)   
{   
  var   sDObj=new   Date(parseInt(YearStr),parseInt(MonthStr)-1,parseInt(DayStr));   
  var   lDObj=new   Lunar(sDObj);           //农历   
  return   cMonth(lDObj.month)+cDay(lDObj.day);   
}  


$.fn.vxcInfo= function(_opts,showDrop)
{
	var defaults ={Update:Update};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.Create = Create;
		this.Create(opts,showDrop);
	});	
};   
})(jQuery);	

//map -------------------------------------------------------------------------------------------------->
(function($) { 
function Map_______________________(){};
function CreateMap(_opts,showDrop)
{
	$.extend(this,_opts);
	var $this =$(this);
	var $div=$this.find('#mapDiv');
	var $img = $div.find('img');
	var $btnFindRoute = $('#btnFindRoute');
	var hScreen = infoEdit.main.hBody;
	var hMapHead = $('#paneMap').height()*0.2;
	var hPhone = $('#tbPhone').height();
	var hMap = hScreen - 20 - hMapHead - hPhone-10;
	$img.height(hMap);
	var divTop = $div.css('top');
	var divLeft = $div.css('left');
	$btnFindRoute.css('top',divTop+'px');
	$btnFindRoute.css('left',0);
	
	$btnFindRoute.bind('click',this,FindRoute);
	
};	
function FindRoute(evt)
{
//	alert("FindRounte");
	var info =infoEdit.map;
	var href= 'http://www.taoxitie.com/mapFrame.htm?id='+infoEdit.userName+'&lng='+info.lng+'&lat='+info.lat+'&name='+escape(info.where);
	window.location.href=href;

//	var self = evt.data;
//	var str = 'http://api.map.baidu.com/marker?location=40.080726,116.301496&zoom=14&output=html&title=%D2%BB%BC%FC%B5%BC%BA%BD&content=123';
//	$('#'+self.mapArea).load(str);
//	var routeSearch=new BMap.RouteSearch();  
//	var start = {};  
//	var end = {latlng:new BMap.Point(infoEdit.map.lng,infoEdit.map.lat),name:infoEdit.baseInfo.hotelName};  
//	var opts = {mode:BMAP_MODE_DRIVING, region:"北京" };  
//	var ss = new BMap.RouteSearch();  
//	routeSearch.routeCall(start,end,opts);
}

function Update()
{
	var map = this.map;
	var mapInfo = infoEdit.map;
	var $this =$(this);
	var $div=$this.find('#mapDiv');
	var $img = $div.find('img');
	var hScreen = $('body').height();
	if(infoEdit.main.isPc && !infoEdit.main.isTop)
		hScreen=480;
	var hMapHead = $('#paneMap').height()*0.2;
	var hPhone = $('#tbPhone').height();
	var wMap = 320;
	if(infoEdit.main.isPc)
		wMap = infoEdit.main.hBody*2/3;
	var hMap = hScreen - 20 - hMapHead - hPhone-10;
	var $div=$this.find('#mapDiv');
	if(mapInfo.zoom > 18)
		mapInfo.zoom = 18; //否则无法显示
	var src='http://api.map.baidu.com/staticimage?width='
		+wMap+'&height='+hMap
		+'&center='+mapInfo.lng+','+mapInfo.lat+'&zoom='+mapInfo.zoom
		+'&scale=2&markers='+mapInfo.lng+','+mapInfo.lat+'&markerStyles=l,A,0xff0000';
	if(mapInfo.imgUrl)
	{
		if(mapInfo.imgUrl.substr(0,1)=='/')
			src = upyun+mapInfo.imgUrl;
		else
			src = upyun+'/'+infoEdit.userName.substr(0,1)+'/'+infoEdit.userName+'/'+mapInfo.imgUrl;
	}
	console.log('Map:screen='+hScreen+' head='+hMapHead+' phone='+hPhone+' map='+hMap);
	$img.attr('src',src);
	$img.height(hMap);
	
}
$.fn.vxcMap= function(_opts,showDrop)
{
	var defaults ={Update:Update};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.CreateMap = CreateMap;
		this.CreateMap(opts,showDrop);
	});	
};   
})(jQuery);

//photo -------------------------------------------------------------------------------------------------->
(function($) { 
function Photo_______________________(){};
function CreatePhoto(_opts,showDrop)
{
	$.extend(this,_opts);
	this.loader = this;
	var $this =$(this);
	$this.vxcSlider(_opts);
	
	var $img = $('<img class="my-story" src="'+upyun+'/cover/img151.png" >');
	$this.append($img);
};	

//首先进行cover或contain缩放并居中放置，然后在此基础上进行scale和rotate变换
//x,y是相对于框的相对偏移
function PutPhoto($img,item,$div,mode,_h)
{
	var w = $div.width();
	var h = $div.height();
	if(_h != undefined)
		h = _h;
	var rImg;
	if(h/item.imgHeight < w/item.imgWidth)
		rImg= mode=='cover'?w/item.imgWidth :h/item.imgHeight;
	else
		rImg= mode=='cover'?h/item.imgHeight: w/item.imgWidth;

	var x = (w - item.imgWidth*rImg)/2;
	var y = (h - item.imgHeight*rImg)/2;
	if($img[0]==undefined)
		return ; //lazy load的img
	$img[0].style.position="absolute";
	$img.css({height:item.imgHeight*rImg,width:item.imgWidth*rImg,left:x,top:y});
	
	if(item.x == undefined) item.x = 0;
	if(item.y == undefined) item.y = 0;
	if(item.deg == undefined) item.deg = 0;
	if(item.scale == undefined) item.scale = 1;
	$img[0].style.webkitTransform=$img[0].style.MozTransform= 'translateZ(0) translateX(' + (item.x*w) 
		+ 'px)  translateY(' + (item.y*h) + 'px) rotateZ('+item.deg+'deg)  scale('+item.scale+')';
	$img[0].style.webkitTransition=$img[0].style.MozTransition= '0s ease-out';
}
function OnLazyLoad(idx,div)
{
	if(!infoEdit.imgList)
		return false;
	var $ul = $(div).parent().parent();
	
	//item,rImg
	var item=infoEdit.imgList[idx];
	var h = $ul.height();
	var w = $ul.width();
	var rImg;
	if(h/item.imgHeight < w/item.imgWidth)
		rImg= h/item.imgHeight;
	else
		rImg= w/item.imgWidth;

	//$img
	var imgUrl = upyun+'/'+infoEdit.userName.substr(0,1)+'/'+infoEdit.userName+'/'+item.imgUrl;
	if(infoEdit.userName=='tester')
		imgUrl=upyun+item.imgUrl;
	var $img = $('<img src="'+imgUrl+'"/>');
	$(div).append($img);
	$(div).height(h);
	$(div).width(w);
	
	var x = (w - item.imgWidth*rImg)/2;
	var y = (h - item.imgHeight*rImg)/2;
	$img[0].style.position="relative";
	$img.css({height:item.imgHeight*rImg,width:item.imgWidth*rImg,left:x,top:y});
	
	if(item.x == undefined) item.x = 0;
	if(item.y == undefined) item.y = 0;
	if(item.deg == undefined) item.deg = 0;
	if(item.scale == undefined) item.scale = 1;
	$img[0].style.webkitTransform=$img[0].style.MozTransform= 'translateZ(0) translateX(' + (item.x*$img.width()) 
		+ 'px)  translateY(' + (item.y*$img.height()) + 'px) rotateZ('+item.deg+'deg)  scale('+item.scale+')';
	$img[0].style.webkitTransition=$img[0].style.MozTransition= '0s ease-out';
	
//	console.log('imgUrl='+url);
//	div.style.backgroundPosition="center center";
//	div.style.backgroundImage="url("+item.imgUrl+")";
//	div.style.backgroundRepeat="no-repeat";
//	div.style.backgroundSize="cover";
	return true;
}

//图片url在OnLazyLoad时传入
function Update()
{
	var slider = $('#panePhoto')[0];
	var imgUl = slider.imgUl;
	var $imgUl = $(imgUl);
	$imgUl.find('li').remove();
	var numPhoto = infoEdit.imgList.length;
	for(var i = 0;i < numPhoto;i++)
	{
		var str = '<li><div idx="'+i+'"></div></li>';
		var $li = $(str);
		$imgUl.append($li);
	}
	slider.UpdateSlideNum();
//	slider.sliderIndex = -1;
	slider.SetIndex(0);
}
$.fn.vxcPhoto= function(_opts,showDrop)
{
	var defaults ={Update:Update,OnLazyLoad:OnLazyLoad,PutPhoto:PutPhoto};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.CreatePhoto = CreatePhoto;
		this.CreatePhoto(opts,showDrop);
	});	
};   
})(jQuery);

//music -------------------------------------------------------------------------------------------------->
//this.bReady
//this.musicUrl
//this.musicType
(function($) { 
function Music_______________________(){};
function Create(_opts,showDrop)
{
	$.extend(this,_opts);
	var $this =$(this);
	var audio = $('#idAudio')[0];
	var idBtn = '#'+this.btn;
	var $btn = $(idBtn);
	$btn.css({'left':(infoEdit.main.wBody/2+infoEdit.main.w/2-40)+'px','top':(infoEdit.main.h/4)+'px'});
	this.AudioOn=false;
	$btn.bind('click',this,OnPlayAudio);
}
function Update()
{
//	console.log('updatMusic='+infoEdit.music.url);
	//stop
	var $this = $(this);
	var audio = $('#idAudio')[0];
	if(infoEdit.music && infoEdit.music.url)
	{
		if(infoEdit.music.urlOld != infoEdit.music.url)
		{
			audio.pause();
			var url='http://ws.stream.qqmusic.qq.com/'+infoEdit.music.url+'.m4a?fromtag=30';
			if(infoEdit.music.custom)
				url = upyun+'/'+infoEdit.userName.substr(0,1)+'/'+infoEdit.userName+'/'+infoEdit.music.url;
			audio.src =url;
			audio.load();
		}
		infoEdit.music.urlOld= infoEdit.music.url;
	}
	PlayAudio(true);
	
}
function OnPlayAudio(evt)
{
	var btn = this;
	var $btn = $(this);
	var self = evt.data;
	var $self = $(self);
	self.PlayAudio(!infoEdit.main.music.AudioOn);
			
}
function PlayAudio(_bPlay)
{
	console.log('playAudio '+_bPlay+' url='+infoEdit.music.url);
	var $this=$(this);
	var idBtn = '#'+this.btn;
	var $btn = $('#btnAudio');
	var audio = $('#idAudio')[0];
	if(!_bPlay)
	{
		audio.pause();
		infoEdit.main.music.AudioOn = false;
		$btn.attr('class','stop');
//		$btn.css('background-position','left bottom');
	}
	else
	{
		audio.play();
		infoEdit.main.music.AudioOn = true;
//		$btn.css('background-position','0px 1px');
		$btn.attr('class','on');
	}
};
function PlayTry(bPlay,md5)
{
	var audio = $('#idAudio')[0];
	var $this=$(this);
	var url='http://ws.stream.qqmusic.qq.com/'+md5+'.m4a?fromtag=30';
	audio.src =url;
	audio.load();
	PlayAudio(bPlay);
};
$.fn.vxcAudio= function(_opts,showDrop)
{
	var defaults ={PlayAudio:PlayAudio,Update:Update,OnPlayAudio:OnPlayAudio,PlayTry:PlayTry};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.Create = Create;
		this.Create(opts,showDrop);
	});	
};   
})(jQuery);

//video -------------------------------------------------------------------------------------------------->
(function($) { 
function Video_______________________(){};
function Create(_opts,showDrop)
{
	$.extend(this,_opts);
	var $this =$(this);
	
	var $btnPlay = $('#'+this.btnPlay);
	$btnPlay.css({'left':(infoEdit.main.wBody/2+infoEdit.main.w/2-40)+'px','top':(infoEdit.main.h/4 + 40)+'px'});
	$btnPlay.bind('click',this,OnShowPane);
	this.videoOn=false;
	
	var $btnClose=$this.find('#btnVideoClose');
	$btnClose.bind('click',this,OnClose);
};	
function OnShowPane(evt)
{
	var self = infoEdit.main.video;
	if(infoEdit.video.url==undefined)
		return ;
	self.ShowPane();
}
function ShowPane()
{
	var $this = $(this);
	var $playArea= $this.find('#videoArea');
	if(this.videoOn)
	{
		this.CloseVideo();
		this.videoOn=false;
	}

	//html
	var info = infoEdit.video;
	var cat=info.cat;
	$playArea[0].src = info.url;

	var $btnPlay = $('#'+this.btnPlay);
	$this.css({width:infoEdit.main.w,height:infoEdit.main.h});
	$playArea.css({width:infoEdit.main.w,height:infoEdit.main.h});
	$this.show();
	$btnPlay.show();
	this.videoOn=true;
	
	infoEdit.main.music.PlayAudio(false);

}
function Update()
{
}
function OnClose(evt)
{
	var self = evt.data;
	self.CloseVideo();
}
//this是btnPlay
function CloseVideo()
{
	var $this = $(this);
	var $playArea= $this.find('#videoArea');
	$this.hide();
	$playArea[0].src ='';
	this.videoOn=false;
	infoEdit.main.music.PlayAudio(true);
	

}
$.fn.vxcVideo= function(_opts,showDrop)
{
	var defaults ={ShowPane:ShowPane,Update:Update,CloseVideo:CloseVideo,OnShowPane:OnShowPane};
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.Create = Create;
		this.Create(opts,showDrop);
	});	
};   
})(jQuery);
//reply -------------------------------------------------------------------------------------------------->
(function($) { 
function Reply_______________________(){};
var ayFace={xihuan:'喜欢',zan:'赞',aiqing:'爱情',chaopiao:'钞票',dangao:'蛋糕',daohe:'道贺',geili:'给力',gongxi:'恭喜'
	,guzhang:'鼓掌',hongbao:'红包',huaixiao:'坏笑',meigui:'玫瑰',qinqin:'亲亲',shuai:'帅',xieshou:'携手',xiqing:'喜庆'
	,zuanjie:'钻戒'};

function CreateReply(_opts,showDrop)
{
	$.extend(this,_opts);
	var $this = $(this);

	$this.find('#btnReplySend').bind('click',this,OnSend);
	
	var $faces=$('#faces');
	var tArea = $('#senderText')[0]; 
	var num = $faces.children().length;
	for(var name in ayFace)
	{
		var $node = $('<img name="'+name+'" src="'+upyun+'/imgs/face/'+name+'.gif" style="cursor:pointer"/>');
		$faces.append($node);
		$node.bind('click',tArea,OnAddFace);
	}

};	

function Reply_Load()
{
	var self = this;
	this.replyList=new Array(0);
	$.post('/php/info.php',{cmd:'replyLoad',userName:infoEdit.userName},function (data, textStatus, jqXHR)
	{
		self.Reply_Show(data);
	});
}

function Reply_Show(_data)
{
	//list,numAll
	var list = _data.split('[replyName]');
	var numReply = list.length;
	var numAll = 0;
	this.replyList=[];
	for(var i = 1; i <numReply; i ++)
	{
		var listItem = list[i].split('[replyText]');
		var nameCount = listItem[0];
		var listNameCount = nameCount.split('[count]');
		var count='';
		if(listNameCount.length==1)
			name=listNameCount[0];
		else
		{
			name=listNameCount[0];
			count=listNameCount[1];
		}
		if(count=='待定'||count==''||count=='不出席')
			count='';
		else
		{
			numAll += parseInt(count);
			count='('+count+')';
		}
		var reply = listItem[1];
		var item = {name:unescape(name),reply:unescape(reply),count:count};
		this.replyList.push(item);
	}
	$('#replyClientAll').text('出席总人数：'+numAll+'人');
	
	//显示回帖
	numReply = this.replyList.length;
	var $replyList = $('#replyList');
	$replyList.html('');
	for(var i =0;i< numReply;i++)
	{
		var item = this.replyList[i];
		//替换表情
		var t = item.reply;
		for(var n in ayFace)
		{
			var str = '\\\['+ayFace[n]+'\\\]';
			t=t.replace(new RegExp(str,'g'),'<img class="replyFace" src="'+upyun+'/imgs/face/'+n+'.gif">');
		}
		
		var str = '<div class="replyMsg">'
			+'<span class="replyName">来自<cite>'+ item.name + '</cite>的回执:'+item.count+'</span><br>'
			+'<span class="replyText">'+t+'</span>'
			+'</div>';
		var $div = $(str);
		$replyList.append($div);
	}
}
function OnAddFace(evt)
{
	var tArea = evt.data;
	var $btn = $(evt.target);
	var name= $btn.attr('name');
	var str = '['+ayFace[name]+']';
	
	if (tArea.selectionStart || tArea.selectionStart == '0') 
	{  
		var startPos = tArea.selectionStart;  
		var endPos = tArea.selectionEnd;  
		tArea.selectionEnd = tArea.selectionStart = startPos;
		startPos = tArea.selectionStart;
		endPos = tArea.selectionEnd;  
		var scrollTop = tArea.scrollTop;  
		tArea.value = tArea.value.substring(0, startPos) + str + tArea.value.substring(endPos,tArea.value.length);  
		tArea.focus();  
		tArea.selectionEnd = tArea.selectionStart = startPos + str.length;  
		tArea.scrollTop = scrollTop;  
	} 
	
}

function OnSend(evt)
{
	var $this = $(evt.data);
	var self = evt.data;
	var replyName = $this.find('#senderName').val();
	var replyText = $this.find('#senderText').val();
	var replyClientCount = $("#replyClientCount").val();
	if(replyName==''||replyText=='')
	{
		alert('姓名或留言不能为空');
		return;
	}
	replyText +='\r\n';
	
	var info = {cmd:'replyAppend',userName:infoEdit.userName,replyName:replyName,replyText:replyText,count:replyClientCount
		,esc:escape(replyText)};
	$.post('/php/info.php',info,function (data, textStatus, jqXHR)
	{
		self.Reply_Show(data);
		alert('祝福发送成功');
	});
}
$.fn.vxcReply= function(_opts,showDrop)
{
	var defaults ={Reply_Load:Reply_Load,Reply_Show :Reply_Show };
	var opts = $.extend(defaults, _opts);	
	return this.each(function () 
	{
		this.CreateReply=CreateReply;
		this.CreateReply(opts,showDrop);
	});	
};   
})(jQuery);
//main -------------------------------------------------------------------------------------------------->
function Eff_______________________(){};
function CreateEff(idx)
{
	$('#effBox').remove();
	var $box = $('<div id="effBox"></div>');
	if(idx==0)
	{
	}
	else if(idx==1)
	{//云
		$box.addClass("CloudBg");
		for (var i = 0; i < 12; i++) 
			$box.append('<i></i>');
	}
	else if(idx==5)
	{//花
		$box.addClass("FlowerBg");
		for (var i = 0; i < 12; i++) 
			$box.append('<i></i>');
	}
	else
	{
		var names=['huaban','paopao','leaf','snow','snow'];
		var name = names[idx-2];
		for (var i = 0; i < 20; i++) 
			$box[0].appendChild(createALeaf(name));
	}
	$(infoEdit.main.cover).append($box);
	
}
function randomInteger(low, high)
{
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high)
{
    return low + Math.random() * (high - low);
}
function pixelValue(value)
{
    return value + 'px';
}
function durationValue(value)
{
    return value + 's';
}
function createALeaf(name)
{
	var leafDiv = document.createElement('div');
	var image = document.createElement('img');
	/* Randomly choose a leaf image and assign it to the newly created element */
	image.src = upyun+'/eff/'+name + randomInteger(1, 5) + '.png';
	leafDiv.style.top = "-100px";
	/* Position the leaf at a random location along the screen */
	leafDiv.style.left = pixelValue(randomInteger(0, 500));
	/* Randomly choose a spin animation */
	var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
	/* Set the -webkit-animation-name property with these values */
	leafDiv.style.webkitAnimationName = 'fade, drop';
	image.style.webkitAnimationName = spinAnimationName;
	/* Figure out a random duration for the fade and drop animations */
	var fadeAndDropDuration = durationValue(randomFloat(5, 11));
	/* Figure out another random duration for the spin animation */
	var spinDuration = durationValue(randomFloat(4, 8));
	/* Set the -webkit-animation-duration property with these values */
	leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
	var leafDelay = durationValue(randomFloat(0, 5));
	leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
	image.style.webkitAnimationDuration = spinDuration;
	// add the <img> to the <div>
	leafDiv.appendChild(image);
	/* Return this img element so it can be added to the document */
	return leafDiv;
}



//main -------------------------------------------------------------------------------------------------->
function Main_______________________(){};
function CreateWx()
{
	if(!infoEdit.main.isPc)
	{
		var thisUrl = window.location.href;
		var imgUrl="http://invite.b0.upaiyun.com/cover/bg"+infoEdit.theme+"_0.jpg";
		if(infoEdit.imgList.length > 0)
		{
			var item = infoEdit.imgList[0];
			imgUrl = upyun+'/'+infoEdit.userName.substr(0,1)+'/'+infoEdit.userName+'/'+item.imgUrl;
		}
		var text=infoEdit.baseInfo.weddingText;
		var title=infoEdit.baseInfo.weddingTitle;
		if(!title)
			title=infoEdit.baseInfo.groomName+'&'+infoEdit.baseInfo.brideName+'的婚礼';
		title=title.replace('\'','\\\'');
		$.post('/php/wxShare.php',{url:thisUrl,imgUrl:imgUrl,title:title,text:text}
		,function OnRet(_str, textStatus, jqXHR)
		{
			try{
			}
			catch(e) 
				{alert("获取sign失败");return ;}
			var $s=$(_str);
			$('head').append($s);
		});
	}
	
}
var idxOld=-1;
function Login(_userName)
{
//	console.log('Login user='+_userName);
	var userName = infoEdit.userName == undefined ? 'tester':infoEdit.userName;
	if(_userName != undefined)	
		userName = _userName;
	var theme = infoEdit.theme == undefined ? 0:infoEdit.theme;
	console.log('Login user='+userName+' theme='+theme);
	var postfix=(infoEdit.main.isPc?'?cat=pc':'?cat=mob')+(infoEdit.main.isTop?'&top=1':'&top=0')+'&t='+theme+'&u='+userName;
	$.post('/php/info.php'+postfix,{cmd:'infoGet',userName:userName,theme:theme}
	,function OnRet(_str, textStatus, jqXHR)
	{
		try{
			var data = JSON.parse(_str);
		}
		catch(e) 
			{alert("读取用户信息失败");return ;}
		if(!data.baseInfo)
		{
			alert("登录失败");
			return ;
		}
		if(userName != 'tester' && !infoEdit.main.isTop)
			alert("登录成功");
			
		//缺省值
		$.extend(infoEdit,data);
		var info=infoEdit.baseInfo;
		if(info.groomName==undefined)	info.groomName='';
		if(info.brideName==undefined)	info.brideName='';
		if(info.hotelName==undefined)	info.hotelName='';
		if(info.phoneGroom==undefined)	info.phoneGroom='';
		if(info.phoneBride==undefined)	info.phoneBride='';
		if(info.address==undefined)	info.address='';
		if(!infoEdit.baseInfo.weddingText)
			infoEdit.baseInfo.weddingText="在这温馨浪漫，喜悦甜蜜的日子里我们俩决定于【时间】举行结婚典礼，届时敬备酒宴，欢迎您到来分享这份喜悦，您的光临将使我们的婚宴增添万分光彩!";
		if(infoEdit.baseInfo.weddingDate==undefined)
			infoEdit.baseInfo.weddingDate="2016-1-1";
		if(!infoEdit.map || !infoEdit.map.lng)
			infoEdit.map={"pro":"1","city":"东城区","where":"天安门","lng":116.403993,"lat":39.914891,"zoom":15};
		if(!infoEdit.video || !infoEdit.video.cat)
			infoEdit.video={"cat":"youku","url":"","page":""};
		if(!infoEdit.music)
			infoEdit.music={"type":"mp3","url":"","title":"","author":""};
		if(!infoEdit.theme)
			infoEdit.theme=0;
				
		//加载
		infoEdit.userName=userName;
		infoEdit.main.reply.Reply_Load();
		Theme_Load(infoEdit.theme);
		CreateWx();
	}).error(function() { alert("登录失败-网络"); });
}
function OnSetMainSliderIndex()
{
	var idx = this.sliderIndex;
	$('#paneMain >ul >li').removeClass('activeItem');
	var $pane = $('#paneMain').find('>ul>li:nth('+idx+')');
	$pane.addClass('activeItem');
	
	var bPhoto = $pane.find('>div').attr('id')=='panePhoto';
	if(!bPhoto)
		infoEdit.main.photo.AniTileInit(false);
	if(bPhoto && idxOld != idx)
		infoEdit.main.photo.AniTileInit(true);
//	else
//		$('#photoHint').removeClass('ActivePhotoHint');
	if(idx==4)
		infoEdit.main.map.Update();
	idxOld = idx;
}
function OnTabChange(id) //由edit调用
{
	var nameInMain={Template:'paneCover',InfoEdit:'paneInvite',Photo:'panePhoto',Music:'paneCover'
	,Map:'paneMap',Eff:'paneCover',Video:'paneVideo'};
	var name=nameInMain[id];
	var list=$('#paneMain >#ulList >li>div');
	var idx=-1;
	for(var i=0;i<list.length;i++)
		if($(list[i]).attr('id')==name)
			idx=i;
	var sliderMain=$('#paneMain')[0];
	if(idx!=-1)
		sliderMain.SetIndex(idx);
	if(id== 'Video')
		infoEdit.main.video.ShowPane();
	else
		infoEdit.main.video.CloseVideo();
}
function OnNavL(evt)
{
	var idx=0;
	var list=$('#paneMain >#ulList >li>div');
	for(var i=0;i<list.length;i++)
		if($(list[i]).attr('id')=='paneReply')
			idx=i;
	infoEdit.main.paneMain.Slide(idx,0,0);
}
function OnNavR(evt)
{
	var idx=0;
	var list=$('#paneMain >#ulList >li>div');
	for(var i=0;i<list.length;i++)
		if($(list[i]).attr('id')=='paneMap')
			idx=i;
	infoEdit.main.paneMain.Slide(idx,0,0);
}
function OnPageDown(evt)
{
//	Out("OnPage y="+(infoEdit.main.paneMain.sliderIndex+1));
	$(this).text(''); //去掉"点击开启"
	infoEdit.main.paneMain.Slide(infoEdit.main.paneMain.sliderIndex+1,0,1);
}
function OnPageUp(evt)
{
//	Out("OnPage y="+(infoEdit.main.paneMain.sliderIndex-1));
	infoEdit.main.paneMain.Slide(infoEdit.main.paneMain.sliderIndex-1,0,1);
}
function PutPhoto($img,item,mode,h,w)
{
	var rImg;
	if(h/item.imgHeight < w/item.imgWidth)
		rImg= mode=='cover'?w/item.imgWidth :h/item.imgHeight;
	else
		rImg= mode=='cover'?h/item.imgHeight: w/item.imgWidth;

	var x = (w - item.imgWidth*rImg)/2;
	var y = (h - item.imgHeight*rImg)/2;
	$img.css({height:item.imgHeight*rImg,width:item.imgWidth*rImg,left:x,top:y});
	
	if(item.x == undefined) item.x = 0;
	if(item.y == undefined) item.y = 0;
	if(item.deg == undefined) item.deg = 0;
	if(item.scale == undefined) item.scale = 1;
	$img[0].style.webkitTransform=$img[0].style.MozTransform= 'translateZ(0) translateX(' + (item.x*w) 
//	$img[0].style.webkitTransform=$img[0].style.MozTransform= 'translateX(' + (item.x*w) 
		+ 'px)  translateY(' + (item.y*h) + 'px) rotateZ('+item.deg+'deg)  scale('+item.scale+')';
	$img[0].style.webkitTransition=$img[0].style.MozTransition= '0s ease-out';
}
function Theme_Load(idxTheme)
{
	console.log('Theme_load music='+infoEdit.music.url);
	var ver = new Date().getTime();
	$.get(themeDir+idxTheme+'.htm?t='+ver,{}
	,function OnRet(_str, textStatus, jqXHR)
	{
		try{
			var str = _str;
		}
		catch(e) 
			{alert("读取用户信息失败");return ;}
		//title
		if(infoEdit.baseInfo.weddingTitle)
			$('title').text(infoEdit.baseInfo.weddingTitle);
		else
			$('title').text(infoEdit.baseInfo.groomName+'&'+infoEdit.baseInfo.brideName+'的婚礼');
		//给图片加上路径
		var str1=str.replace(/src=\"((bg|img)\w+\.(jpg|png)\")/g,'src="'+upyun+'/cover/$1"');
		var str1=str1.replace(/src=\'((bg|img)\w+\.(jpg|png)\')/g,'src=\'/cover/$1\'');
		var str1=str1.replace(/url\(\'((bg|img)\w+\.(jpg|png))\'\)/g,'url('+upyun+'/cover/$1)');
		//{H}替换
		var H = infoEdit.main.h;
		var W = infoEdit.main.w;
		var str1=str1.replace(/\{H\}/g,H);
		var str1=str1.replace(/\{W\}/g,W);
		//对{{...}}内的进行eval替换
		var regx=/\{\{[\w\+\-\*\/\.\(\)]*\}\}/g;
		var rs=str1.match(regx);	
		var out=str1;
		for(var i=0;rs && i<rs.length;i++)
		{
			var s = rs[i];
			var exp=s.substring(2,s.length-2);
			var val = eval(exp);
			out=out.replace(s,val);
		}
		//进行字体替换
		var r = infoEdit.main.h/480;
//		alert('r='+r);
		$('html').css('font-size',r.toFixed(1)+'px');
//		out=out.replace(/[0-9]px/g,function(w){return (parseInt(w)*r).toFixed(1)+'px';});
//		out=out.replace(/[0-9]rem/g,function(w){return (parseInt(w)*r).toFixed(1)+'rem';});
		str1=out;

		//切分model,得到html,style,attr
		var list = str1.split('[PAGE ');
		var regEx = new RegExp("\\w+","i");
		for(var i=1;i<list.length;i++) //0为空
		{
			var strModel = list[i];
			var id=strModel.match(regEx)[0];
			var beginHtml = strModel.search(']');
			var html=strModel.substr(beginHtml+2,strModel.length-beginHtml);
			list[i] = {id:id,html:html};
		}
		//加载各个page
		for(i=1;i<list.length;i++) //0为空
		{
			var $page = $('#'+list[i].id);
			$page.removeClass('bigCover').removeClass('bgUp').removeClass('bgLeft1').removeClass('bgLeft');
			$page.html(list[i].html);
		}
		//加载stg的动态项
		for(i=1;i<list.length;i++) //0为空
		{
			var $page = $('#'+list[i].id);
			var stgs = $page.find('.stg');
			for(var x=0;x < stgs.length;x++)
			{
				var stg = stgs[x];
				stg.Update();
			}
		}
		infoEdit.theme = idxTheme;
		infoEdit.main.paneMain.SetIndex(0);
		//设置activeItem
		$('#paneMain').find('li').removeClass('activeItem');
		var $pane = $('#paneMain').find('li[idx=0]');
		$pane.addClass('activeItem');
		//info
		infoEdit.main.base.Update();
		//video
		infoEdit.main.video.Update();
		if(infoEdit.video.url=='')
		{
			$('#btnVideoPlay').hide();
			if(infoEdit.main.isTop)
				$('#paneMain')[0].DelPage('paneV');
		}
		else
			$('#btnVideoPlay').show();
		//photo
		if(infoEdit.userName=='tester')
		{
			infoEdit.imgList=[];
			for(var i=0;i<5;i++)
			{
				var item={imgUrl:'/photo/'+(infoEdit.theme%20)+'_'+i+'.jpg',imgHeight:960,imgWidth:640};
				item.url = upyun + item.imgUrl;
				infoEdit.imgList.push(item);
			}
		}
		
		infoEdit.main.photo.Update();
		if(!infoEdit.main.isPc && infoEdit.imgList.length==0)
			$('#paneMain')[0].DelPage('panePhoto');
//		alert("isPc="+infoEdit.main.isPc+' hide='+infoEdit.map.hide);
		if(!infoEdit.main.isPc && infoEdit.map.hide)
		{
//			alert("delPage");
			$('#paneMain')[0].DelPage('paneMap');
		}
		//music
		infoEdit.main.music.Update();
		//map
		infoEdit.main.map.Update();
	
		//让top元素都可见
		$('.top').css('visibility','visible');
		//特效
		if(!infoEdit.main.isEditM) //初始化时不产生特效
			CreateEff(infoEdit.eff);
		$('.navL').unbind('click').click(OnNavL);
		$('.navR').unbind('click').click(OnNavR);
		$('#divPlay').unbind('click').click(infoEdit.main.video.OnShowPane);
		//Edit update
		if(window.parent != window)
			window.parent.Update('theme');
		//spt
		if(infoEdit.spt != undefined && infoEdit.spt.length>3)
		{
			var spt='<script language="javascript" type="text/javascript" src="'
				+"https://invite.b0.upaiyun.com"+infoEdit.spt+'" charset="utf-8"></script>';
			$('head').append($(spt));
		}
	});
}

function SetPaneList(list)
{
	var $imgUl=$('#paneMain ul#ulList');
	var $ulHide=$('#paneMain ul#ulHide');
//	$imgUl.children().detach().appendTo($ulHide);
	if(typeof(list)=='number' && list==0)
		var names=['paneCover','paneInvite','panePhoto','paneMap','paneReply'];
	else if(typeof(list)=='number' && list==1)
		var names=['paneCover','paneInvite','panePhoto','paneNav','paneV','paneMap','paneReply'];
	else 
		var names = list;
	for(var i =0;i< names.length;i++)
	{
		var name = names[i];
		var $pane = $ulHide.find('#'+name);
		var $li = $pane.parent();
		$li.detach();
		$li.appendTo($imgUl);
	}
//	$ulHide.children().css('visibility','hidden');
	infoEdit.main.paneMain.UpdateSlideNum();
	infoEdit.main.paneMain.SetIndex(0);
}
//应该在获取info之后进行
function CreateMain()
{
	//infoEdit.main.w,infoEdit.main.h
	if(infoEdit.main.isPc)
	{
		if(infoEdit.main.isTop)
		{
			var hBody = $('body').height();
			var wBody = $('body').width();
			infoEdit.main.w = hBody*2/3;
			infoEdit.main.h = hBody;
			infoEdit.main.wBody=wBody;
			infoEdit.main.hBody=hBody;
		}
		else
		{
			infoEdit.main.w = 320;
			infoEdit.main.h = 480;
			infoEdit.main.wBody=320;
			infoEdit.main.hBody=480;
		}
		Out('['+infoEdit.main.w+' '+infoEdit.main.h+']');
	}
	else
	{
		var w=parseInt(window.screen.width);
		var h=parseInt(window.screen.height);
		var hBody = $('body').height();
		var wBody = $('body').width();
		var h1 = document.body.clientHeight;
		var w1 = document.body.clientWidth;
		infoEdit.main.w = wBody;
		infoEdit.main.h= hBody;
		infoEdit.main.wBody = wBody;
		infoEdit.main.hBody = hBody;
		Out('['+w+' '+h+']\r\n['+wBody+' '+hBody+']\r\n['+w1+' '+h1+']');
	}
	var wBody = $('body').width();
	$('#btnPageDown').css({left:(infoEdit.main.wBody/2-50)+'px',top:(infoEdit.main.h-65)+'px'});
	$('#btnPageUp').css({left:(infoEdit.main.wBody/2-50)+'px',top:(5)+'px'});
	$('#btnPageDown').click(OnPageDown);
	$('#btnPageUp').click(OnPageUp);
	$('#btnReply').css({left:(infoEdit.main.w-75)+'px',top:((infoEdit.main.h*0.23-25))+'px'});
	
	var paneMain=$('#paneMain')[0];
	var $paneMain = $(paneMain);
	$paneMain.width(infoEdit.main.w);
	$paneMain.height(infoEdit.main.h);
	
 	$('#paneMap').vxcMap({ln:116.321787,an:40.072566});
	$('#paneMain').vxcSlider({
         animateType: 'default',
         isVertical: true,
         preventDef:false,
			slideEvt:0,//滑动
			duration:0.5,
         OnSetIndex:OnSetMainSliderIndex,
         panes:['paneCover','paneInvite','panePhoto','paneV','paneMap','paneReply','paneNav']
     });
	$('#panePhoto').vxcPhoto({
		width:paneMain.clientWidth,
		height:paneMain.clientHeight,
		animateType: 'tile',
		isVertical:false,
		preventDef:true,
		slideEvt:1
     });
 	$('#paneInvite').vxcInfo();
	$('#paneVideo').vxcVideo({btnPlay:'btnVideoPlay',play_url:"http://v.youku.com/v_show/id_XNzQxNzUzMTE2.html"});
	$('#paneMusic').vxcAudio({btn:"btnAudio"});
	$("#paneReply").vxcReply({idReplyList:"replyList",btnReply:"btnReply" });
	infoEdit.main.cover=$('#paneCover')[0];
	infoEdit.main.photo = $('#panePhoto')[0];
	infoEdit.main.base = $('#paneInvite')[0];
	infoEdit.main.map = $('#paneMap')[0];
	infoEdit.main.video = $('#paneVideo')[0];
	infoEdit.main.music = $('#paneMusic')[0];
	infoEdit.main.paneMain = $('#paneMain')[0];
	infoEdit.main.reply = $("#paneReply")[0];
	infoEdit.main.win=window;
	//文档禁止 touchmove事件
	document.touchstart = function(e){ e.preventDefault(); }; 
}
function OnReady(evt)
{
	console.log('main OnReady');
	//infoEdit
	var pwin=window.parent;
//	var isEditM = pwin.infoEdit.isEditM;
	if(window != pwin && (!pwin.infoEdit || !pwin.infoEdit.isCreateEdit))
		return ; //要在edit构造完执行
	if(window != pwin)
		infoEdit = window.parent.infoEdit;
	else
		infoEdit={userName:'tester',pEdit:{},main:{},slot:{},theme:0};
	//isTop
	var isTop = window.parent==window;
	//reqs
	var url = location.search; //获取url中"?"符后的字串
	var reqs = new Object();
	if (url.indexOf("?") != -1) 
	{
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			reqs[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	//isPc
	var userAgentInfo = navigator.userAgent;  
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");    
	infoEdit.main.isPc = true;    
	for (var v = 0; v < Agents.length; v++) {    
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { infoEdit.main.isPc = false; break; }    
	}  
	
	//userName  
	infoEdit.userName= reqs['id'];
	if(!infoEdit.userName)
		infoEdit.userName='tester';
	console.log('OnInit:userName='+infoEdit.userName);
	
	//theme
	console.log('reqs.t='+reqs.t);
	if(reqs.t!=undefined)
	{
		infoEdit.theme=parseInt(reqs.t);
	}
	//isTop
	infoEdit.main.isTop = window.parent==window;

	//去掉Loading动画
	$('body').css("backgroundImage","none");
	
	//Create
	CreateMain();
	infoEdit.isCreateMain =true;
	
	//登录
	console.log('loginName='+infoEdit.userName);
	Login(infoEdit.userName);
	
}
var B=OnReady;

