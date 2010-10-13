(function(orbium) {
	orbium.Marble = function() {
		this.color = null;
		this.frame = null;
		this.direction = null;
		this.fresh = null;
		this.lastDockTry = null;
		this.lastTeleportDest = null;

		this.framec = null;

		this.construct = function(xpos, ypos, color, frame, direction, fresh) {
			if (xpos == -1) {
				xpos = orbium.width;
			}

			if (ypos == -1) {
				ypos = orbium.Bar.height/2-orbium.Marble.size/2;
			}

			this.color = color;
			if (this.color == -1) {
				this.color = orbium.machine.nextColor;
			}

			this.frame = frame;
			if (this.frame == -1) {
				var rand = Math.random();
				if (rand < 1/6) {
					this.frame = 0;
				} else if (rand < 2/6) {
					this.frame = 1;
				} else if (rand < 3/6) {
					this.frame = 2;
				} else if (rand < 4/6) {
					this.frame = 3;
				} else if (rand < 5/6) {
					this.frame = 4;
				} else {
					this.frame = 5;
				}
			}

			if (direction == -1) {
				this.direction = 3;
			} else {
				this.direction = direction;
			}

			this.fresh = fresh;

			this.lastDockTry = null;
			this.lastTeleportDest = null;

			var f = this.color*12+this.frame;
			orbium.Sprite.prototype.construct.call(this, "marble"+f, null, null,
				xpos, ypos, orbium.Marble.size, orbium.Marble.size, 5);

			this.framec = 99;
			this.animate();
		};

		this.destruct = function() {
			orbium.Sprite.prototype.destruct.call(this);
		};

		this.bounce = function() {
			if (this.direction == 0) {
				this.direction = 2;
			} else if (this.direction == 1) {
				this.direction = 3;
			} else if (this.direction == 2) {
				this.direction = 0;
			} else if (this.direction == 3) {
				this.direction = 1;
			}

			this.lastDockTry = null;
			this.lastTeleportDest = null;
		};

		this.animate = function() {
			// Animate the marble every 6th frame
			if (this.framec > 6) {
				if (this.direction == 0) {
					this.frame--;

					if (this.frame < 6) {
						this.frame = 11;
					}
				} else if (this.direction == 1) {
					this.frame++;

					if (this.frame > 5) {
						this.frame = 0;
					}
				} else if (this.direction == 2) {
					this.frame++;

					if (this.frame > 11) {
						this.frame = 6;
					}
				} else if (this.direction == 3) {
					this.frame--;

					if (this.frame < 0) {
						this.frame = 5;
					}
				}

				var f = this.color*12+this.frame;

				this.setImage1("marble"+f);

				this.framec = 0;
			}

			this.invalidate();
		};

		this.update = function(dt) {
			// Sometimes there can be a scheduling delay resulting in a large
			// movement of the marble, we want to filter those out
			if (orbium.Marble.speed*dt > orbium.Marble.size/2) {
				return;
			}

			// Guard against marble coming outside the screen, should never happen
			if (this.xpos < 0) {
				this.direction = 1;
				this.lastDockTry = null;
			} else if (this.xpos > orbium.width-orbium.Marble.size) {
				this.direction = 3;
				this.lastDockTry = null;
			} else if (this.ypos < 0) {
				this.direction = 2;
				this.lastDockTry = null;
			} else if (this.ypos > orbium.height-orbium.Marble.size) {
				this.direction = 0;
				this.lastDockTry = null;
			}

			// Move the marble
			if (this.direction == 0) {
				this.ypos -= orbium.Marble.speed*dt;
			} else if (this.direction == 1) {
				this.xpos += orbium.Marble.speed*dt;
			} else if (this.direction == 2) {
				this.ypos += orbium.Marble.speed*dt;
			} else if (this.direction == 3) {
				this.xpos -= orbium.Marble.speed*dt;
			}

			this.animate();

			this.framec += orbium.Marble.speed*dt;
		};
	}; orbium.Marble.prototype = new orbium.Sprite();
}(window.orbium = window.orbium || {}));