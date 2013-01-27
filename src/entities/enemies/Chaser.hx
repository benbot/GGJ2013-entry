package entities.enemies;

import com.haxepunk.Entity;
import com.haxepunk.graphics.Image;
import com.haxepunk.math.Vector;
import com.haxepunk.World;
import com.haxepunk.HXP;
import entities.Player;
import world.TestWorld;

/**
 * ...
 * @author Benjamin Botwin
 */

/*class Chaser extends Entity
{*/

class Chaser extends Entity
{

	private var speed = 10;
	private var incrament = -0.5;
	private var directionVec:Vector;
	private var moveVec:Vector;
	private var targetVec:Vector;
	private var leftBool:Bool = false;
	private var rightBool:Bool = false;
	private var upBool:Bool = false;
	private var downBool:Bool = false;
	
	public function new(x:Float, y:Float) 
	{
		super();
		
		this.x = x;
		this.y = y;
		
		var tempImage = new Image(Assets.baby);
		
		graphic = tempImage;
		setHitbox(tempImage.width, tempImage.height);
		
		moveVec = new Vector();
	}
	
	private inline function getPlayerDirVec()
	{
		targetVec = new Vector(cast(HXP.world, TestWorld).player.x, cast(HXP.world, TestWorld).player.y);
		directionVec = new Vector(targetVec.x - x, targetVec.y - y);
		directionVec.normalize(1);
	}
	
	private inline function handleDirection()
	{
		if (leftBool)
		{	
			if (moveVec.x != 1)
			{
				moveVec.x += incrament;
				if (moveVec.x > 1)
				{
					moveVec.x = 1;
				}
			}
			
		}
		else if(!(moveVec.x <= 0))
		{
			moveVec.x -= incrament;
			
			if (moveVec.x < 0)
			{
				moveVec.x = 0;
			}
		}
		
		if (rightBool)
		{
			if (moveVec.x != -1)
			{
				moveVec.x -= incrament;
				
				if (moveVec.x < -1)
				{
					moveVec.x = -1;
				}
			}
		}
		else if(!(moveVec.x >= 0))
		{
			moveVec.x += incrament;
			
			if ( moveVec.x > 0)
			{
				moveVec.x = 0;
			}
		}
		
		if (upBool)
		{	
			if (moveVec.y != 1)
			{
				moveVec.y += incrament;
				if (moveVec.y > 1)
				{
					moveVec.y = 1;
				}
			}
		}
		else if(!(moveVec.y <= 0))
		{
			moveVec.y -= incrament;
			
			if (moveVec.y < 0)
			{
				moveVec.y = 0;
			}
		}
		
		if (downBool)
		{
			if (moveVec.y != -1)
			{
				moveVec.y -= incrament;
				
				if (moveVec.y < -1)
				{
					moveVec.y = -1;
				}

			}
		}
		else if(!(moveVec.y >= 0))
		{
			moveVec.y += incrament;
			
			if (moveVec.y > 0)
			{
				moveVec.y = 0;
			}
		}
	}
	
	private inline function move()
	{
		x += (speed * HXP.elapsed) * moveVec.x;
		y += (speed * HXP.elapsed) * moveVec.y;
	}
	
	private inline function updateControls()
	{
		if (targetVec.x > x)
		{
			leftBool = false;
			rightBool = true;
		}
		else if (targetVec.x < x)
		{
			rightBool = false;
			leftBool = true;
		}
		else
		{
			rightBool = leftBool = false;
		}
		
		if (targetVec.y > y)
		{
			upBool = false;
			downBool = true;
		}
		else if (targetVec.y < y)
		{
			downBool = false;
			upBool = true;
		}
		else 
		{
			upBool = downBool = false;
		}
	}
	
	override public function update():Void 
	{
		if (targetVec == null)
		{
			getPlayerDirVec();
		}
		
		if (collidePoint(x, y, targetVec.x, targetVec.y))
		{
			targetVec = null;
		}
		
		updateControls();
		handleDirection();
		move();
		
		
		super.update();
	}
	
}