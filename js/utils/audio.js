Utils.Audio = {
	ctx: {},
	audioWorkerMode: false,
	Oscillators: {
		SINE: "sine",
		SQUARE: "square",
		TRIANGLE: "triangle",
		SAWTOOTH: "sawtooth",
		WHITE: "white"
	},
	createOscillator(type) {
		const ctx = new AudioContext();
		const oscillator = ctx.createOscillator();
		const gain = ctx.createGain();

		oscillator.type = type;
		oscillator.start();
		gain.gain.value = 0;
		oscillator.connect(gain);
		gain.connect(ctx.destination);
		return {
			ctx: ctx,
			oscillator: oscillator,
			gain: gain
		};
	},
	createWhiteNoise() {
		const audioContext = new AudioContext();
		const bufferSize = 2 * audioContext.sampleRate;
		const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
		const output = noiseBuffer.getChannelData(0);
		const gain = audioContext.createGain();

		gain.gain.value = 0;

		for (let i=0; i<bufferSize; i++) {
			output[i] = Math.random() * 2 - 1;
		}
		const whiteNoise = audioContext.createBufferSource();
		whiteNoise.buffer = noiseBuffer;
		whiteNoise.loop = true;

		whiteNoise.connect(gain);
		gain.connect(audioContext.destination);

		return {
			ctx: audioContext,
			oscillator: whiteNoise,
			gain: gain
		};
	},
	playOscillator(oscillator, frequency = 440, duration = 100, volume = 0.1) {
		
		if (oscillator.oscillator.frequency) {
			oscillator.oscillator.frequency.value = frequency;	
		}

		oscillator.gain.gain.value = volume;

		window.setTimeout(() => {
			oscillator.gain.gain.value = 0;
		}, duration);
	},
	init() {
		this.ctx = new AudioContext();
	}
}
