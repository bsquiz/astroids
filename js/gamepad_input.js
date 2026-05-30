const deadzone = 0.15;

const applyDeadzone = (value) => {
  return Math.abs(value) < deadzone ? 0 : value;
};

const updateGamepad = () => {
  const gamepads = navigator.getGamepads();

  for (const gamepad of gamepads) {
    if (!gamepad) continue;

    const leftX = applyDeadzone(gamepad.axes[0]);
    const leftY = applyDeadzone(gamepad.axes[1]);

    const aPressed = gamepad.buttons[0].pressed;
    const bPressed = gamepad.buttons[1].pressed;

    if (leftX < 0) {
      console.log("move left");
    }

    if (leftX > 0) {
      console.log("move right");
    }

    if (leftY < 0) {
      console.log("move up");
    }

    if (leftY > 0) {
      console.log("move down");
    }

    if (aPressed) {
      console.log("A / Cross pressed");
    }

    if (bPressed) {
      console.log("B / Circle pressed");
    }
  }

  requestAnimationFrame(updateGamepad);
};

window.addEventListener("gamepadconnected", (event) => {
  console.log("Gamepad connected:", event.gamepad.id);
  updateGamepad();
});

window.addEventListener("gamepaddisconnected", (event) => {
  console.log("Gamepad disconnected:", event.gamepad.id);
});

const isGamepadConnected = () => {
	const [gamepad] = navigator.getGamepads();

	return Boolean(gamepad);
};

const getGamepadInput = () => {
  const [gamepad] = navigator.getGamepads();

  if (!gamepad) {
    return {
      left: false,
      right: false,
      up: false,
      down: false,
      confirm: false,
      cancel: false,
    };
  }

  const x = applyDeadzone(gamepad.axes[0]);
  const y = applyDeadzone(gamepad.axes[1]);

  return {
    left: x < -0.5 || gamepad.buttons[14]?.pressed,
    right: x > 0.5 || gamepad.buttons[15]?.pressed,
    up: y < -0.5 || gamepad.buttons[12]?.pressed,
    down: y > 0.5 || gamepad.buttons[13]?.pressed,
    confirm: gamepad.buttons[0]?.pressed,
    cancel: gamepad.buttons[1]?.pressed,
  };
};