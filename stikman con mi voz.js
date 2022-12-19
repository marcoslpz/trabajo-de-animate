(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"stikman con mi voz_atlas_1", frames: [[824,878,360,664],[492,1040,205,654],[0,1040,242,675],[244,1040,246,656],[1186,1464,204,73],[1186,878,360,376],[699,1619,292,73],[1402,1256,222,184],[993,1619,258,73],[1402,1442,170,236],[699,1544,298,73],[1186,1256,214,206],[0,0,822,1038],[824,0,482,876],[1186,1539,62,47]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_6 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.flash0ai = function() {
	this.initialize(ss["stikman con mi voz_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Símbolo10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.flash0ai();
	this.instance.setTransform(-31,-23.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Símbolo10, new cjs.Rectangle(-31,-23.5,62,47), null);


(lib.stikaman = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_4();
	this.instance_1.setTransform(-7.75,-2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(19,-2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_6();
	this.instance_3.setTransform(-17.5,-7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.5,-7,180,342.5);


(lib.piernas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_25();
	this.instance_1.setTransform(-77.95,64.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},1).to({state:[{t:this.instance}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-77.9,0,257.9,188);


(lib.ojos = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ALQFFIgUgDIgPgEIgPgGIgPgEIgPgIIgPgIIgKgEIgFgDIgKgCIgPgGIgPgHIgKgHIgNgIIgTgIIgQgHIgMgIIgIgHIgHgHIgIgIIgEgIIgGgHIgCgIIgFgHIAAgHIgDgIIgEgIIgDgHIAAgIIgDgHIAAgHIgCgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgGIACgIIAAgIIAAgHIADgIIADgHIAEgHIADgIIAFgIIAIgHIACgIIAFgHIAIgHIAHgIIAFgIIAFgHIAFgIIAFgHIAFgHIAIgIIAHgIIAIgHIAHgIIAHgHIAIgHIAIgIIAHgIIAKgHIAKgIIAMgHIAPgHIAKgIIAKgIIANgHIAPgIIAKgEIAHgDIAKgDIAPgEIAQgIIAKgFIAKgDIATAAIAAgCIBEAAIAUACIAPAGIANAHIAMAHIAHAIIAGAHIAEAIIAGAIIACAHIAFAHIAAAIIADAHIAAAIIAAAIIAAAHIAAAHIgDAIIgDAHIALAIIAKAIIAKAHIAMAHIARAIIAQAHIAMAIIAKAIIANAHIAKAHIAKAIIAHAHIAFAIIAFAIIAFAHIAFAHIAFAIIADAHIAEAIIADAIIAFAHIACAHIADAHIADAIIAAAHIAAAIIACAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIgCAIIAAAHIAAAHIgDAIIgDAIIgEAHIgDAIIgFAHIgFAHIgHAIIgIAIIgKAHIgKAIIgNAHIgHAHIgKAIIgKAIIgPAHIgNAIIgPAEIgRAGIgNAHIgJAFIgKACIgUADIi3AAgArFEJIgUgCIgPgGIgPgEIgPgGIgZgEIgKgDIgFgCIgUgDIgUgDIgSgEIgOgIIgKgFIgGgDIgKgCIgHgCIgPgDIgNgDIgPgEIgOgIIgKgHIgIgIIgRgIIgQgHIgKgHIgHgIIgIgHIgHgIIgKgIIgHgHIgIgHIgFgIIgFgHIgDgIIgCgIIgCgHIAAgHIgDgIIgDgHIgCgIIgCgIIAAgHIAAgHIgDgIIAAgHIAAgHIAAgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgIIADgHIAAgHIAAgIIACgHIACgIIAGgIIACgHIAFgHIACgIIAGgHIAEgIIAIgIIAIgHIAHgHIAKgIIAIgHIAHgIIAPgIIAPgHIAMgHIAIgIIAMgHIAKgGIAFgCIAKgCIAUAAIAAgDICZAAIAUADIANACIAJACIAoADIAVADIAOAEIANAFIAKADIAPAFIAPAIIANAHIAOAHIANAIIAKAHIAKAIIAMAIIAIAHIAIAHIAHAIIAFAHIAFAIIAFAIIAHAHIAIAHIAFAIIAHAHIAFAIIADAIIAFAHIACAHIADAIIADAHIAAAIIAAAIIACAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAHIAAAHIAAAHIgCAIIAAAHIAAAIIgDAHIgDAHIgCAIIAAAIIAAAHIgCAIIAAAHIgDAHIAAAIIgDAIIgFAHIgCAIIgFAHIgFAHIgCAIIgGAIIgCAHIgFAIIgFAHIgIAHIgHAIIgCAIIgGAHIgEAIIgGAHIgHAHIgKAIIgIAIIgKAHIgKAIIgKAEIgEADIgLADIgUACIhXAAg");
	this.shape.setTransform(111.5,32.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AHLCHIgUgCIgPgGIgPgHIgKgIIgIgHIgHgHIgFgIIgFgIIgDgHIgCgIIgDgHIAAgHIAAgIIgCgIIACgHIAAgIIADgHIAAgHIAFgIIACgHIAFgHIAIgIIAHgHIAIgHIAPgIIAKgFIAKgDIAUgCIGBgCIAKgDIAPgDIAUAAIAAgCIClAAIAUACIAPAGIAMAHIANAHIAHAIIAFAIIAFAHIAFAIIADAHIAFAGIAAAIIACAIIAAAHIAAAIIAAAHIAAAHIgCAIIgDAIIgFAHIgCAIIgFAHIgFAHIgIAIIgKAIIgMAHIgKAFIgKADIgUACIigACIgFADIgKADIgUACImQAAgAwaA3IgUgCIgPgGIgPgHIgKgHIgIgIIgHgHIgFgIIgFgIIgDgGIgCgHIgDgIIAAgHIAAgIIgCgIIACgHIAAgHIADgIIAAgHIAFgIIACgIIAFgHIAIgHIAHgIIAIgHIAPgIIAKgFIAKgDIAUAAIAAgCIIhAAIAUACIAPAGIAMAHIANAHIAHAIIAFAHIAFAIIAFAIIADAHIAFAHIAAAIIACAHIAAAIIAAAIIAAAHIAAAHIgCAIIgDAHIgFAHIgCAIIgFAHIgFAHIgIAIIgKAHIgMAIIgKAFIgKADIgUACIohAAg");
	this.shape_1.setTransform(112.125,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},11).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,0,229.3,65);


(lib.cabeza = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#323232").s().p("AF8HMIgFgFIgHgIIgIgHIgIgHIgHgIIgHgHIgIgIIgHgIIgGgHIgCgFIgJgCIgBACIgFAIIgFAHIgKAHIgNAIIgHAHIgKAIIgKAIIgMAHIgQAHIgDADImSAAIgDgDIgGgEIgHgDIgSgFIgKgIIgEgEIgSgGIgPgHIgMgIIgKgHIghgFIgEgBIgGABIgHACIACAGIADAHIAAAIIAAAHIgGAHIgCAIIgKAIIgHAEIgNADIi0AAIAAgLIAFgEIAMgIIADgHIAFgHIAHgIIANgHIANgGIACAAIAKgCIANgFIAHgHIAKgGIAFAAIAHgHIAKgIIAKgHIABAAIgNgHIgNgIIgKgIIgKgHIgHgIIgSgHIgCgCIgIgFIgHgIIgDgIIgCgHIgIgIIgHgHIgDgHIAAgIIgCgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgGIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIACgIIADgHIADgHIACgIIACgIIAGgHIACgIIACgHIAAgHIADgIIAFgIIAFgHIAFgIIAFgHIAIgHIAHgIIADgIIAEgHIAIgIIAFgHIADgHIAEgIIAIgIIAFgHIAIgIIAHgHIAHgHIANgIIASgFIAYgFIAXgIIAMgHIAKgIIAIgHIAHgHIAIgIIAMgIIAGgHIAHgIIAIgHIAKgHIAEgIIAGgIIAHgHIAHgIIANgHIAMgHIAIgIIAKgFIAFgDIASgFIAMgEIARgGIANgEIANAAIAAgDIEZAAIANADIAKACIAEACIANADIANADIAJACIAGACIAMADIASAFIAPAHIAKAIIAMAIIAIAHIAJAHIAIAIIAIAHIAHAGIADACIAKACIAPAGIAOAHIAIAFIACACIAPADIASAFIAMAHIAIAIIAHAIIAIAHIAFAHIADAIIAEAHIADAIIADAIIAEAHIAGAHIAFAIIACAHIAFAIIAFAIIACAHIADAEIADADIACAIIACAHIAAAIIADAIIAAAHIAAAHIADAIIACAHIACAIIADAIIADAHIACAHIADAIIAAAHIACAIIAAAIIAAAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAGIAAAHIAAAIIAAAHIAAAIIAAAIIAAAHIAAAHIAAAIIAAAHIgCAIIAAAIIgFAHIgDAHIgDAIIgCAHIgCAIIgDAIIgDAHIgCAHIgCAIIgDAHIgDAIIgEAIIgDAHIgDAHIgCAIIgCAHIgFAIIgDAIIgFAHIgFAHIgFAIIgFAHIgFAIIgIAIIgHAHIgIAHIgEAIIgIAHIgKAIIgIAIIgMAHIgNAHIgOAIIgGAEIADADIADAIIACAIIAFAHIAHAHIAIAIIAIAHIAHAIIAIAIIAMAHIAKAHIAFAIIAKAHIAKAIIAIAIIAKAHIAMAHIAEADgAlajHIgLAFIgMACIgMADIgGAHIgEAIIgDAHIgIAIIgEAIIgIAHIgIAHIgHAIIgDAHIgCAIIgCAIIgDAHIgDAHIgFAIIgEAHIgDAIIAAAIIAAAHIAAAHIAAAIIAAAHIAAAIIAAAIIAAAHIAAAHIAAAHIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIAAAIIAAAHIAAAIIAAAHIAAAHIAAAIIADAIIAMAHIANAIIAHAHIAFAHIAFAIIAMAIIAQAHIARAIIASAHIAOAHIAKAGIAVACIAMACIAIADIAOAFIAPAHIANAIIANAIIAWAHIAPAHIAPAIIAUAHIAKAIIAMAIIAPAHIAKAFIASAFIANAIIAMAEIC/gCIAQgHIAHgIIAIgIIAKgHIAOgHIAPgIIAKgHIAIgIIAFgFIADgDIAHgHIAMgHIAGgIIAHgHIAHgIIAKgIIAPgHIAKgHIAGgIIAHgHIAHgIIAPgIIAQgHIAOgHIALgIIAKgHIAHgIIAHgIIAIgHIAIgHIAFgIIAEgHIAGgIIAEgIIADgHIADgHIACgIIACgHIAGgIIACgIIACgHIADgHIADgIIACgHIADgIIACgIIACgHIADgHIADgIIACgHIAAgIIAAgIIAAgHIAAgHIAAgIIAAgHIAAgIIAAgHIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIAAgHIAAgIIAAgIIAAgHIAAgIIAAgHIgCgHIgDgIIgDgIIgCgHIgCgIIgDgHIAAgHIgCgIIAAgIIgDgHIAAgIIgDgHIgCgHIgFgIIgFgIIgFgHIgFgIIgFgHIgFgHIgCgIIAAgIIgFgHIgQgFIgRgFIgMgIIgKgHIgIgFIgIgCIgOgGIgPgHIgKgIIgIgHIgIgHIgJgIIgIgIIgMgHIgNgFIgSgFIgWgFIgRgFIkhgCIgGACIgZAIIgRAHIgKAHIgKAIIgIAHIgEAIIgIAIIgKAHIgIAHIgEAIIgIAHIgKAIIgNAIIgHAHIgHAHIgIAIIgHAHIgGAIIAAAIIgCAHIgFAHIgFAIIgIAFIgEACIgNADIgSgFIgOAFgAArFUIgSgFIgqgFIgMgCIgFgDIgKgDIgogCIgRgFIghgFIgSgFIgdgFIgSgFIgMgHIgLgIIgMgHIgKgIIgKgIIgIgHIgHgHIgFgIIgFgHIgCgIIgDgIIAAgHIAAgHIADgIIACgHIAFgIIAHgIIALgEIAMgDIASAFIAJAIIAGAHIACAHIAFAIIAKAHIANAIIAHAFIACADIAXACIARAFIAXAFIAMACIAKADIAFADIAhACIAMADIANACIAHACIAlADIANADIAKACIAEACIBzgCIAKgIIAIgHIAFgIIADgHIAHgHIAIgIIAEgIIADgHIADgIIAHgHIAHgHIADgIIADgIIACgHIAAgIIAAgHIADgHIAAgIIACgIIAFgHIAHgIIADgHIAAgHIADgIIACgIIAFgHIAHgIIALgEIAMAAIAAgDIASAFIAKAIIAFAHIACAIIACAHIADAHIAAAIIAAAIIgDAHIAAAIIgCAHIgFAHIgFAIIgFAIIAAAHIgCAIIAAAHIgDAHIgDAIIgCAIIgCAHIgGAIIgCAHIgIAHIgEAIIAAAIIgFAHIgDAIIgHAHIgGAHIgKAIIgEAIIgIAHIgHAIIgIAHIgIAHIgKAIIgKAIIgPAHIgRAFIh6AAgAi1hyIgKgIIgIgHIgCgIIAAgHIgDgHIADgIIACgIIAFgHIAHgIIAKgEIANAAIAAgDIASAFIAKAIIAEAHIADAIIACAHIAAAHIAAAIIgFAIIgCAHIgKAIIgIAEIgMADIgRgFgADZiQIgKgHIgHgIIgDgIIAAgHIgCgIIACgHIADgHIAFgIIAIgIIAKgFIAMAAIAAgCIARAFIAKAIIAGAHIACAHIACAIIAAAIIAAAHIgEAIIgDAHIgKAHIgHAGIgNACIgSgFg");
	this.shape.setTransform(55.5,46);

	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-90,14.1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_31();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90,0,201,92);


(lib.brazo2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkuJOIgRgFIgKgHIgIgIIgKgHIgKgIIgJgHIgNgIIgHgHIgIgIIgIgHIgHgIIgIgHIgCgIIgCgHIgDgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIADgIIAAgHIACgIIAFgHIAHgIIADgHIAAgIIACgHIAAgIIADgHIAFgIIACgHIADgIIAHgHIAIgIIACgHIADgIIAHgHIAIgIIADgHIACgIIAIgHIAHgIIADgHIAEgIIAIgHIAHgIIANgHIAHgIIADgHIAFgIIAIgHIAEgIIADgHIAIgIIAHgHIAKgIIANgHIAMgIIAHgHIAGgIIAHgHIANgIIAEgHIAFgIIAIgHIAKgIIAIgHIAEgIIADgHIAFgIIAFgHIAIgIIAMgGIASgIIAJgHIAIgIIAIgHIAHgIIAHgHIANgIIAFgHIAHgIIAIgHIAMgIIAKgHIAHgIIAKgHIANgIIAHgHIAFgIIAFgHIAIgIIAHgHIAHgIIAGgHIAHgIIAHgHIAIgIIAHgHIAGgIIACgHIAFgIIAHgHIAIgIIAIgHIAHgIIAIgHIAHgIIAHgHIAIgIIAIgHIAJgIIANgHIADgCIgIgGIgIgHIgCgIIAAgHIgCgIIACgHIAAgIIAFgHIADgIIACgHIACgIIAGgHIAHgIIAHgFIAGgCIAMgDIAPADIAKgDIAIgHIAHgIIAMgHIAKgIIAKgHIAIgIIANgHIAOgIIACAAIABgFIAFgHIACgIIAGgHIAHgIIAIgHIAHgIIADgHIACgIIAFgHIADgIIACgHIAFgIIAFgHIAHgIIAIgFIAALMIgFgEIgHgIIhJAAIgRAFIgXAFIgWAIIgSAHIgKAFIgFADIgMACIgfAFIgHAIIgMAHIgNAIIgKAHIgWAIIgKAHIgQAIIgMAHIgZAIIgMAHIgGAIIgEAHIgLAIIgHAFIgRAFIgIAHIgHAIIgJAHIgIAIIgIAHIgMAIIgKAHIgKAIIgPAHIgIAIIgKAHIgHAIIgFAHIgHAIIgIAHIgFAIIgFAHIgCAIIgGAHIgCAIIgDAHIAAAIIgCAHIgCAIIgDAHIAAAIIAAAHIAAAIIgDAHIAAAIIgEAHIgDAIIAAAHIAAAIIAAAHIAAAIIgDAHIAAAIIgEAHIgDAIIgHAHIgIAFIgFADIgMACIgXAFIgSAFIhBAAg");
	this.shape.setTransform(42.5,59.025);

	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-60.95,35.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_29();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.9,0,145.9,118.1);


(lib.brazo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADjIEIgRgGIgKgHIgIgIIgKgHIgHgHIgHgIIgFgIIgIgHIgIgIIgHgHIgHgHIgGgIIgEgIIgDgHIgCgIIAAgHIgDgHIAAgIIgDgIIgEgHIAAgIIgDgHIAAgHIAAgIIgFgIIgCgHIAAgIIgDgHIAAgHIgFgIIgIgIIgHgHIgIgIIgCgHIgFgHIgHgIIgDgIIgFgHIgFgIIgHgHIgIgHIgKgIIgPgIIgOgHIgKgIIhGAAIgoAAIgSAGIgPAEIgUAIIgTAHIgKAGIgGACIgUAFIgJAFIgNACIghAFIgCAFIgKAIIgHAFIgNACIgNgDIgPADIgOAIIgIAFIgPAFIgPAIIgPAHIgNAIIgOAHIgGAHIgCAIIgIAIIgFAHIgEAIIgDAHIgFAHIgIAIIgEAIIgGAHIgCAIIgFAHIgFAHIgFAIIgCAIIgGAHIgEAIIgDAEIAAidIADgDIAHgHIAHgHIADgEIACgEIAIgIIAIgHIAHgIIAPgHIANgHIAKgIIAKgFIARgFIAKgFIASgFIAMgGIAAgHIAAgHIAAgHIAAgIIAAgHIAAgIIgCgIIgDgHIgFgHIgFgIIgDgHIAAgIIgCgIIAAgHIAAgHIAAgIIAAgHIAAgIIgCgIIgDgHIAAgHIgDgIIgCgHIAAgHIAAgIIAAgHIAAgHIAAgIIAAgHIgFgIIgDgIIAAgHIgCgHIAAgIIAAgHIAAgIIAAgIIAAgHIAAgHIgFgIIgFgHIgFgIIgCgIIAAgHIgDgHIgFgIIgCgHIAAgIIgDgIIgFgHIgCgHIAAgIIgGgHIgFgIIgEgIIgGgHIAAgHIgCgIIAAgHIAAgIIgFgIIgDgHIAAgHIgCgIIAAgHIAAgIIgFgIIgHgHIgIgHIgFgIIgCgHIAAgIIgDgIIAAgHIAAgHIgDgIIgCgHIgCgIIgDgIIAAgHIAAgHIABgCIgBAAIAAhVIARABIADABIAPAFIAXAEIARAGIAKAHIAFAFIARACIASAFIAKAIIAFAFIAIADIARAEIAMAGIASAEIAPAIIAMAHIAIAIIAKAIIAPAEIASAGIAMAHIAFAHIAKAIIAPAHIAPAIIANAIIAKAHIAMAHIARAIIANAHIANAIIAKAIIAJAHIAIAHIAFADIAKAFIAKAHIAKAIIAMAIIAQAHIARAHIAMAIIAPAHIAKAIIAPAIIAKAHIAEAFIADACIARAGIANAHIAKAIIAIAHIAHAHIAHAIIALAHIAMAIIAPAIIANAHIAHAHIAIAIIAHAHIAHAIIAIAIIAIAHIAHAHIAIAIIAHAHIAHAIIAIAIIAIAHIAHAHIAIAIIAEAHIAGAIIAEAIIADAHIADAGIAEAIIAIAHIAFAIIAFAIIAFAHIACAHIAGAIIACAHIACAIIAGAIIACAHIACAHIAGAIIAHAHIAFAIIAHAIIAGAHIACAHIAFAIIADAHIACAIIACAIIAAAHIADAHIAIAIIAHAHIAFAIIAFAIIAFAHIAKAHIAKAIIAHAHIAGAIIAEAIIAGAHIAEAHIAIAIIAFAHIAFAIIAHAIIAGAHIACAHIAFAIIADAHIACAIIACAIIAGAHIACAHIAFAIIADAHIACAIIAFAIIACAHIAAAHIADAIIAAAHIAAAIIgDAIIAAAHIgEAHIgDAIIgIAHIgHAGIgFACIgSAFIgJAFIgSAFIgKAHIgIAGIgEACIgNACIgWAFIgSAGIieAAg");
	this.shape.setTransform(53.5,51.55);

	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(88,19.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_27();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,237,103.1);


(lib.bocas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ai0EdIgNgDIgKgCIgFgDIgqgCIgUgFIgKgFIgNgDIgMgCIgIgDIgogCIgRgFIgKgFIgNgDIgPgFIgWgHIgKgIIgFgFIgSgCIgRgFIgKgIIgKgHIgNgIIgUgHIgRgFIgUgFIgNgIIgKgHIgMgIIgPgHIgKgIIgIgHIgFgIIgCgHIgFgIIgKgHIgIgIIgHgHIgIgIIgHgHIgIgIIgFgHIgHgIIgIgHIgFgIIgCgHIgDgIIgFgHIgFgHIgHgHIgIgHIgFgIIgFgHIgCgIIgIgHIgFgIIgFgHIgCgIIgFgHIgFgIIgDgHIgFgIIgFgHIgCgIIgFgHIgIgIIgHgHIgIgIIgFgHIAAgIIgCgHIAAgIIAAgHIAAgIIAAgHIAAgIIABgCIgJgDIgKgHIgHgIIgDgHIAAgIIgCgHIACgIIADgHIAFgIIAHgHIAKgFIANAAIAAgDIMJAAIASAFIAzAFIASAFIAyAFIARAFIANAFIAMADIAKACIAFADIJEgDIAUgFIBnAAIARAFIAKAIIAFAHIADAIIACAHIAAAIIAAAHIgFAIIgCAHIgKAIIgIAFIgMACIgbACIACAGIAAAHIgDAIIgCAHIgDAIIgFAHIgHAIIgDAHIgFAIIgCAHIgIAIIgFAHIgFAIIgCAHIgDAIIAAAHIgFAIIgCAHIgFAIIgDAHIgFAIIgHAHIgDAHIgCAHIgDAHIgFAIIgHAHIgIAIIgFAHIgCAIIgFAHIgFAIIgDAHIgFAIIgHAHIgDAIIAAAHIgCAIIgFAHIgDAIIAAAHIgFAIIgCAHIgIAIIgMAHIgIAIIgCAHIgKAIIgIAFIgFACIgRAFIgKAIIgKAHIgNAIIgPAHIgHAIIgFAHIgFAIIgKAHIgSAFIgMADIghAFIgMAHIgKAFIgNADIpPAAgAr9jJIAAAHIACAIIAFAHIAFAIIADAHIAFAIIAFAHIAFAIIACAHIAFAIIAFAHIAFAIIAFAHIADAIIAFAHIAFAIIAFAHIAFAIIAFAHIAHAIIAFAHIAFAIIAFAHIAFAIIAFAHIAIAHIAHAHIAFAHIADAIIAHAHIAIAIIAMAHIAKAIIAIAHIACAIIAKAHIANAIIAFAHIAHAIIANAFIARAFIAPAHIAUAIIASAHIARAIIAPAFIASAFIAMAHIAKAIIAIAFIAFACIAPADIARAFIAjAFIANACIAFADIAKACIAUADIARAFIAtAFIASAFIJSAAIAKgFIAFgDIAKgCIAKgDIAMgCIASgFIAHgIIAIgHIAMgIIANgHIAMgIIAKgHIAKgIIANgHIAMgIIAIgHIAHgIIADgHIACgIIAFgHIAAgIIADgHIACgIIADgHIAFgIIAHgHIAFgIIAFgHIADgIIACgHIAFgHIAFgHIAIgHIAFgIIAFgHIACgIIAFgHIAIgIIACgHIAFgIIADgHIACgIIAAgHIAFgIIADgHIAFgIIACgHIAIgIIAFgHIACgIIAAgHIAFgIIACgCIgHACIpGAAIgSgFIgUgFIgRgFIgrgFIgUgFIg9gFIgSgFIq/gEIABACg");
	this.shape.setTransform(87.625,28.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AGSEnIgRgFIgqgFIgVgDIgMgCIgPgDIgMgCIgIgDIgMgCIgNgDIgIgCIgKgDIgHgCIgKgDIgKgCIgPgDIgUgCIgUgDIk8gCIgUgFIhTgFIgPgDIgNgCIgMgDIgIgCIgRgFIjpgFIgRgFIg0gFIgSgFIgPgIIgKgFIgFgCIgUgFIgKgFIgUgFIgNgIIgHgHIgHgIIgIgHIgFgIIgFgHIgCgIIgIgHIgHgIIgIgHIgIgIIgHgHIgFgIIgCgHIAAgIIgDgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgHIAAgHIgFgFIgDgIIAAgHIgCgIIACgHIADgIIAFgHIAHgHIAKgFIANgDIAggFIAQgHIAJgIIAIgHIAIgIIAHgHIAHgIIANgHIAPgIIAXgHIARgIIAIgHIAMgIIAUgHIAKgIIAHgHIAIgIIAIgHIAHgIIAIgHIAKgIIAHgHIAHgIIANgHIAPgIIAUgHIAKgIIAPgHIARgIIASgCIAAgDIIeAAIARAFIAcAFIAOADIANACIAHADIAwACIASAFIA3AFIARAFIAMAFIASAFIAoAFIARAFIANAIIAKAHIAMAIIAKAHIAGAIIAJAHIAKAIIAIAHIAKAIIARAHIANAIIAKAHIAHAIIAIAHIAPAIIAPAHIANAIIAHAHIAPAIIAKAHIAHAIIAGAHIAFAIIAHAHIAKAHIAKAIIAHAHIANAIIAMAHIAGAFIAEADIASAFIAKAHIAHAHIAKAHIAXAIIAKAHIAFAIIAFAHIACAIIAAAHIAAAIIgBAEIABABIAKAHIAGAIIACAHIADAIIACAHIgCAIIgDAHIgCAIIgDAHIAAAIIgDAHIAAAIIgCAHIgCAIIgDAHIgDAIIgCAHIgFAIIgDAHIgHAIIgKAHIgPAIIgNAHIgMAIIgKAHIgPAIIgMAHIgSAIIgPAHIgMAFIgNADIj9AAgAm0jJIgIAHIgIAFIgEADIgVAFIgKAHIgKAIIgMAHIgIAIIgHAHIgIAIIgHAHIgHAIIgIAHIgIAIIgJAHIgSAIIgIAHIgHAFIgFADIgRAFIgKAFIgVAFIgKAHIgHAHIgHAIIgIAHIgNAIIgOAHIgQAIIgPAHIgCABIAAADIAAAIIAAAHIAAAIIAAAHIAAAIIAHAHIAIAIIAIAHIAHAIIAFAHIACAIIAGAHIAWAIIANAFIARAFIAPAHIANAFIAvADIARAFIDVAFIAMACIAIADIAUAFIARAFIAIACIBfADIARAFIEuAFIAUACIAUADIAUACIASADIAMACIAKADIAKACIAKADIAHACIAKADIAKACIANADIAKACIAKADIAZACIA1ADIARAFID4AAIATgIIANgHIANgIIAPgHIAMgIIAKgHIAIgIIAFgHIACgIIAAgHIAAgIIACgHIAAgIIADgHIAFgIIABgDIgQgEIgPgIIgNgHIgHgIIgPgHIgNgIIgHgHIgKgIIgMgHIgNgIIgNgHIgHgIIgHgHIgIgHIgHgHIgGgIIgHgHIgNgIIgJgHIgQgIIgWgHIgKgHIgHgIIgGgHIgEgIIgKgFIgPgFIgKgHIgKgIIgIgHIgIgIIgJgHIgKgIIgKgHIgQgIIgggFIgRgFIgNgFIgSgFIg0gFIgSgFIgqgFIgNgCIgHgDIgKgCIgegDIgSgFIoYAAIgWAIg");
	this.shape_1.setTransform(81,32.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgQG4IgVgDIgUgFIgRgFIgIgCIgKgDIgtgCIgUgDIgTgFIgSgFIgKgCIgNgDIgUgFIgRgHIgPgIIgNgHIgMgIIgKgHIgNgIIgMgHIgMgIIgPgHIgQgIIgOgHIgIgIIgKgHIgNgIIgMgHIgIgIIgJgHIgNgIIgHgHIgIgIIgFgHIgFgIIgDgHIgEgIIgGgHIgEgIIgGgHIgCgIIgFgHIgDgIIAAgHIgCgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgHIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIACgHIAAgIIAGgHIACgIIAAgHIACgIIAAgHIADgIIAFgHIAFgIIADgHIACgIIACgHIADgIIAFgHIADgIIACgHIAIgIIAHgHIADgHIACgIIAFgHIADgIIAHgHIAIgIIAMgHIAMgIIAIgHIAHgIIAIgHIAIgIIAKgHIAKgFIAPgFIAHgIIAPgHIAPgIIAPgHIAPgIIARgHIAIgIIAIgHIAHgIIANgHIAJgIIANgHIAHgIIAIgHIAPgIIASgFIAMgFIAKgHIAKgFIANAAIAAgDIA5AAIARAFIBjAFIASAFIAeAFIARAFIAQAIIAPAFIAOACIASAFIAXAFIARAFIAcAFIAMADIARAFIANAHIAKAIIAHAFIADACIASAFIAMAFIASAFIAMAIIAHAHIAKAIIAIAHIAFAIIAFAHIAFAIIAFAHIAHAIIAIAHIACAIIAGAHIAEAIIADAHIADAIIACAHIAFAIIAFAHIAHAIIAGAHIAEAHIADAIIADAHIACAIIAFAHIADAIIAFAHIACAIIAAAHIACAIIADAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIgDAIIAAAHIgCAIIgCAHIgDAIIAAAHIgCAIIAAAGIgDAIIgFAHIgCAIIgGAHIgCAIIAAAHIAAAIIAAAHIgCAIIAAAHIgDAIIAAAHIgDAIIgCAHIgFAIIgDAHIgCAIIAAAHIgCAIIAAAHIgDAIIAAAHIgFAIIgDAHIgCAIIgCAHIgDAIIgDAHIgCAIIgCAHIgDAIIgFAHIgCAIIgDAHIgFAIIgFAHIgFAIIgDAHIgEAIIgGAHIgHAIIgFAHIgFAIIgFAHIgFAIIgIAHIgHAIIgHAHIgKAIIgNAHIgPAIIgNAHIgOAFIgSAFIgNAIIgRAHIgMAFIgIADIgMACIgNADIgWACIgKADIgNACIgPADIiXAAgAhylYIgZAIIgIAHIgMAIIgPAHIgKAIIgKAHIgIAIIgHAHIgKAIIgPAHIgKAIIgKAHIgWAIIgSAHIgIAIIgMAHIgPAIIgKAHIgFAIIgIAHIgKAHIgMAIIgIAHIgEAIIgDAHIgFAIIgHAHIAAAIIgGAHIgCAIIgCAHIgGAIIgCAHIgFAIIgFAHIAAAIIgCAHIgDAIIAAAHIgFAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAHIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIACAHIAGAIIAEAHIADAIIAFAHIAFAIIAHAHIANAIIAIAHIAUAIIAKAHIAJAIIAGAHIAMAIIAMAHIAPAIIANAHIANAIIAMAHIANAIIAKAHIAOAIIAPAHIAUAFIANADIAKACIAKADIAMACIAtADIANACIAMADIAKACIAKADIAIACIAKADIANACICoAAIAPgCIAIgDIAMgCIAXgDIAPgFIANgHIAKgIIAJgFIANgCIARgFIALgIIAOgHIAKgIIAGgHIAEgIIADgHIAIgIIAHgHIADgIIACgHIAIgIIAEgHIADgIIAFgHIACgIIADgHIADgIIACgHIADgIIACgHIACgIIADgHIAFgIIAAgHIAAgIIAAgHIACgIIAAgHIAGgIIACgHIAFgIIADgHIACgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIACgHIADgIIADgHIAFgHIAEgHIADgIIAAgHIADgIIAAgHIAEgIIADgHIAAgIIAAgHIAAgIIAAgHIAAgIIgDgHIgEgIIgGgHIgEgIIAAgHIgDgIIgFgHIgHgIIgGgHIgCgIIgFgHIgDgIIgCgHIgFgHIgDgIIgHgHIgIgIIgEgHIgIgIIgCgHIgKgIIgPgHIgKgFIgDgDIgRgFIgPgHIgIgIIgIgFIgCgCIgZgDIgSgFIgggFIgRgFIgIgFIgMgCIgFgDIgKgCIgSgFIgKgFIgXgDIgRgFIizgCIgFACg");
	this.shape_2.setTransform(82,45.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AroFjIhQAAIgRgFIgKgIIgIgHIgDgIIAAgHIgCgIIACgHIADgIIAFgHIAHgIIAKgFIANgCIA4gBIAEgHIADgHIAEgIIAIgHIAIgIIAEgHIAGgIIACgHIAHgIIAGgHIACgIIAAgHIAAgIIACgHIAAgIIADgHIAFgIIAFgHIAFgIIAIgHIAHgIIAFgHIAFgIIAFgHIAAgIIADgHIAAgIIACgHIAFgIIADgHIAEgHIAIgIIAKgHIADgIIAEgHIAGgIIAEgGIAIgIIAIgHIAEgIIAIgHIADgIIAEgHIAGgIIACgHIAFgIIAHgHIAIgIIAHgHIANgIIAPgHIAMgIIALgHIAMgIIASgHIAWgIIAKgHIAHgIIAKgHIAIgIIAFgHIAIgIIAHgHIANgIIAPgHIAMgIIAMgHIAKgIIALgHIAKgIIAOgHIASgFIANgDIAWgFIAKgHIANgIIAKgFIAKgCIAMgDIARgFIAZgHIAQgFIAMgDIAXgCIAEgDIAKgCIANgDIASgCIAHgDIAPgFIAKgFIAFgCIARgFIAMgFIAMAAIAAgDIDTAAIARAFIAUAIIASAHIAMAIIAZAHIAMAIIAIAHIANAIIAOAHIAQAIIAHAHIAIAIIAMAHIAMAIIAPAHIAQAIIAMAHIAKAIIANAHIAHAIIAHAHIAGAIIAEAHIAPAIIANAHIANAIIAHAHIAIAIIAHAHIANAIIAOAHIANAIIAKAHIAKAIIAMAHIALAIIAMAHIAKAIIAFAHIAKAIIAKAHIAIAFIARAFIAKAIIAFAHIAKAIIAKAHIAHAIIADAGIAFAIIACAHIAAAIIAIAHIAFAIIACAHIAGAHIACAIIAFAHIADAIIACAHIAFAIIADAHIAAAIIACAHIAAAIIAAAHIAAAIIAAAHIAAAIIACAHIAGAIIAFAHIACAIIACAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIgDAHIAAAIIgEAHIgDAIIgKAHIgIAFIgMADIgJgCIABACIAAAHIAAAIIgEAHIgDAIIgKAHIgIAFIgMADIlgAAIgSgFIgKgFIgNgDIgMgCIgIgDIgTgCIgUgFIpYAAIgRAFIhDAFIgNAHIgIAFIgMADIhuAFIgRAFIgQACIgEADIgNACIgMADIi3AAgAi/jJIgKAHIgIAFIgFADIgNACIglAFIgIAIIgMAHIgKAIIgNAHIgPAIIgMAHIgFAIIgHAHIgIAIIgKAHIgKAIIgFAHIgFAIIgKAHIgHAFIgGADIgMACIgXAFIgKAIIgJAHIgNAIIgNAHIgMAIIgFAHIgCAIIgGAGIgEAIIgGAHIgEAIIgIAHIgIAIIgHAHIgFAIIgFAHIgCAHIgGAIIgCAHIgIAIIgHAHIgDAIIAAAHIgCAIIgDAHIgEAIIgDAHIgFAIIgFAHIgFAIIgCAHIgIAIIgIAHIgCAIIAAAHIAAAIIgDAHIgCAIIgCAHIgGAIIgEAHIgIAIIgFAHIgFAIIgBACIB0gCIASgFIAYgFIASgFIBdgFIAHgIIAKgFIANgCIBQgFIARgDIAAgCIJUAAIASAFIAbAFIASAFIAbAFIASAFIFeAFIAIACIAAgCIgDgIIAAgHIAAgIIAAgHIAAgIIgDgHIgEgIIgGgHIgEgIIAAgHIgDgIIAAgHIAAgIIAAgHIAAgIIAAgHIgCgIIgDgHIgDgIIgEgHIgGgIIAAgHIgCgIIgFgHIgHgIIgDgHIgDgHIgCgIIgKgHIgKgIIgNgHIgMgIIgKgHIgNgIIgHgGIgHgIIgKgHIgNgIIgMgHIgIgIIgKgHIgNgIIgOgHIgNgIIgKgHIgIgIIgEgHIgNgIIgNgHIgPgIIgHgHIgHgIIgIgHIgIgIIgJgHIgKgIIgDgBIAAAGIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAGIAAAIIAAAHIgDAIIgCAHIgCAIIgGAHIgKAHIgHAFIgMADIgcAAIgRgFIgKgHIgNgIIgMgHIgIgIIgKgHIgKgIIgMgHIgIgIIgHgGIgKgIIgKgHIgNgIIgIgFIgRgFIgKgHIgHgIIgFgHIAAgIIgDgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgFIhnAAIAAADIAAAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAHIADAIIACAHIACAIIAGAHIAAAIIACAHIAAAIIADAHIACAIIAAAHIAAAIIAAAHIAAAIIACAHIAGAIIACAHIACAIIADAHIADAIIAAAHIACAIIAAAHIAAAIIAAAHIgCAIIAAAHIgDAIIgDAHIgCAHIgFAHIgKAIIgIAFIgMACIiYAAIgRgFIgSgHIgMgIIgIgGIgFgIIAAgHIgCgIIAAgHIAAgIIAAgHIAAgIIAAgHIgCgIIgDgHIgDgIIgCgHIgCgIIgGgHIAAgIIgEgHIgIgIIgFgHIgDgIIgCgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgFIgHAIgAD/kDIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAHAIIAIAHIANAIIAKAHIAKAIIAHAHIAIAIIAMAHIAKAIIAKAHIAFAAIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIgDgIIgEgHIgGgIIAAgHIgCgIIACgHIAAgIIADgDIgFgCIgKgHIgKgIIgKgHIgXgIIgKgHIgHgFIgPgDIAAAFgAgYj5IgUAFIgWAFIgSAFIgaAEIABAEIACAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAHIADAIIAEAHIAFAIIADAHIADAIIACAHIACAIIAGAHIACAIIACAHIAAAIIADAHIAAAIIADAHIAAAIIACAFIBjgDIgFgHIgDgIIgEgHIgDgIIAAgHIgDgIIgCgHIAAgIIAAgHIAAgIIAAgHIAAgIIgCgHIgDgIIgDgHIgEgIIgDgHIgCgIIAAgHIgCgIIAAgHIAAgIIAAgHIAAgIIAAgHIgCgHIgSAEg");
	this.shape_3.setTransform(83.5,21.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-14,178.3,104);


// stage content:
(lib.stikmanconmivoz = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {Oh:21,Neutral:32,Uh:34,S:37,Woo:40,"Oh":44,M:45,"Oh":48,"Woo":51,"M":54,"Woo":57,"S":61,Ee:63,"Oh":66,"Woo":68,"M":71,"Oh":74,"M":76,"Woo":79,"M":82,"Woo":85,"M":87,"Oh":89,"M":93,"Oh":95,"Neutral":97,"Neutral":106};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,11,105,108];
	this.streamSoundSymbolsList[11] = [{id:"CentroInformaticoCosladaonlineaudioconvertercom",startFrame:11,endFrame:107,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}
	this.frame_11 = function() {
		var soundInstance = playSound("CentroInformaticoCosladaonlineaudioconvertercom",0);
		this.InsertIntoSoundStreamData(soundInstance,11,107,1);
	}
	this.frame_105 = function() {
		var _this = this;
		/*
		Detenga la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		
		
		var _this = this;
		/*
		Al hacer clic en la instancia del símbolo especificada, se ejecuta una función.
		*/
		_this.movieClip_9.on('click', function(){
		/*
		Inicie la animación completa.
		*/
		createjs.Ticker.removeEventListener('tick', stage);
		createjs.Ticker.addEventListener('tick', stage);
		});
	}
	this.frame_108 = function() {
		var _this = this;
		/*
		Detener un clip de película o un vídeo
		Detiene el clip de película o el vídeo especificado.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(11).call(this.frame_11).wait(94).call(this.frame_105).wait(3).call(this.frame_108).wait(1));

	// Capa_8
	this.instance = new lib.cabeza();
	this.instance.setTransform(389.5,134.05,1,1,0,0,0,55.5,46);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.cabeza(), 3);

	this.instance_1 = new lib.brazo2();
	this.instance_1.setTransform(289.5,240,1,1,0,0,0,42.5,59);
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.brazo2(), 3);

	this.instance_2 = new lib.brazo();
	this.instance_2.setTransform(519.5,245.55,1,1,0,0,0,53.5,51.6);
	new cjs.ButtonHelper(this.instance_2, 0, 1, 2, false, new lib.brazo(), 3);

	this.instance_3 = new lib.piernas();
	this.instance_3.setTransform(385,423.05,1,1,0,0,0,90,94);
	new cjs.ButtonHelper(this.instance_3, 0, 1, 2, false, new lib.piernas(), 3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#323232").s().p("AobLvIAAgDIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIAAgIIAAgHIgCgIIgDgHIgDgIIgCgHIAAgIIAAgHIgFgIIgCgHIgDgIIgFgHIgCgIIgDgHIgFgIIgCgHIgGgIIgEgHIAAgIIgDgHIgDgIIgHgHIgIgIIgHgHIgDgIIgCgHIgFgIIgDgHIgEgIIgIgHIgNgHIgMgHIgFgEIAArNIADgCIAEgHIAIgIIAFgEIAAAMIC0AAIgsAEIgBABIgFAHIgIAIIgHAHIgHAIIgGAFIgCACIgHAIIgGAHIgHAIIgHAHIgKAIIgDACIgFAFIgHAIIgEAFIgCACIgHAIIgHAHIgIAIIgBABIABAEIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIgCAHIAAAIIgDAHIAAAIIgDAHIgCAIIgDAHIAAAIIgCAHIgCAIIgDAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIgDAIIAAAHIgCAIIgCAHIgDAIIAAAHIAAAIIAAAHIAAABIAFACIAKAHIAKAIIAHAHIANAIIANAHIAHAIIAIAHIAHAIIAHAHIAIAIIAFAHIADAIIAEAHIAFAHIAIAHIAFAIIAFAHIAFAIIAFAHIACAIIAGAHIAAAIIACAHIACAIIAFAHIADAIIAFAHIACAIIAGAHIACAIIACAHIADAIIADAHIACAIIACAHIADAIIAAAHIADAIIACAHIACAIIAAAHIADAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIAAAHIAAAIIOMAAIABgDIAAgHIAAgIIACgHIADgIIADgHIAEgIIAGgHIACgIIAAgHIAAgIIAAgHIACgIIADgHIAAgIIAFgHIACgIIAAgHIAGgIIAFgHIAEgIIAIgHIAFgIIAAgHIAAgIIADgHIAAgIIACgHIAFgIIAFgHIAFgIIADgHIAHgIIAFgHIAHgIIAGgHIACgIIACgHIAAgIIADgHIAFgIIAFgHIAFgIIAFgHIACgIIADgHIAFgIIAFgHIAHgIIADgHIAFgIIAFgHIADgIIAFgHIAEgIIADgHIAFgIIAFgHIAHgIIAGgHIAEgIIAAgHIADgIIAFgFIAACcIgCAEIgGAIIgEAHIAAAIIgGAHIgCAIIgIAHIgEAIIAAAHIgDAIIgDAHIgEAIIgDAHIgFAIIgHAHIgIAIIgFAHIgDAIIgCAHIgCAIIgDAHIAAAIIgDAHIAAAIIgEAHIgDAIIgIAHIgHAIIgFAHIgCAIIgDAHIgDAIIgCAHIAAAIIAAAHIAAAIIgCAHIgDAIIgDAHIgEAIIgDAHIgFAIIAAAHIAAAIIgDAHIgCAIIgCAHIgDAIIAAAHIAAAIIAAAHIgDAIIAAAHIgEAIIgCAFgAKFoGIgRgFIgPgIIgIgHIgIgFIgEgDIgjgCIgUgFIgPgIIgBAAIgHgCIgKgIIgKgHIgPgIIgPgHIgKgIIgKgHIgIgIIgHgHIgHgIIgKgHIgPgIIgDgCIgFgFIgIgIIgHgHIgKgIIgMgHIgKgIIgKgHIgQgIIgHgHIgIgIIgHgHIgHgIIgDgCICBAAIAGAFIAHAHIADACIAFAGIAIAHIAWAIIAHAFIADACIAFAIIAFAHIAKAIIAKAHIAFAFIAFADIAFABIAAgBIASAFIAKAHIAHAIIAFAFIACACIAZADIANACIARAFIASAIIAKAHIAHAFIASABIAABVIgZgDgAinqwIgRgFIgMgFIgSgFIgMgIIgNgHIgIgFIgEgDIgKgCIgQgFIgGgFIGRAAIgIAFIgIAHIgHAIIgHAHIgNAIIgPAFIgHACIgKAFIgNADIjFAAg");
	this.shape.setTransform(399,253.9875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},107).to({state:[{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).wait(1));

	// Capa_7
	this.movieClip_9 = new lib.Símbolo10();
	this.movieClip_9.name = "movieClip_9";
	this.movieClip_9.setTransform(743,365.5);
	this.movieClip_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.movieClip_9).wait(105).to({_off:false},0).to({_off:true},2).wait(2));

	// ojos
	this.instance_4 = new lib.ojos("synched",0);
	this.instance_4.setTransform(506,234.05,1,1,0,0,0,111.5,32.5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(31).to({_off:false},0).to({_off:true},76).wait(2));

	// bocas
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ai0EdIgNgDIgKgCIgFgDIgqgCIgUgFIgKgFIgNgDIgMgCIgIgDIgogCIgRgFIgKgFIgNgDIgPgFIgWgHIgKgIIgFgFIgSgCIgRgFIgKgIIgKgHIgNgIIgUgHIgRgFIgUgFIgNgIIgKgHIgMgIIgPgHIgKgIIgIgHIgFgIIgCgHIgFgIIgKgHIgIgIIgHgHIgIgIIgHgHIgIgIIgFgHIgHgIIgIgHIgFgIIgCgHIgDgIIgFgHIgFgHIgHgHIgIgHIgFgIIgFgHIgCgIIgIgHIgFgIIgFgHIgCgIIgFgHIgFgIIgDgHIgFgIIgFgHIgCgIIgFgHIgIgIIgHgHIgIgIIgFgHIAAgIIgCgHIAAgIIAAgHIAAgIIAAgHIAAgIIABgCIgJgDIgKgHIgHgIIgDgHIAAgIIgCgHIACgIIADgHIAFgIIAHgHIAKgFIANAAIAAgDIMJAAIASAFIAzAFIASAFIAyAFIARAFIANAFIAMADIAKACIAFADIJEgDIAUgFIBnAAIARAFIAKAIIAFAHIADAIIACAHIAAAIIAAAHIgFAIIgCAHIgKAIIgIAFIgMACIgbACIACAGIAAAHIgDAIIgCAHIgDAIIgFAHIgHAIIgDAHIgFAIIgCAHIgIAIIgFAHIgFAIIgCAHIgDAIIAAAHIgFAIIgCAHIgFAIIgDAHIgFAIIgHAHIgDAHIgCAHIgDAHIgFAIIgHAHIgIAIIgFAHIgCAIIgFAHIgFAIIgDAHIgFAIIgHAHIgDAIIAAAHIgCAIIgFAHIgDAIIAAAHIgFAIIgCAHIgIAIIgMAHIgIAIIgCAHIgKAIIgIAFIgFACIgRAFIgKAIIgKAHIgNAIIgPAHIgHAIIgFAHIgFAIIgKAHIgSAFIgMADIghAFIgMAHIgKAFIgNADIpPAAgAr9jJIAAAHIACAIIAFAHIAFAIIADAHIAFAIIAFAHIAFAIIACAHIAFAIIAFAHIAFAIIAFAHIADAIIAFAHIAFAIIAFAHIAFAIIAFAHIAHAIIAFAHIAFAIIAFAHIAFAIIAFAHIAIAHIAHAHIAFAHIADAIIAHAHIAIAIIAMAHIAKAIIAIAHIACAIIAKAHIANAIIAFAHIAHAIIANAFIARAFIAPAHIAUAIIASAHIARAIIAPAFIASAFIAMAHIAKAIIAIAFIAFACIAPADIARAFIAjAFIANACIAFADIAKACIAUADIARAFIAtAFIASAFIJSAAIAKgFIAFgDIAKgCIAKgDIAMgCIASgFIAHgIIAIgHIAMgIIANgHIAMgIIAKgHIAKgIIANgHIAMgIIAIgHIAHgIIADgHIACgIIAFgHIAAgIIADgHIACgIIADgHIAFgIIAHgHIAFgIIAFgHIADgIIACgHIAFgHIAFgHIAIgHIAFgIIAFgHIACgIIAFgHIAIgIIACgHIAFgIIADgHIACgIIAAgHIAFgIIADgHIAFgIIACgHIAIgIIAFgHIACgIIAAgHIAFgIIACgCIgHACIpGAAIgSgFIgUgFIgRgFIgrgFIgUgFIg9gFIgSgFIq/gEIABACg");
	this.shape_1.setTransform(503.625,351.525);

	this.instance_5 = new lib.bocas("single",2);
	this.instance_5.setTransform(503.6,351.45,1,1,0,0,0,87.6,28.4);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1}]},31).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},9).to({state:[]},1).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(32).to({_off:false},0).wait(2).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(3).to({startPosition:5},0).wait(4).to({startPosition:2},0).wait(1).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(4).to({startPosition:1},0).wait(2).to({startPosition:1},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:5},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:2},0).wait(2).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(3).to({startPosition:6},0).wait(3).to({startPosition:5},0).wait(2).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(4).to({startPosition:6},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:2},0).wait(9).to({startPosition:2},0).to({_off:true},1).wait(2));

	// Capa_1
	this.instance_6 = new lib.stikaman("synched",0);
	this.instance_6.setTransform(-81.05,330.05,1,1,0,0,0,61.4,164);

	this.instance_7 = new lib.CachedBmp_1();
	this.instance_7.setTransform(312,162.05,0.5,0.5);
	this.instance_7._off = true;

	this.instance_8 = new lib.CachedBmp_2();
	this.instance_8.setTransform(278,89.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_6}]},29).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[]},76).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({x:402.9,startPosition:1},29).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:312,y:162.05},1).wait(79));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(29).to({_off:false},1).to({_off:true,x:278,y:89.05},1).wait(78));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(257.6,388.1,516.4,220);
// library properties:
lib.properties = {
	id: '682E6D11B73E9745A178DD3D22F5D937',
	width: 800,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/stikman con mi voz_atlas_1.png?1671453429697", id:"stikman con mi voz_atlas_1"},
		{src:"sounds/CentroInformaticoCosladaonlineaudioconvertercom.mp3?1671453429757", id:"CentroInformaticoCosladaonlineaudioconvertercom"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['682E6D11B73E9745A178DD3D22F5D937'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;