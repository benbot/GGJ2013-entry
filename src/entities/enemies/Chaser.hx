package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.math.Vector;
import com.haxepunk.HXP;
import com.haxepunk.tweens.misc.NumTween;
import com.haxepunk.graphics.Image;
import world.TestWorld;

/**
 * ...
 * @author Benjamin Botwin
 */

class Chaser extends Entity
{
	private var targetVec:Vector;
	private var directionVec:Vector;
	private var moveVec:Vector;
	private var speed = 200.0;
	private var tweenX = true;
	private var tweenY = true;
	private var numTweenX:NumTween;
	private var numTweenY:NumTween;
	
	public function new(x:Float, y:Float) 
	{
		super();
		
		this.x = x;
		this.y = y;
		
		graphic = new Image(Assets.baby);
		
		setHitbox(64, 64);
		
		moveVec = new Vector();
		directionVec = new Vector();
		numTweenX = new NumTween();
		numTweenY = new NumTween();
		addTween(numTweenX);
		addTween(numTweenY);
	}
	
	private function getPlayerVec()
	{
		targetVec = new Vector(cast(HXP.world, TestWorld).player.x - x, cast(HXP.world, TestWorld).player.y - y);
		directionVec = new Vector(targetVec.x, targetVec.y);
		directionVec.normalize(1);
	}
	
	private function move()
	{
		x += (speed * HXP.elapsed) * directionVec.x * moveVec.x;
		y += (speed * HXP.elapsed) * directionVec.y * moveVec.y;
	}
	
	override public function update():Void 
	{
		if (targetVec == null)
		{
			getPlayerVec();
		}
		
		if (tweenX && targetVec.x > x)
		{
			numTweenX.tween(moveVec.x, 1, .3);
			numTweenX.start();
			tweenX = false;
		}
		else if (tweenX && targetVec.x < x)
		{
			numTweenX.tween(moveVec.x, -1, .3);
			numTweenX.start();
			tweenX = false;
		}
		else if (!tweenX && !numTweenX.active)
		{
			numTweenX.tween(moveVec.x, 0, .3);
			numTweenX.start();
			//tweenX = true;
		}
		
		if (tweenY && targetVec.y > y)
		{
			numTweenY.tween(moveVec.y, 1, .3);
			numTweenY.start();
			tweenY= false;
		}
		else if (tweenY && targetVec.y < y)
		{
			numTweenY.tween(moveVec.y, -1, .3);
			numTweenY.start();
			tweenY = false;
		}
		else if (!tweenY && !numTweenY.active)
		{
			//tweenY = true;
		}
		
		moveVec.x = numTweenX.value;
		moveVec.y = numTweenY.value;
	
		
		if (collidePoint(x, y, targetVec.x, targetVec.y))
		{
			numTweenY.tween(moveVec.y, 0, .3);
			numTweenX.tween(moveVec.x, 0, .3);
			numTweenX.start();
			numTweenY.start();
		}
		
		if (moveVec.x == 0 && moveVec.y == 0)
		{
			targetVec = null;
		}
		
		move();
		
		super.update();
	}
	
	}