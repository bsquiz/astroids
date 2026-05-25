class AudioPlayer {
	constructor() {
		this.isMuted = false;
		this.currentMusicNote = 0;
		this.nextNoteTime = 0;
		this.maxNextNoteTime = 50;
		this.musicNotes = [
			220,
			196,
			174,
			164	
		];
		this.currentSpaceshipNote = 0;
		this.nextSpaceshipNoteTime= 0;
		this.maxNextSpaceshipNoteTime= 10;
		this.spaceshipNotes= [
			1000,
			800
		];
		this.isThrusterPlaying = false;


	}
	playPlayerShootSnd() {
		if (this.isMuted) return;

		Utils.Audio.playSweep(this.sawtooth, 1900, 520, 130, 0.08);
	}
	playExplosionSnd() {
		if (this.isMuted) return;

		Utils.Audio.playOscillator(this.whiteNoise, 200, 240, 0.24);
	}
	startThrusterSnd() {
		if (this.isMuted || this.isThrusterPlaying) return;

		this.isThrusterPlaying = true;
		Utils.Audio.setVolume(this.thrusterNoise, 0.045, 0.08);
	}
	stopThrusterSnd() {
		if (!this.isThrusterPlaying) return;

		this.isThrusterPlaying = false;
		Utils.Audio.setVolume(this.thrusterNoise, 0, 0.12);
	}
	playBonusPickupSnd() {
		if (this.isMuted) return;

		Utils.Audio.playToneSequence(this.triangle, [
			{ frequency: 660, duration: 90, gap: 15 },
			{ frequency: 880, duration: 90, gap: 15 },
			{ frequency: 1320, duration: 140 }
		], 0.11);
	}
	playGameOverSnd() {
		if (this.isMuted) return;

		Utils.Audio.playToneSequence(this.triangle, [
			{ frequency: 392, duration: 160, gap: 25 },
			{ frequency: 330, duration: 180, gap: 25 },
			{ frequency: 262, duration: 280 }
		], 0.1);
	}
	setVolume(sound, volume) {
		
	}
	loopSound(sound) {

	}

	play(sound) {

	}

	pause(sound) {

	}
	playBGM() {

	}
	init() {
		Utils.Audio.init();
		this.sine= Utils.Audio.createOscillator(Utils.Audio.Oscillators.SINE);
		this.square= Utils.Audio.createOscillator(Utils.Audio.Oscillators.SQUARE);
		this.triangle= Utils.Audio.createOscillator(Utils.Audio.Oscillators.TRIANGLE);
		this.sawtooth= Utils.Audio.createOscillator(Utils.Audio.Oscillators.SAWTOOTH);
		this.whiteNoise = Utils.Audio.createWhiteNoise({
			type: 'lowpass',
			frequency: 280,
			q: 1.4
		});
		this.thrusterNoise = Utils.Audio.createWhiteNoise({
			type: 'lowpass',
			frequency: 420
		});
	}
}
