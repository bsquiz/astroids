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
	createAudioContext() {
		return new (window.AudioContext || window.webkitAudioContext)();
	},
	createOscillator(type) {
		const ctx = this.createAudioContext();
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
	createWhiteNoise(filterOptions = null) {
		const audioContext = this.createAudioContext();
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

		if (filterOptions) {
			const filter = audioContext.createBiquadFilter();

			filter.type = filterOptions.type;
			filter.frequency.value = filterOptions.frequency;
			if (filterOptions.q) {
				filter.Q.value = filterOptions.q;
			}
			whiteNoise.connect(filter);
			filter.connect(gain);
		} else {
			whiteNoise.connect(gain);
		}
		gain.connect(audioContext.destination);
		whiteNoise.start();

		return {
			ctx: audioContext,
			oscillator: whiteNoise,
			gain: gain
		};
	},
	setVolume(sound, volume, fadeDuration = 0.03) {
		if (!sound) return;

		if (sound.ctx && sound.ctx.state === 'suspended') {
			sound.ctx.resume();
		}

		sound.gain.gain.cancelScheduledValues(sound.ctx.currentTime);
		sound.gain.gain.setTargetAtTime(volume, sound.ctx.currentTime, fadeDuration);
	},
	playOscillator(oscillator, frequency = 440, duration = 100, volume = 0.1) {
		if (!oscillator) return;

		if (oscillator.ctx && oscillator.ctx.state === 'suspended') {
			oscillator.ctx.resume();
		}
		const now = oscillator.ctx.currentTime;
		const endTime = now + duration / 1000;
		
		if (oscillator.oscillator.frequency) {
			oscillator.oscillator.frequency.value = frequency;	
		}

		oscillator.gain.gain.cancelScheduledValues(now);
		oscillator.gain.gain.setValueAtTime(volume, now);
		oscillator.gain.gain.exponentialRampToValueAtTime(0.001, endTime);
		oscillator.gain.gain.setValueAtTime(0, endTime + 0.01);
	},
	playSweep(oscillator, startFrequency, endFrequency, duration = 120, volume = 0.1) {
		if (!oscillator) return;

		if (oscillator.ctx && oscillator.ctx.state === 'suspended') {
			oscillator.ctx.resume();
		}
		if (!oscillator.oscillator.frequency) return;

		const now = oscillator.ctx.currentTime;
		const endTime = now + duration / 1000;

		oscillator.oscillator.frequency.cancelScheduledValues(now);
		oscillator.oscillator.frequency.setValueAtTime(startFrequency, now);
		oscillator.oscillator.frequency.exponentialRampToValueAtTime(endFrequency, endTime);

		oscillator.gain.gain.cancelScheduledValues(now);
		oscillator.gain.gain.setValueAtTime(volume, now);
		oscillator.gain.gain.exponentialRampToValueAtTime(0.001, endTime);
		oscillator.gain.gain.setValueAtTime(0, endTime + 0.01);
	},
	playToneSequence(oscillator, notes, volume = 0.1) {
		if (!oscillator || !notes.length) return;

		if (oscillator.ctx && oscillator.ctx.state === 'suspended') {
			oscillator.ctx.resume();
		}
		if (!oscillator.oscillator.frequency) return;

		const gain = oscillator.gain.gain;
		const frequency = oscillator.oscillator.frequency;
		let time = oscillator.ctx.currentTime;

		gain.cancelScheduledValues(time);
		frequency.cancelScheduledValues(time);
		gain.setValueAtTime(0, time);

		notes.forEach(note => {
			const duration = note.duration / 1000;
			const attackEnd = time + Math.min(0.02, duration / 3);
			const noteEnd = time + duration;

			frequency.setValueAtTime(note.frequency, time);
			gain.setValueAtTime(0, time);
			gain.linearRampToValueAtTime(volume, attackEnd);
			gain.exponentialRampToValueAtTime(0.001, noteEnd);
			gain.setValueAtTime(0, noteEnd + 0.01);
			time = noteEnd + (note.gap || 0) / 1000;
		});
	},
	init() {
		this.ctx = this.createAudioContext();
	}
}
