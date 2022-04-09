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


	}
	playPlayerShootSnd() {
		if (this.isMuted) return;

		Utils.Audio.playOscillator(this.sine, 1600);
	}
	playExplosionSnd() {
		if (this.isMuted) return;

		Utils.Audio.playOscillator(this.whiteNoise, 200, 200);
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
		this.whiteNoise = Utils.Audio.createWhiteNoise();
	}
}