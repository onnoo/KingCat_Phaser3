var game;
var localStorageName = "doublelanegame";
var bgColors = [0x54c7fc, 0xffcd00, 0xff2851, 0x62bd18];
var catnips = ["catnipFake", "catnipSoso", "catnipGood", "catnipGold"];
var items = ["tunaCan","catnipBomb","milk"];
var score;
var catnipBombFlag;
var laneWidth = 238;
var lineWidth = 3;
var catTurnSpeed = 200;
var moveX;
var angelSide;
var targetGroup = [];
var targetDelay = 1300;
var targetSpeed = 300;
var targetSpeedCounter = 15;
var targetPool = [];
var healthBar;
var healthFlag;
var unlockFlagArray = [0, 0, 0];

// added
var httpRequest;
var bestScore;

window.onload = function() {
    var width = 720;
    var height = 1280;
    var windowRatio = window.innerWidth / window.innerHeight;
    if(windowRatio < width / height){
        var height = width / windowRatio;
    }
game = new Phaser.Game(width, height, Phaser.AUTO, "");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("Prologue", prologue);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("HowToPlayFirst", howToPlayFirst);
    game.state.add("HowToPlaySecond", howToPlaySecond);
    game.state.add("SelectPage", selectPage);
    game.state.add("PlayGame", playGame);
    game.state.add("UnlockScreen", unlockScreen);
    game.state.add("GameOverScreen", gameOverScreen);
    game.state.start("Boot");
}

var boot = function(game){};
boot.prototype = {
  	preload: function(){
        game.load.image("loading","assets/sprites/loading.png");
	},
  	create: function(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start("Preload");
        this.makeRequest();
        // this.sendRequest();
	},
    makeRequest: function () {
        httpRequest = new XMLHttpRequest();
        if(!httpRequest) {
            alert('Not Connected!');
            return false;
        } else {
            // alert('Flag 1');
        }
    },
    sendRequest: function () {
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var o = JSON.parse(this.responseText);
                bestScore = o.bestScore;
            }
        }
        httpRequest.open('POST', '/data/get');
        httpRequest.send();
    },
}

var preload = function(game){};
preload.prototype = {
	preload: function(){
        var loadingBar = this.add.sprite(game.width / 2, game.height / 2, "loading");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        game.load.image("playbutton", "assets/sprites/playbutton.png");
        game.load.spritesheet("prologues", "assets/sprites/prologue_sprites.png", 720, 1280, 4);
        game.load.image("background1", "assets/sprites/background/Background_Play_1.png");
        game.load.image("background2", "assets/sprites/background/Background_Play_2.png");
        game.load.image("background3", "assets/sprites/background/Background_Play_3.png");
        game.load.image("background4", "assets/sprites/background/Background_Play_4.png");
        game.load.image("background", "assets/sprites/background/Background_Sprites.png");
        //game.load.spritesheet("background", "assets/sprites/background/Background_Sprites.png", 720, 1280, 4);
        game.load.image("pause", "assets/sprites/Pause/Pause_Example.png");

        game.load.image("particle", "assets/sprites/particle.png");
        game.load.image("leftButton", "assets/sprites/GameButton/Left_Normal.png");
        game.load.image("rightButton", "assets/sprites/GameButton/Right_Normal.png");

        game.load.image("fishCat", "assets/sprites/cat/FishCat_front.png");
        game.load.image("nyangGates", "assets/sprites/cat/NyangGates_front.png");
        game.load.image("rapidCat", "assets/sprites/cat/RapidCat_front.png");
        game.load.image("strongCat", "assets/sprites/cat/StrongCat_front.png");

        game.load.image("fishCat_back", "assets/sprites/cat/FishCat_back.png");
        game.load.image("nyangGates_back", "assets/sprites/cat/NyangGates_back.png");
        game.load.image("rapidCat_back", "assets/sprites/cat/RapidCat_back.png");
        game.load.image("strongCat_back", "assets/sprites/cat/StrongCat_back.png");


        game.load.image("catnipFake", "assets/sprites/Catnip/Catnip_Fake.png");
        game.load.image("catnipGold", "assets/sprites/Catnip/Catnip_Gold.png");
        game.load.image("catnipGood", "assets/sprites/Catnip/Catnip_Good.png");
        game.load.image("catnipSoso", "assets/sprites/Catnip/Catnip_Soso.png");

        game.load.image("tunaCan", "assets/sprites/Item/Item_TunaCan.png");
        game.load.image("catnipBomb", "assets/sprites/Item/Item_CatnipBomb.png");
        game.load.image("milk", "assets/sprites/Item/Item_Milk.png");

        game.load.image("class1", "assets/sprites/Class/Class1.png");
        game.load.image("class2", "assets/sprites/Class/Class2.png");
        game.load.image("class3", "assets/sprites/Class/Class3.png");
        game.load.image("class4", "assets/sprites/Class/Class4.png");
        game.load.image("class5", "assets/sprites/Class/Class5.png");
        game.load.spritesheet("class", "assets/sprites/Class/Class.png", 180, 40, 5);


        // added
        game.load.spritesheet("prologues", "assets/sprites/prologue_sprites.png", 720, 1280, 4);
        game.load.image("mainImage", "assets/sprites/main.png");
        game.load.image("scoreImage", "assets/sprites/score.png");

        game.load.spritesheet("selectFishCat", "assets/sprites/Choice/Select_FishCat.png", 720, 1280, 1);
        game.load.spritesheet("selectNyangGates", "assets/sprites/Choice/Select_NyangGates.png", 720, 1280, 2);
        game.load.spritesheet("selectRapidCat", "assets/sprites/Choice/Select_RapidCat.png", 720, 1280, 2);
        game.load.spritesheet("selectStrongCat", "assets/sprites/Choice/Select_StrongCat.png", 720, 1280, 2);
        game.load.spritesheet("select", "assets/sprites/Choice/Select.png", 593, 174, 2);
        game.load.image("selectCursor", "assets/sprites/Choice/SelectCursor.png");
        game.load.image("rankingBox", "assets/sprites/ranking.png");
        game.load.image("retryButton", "assets/sprites/Retry.png");
        game.load.image("unlockPopUp_NyangGates", "assets/sprites/Unlock/UnlockPopUp_NyangGates.png");
        game.load.image("unlockPopUp_RapidCat", "assets/sprites/Unlock/UnlockPopUp_RapidCat.png");
        game.load.image("unlockPopUp_StrongCat", "assets/sprites/Unlock/UnlockPopUp_StrongCat.png");
        

        game.load.spritesheet("unlockPopUp", "assets/sprites/Unlock/UnlockPopUp.png", 510, 570, 3);

        game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        game.load.bitmapFont("DungGeunMo", "assets/fonts/DungGeunMo.png", "assets/fonts/DungGeunMo.fnt");
    },
  	create: function(){
		game.state.start("Prologue");
	},
};

var prologue = function(game){};
prologue.prototype = {
    create: function() {
        var sprite = game.add.sprite(game.width / 2, game.height / 2, 'prologues');
        sprite.anchor.set(0.5);

        sprite.inputEnabled = true;

        sprite.events.onInputDown.add(function() {
            if(sprite.frame > 2) {
                game.state.start("TitleScreen");
            } else {
                sprite.frame++;
            }
        }, this);
    }
}

var titleScreen = function(game){};
titleScreen.prototype = {
    create: function(){
        // added
        var image = game.add.sprite(0, 0, 'mainImage');
        var image = game.add.sprite(94, 805, 'scoreImage');

        var startBt = game.add.graphics(0, 0);
        startBt.beginFill(0x000000, 0);
        startBt.drawRect(63, 1016, 567, 138);
        startBt.endFill();
        startBt.inputEnabled = true;
        startBt.input.useHandCursor = true;
        startBt.events.onInputUp.add(this.startGame, this);

        var tutoBt = game.add.graphics(0, 0);
        tutoBt.beginFill(0xff0000, 0);
        tutoBt.drawCircle(77, 166, 100);
        tutoBt.endFill();
        tutoBt.inputEnabled = true;
        tutoBt.input.useHandCursor = true;
        tutoBt.events.onInputUp.add(this.readNextTutoral, this);

        var exitBt = game.add.graphics(0, 0);
        exitBt.beginFill(0x000000, 0);
        exitBt.drawCircle(638, 170, 100);
        exitBt.endFill();
        // exitBt.inputEnabled = true;
        // exitBt.input.useHandCursor = true;
        // exitBt.events.onInputUp.add(function(){
        //     close();
        // }
        // , this);

        var scoreBox = new Phaser.Rectangle(155, 857, 381, 64);
        var scoreText = game.add.bitmapText(0, 0 , "DungGeunMo", user_info.best_score.toString(), 95);
        scoreText.alignIn(scoreBox, Phaser.CENTER, 0, 0);
        scoreText.tint = 0x000000;

     },
     startGame: function(){
        game.state.start("SelectPage");
     },

     readNextTutoral: function(){
        game.state.start("HowToPlayFirst");
     }
}

var howToPlayFirst = function(game){};
howToPlayFirst.prototype = {
    create: function(){
        var background = game.add.sprite(0, 0, "background4");
       
        game.add.text(game.width / 2, 70 , "길을 변경하세요!!", {font: "60px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 170 , "버튼을 터치해서 좌우로 이동하세요!!", {font: "35px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;

        /*
        var cat = game.add.sprite(game.width / 2 + 50, 250, "fishCat");
        cat.scale.set(0.4);
        var catTween = game.add.tween(cat).to({
            x: game.width / 2 - 100
        },1000, "Linear", true, 0, -1);
        catTween.yoyo(true);
        */

        leftButton = game.add.sprite(35, 270, "leftButton");
        leftButton.scale.set(0.17);

        rightButton = game.add.sprite(475, 270, "rightButton");
        rightButton.scale.set(0.17);

        game.add.text(game.width / 2, 450 , "캣닢을 획득하세요!!", {font: "60px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 550 , "캣닢을 획득해 다양한 효과를 얻어보세요!!", {font: "30px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;

        var catnipSoso = game.add.sprite((game.width/11), 610, "catnipSoso");
        game.add.text((game.width/11)*3, 630 , "일반 캣닢: +1점", {font: "40px DungGeunMo", fill: "#000000"});

        var catnipGood = game.add.sprite((game.width/11), 715, "catnipGood");
        game.add.text((game.width/11)*3, 740 , "고급 캣닢: +3점", {font: "40px DungGeunMo", fill: "#000000"});

        var catnipGold = game.add.sprite((game.width/11), 825, "catnipGold");
        game.add.text((game.width/11)*3, 850 , "황금 캣닢: +5점", {font: "40px DungGeunMo", fill: "#000000"});
        game.add.text((game.width/11)*3, 900 , "(특정 고양이에서만 출현)", {font: "30px DungGeunMo", fill: "#000000"});

        var catnipFake = game.add.sprite((game.width/11), 935, "catnipFake");
        game.add.text((game.width/11)*3, 960 , "가짜 캣닢: -2점", {font: "40px DungGeunMo", fill: "#000000"});

        
        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);

        var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
        }, 1500, "Linear", true, 0, -1);
        tween.yoyo(true);
        
    },
    startGame: function(){
        game.state.start("HowToPlaySecond");
    },
    readNextTutoral: function(){
        game.state.start("HowToPlaySecond");
    },
}

var howToPlaySecond = function(game){};
howToPlaySecond.prototype = {
    create: function(){
        var background = game.add.sprite(0, 0, "background4");
       
        game.add.text(game.width / 2, 70 , "계급을 올려보세요!!", {font: "60px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 170 , "특정 점수에 도달하면 계급이 올라갑니다!!", {font: "30px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;

        var class1 = game.add.sprite((game.width/11)*2, 225, "class1");
        var class2 = game.add.sprite((game.width/11)*2, 280, "class2");
        var class3 = game.add.sprite((game.width/11)*2, 330, "class3");
        var class4 = game.add.sprite((game.width/2), 225, "class4");
        class4.scale.set(1.25);
        var class5 = game.add.sprite((game.width/2), 305, "class5");
        class5.scale.set(1.45);

        game.add.text(game.width / 2, 400 , "고양이를 해금하세요!!", {font: "60px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 480 , "특정 조건을 만족하면 고양이가 열립니다!!", {font: "27px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;
        game.add.text(game.width / 2, 510 , "고양이마다 특수 능력을 가지고 있습니다!!", {font: "27px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;

        var nyangGates = game.add.sprite((game.width/9), 580, "nyangGates");
        nyangGates.scale.set(0.5);
        game.add.text(game.width/8, 780, "냥게이츠", {font: "30px DungGeunMo", fill: "#000000"});

        var strongCat = game.add.sprite((game.width/10)*4, 580, "strongCat");
        strongCat.scale.set(0.5);
        game.add.text((game.width/12)*5, 780, "튼튼하냥", {font: "30px DungGeunMo", fill: "#000000"});

        var rapidCat = game.add.sprite((game.width/10)*7, 580, "rapidCat");
        rapidCat.scale.set(0.5);
        game.add.text((game.width/10)*7, 780, "재빠르냥", {font: "30px DungGeunMo", fill: "#000000"});

        game.add.text(game.width/2, 850,"특수 아이템을 획득해보세요!!", {font: "45px DungGeunMo", fill: "#000000"}).anchor.x = 0.5;

        var milk = game.add.sprite(50, 930, "milk");
        milk.scale.set(0.8);
        game.add.text(140, 930, "체력\n회복", {font: "30px DungGeunMo", fill: "#000000"});

        var tunaCan = game.add.sprite(275, 930, "tunaCan");
        tunaCan.scale.set(0.8);
        game.add.text(375, 930, "속도\n증가", {font: "30px DungGeunMo", fill: "#000000"});

        var catnipBomb = game.add.sprite(475, 920, "catnipBomb");
        catnipBomb.scale.set(0.8);
        game.add.text(575, 920, "캣닢\n생성률\n증가", {font: "30px DungGeunMo", fill: "#000000"});


        
        var playButton = game.add.button(game.width / 2, game.height - 150, "playbutton", this.startGame);
        playButton.anchor.set(0.5);

        var tween = game.add.tween(playButton).to({
            width: 220,
            height:220
        }, 1500, "Linear", true, 0, -1);
        tween.yoyo(true);

    },
    startGame: function(){
        game.state.start("SelectPage");
    },
    readPrevTutoral: function(){
        game.state.start("HowToPlayFirst");
    }
}

// game.state.add("SelectPage", selectPage);

var selectPage = function(game){};
selectPage.prototype = {
    create: function(){
        var fishCat = game.add.sprite(0, 0, 'selectFishCat');
        var rapidCat = game.add.sprite(0, 0, 'selectRapidCat', user_info.lock_1);
        var strongCat = game.add.sprite(0, 0, 'selectStrongCat', user_info.lock_2);
        var nyangGates = game.add.sprite(0, 0, 'selectNyangGates', user_info.lock_3);

        var frames = [fishCat, rapidCat, strongCat, nyangGates];
        var startEnable = [1, user_info.lock_1, user_info.lock_2, user_info.lock_3];
        var frame = 0;

        frames.forEach(function(element){
            element.visible = false;
        });
        frames[frame].visible = true;

        var select = game.add.sprite(78, 1083, "select", startEnable[frame]);

        var left_bt = game.add.sprite(134, 562, 'selectCursor');
        var right_bt = game.add.sprite(592, 562, 'selectCursor');
        left_bt.scale.x *= -1;

        left_bt.inputEnabled = true;
        left_bt.events.onInputDown.add(function(){
            frames[frame].visible = !frames[frame].visible;
            if(frame === 0){
                frame = frames.length-1;
            } else {
                frame--;
            }
            frames[frame].visible = !frames[frame].visible;
            select.frame = startEnable[frame];
        }, this);

        right_bt.inputEnabled = true;
        right_bt.events.onInputDown.add(function(){
            frames[frame].visible = !frames[frame].visible;
            if(frame === frames.length-1){
                frame = 0;
            } else {
                frame++;
            }
            frames[frame].visible = !frames[frame].visible;
            select.frame = startEnable[frame];
        }, this);

        select.inputEnabled = true;
        select.events.onInputDown.add(function(){
            if(startEnable[frame] === 1){
                game.state.start("PlayGame");
            }
        }, this);

    },
}

var playGame = function(game){};
playGame.prototype = {
    create: function(){
        // HealthItemFlag
        
        // Ingame score
        score = 200;

        healthFlag = 100;

        // ItemPool        
        targetPool = [];
        targetPool.length = 0;

        // Loading Backgounds
        background = game.add.tileSprite(0, 0, 720, 1280, "background");
        
        // Draw Road
        
        this.roadWidth = laneWidth * 3 + lineWidth * 2;
        /*
        var leftLine = game.add.tileSprite(laneWidth, 0, lineWidth, game.height, "particle");
        leftLine.tint = tintColor;
        var rightLine = game.add.tileSprite(laneWidth*2 + lineWidth, 0, lineWidth, game.height, "particle");
        rightLine.tint = tintColor;
        */

        // Add objects
        this.catGroup = game.add.group();
        this.targetGroup = game.add.group();
        this.scoreText = game.add.bitmapText(game.width / 2, 40 , "font", "0", 120)
        this.scoreText.anchor.x = 0.5;

        // HP bar
        healthBar = new HealthBar(this.game, {x: game.width / 2 , y: 20});
        healthBar.setBarColor("#ffffff");
        // HP LOOP
        var timer = setInterval(function(){
            healthBar.setPercent(healthFlag);
            healthFlag -= 30;
            if(healthFlag < 0){
                clearInterval(timer);
            }
        }, 1000);   // 1000ms = 1s


        // Move Side Button
        var moveLeftButton = game.add.button(laneWidth/2, game.height - 120, "leftButton", this.moveLeftCat);
        moveLeftButton.scale.set(0.2);
        moveLeftButton.anchor.x = 0.45;
        var moveRightButton = game.add.button((laneWidth*2) + (lineWidth)*2 +(laneWidth/2), game.height - 120, "rightButton", this.moveRightCat);
        moveRightButton.scale.set(0.2);
        moveRightButton.anchor.x = 0.55;


        // Cat configuration
        cat = game.add.sprite(0, game.height - 180, "fishCat_back");
        cat.scale.set(0.6);
        cat.positions = [laneWidth/2 + lineWidth, laneWidth + laneWidth/2 + lineWidth, laneWidth*2 + laneWidth/2 + lineWidth];
        cat.anchor.set(0.5);
        cat.canMove = true;
        cat.side = 1;
        cat.unlock = false;
        cat.x = cat.positions[cat.side];
        game.physics.enable(cat, Phaser.Physics.ARCADE);
        cat.body.allowRotation = false;
        cat.body.moves = false;
        cat.smokeEmitter = game.add.emitter(cat.x, cat.y + cat.height / 2 + 2, 20);
        cat.smokeEmitter.makeParticles("particle");
        cat.smokeEmitter.setXSpeed(-15, 15);
        cat.smokeEmitter.setYSpeed(50, 150);
        cat.smokeEmitter.setAlpha(0.2, 0.5);
        cat.smokeEmitter.start(false, 500, 20);
        this.catGroup.add(cat);

        // ItemPool LOOP
        this.targetLoop = game.time.events.loop(targetDelay, function(){
            for(var i = 0; i < 1; i++){
                if(targetPool.length == 0){
                    var objectPercentage = game.rnd.between(0,10)
                    var attr;
                    if((objectPercentage >= 0) && (objectPercentage < 3)){
                        var itemPercentage = game.rnd.between(0,2);
                        if(itemPercentage == 0){
                            attr = items[2];
                        }
                        else if(itemPercentage == 1){
                            attr = items[0];
                        }
                        else{

                        }
                    }
                    else{
                        var catnipPercentage = game.rnd.between(0,999);
                        if((catnipPercentage >= 0) && (catnipPercentage <= 100)){
                            attr = catnips[2];
                        }
                        else if((catnipPercentage >= 101) && (catnipPercentage <= 600)){
                            attr = catnips[1];
                        }
                        else if((catnipPercentage >= 601) && (catnipPercentage <= 900)){
                            attr = catnips[0];
                        }
                        else{
                            attr = catnips[3];
                        }
                    }
                    var target = new Target(game, attr);
                    target.scale.setTo(1.5, 1.5);
                    game.add.existing(target);
                    this.targetGroup.add(target);
                }
                else{
                    var target = targetPool.pop();
                    target.prepareToRevive();
                }
            }
        }, this);

        // Score LOOP
        this.scoreLoop = game.time.events.loop(250, function(){
            this.scoreText.text = score.toString();
        }, this);
    },

    moveLeftCat: function(e){
        if(cat.side != 0){
            cat.side--;
            angelSide = 1;

            var steerTween = game.add.tween(cat).to({
                angle: 30 - 60 * angelSide
            }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);

            steerTween.onComplete.add(function(){
                var steerTween = game.add.tween(cat).to({
                    angle: 0
                }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);
            })

            var moveTween = game.add.tween(cat).to({
                x: cat.positions[cat.side],
            }, catTurnSpeed, Phaser.Easing.Linear.None, true);
        }
    },

    moveRightCat: function(e){
        if(cat.side != 2){    
            cat.side++;
            angelSide = 0;

            var steerTween = game.add.tween(cat).to({
                angle: 30 - 60 * angelSide
            }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);

            steerTween.onComplete.add(function(){
                var steerTween = game.add.tween(cat).to({
                    angle: 0
                }, catTurnSpeed / 2, Phaser.Easing.Linear.None, true);
            })

            var moveTween = game.add.tween(cat).to({
                x: cat.positions[cat.side],
            }, catTurnSpeed, Phaser.Easing.Linear.None, true);
        }
    },

    update: function(e){
        // Game events
        
        //  Scroll the background
        background.tilePosition.y += 8;
        
        // SmokeEmitter
        cat.smokeEmitter.x = cat.x;

        // Drop Item Configuration
        game.physics.arcade.collide(this.catGroup, this.targetGroup, function(c, t){
            if(t.attr == catnips[0]){
                t.destroy();
                score -= 2;
            }
            else if(t.attr == catnips[1]){
                t.destroy();
                score += 1;
            }
            else if(t.attr == catnips[2]){
                t.destroy();
                score += 3;
            }
            else if(t.attr == catnips[3]){
                t.destroy();
                score += 5;
            }
            else if(t.attr == items[0]){
                t.destroy();
                targetSpeedCounter = 15;
                targetSpeed = 600;
                for(var i = 0; i < this.targetGroup.length; i++){
                    this.targetGroup.getChildAt(i).body.velocity.y = targetSpeed;     
                }
                var timer = setInterval(function(){
                    targetSpeedCounter--;
                    if(targetSpeedCounter == 0){
                        targetSpeed = 300;
                        for(var i = 0; i < this.targetGroup.length; i++){
                            this.targetGroup.getChildAt(i).body.velocity.y = targetSpeed;     
                        }
                        clearInterval(timer);
                    }
                }, 15000);
            }
            else if(t.attr == items[1]){
                t.destroy();
            }
            else if(t.attr == items[2]){
                t.destroy();
                healthFlag += 40;
                ++unlockFlagArray[1];
                if(healthFlag > 100){
                    healthFlag = 100;
                }
            }
        }, null, this);

        // GameOver trigger
        if(healthFlag < 0){
            this.timeOver(cat);
        }
    },

    timeOver: function(c){
        // TimeOver Events
        if(score == 222){
            unlockFlagArray[0] = 222;
        }

        // Smoke OFF
        c.smokeEmitter.on = false;

        // Event LOOP OFF
        game.time.events.remove(this.targetLoop);
        game.time.events.remove(this.scoreLoop);

        // Tweens OFF
        game.tweens.removeAll();

        // Stop Items falling
        for(var i = 0; i < this.targetGroup.length; i++){
            this.targetGroup.getChildAt(i).body.velocity.y = 0;
        }

        // Explosion animation
        var explosionEmitter = game.add.emitter(c.x, c.y, 200);
        explosionEmitter.makeParticles("particle");
        explosionEmitter.gravity = 0;
        explosionEmitter.setAlpha(0.2, 1);
        explosionEmitter.minParticleScale = 0.2;
        explosionEmitter.maxParticleScale = 1;
        explosionEmitter.start(true, 1000, null, 200);
        explosionEmitter.forEach(function(p){
            p.tint = c.tint;
        });

        // Cat object destroy
        c.destroy();

        // Set time event for GameOverScreen 
        game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            if((unlockFlagArray[0] == 222) || (unlockFlagArray[1] >= 5) || (unlockFlagArray[2] == 111)){
                game.state.start("UnlockScreen");
            }
            else{
                game.state.start("GameOverScreen");
            }
        }, this);
    }
}

var unlockScreen = function(game){};
unlockScreen.prototype = {
    create: function(){
        var unlockPopUpFlag = 0;

        if(unlockFlagArray[0] == 222){
            var nyangGates = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_NyangGates");
            nyangGates.anchor.set(0.5);
            nyangGates.inputEnabled = true;
            unlockPopUpFlag++;
            nyangGates.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                nyangGates.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }
        if(unlockFlagArray[1] >= 5){
            var strongCat = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_StrongCat");
            strongCat.anchor.set(0.5);
            strongCat.inputEnabled = true;
            unlockPopUpFlag++;
            strongCat.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                strongCat.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }    
        if(unlockFlagArray[2] == 111){
            var rapidCat = game.add.sprite(game.width / 2, game.height / 2, "unlockPopUp_RapidCat");
            rapidCat.anchor.set(0.5);
            rapidCat.inputEnabled = true;
            unlockPopUpFlag++;
            rapidCat.events.onInputDown.add(function(){
                unlockPopUpFlag--;
                rapidCat.destroy();
                if(unlockPopUpFlag == 0){
                    game.state.start("GameOverScreen");
                }
            }, this);
        }
    } 
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
     create: function(){
        // Background
        var sprite = game.add.sprite(0, -463, 'prologues', 0);
        var startBt = game.add.graphics(0, 0);
        startBt.beginFill(0x000000);
        startBt.drawRect(0, 537, 720, 200);
        startBt.endFill();
        var sprite = game.add.sprite(110, 425, 'rankingBox', 0);

        // RetryButton
        var playButton = game.add.button(63, 1016, "retryButton", this.startGame);

        // Score
        var scoreBox = new Phaser.Rectangle(153, 445, 414, 114);
        var scoreText = game.add.bitmapText(0, 0 , "DungGeunMo", score.toString(), 170);
        scoreText.alignIn(scoreBox, Phaser.CENTER, 0, 0);
        scoreText.tint = 0x6B4C0C;

        // RankingBox contents
        var rankBox_1 = new Phaser.Rectangle(149, 697, 405, 47);
        var rankText_1 = game.add.bitmapText(0, 0 , "DungGeunMo", "1,500", 60);
        rankText_1.alignIn(rankBox_1, Phaser.RIGHT, 0, 0);
        rankText_1.tint = 0x3C1E1E;

        var rankBox_2 = new Phaser.Rectangle(149, 744, 405, 47);
        var rankText_2 = game.add.bitmapText(0, 0 , "DungGeunMo", "600", 60);
        rankText_2.alignIn(rankBox_2, Phaser.RIGHT, 0, 0);
        rankText_2.tint = 0x3C1E1E;

        var rankBox_3 = new Phaser.Rectangle(149, 791, 405, 47);
        var rankText_3 = game.add.bitmapText(0, 0 , "DungGeunMo", "71", 60);
        rankText_3.alignIn(rankBox_3, Phaser.RIGHT, 0, 0);
        rankText_3.tint = 0x3C1E1E;

        var rankBox_4 = new Phaser.Rectangle(149, 838, 405, 47);
        var rankText_4 = game.add.bitmapText(0, 0 , "DungGeunMo", "15", 60);
        rankText_4.alignIn(rankBox_4, Phaser.RIGHT, 0, 0);
        rankText_4.tint = 0x3C1E1E;


    },
    startGame: function(){
        game.state.start("TitleScreen");
    },

    sendRequest: function () {
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var o = JSON.parse(this.responseText);
                bestScore = o.bestScore;
            }
        }
        httpRequest.open('POST', '/data/add');
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send('score=' + encodeURIComponent(score));
    },
}


Target = function (game, attr) {
    var position = game.rnd.between(0, 2);
    Phaser.Sprite.call(this, game, cat.positions[position], -20, attr);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.attr = attr;
    this.anchor.set(0.5);
    this.body.velocity.y = targetSpeed*(1.5);
};

Target.prototype = Object.create(Phaser.Sprite.prototype);
Target.prototype.constructor = Target;

Target.prototype.update = function() {
    if(this.alive && this.y > game.height + this.height/2){
        if(this.mustPickUp){
            this.missed.dispatch(this);
        }
        this.prepareToDie();
    }
};

Target.prototype.prepareToDie = function(){
    this.kill();
    targetPool.push(this);
    console.log("target killed. Targets in the pool: " + targetPool.length);
}

Target.prototype.prepareToRevive = function(){
    var position = game.rnd.between(0, 2);
    this.reset(cat.positions[position], -20);
    this.body.velocity.y = targetSpeed*(1.5);
    console.log("target revived. Targets in the pool: " + targetPool.length);
}
