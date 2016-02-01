
var bingoStart = 1;
var bingoEnd = 75;


function btnClick(){
	if(this.className == 'bingoBtn'){
		this.className = 'bingoBtn on';

		if(newCard)
			addNumber(this.value)
		else
			bingoBallSelect(this.value);
	}else{
		this.className = 'bingoBtn';

		if(newCard)
			removeNumber(this.value)
		else
			bingoBallUnSelect(this.value);
	}
}

function createBingoBall(){
	 modeText = document.createElement('div');
	if(!newCard){
		modeText.className = 'modeText red';
		modeText.innerText = "對獎模式";
	} else{
		modeText.className = 'modeText';
		modeText.innerText = "新增卡片";
	}
	homeDiv.appendChild(modeText);

	var itemPerLine = 10;
	for(var index = bingoStart ; index <= bingoEnd ; index++)
	{
		 var obj = document.createElement('input');
		 obj.type = 'button';
		 obj.className = 'bingoBtn';
		 obj.value = index;
		 obj.onclick = btnClick;

		 homeDiv.appendChild(obj);

		 if(index % itemPerLine == 0)
			homeDiv.appendChild(document.createElement('br'));
		else if(index % 5 == 0){
			var space = document.createElement('span')
			space.innerHTML = '&nbsp;&nbsp;';
			homeDiv.appendChild(space);
		}
	}

	homeDiv.appendChild(document.createElement('br'));
	homeDiv.appendChild(document.createElement('hr'));
}

function bingoBallSelect(ball){
	for(var index = 0 ; index < cards.length ; index++){
		var card = cards[index];

		for(var y = 0 ; y < 5 ; y++){
			for(var x = 0 ; x < 5 ; x++){
				if(card.bingoNums[y][x].innerText != ball) continue;

				if(card.booleans[y][x])
					continue;
				card.bingoNums[y][x].className = card.bingoNums[y][x].className.replace('bingoNum', 'bingoNum on');
				card.booleans[y][x] = true;
			}
		}

		checkBingoLine(card);
	}
}

function bingoBallUnSelect(ball){
	for(var index = 0 ; index < cards.length ; index++){
		var card = cards[index];

		for(var y = 0 ; y < 5 ; y++){
			for(var x = 0 ; x < 5 ; x++){
				if(card.bingoNums[y][x].innerText != ball) continue;

				if(!card.booleans[y][x])
					continue;

				card.bingoNums[y][x].className = card.bingoNums[y][x].className.replace(' on', '');
				card.booleans[y][x] = false;
			}
		}

		checkBingoLine(card);
	}
}

function checkBingoLine(card){
	var line = 0;

	// check --
	for(var y = 0 ; y < 5 ; y++){
		if(card.booleans[y][0] === true && card.booleans[y][1] === true && card.booleans[y][2] === true &&
		card.booleans[y][3] === true && card.booleans[y][4] === true){
			line++;
		}
	}

	//check ||
	for(var x = 0 ; x < 5 ; x++){
		if(card.booleans[0][x] === true && card.booleans[1][x] === true && card.booleans[2][x] === true &&
		card.booleans[3][x] === true && card.booleans[4][x] === true){
			line++;
		}
	}

	//check // and \\
	if(card.booleans[0][0] === true && card.booleans[1][1] === true && card.booleans[2][2] === true &&
	card.booleans[3][3] === true && card.booleans[4][4] === true){
		line++;
	}

	if(card.booleans[4][0] === true && card.booleans[3][1] === true && card.booleans[2][2] === true &&
	card.booleans[1][3] === true && card.booleans[0][4] === true){
		line++;
	}

	if(line == 0) {
		card.cardTitle.innerText = card.no;
	}else{
		if(line < 3)
			card.cardTitle.innerText = card.no + '  -  ' + line + '連線';
		else
			card.cardTitle.innerText = card.no + '  賓果！';
	}

	//BINGO!!!
	if(line >= 3)
	{
		card.rootNode.className = 'cardContainer on';
		card.cardTitle.className = 'cardTitle on';

		for(var y = 0 ; y < 5 ; y++){
			for(var x = 0 ; x < 5 ; x++){
				card.bingoNums[y][x].className = card.bingoNums[y][x].className.replace(' on', ' go');
			}
		}

		setTimeout(function(){
			alert("！！！賓果！！！");
		}, 500);
	} else 	{
		card.rootNode.className = 'cardContainer';

		if(line > 0 && line < 3){
			card.cardTitle.className = 'cardTitle lv'+line;
		} else
			card.cardTitle.className = 'cardTitle';

		for(var y = 0 ; y < 5 ; y++){
			for(var x = 0 ; x < 5 ; x++){
				card.bingoNums[y][x].className = card.bingoNums[y][x].className.replace(' go', ' on');
			}
		}
	}
}

function createBingoCard() {
	var totalCard = document.createElement('div');
	totalCard.className = 'totalCard';
	totalCard.innerText = "卡片總數 " + cards.length + " 張，";
	if(cards.length <= 5)
		totalCard.innerText += "  買那麼少，你不會中。"
	else if(cards.length > 5 && cards.length < 10)
		totalCard.innerText += "  專心吃你的飯，你不會中。"
	else if(cards.length >= 10 && cards.length < 20)
		totalCard.innerText += "  唉唷 砸超過500，但你還是不會中。"
	else if(cards.length >= 20 && cards.length < 25)
		totalCard.innerText += "  嘖嘖 砸超過1000，謝謝你捐錢出來給大家花。"
	else
		totalCard.innerText += "  凱子。"

	homeDiv.appendChild(totalCard);

	for(var index = 0 ; index < cards.length ; index++){
		var card = cards[index];
		card.booleans = [
		[false,false,false,false,false],
		[false,false,false,false,false],
		[false,false,false,false,false],
		[false,false,false,false,false],
		[false,false,false,false,false]];
		var cardContainer = document.createElement('div');
		cardContainer.className = 'cardContainer';
		homeDiv.appendChild(cardContainer);
		card.rootNode = cardContainer;

		card.bingoNums = [];

		var cardTitle = document.createElement('div');
		cardTitle.className = 'cardTitle';
		cardTitle.innerText = card.no;
		card.cardTitle = cardTitle;

		var delButton = document.createElement('input');
		delButton.className = 'delButton';
		delButton.type = 'button';
		delButton.value = 'X';
		delButton.card = card;
		delButton.onclick = confirmDelete;
		cardContainer.appendChild(cardTitle);
		cardContainer.appendChild(delButton);
		//cardContainer.appendChild(delButton);

		for(var y = 0 ; y < 5 ; y++){
			card.bingoNums.push([]);
			for(var x = 0 ; x < 5 ; x++){
				var bingoNum = document.createElement('div');
				bingoNum.className = 'bingoNum color'+y+''+x;
				bingoNum.innerText = card.value[y][x];
				cardContainer.appendChild(bingoNum);
				card.bingoNums[y].push(bingoNum);
			}
		}
	}
}


function createNewBingoCard() {
	newCard = new function(){};
	newCard.no = '';
	newCard.value = [
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', 'free', '', ''],
		['', '', '', '', ''],
		['', '', '', '', '']
	];

	var cardContainer = document.createElement('div');
	cardContainer.className = 'cardContainer new';
	homeDiv.appendChild(cardContainer);
	newCard.rootNode = cardContainer;

	newCard.bingoNums = [];

	var cardTitle = document.createElement('input');
	cardTitle.type = 'number';
	cardTitle.className = 'cardTitleInput';

	cardTitle.onfocus = function(){
		this.setSelectionRange(0, 4);
	}
	cardTitle.onblur = function(){
		window.scrollTo(0,0);
	}

	cardTitle.value = padLeft(cards.length+1, 4);

	cardContainer.cardTitle = cardTitle;
	cardContainer.appendChild(cardTitle);

	for(var y = 0 ; y < 5 ; y++){
			newCard.bingoNums.push([]);
		for(var x = 0 ; x < 5 ; x++){
			var bingoNum = document.createElement('div');
			bingoNum.className = 'bingoNum color'+y+''+x;
			bingoNum.innerText = (newCard.value[y][x]) ? newCard.value[y][x] : '--';
			cardContainer.appendChild(bingoNum);
			newCard.bingoNums[y].push(bingoNum);
		}
	}

	var delButton = document.createElement('input');
	delButton.className = 'okButton';
	delButton.type = 'button';
	delButton.value = '完成';
	delButton.onclick = confirmAdd;
	cardContainer.appendChild(delButton);

	cardTitle.focus();
	cardTitle.setSelectionRange(0, 4);
}

function addNumber(value){
	for(var y = 0 ; y < newCard.value.length ; y ++){
		var arr = newCard.value[y];

		for(var x = 0 ; x < arr.length ; x ++){
			if(!arr[x]){
				arr[x] = value;

				newCard.bingoNums[y][x].innerText = value;
				if(y == 4 && x == 4){

				}else
					return;
			}
		}
	}

	setTimeout(function(){
		newCard.no = newCard.rootNode.cardTitle.value;
		var answer = confirm ('你確定要新增卡片 No.'+ newCard.no + ' ?');
		if (answer){
			confirmAdd();
		}
	}, 100);
}

function removeNumber(value){
	for(var y = 0 ; y < newCard.value.length ; y ++){
		var arr = newCard.value[y];

		for(var x = 0 ; x < arr.length ; x ++){
			if(arr[x] == value){
				arr[x] = '';

				newCard.bingoNums[y][x].innerText = '--';
				return;
			}
		}

	}
}
//-----------------------------------

function confirmDelete(){
	var answer = confirm ('你確定要刪除卡片 NO.'+ this.card.no + ' ?');
	if (answer){
		var temp = [];
		for(var index = 0 ; index < cards.length ; index++){
			if(cards[index].no == this.card.no)
				continue;
			temp.push(cards[index]);
		}
		cards = temp;
		saveCardToLocal();

		location.reload();
	}
}

function confirmAdd(){

	newCard.no = newCard.rootNode.cardTitle.value;

	//var answer = confirm ('你確定要新增卡片 #'+ newCard.no + ' ?');
	if (true){//answer
		var dulipcate = false;
		for(var index = 0 ; index < cards.length ; index++){
			if(cards[index].no == newCard.no){
				dulipcate = true;
				break;
			}
		}

		if(dulipcate){
			alert('卡片號碼 NO.' + newCard.no + ' 重複了');
			newCard.rootNode.cardTitle.focus();
			return;
		}

		cards.push(newCard);
		saveCardToLocal();

		location.reload();
	}
};

function addCard(){
	document.body.removeChild(rootDiv);

	while (homeDiv.hasChildNodes()) {
		homeDiv.removeChild(homeDiv.lastChild);
	}

	newCard = true;
	createBingoBall();
	createNewBingoCard();
}

function strToCard(str){
	var parts = str.split(':');
	var card = new function(){};
	card.no = parts[0];

	var values = parts[1].split(',');

	card.value = [];
	for(var index = 0 ; index < values.length ; index+=5){
		card.value.push([values[index], values[index+1], values[index+2], values[index+3], values[index+4]]);
	}
	return card;
}

function cardToStr(card){
	var str = card.no+':';
	for(var index = 0 ; index < card.value.length ; index++){
		if(index > 0)
			str += ',';
		str += card.value[index].join();
	}

	return str;
}

function saveCardToLocal(){
	var cardsStr = "";

	for(var index = 0 ; index < cards.length ; index ++){
		if(cardsStr.length > 0)
			cardsStr += '|';
		cardsStr += cardToStr(cards[index]);
	}
	setData("CARDS", cardsStr);
	//alert("Save " + cardsStr);
}

function readCardsFromCookie(){
	var cardsStr = getData("CARDS");
	//alert("Load " + cardsStr);

	cards = [];
	if(cardsStr) {
		var cardsStrArray = cardsStr.split('|');

		for(var index = 0 ; index < cardsStrArray.length ; index ++){
			cards.push(strToCard(cardsStrArray[index]));
		}
	}

	cards = cards.sort(function(a, b){
		return parseInt(a.no) - parseInt(b.no)
	});

	//alert("card # - " + cards.length);
}

function padLeft(str, len) {
    str = '' + str;
    if (str.length >= len) {
        return str;
    } else {
        return padLeft("0" + str, len);
    }
}
//---------------------------------------------------
function setData(key, vaue) {
	localStorage.setItem(key, value);
}

function getData(key) {
	return localStorage.getItem(key);
}