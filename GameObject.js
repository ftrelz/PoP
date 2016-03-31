/* Author/Contributors: Saddha Santanaporn
*  Date: 2/9/2016
*  Purpose: Hold states for an object that wants to use the game loop
*/

var GameObject = function () {
    this.physicsComponent = null;
    this.tag = "";
    this.manager;
};

GameObject.prototype.AddPhysicsComponent = function (x, y, RigidBodyData, texture_location) {
    this.physicsComponent = RigidBodyData.MakeRigidBody(x, y, texture_location);
};

GameObject.prototype.update = function (delta) {

};

GameObject.prototype.onCollisionEnter = function (other) {
 //TODO: Get this function to work

   if (this.type == "item" && other.type == "player") {
    //TODO(Fred/Fausto): reduce player health here
    other.hp -= this.dmg
    this.manager.remove(this);
    console.log("ITEM AND PLAYER COLLISION"); 
  }  else if(this.type == "player" && other.type == "item")  {

     //TODO(Fred/Fausto): reduce player health here
    this.hp -= other.dmg
    other.manager.remove(other);
      
    console.log("ITEM AND PLAYER COLLISION"); 


  }
};

// classes containing data to create physics rigidbody
var RectBodyData = function (width, height) {
    this.width = width;
    this.height = height;
};

RectBodyData.prototype.MakeRigidBody = function (x, y, texture_location) {
    body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
        render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: texture_location
            }
        }
    });
    Matter.World.add(GameObjManager.engine.world, body);
    return body;
};

var CircleBodyData = function (radius) {
    this.radius = radius;
};

CircleBodyData.prototype.MakeRigidBody = function (x, y, texture_location) {
    body = Matter.Bodies.circle(x, y, radius, {
        render: {
            strokeStyle: '#ffffff',
                sprite: {
                texture: texture_location
            }
        }
    });
    Matter.World.add(GameObjManager.engine.world, body);
    return body;
};

