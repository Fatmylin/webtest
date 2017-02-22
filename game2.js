 "use strict";

var winResizerHandler = function(){
	var w = $('.cell').width();
	$('.cell').height(w).css({
		'font-size': w + 'px',
		'line-height': w*0.92 + 'px' 
	})
		;
};

 //整理視窗大小，CSS樣式隨著市裝大小改變
 //下面這一航表示開啟葉面時便呼叫函式
 $(window).resize(winResizerHandler);
		  
 winResizerHandler();
 
 
 //點擊框框時要做的事情
 var gameover = true;
 var currentstate = [];
 var symbols = ['&times;','&#9675'];
 var currentstep = 0;
  //勝利的條件
 var winningCombos = 
 {
	 combo0: [0,1,2],
	 combo1: [3,4,5],
	 combo2: [6,7,8],
	 combo3: [0,3,6],
	 combo4: [1,4,7],
	 combo5: [2,5,8],
	 combo6: [0,4,8],
	 combo7: [2,4,6]
 };
 
 //檢查勝利與否
 var potentialcombos = 
 {
	 0: ['combo0','combo3','combo6'],
	 1: ['combo0','combo4'],
	 2: ['combo0','combo5','combo7'],
	 3: ['combo1','combo3'],
	 4: ['combo1','combo4','combo6','combo7'],
	 5: ['combo1','combo5'],
	 6: ['combo2','combo3','combo7'],
	 7: ['combo4','combo2'],
	 8: ['combo2','combo5','combo6']
 };
 
  var showarrow = function(p)
 {
	if(p%2==0)
	{
		$('.player1 > .arrow').removeClass('inv');
		$('.player2 > .arrow').addClass('inv');
	}
	else
	{
		$('.player2 > .arrow').removeClass('inv');
		$('.player1 > .arrow').addClass('inv');
	}
 };
 
var initgame = function()
{
	if (gameover)
	{
		$('.cell').empty().removeClass('win');
		$('ss').text('');
		gameover = false;
		for (var i = 0; i < 9;i++)
		{
			currentstate [i] = null;
		}		
		currentstep = 0;
		showarrow(currentstep);	
	}		
};

initgame();

 var checkcombo = function(a)
 {
	 var a0 = currentstate[a[0]];
	 var a1 = currentstate[a[1]];
	 var a2 = currentstate[a[2]];
	 var w = (a0 === a1 && a1 === a2);
	 if (w)
	 {
		 $('.cell[data-i = "' + a[0] +'"]').addClass('win');
		 $('.cell[data-i = "' + a[1] +'"]').addClass('win');
		 $('.cell[data-i = "' + a[2] +'"]').addClass('win');
		 
	 }
	 return w;
 };
 
 $('.ss').click(function()
 {
	 initgame();
 });
 $('.cell').click(function()
 {
	 
	 if (!gameover)
	 {
		 var $this = $(this);
		 var i = $this.data('i');
		 if (currentstate[i] === null) //檢查員素是否有被按過
		 {//在此同時檢查勝利與否
			 var s = symbols[currentstep++ % 2];
			 currentstate[i] = s;
			 $this.html(s);
			  //檢查點擊之格子的所有獲勝可能
			for (var j = 0, len = potentialcombos[i].length; j < len; j++)
			{
				var ww = winningCombos[potentialcombos[i][j]];
				//透過迴圈去找出點擊框框的potentialCombos 
				//ww用來儲存winningCombos的combo_，ww是陣列
				//ex: 點擊 1 會有 combo0,combo4要檢查
				if (checkcombo(ww))
				{
					gameover = true ;
					$('.ss').text('Press here to start a new game ！');
					return;
				}
			}
			if (currentstep === 9)
			{
				$('.ss').text('Drawl！Press here to start a new game ！');
				gameover = true ;
				return ;
			}
			showarrow(currentstep);
	    }
	 }
	//console.log(i); 
 });
 
 //顯示使用者,透過計步計算使用者是誰


 

 