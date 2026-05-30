(function(root) {
	function noop() {}

	function now() {
		return Date.now ? Date.now() : new Date().getTime();
	}

	function GamepadController(options) {
		options = options || {};

		this.deadzone = options.deadzone || 0.45;
		this.repeatDelay = options.repeatDelay || 260;
		this.repeatInterval = options.repeatInterval || 110;
		this.onInput = options.onInput || noop;
		this.onConnect = options.onConnect || noop;
		this.onDisconnect = options.onDisconnect || noop;
		this.getGamepads = options.getGamepads || function() {
			if(!root.navigator || !root.navigator.getGamepads) return [];
			return root.navigator.getGamepads();
		};

		this.running = false;
		this.gamepadIndex = null;
		this.actions = {};
		this.frame = null;
		this.timeout = null;
	}

	GamepadController.prototype.start = function() {
		if(this.running) return;

		this.running = true;
		this.bindConnectionEvents();
		this.tick();
	};

	GamepadController.prototype.stop = function() {
		this.running = false;

		if(this.frame && root.cancelAnimationFrame) root.cancelAnimationFrame(this.frame);
		if(this.timeout) root.clearTimeout(this.timeout);
		this.frame = null;
		this.timeout = null;
		this.actions = {};
	};

	GamepadController.prototype.destroy = function() {
		this.stop();
		if(root.removeEventListener) {
			root.removeEventListener("gamepadconnected", this.connectedHandler);
			root.removeEventListener("gamepaddisconnected", this.disconnectedHandler);
		}
	};

	GamepadController.prototype.bindConnectionEvents = function() {
		var controller = this;

		if(this.connectedHandler || !root.addEventListener) return;

		this.connectedHandler = function(e) {
			controller.gamepadIndex = e.gamepad.index;
			controller.onConnect(e.gamepad);
		};
		this.disconnectedHandler = function(e) {
			if(controller.gamepadIndex == e.gamepad.index) controller.gamepadIndex = null;
			controller.onDisconnect(e.gamepad);
		};

		root.addEventListener("gamepadconnected", this.connectedHandler);
		root.addEventListener("gamepaddisconnected", this.disconnectedHandler);
	};

	GamepadController.prototype.tick = function() {
		if(!this.running) return;

		this.update();
		this.queueNextTick();
	};

	GamepadController.prototype.queueNextTick = function() {
		var controller = this;

		if(root.requestAnimationFrame) {
			this.frame = root.requestAnimationFrame(function() {
				controller.tick();
			});
		} else {
			this.timeout = root.setTimeout(function() {
				controller.tick();
			}, 16);
		}
	};

	GamepadController.prototype.update = function() {
		var gamepad = this.getActiveGamepad();
		if(!gamepad) return;

		var state = this.readState(gamepad);
		this.handleAction("up", state.up, gamepad, true);
		this.handleAction("down", state.down, gamepad, true);
		this.handleAction("left", state.left, gamepad, true);
		this.handleAction("right", state.right, gamepad, true);
		this.handleAction("primary", state.primary, gamepad, false);
		this.handleAction("secondary", state.secondary, gamepad, false);
		this.handleAction("start", state.start, gamepad, false);
	};

	GamepadController.prototype.getActiveGamepad = function() {
		var gamepads = this.getGamepads() || [];
		var gamepad = null;

		if(this.gamepadIndex !== null) gamepad = gamepads[this.gamepadIndex];
		if(gamepad) return gamepad;

		for(var i=0; i<gamepads.length; i++) {
			if(gamepads[i]) {
				this.gamepadIndex = gamepads[i].index;
				return gamepads[i];
			}
		}

		return null;
	};

	GamepadController.prototype.readState = function(gamepad) {
		var axes = gamepad.axes || [];
		var buttons = gamepad.buttons || [];
		var x_axis = axes[0] || 0;
		var y_axis = axes[1] || 0;

		return {
			up: this.isPressed(buttons[12]) || y_axis < -this.deadzone,
			down: this.isPressed(buttons[13]) || y_axis > this.deadzone,
			left: this.isPressed(buttons[14]) || x_axis < -this.deadzone,
			right: this.isPressed(buttons[15]) || x_axis > this.deadzone,
			primary: this.isPressed(buttons[0]),
			secondary: this.isPressed(buttons[1]),
			start: this.isPressed(buttons[9])
		};
	};

	GamepadController.prototype.isPressed = function(button) {
		if(!button) return false;
		return button.pressed || button.value > 0.5;
	};

	GamepadController.prototype.handleAction = function(action, pressed, gamepad, repeatable) {
		var action_state = this.actions[action] || {
			pressed: false,
			nextRepeat: 0
		};
		var current_time = now();

		if(pressed && !action_state.pressed) {
			this.emit(action, gamepad);
			action_state.nextRepeat = current_time + this.repeatDelay;
		} else if(pressed && repeatable && current_time >= action_state.nextRepeat) {
			this.emit(action, gamepad);
			action_state.nextRepeat = current_time + this.repeatInterval;
		}

		action_state.pressed = pressed;
		this.actions[action] = action_state;
	};

	GamepadController.prototype.emit = function(action, gamepad) {
		this.onInput({
			action: action,
			gamepad: gamepad
		});
	};

	root.GamepadController = GamepadController;
})(typeof window != "undefined" ? window : this);
